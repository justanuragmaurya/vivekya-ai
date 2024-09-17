"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLinkIcon } from "lucide-react"

interface JobCardProps {
  title: string
  description: string
  requiredSkills: string[]
  experienceLevel: string
  jobType: string
  location: string
  salary: string
  companyName: string
  companyWebsite: string
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobCardProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch('/api/getjobs')
        if (!response.ok) {
          throw new Error('Failed to fetch job data')
        }
        const data = await response.json()
        setJobs(data)
      } catch (err) {
        setError('Error fetching job data')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [])

  if (isLoading) return <div className="flex flex-col items-center justify-center text-xl h-[calc(100vh-6)]"><p>Loading...</p></div>
  if (error) return <p>{error}</p>
  if (jobs.length === 0) return <p>No jobs available</p>

  return (
    <div className="container mx-auto py-8 ">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </div>
  )
}

function JobCard({ title, description, requiredSkills, experienceLevel, jobType, location, salary, companyName, companyWebsite }: JobCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{companyName}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-2">
          {requiredSkills.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Experience:</strong> {experienceLevel}
          </div>
          <div>
            <strong>Job Type:</strong> {jobType}
          </div>
          <div>
            <strong>Location:</strong> {location}
          </div>
          <div>
            <strong>Salary:</strong> {salary}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Apply Now</Button>
        {companyWebsite && (
          <Button variant="ghost" asChild>
            <a href={companyWebsite} target="_blank" rel="noopener noreferrer">
              Company Website
              <ExternalLinkIcon className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}