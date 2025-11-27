import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db/client';

// GET /api/bots - List all bots
export async function GET(request: NextRequest) {
    try {
        // In production, get user_id from session
        const { data: bots, error } = await supabase
            .from('bots')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ bots });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST /api/bots - Create new bot
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, type, model, system_prompt, skills } = body;

        if (!name || !type || !model) {
            return NextResponse.json(
                { error: 'Name, type, and model are required' },
                { status: 400 }
            );
        }

        // In production, get user_id from session
        const user_id = '00000000-0000-0000-0000-000000000000'; // Placeholder

        const { data: bot, error } = await supabase
            .from('bots')
            .insert({
                user_id,
                name,
                type,
                model,
                system_prompt: system_prompt || '',
                skills: skills || [],
                status: 'active',
            })
            .select()
            .single();

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ bot }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
