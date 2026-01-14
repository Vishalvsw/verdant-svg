
import { GoogleGenAI } from "@google/genai";
import { PROJECT_DETAILS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIResponse = async (userPrompt: string, history: { role: 'user' | 'model', text: string }[]) => {
  try {
    const systemInstruction = `
      You are an expert real estate consultant for the project "Verdant Valley Estates".
      Project Info:
      - Developer: ${PROJECT_DETAILS.developer} (est. ${PROJECT_DETAILS.developerYear})
      - Location: ${PROJECT_DETAILS.location}
      - Total Area: ${PROJECT_DETAILS.totalArea}
      - Amenities: Clubhouse, Pool, Security, Gym, EV charging, Parks.
      - Possession: ${PROJECT_DETAILS.possession}
      - Plot Sizes: 1200 to 4000 sq.ft.
      - Pricing: Starts from $99,000.
      
      Rules:
      1. Be polite, professional, and persuasive.
      2. If asked about pricing or booking, encourage the user to use the "Contact Form" or call the sales team.
      3. Keep answers concise.
      4. Highlight the greenery and ROI.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: systemInstruction }] },
        ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        temperature: 0.7,
        topP: 0.8,
        maxOutputTokens: 250,
      }
    });

    return response.text || "I'm sorry, I couldn't process that. Please try calling our sales team directly!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Our AI assistant is currently resting. Please feel free to call us for any inquiries!";
  }
};
