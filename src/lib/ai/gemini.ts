import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

export async function geminiChat(
    prompt: string,
    model: string = 'gemini-pro'
) {
    try {
        const geminiModel = genAI.getGenerativeModel({ model });
        const result = await geminiModel.generateContent(prompt);
        const response = await result.response;

        return {
            success: true,
            content: response.text(),
            tokens: 0, // Gemini doesn't provide token count in the same way
        };
    } catch (error: any) {
        console.error('Gemini API Error:', error);
        return {
            success: false,
            error: error.message || 'Failed to generate response',
            tokens: 0,
        };
    }
}

export async function geminiVision(
    prompt: string,
    imageData: string
) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

        const imagePart = {
            inlineData: {
                data: imageData,
                mimeType: 'image/jpeg',
            },
        };

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;

        return {
            success: true,
            content: response.text(),
        };
    } catch (error: any) {
        console.error('Gemini Vision Error:', error);
        return {
            success: false,
            error: error.message,
        };
    }
}
