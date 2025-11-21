import { GoogleGenAI } from "@google/genai";
import { Car } from "../types";

// Initialize Gemini Client
// Note: API key is expected to be in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCarDescription = async (car: Partial<Car>): Promise<string> => {
  try {
    const prompt = `
      Act as a professional automotive copywriter. Write a compelling, short marketing description (max 2 sentences) for a car with the following details:
      Make: ${car.make}
      Model: ${car.model}
      Year: ${car.year}
      Color: ${car.color}
      Mileage: ${car.mileage}
      
      Highlight its likely key features based on the model. Tone should be premium and inviting.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate description.";
  } catch (error) {
    console.error("Error generating description:", error);
    return "Error connecting to AI service.";
  }
};

export const chatWithBOSAssistant = async (message: string, contextData: string): Promise<string> => {
  try {
    const systemInstruction = `
      You are "DealerBot", a helpful AI assistant for the Dealer365 Back Office System.
      You help dealership staff manage inventory, customers, and sales data.
      
      Current Application Context Data:
      ${contextData}

      Answer the user's questions briefly and professionally. If they ask about specific cars or customers in the context, provide details.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I didn't catch that.";
  } catch (error) {
    console.error("Error in chat:", error);
    return "Sorry, I am having trouble connecting right now.";
  }
};
