import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { GoogleGenerativeAI } from "@google/generative-ai"

const prisma = new PrismaClient()

const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) throw new Error('GEMINI_API_KEY is not defined')
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  },
})

async function generateQuestions(jobDetails: string) {
  const prompt = `Generate 10 interview questions based on the following job details:\n\n${jobDetails}\n\nReturn the questions as a JSON array of strings, without any additional formatting or syntax identifiers.`
  const result = await model.generateContent(prompt)
  const response = await result.response
  const text = response.text()
  
  const cleanedText = text.replace(/```json\s*|\s*```/g, '').trim()
  
  try {
    return JSON.parse(cleanedText)
  } catch (error) {
    console.error('Failed to parse AI response:', cleanedText)
    throw new Error('Invalid response format from AI model')
  }
}

export async function POST(req: Request) {
    const { 
        jobTitle, 
        jobDescription, 
        requiredSkills, 
        experienceLevel, 
        jobType, 
        location, 
        salary, 
        companyName, 
        companyWebsite 
    } = await req.json()
    
    try {
        const jobDetails = `
            Job Title: ${jobTitle}
            Description: ${jobDescription}
            Required Skills: ${requiredSkills.join(', ')}
            Experience Level: ${experienceLevel}
            Job Type: ${jobType}
            Location: ${location}
            Salary: ${salary}
            Company: ${companyName}
        `

        const questions = await generateQuestions(jobDetails)

        const job = await prisma.jobs.create({
            data: {
                title: jobTitle,
                description: jobDescription,
                requiredSkills: requiredSkills,
                experienceLevel,
                jobType,
                location,
                salary,
                companyName,
                companyWebsite,
                questions: questions,
            },
        })

        return NextResponse.json({ message: 'Job posted successfully', job }, { status: 201 })
    } catch (error) {
        console.error('Error posting job:', error)
        return NextResponse.json({ message: 'Error posting job' }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}