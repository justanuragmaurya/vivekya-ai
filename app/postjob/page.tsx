'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function JobDetailsForm() {
  const [jobTitle, setJobTitle] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [requiredSkills, setRequiredSkills] = useState('')
  const [experienceLevel, setExperienceLevel] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log({ jobTitle, jobDescription, requiredSkills, experienceLevel })
  }

  return (
    <div className='flex flex-col gap-4 items-center justify-center h-screen'>
        <div className='flex flex-col gap-2'>
            <h2 className='text-2xl bg-gradient-to-b from-[#fafafa] to-[#c3c3c3]  bg-clip-text text-transparent font-bold'>Enter The details :</h2>
        </div>
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 text-[#0a0a0a] bg-white rounded-lg shadow">
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

      <Button type="submit" className="w-full">Submit Job Details</Button>
    </form>
    </div>
  )
}