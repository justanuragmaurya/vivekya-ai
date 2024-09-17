'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from "lucide-react"

export default function JobDetailsForm() {
  const [jobTitle, setJobTitle] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [requiredSkills, setRequiredSkills] = useState('')
  const [experienceLevel, setExperienceLevel] = useState('')
  const [jobType, setJobType] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [companyWebsite, setCompanyWebsite] = useState('')
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await axios.post('/api/postjob', {
        jobTitle,
        jobDescription,
        requiredSkills: requiredSkills.split(',').map(skill => skill.trim()),
        experienceLevel,
        jobType,
        location,
        salary,
        companyName,
        companyWebsite
      })

      console.log(response.data)
      console.log({ jobTitle, jobDescription, requiredSkills, experienceLevel })
      toast({
        title: "Job posted",
        description: "Your job has been posted successfully",
      })
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error posting job:', error)
      toast({
        title: "Error",
        description: "There was an error posting your job. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className='flex flex-col gap-4 items-center justify-center h-[calc(100vh-64)] py-8'>
        <h2 className='text-2xl bg-gradient-to-b from-[#fafafa] to-[#c3c3c3] bg-clip-text text-transparent font-bold'>Thank you for filling the form!</h2>
        <p className='text-white'>Your job has been successfully posted.</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4 items-center justify-center h-[calc(100vh-64)] py-8'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl bg-gradient-to-b from-[#fafafa] to-[#c3c3c3] bg-clip-text text-transparent font-bold'>Enter The details :</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl w-full mx-auto p-6 text-[#0a0a0a] bg-white rounded-lg shadow">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Senior Software Engineer"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="experienceLevel">Experience Level</Label>
            <Select value={experienceLevel} onValueChange={setExperienceLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="mid">Mid Level</SelectItem>
                <SelectItem value="senior">Senior Level</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobDescription">Job Description</Label>
          <Textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Describe the job role and responsibilities..."
            required
          />
          <p className="text-sm text-muted-foreground">This helps in generating relevant screening questions.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="requiredSkills">Required Skills or Qualifications</Label>
          <Textarea
            id="requiredSkills"
            value={requiredSkills}
            onChange={(e) => setRequiredSkills(e.target.value)}
            placeholder="List specific skills or qualifications..."
            required
          />
          <p className="text-sm text-muted-foreground">AI can tailor test questions based on required skills.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="jobType">Job Type</Label>
            <Input
              id="jobType"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              placeholder="e.g. Full-time, Part-time, Contract"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. New York, NY or Remote"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="salary">Salary</Label>
            <Input
              id="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="e.g. $80,000 - $120,000 per year"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter your company name"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyWebsite">Company Website</Label>
          <Input
            id="companyWebsite"
            value={companyWebsite}
            onChange={(e) => setCompanyWebsite(e.target.value)}
            placeholder="https://www.example.com"
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Job Details'
          )}
        </Button>
      </form>
    </div>
  )
}