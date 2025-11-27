import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

export async function chatCompletion(
    messages: Array<{ role: string; content: string }>,
    model: string = 'gpt-4'
) {
    try {
        const response = await openai.chat.completions.create({
            model,
            messages: messages as any,
            temperature: 0.7,
            max_tokens: 2000,
        });

        return {
            success: true,
            content: response.choices[0].message.content,
            tokens: response.usage?.total_tokens || 0,
        };
    } catch (error: any) {
        console.error('OpenAI API Error:', error);
        return {
            success: false,
            error: error.message || 'Failed to generate response',
            tokens: 0,
        };
    }
}

export async function generateEmbeddings(text: string) {
    try {
        const response = await openai.embeddings.create({
            model: 'text-embedding-ada-002',
            input: text,
        });

        return {
            success: true,
            embedding: response.data[0].embedding,
            tokens: response.usage.total_tokens,
        };
    } catch (error: any) {
        console.error('OpenAI Embeddings Error:', error);
        return {
            success: false,
            error: error.message,
            tokens: 0,
        };
    }
}
