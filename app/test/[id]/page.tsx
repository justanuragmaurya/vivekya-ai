'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { ClipboardCheck, Target, Search, FileText, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

interface Result {
  id: string;
  name: string;
  email: string;
  score?: string;
  areasToImprove?: string;
  ratingOutOf5Stars?: number;
  coverLetter?: string;
  appliedAt: Date;
  jobId?: string;
}

interface Question {
  id: string;
  text: string;
}

interface TestReport {
  score: string;
  areas_to_improve: string;
  overall_feedback: string;
  rating_out_of_5stars: number;
}

export default function TestPage() {
  const [questions, setQuestions] = useState<string[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [marks, setmarks] = useState(null)
  const [report, setReport] = useState<TestReport | null>(null);
  const [data, setData] = useState<Result | null>(null);
  const params = useParams()

  useEffect(() => {
    async function fetchQuestions() {
      setIsLoading(true)
      console.log('Fetching questions for job ID:', params.id) 
      try {
        const response = await fetch('/api/getQuestions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: params.id }),
        })

        console.log('Response status:', response.status)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('Fetched data:', data) 
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

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  }

  const handleSubmit = async() => {
    setLoading(true);
    const result = questions.map((question, index) => ({
      question,
      answer: answers[index] || ''
    }));
    try {
      const response = await axios.post('/api/submittest', { result });
      const { score, areas_to_improve, rating_out_of_5stars } = response.data;
      const name = localStorage.getItem('name');
      const email = localStorage.getItem('email');
      const coverLetter = localStorage.getItem('coverLetter');

      const updatedData: Result = {
        id: params.id as string,
        name: name || '',
        email: email || '',
        score,
        areasToImprove: areas_to_improve,
        ratingOutOf5Stars: rating_out_of_5stars,
        coverLetter: coverLetter || '',
        appliedAt: new Date(),
        jobId: params.id as string,
      };

      setData(updatedData);
      setReport(response.data);
      console.log('Updated data:', updatedData);

      const dbresponse = await axios.post('/api/postresult', { data: updatedData });
      console.log('Database response:', dbresponse.data);
    } catch (error) {
      console.error('Error submitting test:', error);
      setError('Error submitting test');
    } finally {
      setLoading(false);
    }
  }

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>

  return (
    <div className="container mx-auto py-8 ">
      <h1 className="text-3xl font-bold mb-6">Test Questions</h1>
      {report ? (
        <div className='flex justify-center items-center h-[calc(100vh-10rem)]'>
        <Card className="w-full max-w-md">
        <CardHeader className="border-b">
          <CardTitle className="text-xl flex items-center">
            <ClipboardCheck className="mr-2 h-5 w-5 text-primary" />
            Test Report
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <div>
              <span className="font-semibold text-sm text-muted-foreground">Your score:</span>
              <p className="text-2xl font-bold">{report.score}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Search className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <span className="font-semibold text-sm text-muted-foreground">Areas to improve:</span>
              <p className="text-sm">{report.areas_to_improve}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-primary" />
            <div>
              <span className="font-semibold text-sm text-muted-foreground">Rating:</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < report.rating_out_of_5stars ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium">{report.rating_out_of_5stars}/5</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
      ) : (
        <>
          <div className="space-y-4">
            {questions.map((question, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">Question {index + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{question}</p>
                  <Textarea
                    placeholder="Your answer"
                    className="mt-2 h-32"
                    value={answers[index] || ''}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  />
                </CardContent>  
              </Card>
            ))}
          </div>
          <Button className="mt-6 bg-green-500 hover:bg-green-600" onClick={handleSubmit}>
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : 'Submit Test'}
          </Button>
        </>
      )}
    </div>
  )
}