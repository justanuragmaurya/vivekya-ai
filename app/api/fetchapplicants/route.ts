import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get('jobId');

  if (!jobId) {
    return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
  }

  try {
    const applicants = await prisma.applicants.findMany({
      where: { jobId: jobId }
    });
    return NextResponse.json(applicants);
  } catch (error) {
    console.error('Error fetching applicants:', error);
    return NextResponse.json({ error: 'Error fetching applicants' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}