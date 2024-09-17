import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const { id } = await req.json()

        if (!id) {
            return NextResponse.json({ error: 'Job ID is required' }, { status: 400 })
        }

        const job = await prisma.jobs.findUnique({
            where: { id },
            select: { questions: true }
        })  

        if (!job) {
            return NextResponse.json({ error: 'Job not found' }, { status: 404 })
        }

        return NextResponse.json({ questions: job.questions })
    } catch (error) {
        console.error('Error fetching questions:', error)
        return NextResponse.json({ error: 'Error fetching questions' }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}