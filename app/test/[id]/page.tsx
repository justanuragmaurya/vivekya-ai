'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Question {
  id: string;
  text: string;
}

export default function TestPage() {
  const [questions, setQuestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()

  useEffect(() => {
    async function fetchQuestions() {
      setIsLoading(true)
      console.log('Fetching questions for job ID:', params.id) // Add this line
      try {
        const response = await fetch('/api/getQuestions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: params.id }),
        })

        console.log('Response status:', response.status) // Add this line

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('Fetched data:', data) // Add this line
        setQuestions(data.questions)
      } catch (err) {
        setError('Error fetching questions')
        console.error('Fetch error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [params.id])

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Test Questions</h1>
      <div className="space-y-4">
        {questions.map((question, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-xl">Question {index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{question}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}