import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyB_R3-BLBlWg0ozsy6kwhEESKNVLBoWi6Y"; // Use a valid API key from your environment
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export async function generateSubSections(topic) {
  try {
    const prompt = `Generate 5 subsections for learning about "${topic}". 
    Each subsection should have a title and detailed educational content.
    Format the response as JSON:
    [
      {
        "title": "Subsection Title",
        "content": "Detailed content"
      }
    ]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
  } catch (error) {
    console.error("Error generating subsections:", error);
    return [];
  }
}

export async function generateQuiz(topic, difficulty = "medium") {
  try {
    const prompt = `Generate a ${difficulty} quiz on "${topic}" with 5 multiple-choice questions.
    Format response as JSON:
    [
      {
        "question": "Question text",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": 0
      }
    ]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
  } catch (error) {
    console.error("Error generating quiz:", error);
    return [];
  }
}

export async function analyzeQuizPerformance(score, totalQuestions) {
  const performancePercentage = (score / totalQuestions) * 100;
  const nextDifficulty = performancePercentage < 50 ? "easy" : performancePercentage < 80 ? "medium" : "hard";

  try {
    const prompt = `A student scored ${score} out of ${totalQuestions} (${performancePercentage}%).
    Provide constructive feedback on their performance in a concise and encouraging manner.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const feedback = response.text();

    return { feedback, nextDifficulty, performancePercentage };
  } catch (error) {
    console.error("Error generating feedback:", error);
    return { feedback: "Review the material and try again.", nextDifficulty, performancePercentage };
  }
}