import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db/client';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { listingId, userId, amount } = body;

        if (!listingId || !userId || !amount) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // In a real app, verify payment with Stripe here.
        // For MVP, we record the transaction directly.

        const { data, error } = await supabase
            .from('transactions')
            .insert({
                buyer_id: userId,
                listing_id: listingId,
                amount: amount,
                currency: 'USD',
                status: 'completed', // Auto-complete for demo
                payment_provider_id: 'demo_txn_' + Date.now(),
            })
            .select()
            .single();

        if (error) {
            console.error('Transaction error:', error);
            return NextResponse.json({ error: 'Transaction failed' }, { status: 500 });
        }

        return NextResponse.json({ success: true, transaction: data });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
