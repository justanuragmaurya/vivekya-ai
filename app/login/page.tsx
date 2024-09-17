'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from '@/hooks/use-toast'

interface Applicant {
    name: string;
    email: string;
    phone: string;
    coverLetter: string;
}

export default function UserLogin() {
    const { toast } = useToast()
    const [applicant, setApplicant] = useState<Applicant>({
        name: '',
        email: '',
        phone: '',
        coverLetter: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setApplicant(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Store each field separately in localStorage
        localStorage.setItem('name', applicant.name)
        localStorage.setItem('email', applicant.email)
        localStorage.setItem('phone', applicant.phone)
        localStorage.setItem('coverLetter', applicant.coverLetter)
        toast({
            title: "Application submitted",
            description: "Your application has been submitted successfully",
        })
    }

   return (
        <div className='flex flex-col gap-4 items-center justify-center min-h-screen'>
            <h1 className='text-2xl font-bold mb-4'>User Application</h1>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-md w-full p-6 bg-white text-[#0a0a0a] rounded-lg shadow">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        name="name"
                        value={applicant.name}
                        onChange={handleChange}
                        required
                        placeholder='Enter your name'
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={applicant.email}
                        onChange={handleChange}
                        required
                        placeholder='Enter your email'
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={applicant.phone}
                        onChange={handleChange}
                        required
                        placeholder='Enter your phone number'
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="coverLetter">Cover Letter</Label>
                    <Textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={applicant.coverLetter}
                        onChange={handleChange}
                        required
                        placeholder='Enter your cover letter'
                        className='h-28'
                    />
                </div>
                <Button type="submit" className="w-full">Submit Application</Button>
            </form>
        </div>
    )
}