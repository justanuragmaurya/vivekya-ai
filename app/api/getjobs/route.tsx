import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function GET() {
    try {
        const jobs = await prisma.jobs.findMany()
        return NextResponse.json(jobs)
    } catch (error) {
        console.error('Error fetching jobs:', error)
        return NextResponse.json({ message: 'Error fetching jobs' }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}