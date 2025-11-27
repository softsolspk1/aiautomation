import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
    id: string;
    email: string;
    name: string | null;
    organization: string | null;
    plan: string;
    created_at: string;
}

export interface Bot {
    id: string;
    user_id: string;
    name: string;
    type: string;
    model: string;
    system_prompt: string | null;
    skills: string[];
    status: string;
    created_at: string;
    updated_at: string;
}

export interface BotExecution {
    id: string;
    bot_id: string;
    input: string;
    output: string | null;
    tokens_used: number | null;
    duration_ms: number | null;
    status: string;
    created_at: string;
}

export interface Document {
    id: string;
    user_id: string;
    filename: string;
    file_url: string;
    file_type: string;
    status: string;
    extracted_data: any;
    created_at: string;
}
