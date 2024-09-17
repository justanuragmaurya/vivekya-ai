import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const { data } = await req.json()

        const newApplicant = await prisma.applicants.create({
            data: {
                name: data.name,
                email: data.email,
                score: data.score,
                areasToImprove: data.areasToImprove,
                ratingOutOf5Stars: data.ratingOutOf5Stars,
                coverLetter: data.coverLetter,
                appliedAt: new Date(data.appliedAt),
                jobId: data.jobId,
            }
        });

        return NextResponse.json({ message: 'Data received successfully', data: newApplicant }, { status: 200 })
    } catch (error) {
        console.error('Error in /api/postresult:', error)
        return NextResponse.json({ error: 'Error processing data' }, { status: 500 })
    }
}