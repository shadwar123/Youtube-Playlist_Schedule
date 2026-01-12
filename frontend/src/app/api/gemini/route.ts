import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const prompt = body?.prompt;

        if (!prompt) {
            return NextResponse.json(
                { error: "Prompt is missing" },
                { status: 400 }
            );
        }

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY not found" },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        }, { apiVersion: 'v1' });

        const result = await model.generateContent(prompt);

        const text =
            result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
        console.log('text res', text)
        if (!text) {
            return NextResponse.json(
                { error: "Empty response from Gemini" },
                { status: 500 }
            );
        }

        return NextResponse.json({ text });
    } catch (error: any) {
        console.error("Gemini API Error:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
