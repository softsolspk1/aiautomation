import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db/client';
import { chatCompletion } from '@/lib/ai/openai';
import { geminiChat } from '@/lib/ai/gemini';
import { claudeChat } from '@/lib/ai/anthropic';

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { input } = await request.json();
        const { id: botId } = await params;

        if (!input) {
            return NextResponse.json(
                { error: 'Input is required' },
                { status: 400 }
            );
        }

        // Fetch bot configuration
        const { data: bot, error: botError } = await supabase
            .from('bots')
            .select('*')
            .eq('id', botId)
            .single();

        if (botError || !bot) {
            return NextResponse.json(
                { error: 'Bot not found' },
                { status: 404 }
            );
        }

        const startTime = Date.now();
        let result;

        // Prepare messages
        const messages = [
            { role: 'system', content: bot.system_prompt || 'You are a helpful assistant.' },
            { role: 'user', content: input },
        ];

        // Execute based on model
        if (bot.model.startsWith('gpt')) {
            result = await chatCompletion(messages, bot.model);
        } else if (bot.model.startsWith('gemini')) {
            // Gemini uses a different format
            const prompt = `${bot.system_prompt}\n\nUser: ${input}\n\nAssistant:`;
            result = await geminiChat(prompt, bot.model);
        } else if (bot.model.startsWith('claude')) {
            result = await claudeChat(messages, bot.model);
        } else {
            return NextResponse.json(
                { error: 'Unsupported model' },
                { status: 400 }
            );
        }

        const duration = Date.now() - startTime;

        // Save execution to database
        const { error: execError } = await supabase
            .from('bot_executions')
            .insert({
                bot_id: botId,
                input,
                output: result.content || null,
                tokens_used: result.tokens,
                duration_ms: duration,
                status: result.success ? 'completed' : 'failed',
            });

        if (execError) {
            console.error('Failed to save execution:', execError);
        }

        if (!result.success) {
            return NextResponse.json(
                { error: result.error },
                { status: 500 }
            );
        }

        return NextResponse.json({
            output: result.content,
            tokens: result.tokens,
            duration_ms: duration,
        });
    } catch (error: any) {
        console.error('Bot execution error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
