import { NextResponse } from 'next/server'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not set");
}
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are professional evaulater and you are tasked to evaluate questions and check if the answer recived in correct of partialy correct , you will recive data in JSON format and you have to respond in this format of json {score:percentage , areas_to_improve , overall_feeadback , rating_out_of_5stars} ",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "[\n  {\n    question: 'Describe your experience designing and implementing highly available and scalable cloud architectures using AWS, Azure, or GCP.',\n    answer: ''\n  },\n  {\n    question: 'How would you approach migrating a large, on-premises application to the cloud, considering factors like cost, performance, and security?',\n    answer: ''\n  },\n  {\n    question: \"Explain your understanding of Kubernetes and how you've used it to manage containerized applications in a production environment.\",\n    answer: ''\n  },\n  {\n    question: 'How would you ensure the security of a cloud infrastructure, including data encryption, access control, and threat monitoring?',\n    answer: ''\n  },\n  {\n    question: 'What are some best practices for optimizing cloud costs, and how have you implemented them in your previous roles?',\n    answer: ''\n  },\n  {\n    question: 'Describe your experience working with development teams to integrate cloud solutions and optimize application performance.',\n    answer: ''\n  },\n  {\n    question: \"What are some common challenges you've faced in cloud architecture design, and how did you overcome them?\",\n    answer: ''\n  },\n  {\n    question: 'How do you stay up-to-date on the latest advancements and best practices in cloud technologies?',\n    answer: 'cac'\n  },\n  {\n    question: \"Can you provide an example of a complex cloud project you've worked on and highlight your key contributions?\",\n    answer: ''\n  },\n  {\n    question: 'What are your salary expectations, and how do they align with the offered compensation?',\n    answer: ''\n  }\n]" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\"score\": \"0\", \"areas_to_improve\": \"All questions need to be answered to evaluate. Answers are missing. Please provide answers to the questions.\", \"overall_feeadback\": \"The candidate has not provided any answers to the questions.  It is impossible to evaluate their knowledge and skills without this information.\", \"rating_out_of_5stars\": 0}\n\n```" },
            ],
        },
    ],
});


export async function POST(req: Request) {
    try {
        const  result  = await req.json()
        console.log(result);

        const data = await chatSession.sendMessage(JSON.stringify(result));
        const response = JSON.parse(data.response.text());
        return NextResponse.json(response, { status: 200 });
        
    } catch (error) {
        console.error('Error processing test results:', error)
        return NextResponse.json({ error: 'Error processing test results' }, { status: 500 })
    }
}
