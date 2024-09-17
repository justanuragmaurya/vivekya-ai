import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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