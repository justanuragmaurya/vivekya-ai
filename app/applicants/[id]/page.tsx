"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserIcon, MailIcon, StarIcon, TrendingUpIcon, FileTextIcon, CalendarIcon, BriefcaseIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Demo data array
interface Application {
  name: string;
  email: string;
  score: number;
  areasToImprove: string;
  ratingOutOf5Stars: number;
  coverLetter: string;
  appliedAt: string | Date;
  jobId: string;
}

function CompactApplicationCard({ application }: { application: Application }) {
  const { name, email, score, areasToImprove, ratingOutOf5Stars, coverLetter, appliedAt, jobId } = application

  const appliedAtDate = new Date(appliedAt);

  return (
    <Card className="w-full max-w-md mb-4 hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex items-center space-x-2">
          <UserIcon className="h-5 w-5 text-gray-500" />
          <span>{name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className='flex flex-col justify-between'>
        <div className="flex items-center space-x-2">
          <MailIcon className="h-4 w-4 text-gray-500" />
          <span className="text-sm">{email}</span>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-semibold flex items-center space-x-2">
            <TrendingUpIcon className="h-4 w-4 text-gray-500" />
            <span>Areas to Improve:</span>
          </h4>
          <p className="text-sm text-gray-600">{areasToImprove}</p>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold flex items-center space-x-2">
            <FileTextIcon className="h-4 w-4 text-gray-500" />
            <span>Cover Letter:</span>
          </h4>
          <p className="text-sm text-gray-600 line-clamp-3">{coverLetter}</p>
        </div>
        </div>
        <div>
        <div className="flex items-center space-x-2">
          <TrendingUpIcon className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-semibold">Score: {score}</span>
        </div>
        <div className="flex items-center space-x-2">
          <StarIcon className="h-4 w-4 text-gray-500" />
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i < ratingOutOf5Stars ? 'text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-4 w-4 text-gray-500" />
          <span className="text-sm">{new Date(appliedAt).toLocaleDateString()}</span>
        </div>
        </div>
      </CardContent>
      
    </Card>
  )
}

export default function Component(): React.ReactElement {
  const [applicants, setApplicants] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();

  useEffect(() => {
    const fetchApplicants = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/fetchapplicants?jobId=${params.id}`);
        setApplicants(response.data);
      } catch (err) {
        setError('Error fetching applicants');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplicants();
  }, [params.id]);

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Applicants for the Job</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {applicants.map((applicant, index) => (
          <CompactApplicationCard key={index} application={applicant} />
        ))}
      </div>
    </div>
  );
}