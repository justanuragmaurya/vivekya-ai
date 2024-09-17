import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { data } = await req.json()
        
        // Console log the received data
        console.log('Received data in /api/postresult:', data)

        // Here you would typically save this data to your database
        // For now, we'll just return a success message

        return NextResponse.json({ message: 'Data received successfully', data }, { status: 200 })
    } catch (error) {
        console.error('Error in /api/postresult:', error)
        return NextResponse.json({ error: 'Error processing data' }, { status: 500 })
    }
}
    