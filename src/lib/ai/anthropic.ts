import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function claudeChat(
    messages: Array<{ role: string; content: string }>,
    model: string = 'claude-3-sonnet-20240229'
) {
    try {
        const response = await anthropic.messages.create({
            model,
            max_tokens: 2000,
            messages: messages as any,
        });

        const content = response.content[0];
        const textContent = content.type === 'text' ? content.text : '';

        return {
            success: true,
            content: textContent,
            tokens: response.usage.input_tokens + response.usage.output_tokens,
        };
    } catch (error: any) {
        console.error('Claude API Error:', error);
        return {
            success: false,
            error: error.message || 'Failed to generate response',
            tokens: 0,
        };
    }
}
