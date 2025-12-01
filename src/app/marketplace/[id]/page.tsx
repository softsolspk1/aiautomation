"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Star, Shield, Zap, Play, MessageSquare } from "lucide-react";
import { supabase, MarketplaceListing } from '@/lib/db/client';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MarketplaceChat } from "@/components/marketplace/MarketplaceChat";

export default function ListingDetailsPage() {
    const params = useParams();
    const [listing, setListing] = useState<MarketplaceListing | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListing = async () => {
            if (!params.id) return;

            try {
                const { data, error } = await supabase
                    .from('marketplace_listings')
                    .select('*')
                    .eq('id', params.id)
                    .single();

                if (data) {
                    setListing(data);
                }
            } catch (error) {
                console.error("Error fetching listing:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchListing();
    }, [params.id]);

    if (loading) {
        return <div className="container mx-auto py-12 text-center">Loading agent details...</div>;
    }

    if (!listing) {
        return <div className="container mx-auto py-12 text-center">Agent not found.</div>;
    }

    return (
        <div className="container mx-auto py-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Badge>{listing.category}</Badge>
                            <div className="flex items-center text-yellow-500 text-sm">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="ml-1 font-medium">4.8 (124 reviews)</span>
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold mb-4">{listing.title}</h1>
                        <p className="text-xl text-muted-foreground">{listing.description}</p>
                    </div>

                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="space-y-4 mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>About this Agent</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p>
                                        This AI agent is designed to streamline your workflow by automating complex tasks.
                                        Built with the latest LLM technology, it understands context and delivers high-quality results.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div className="flex items-start gap-3">
                                            <Shield className="h-5 w-5 text-green-500 mt-1" />
                                            <div>
                                                <h4 className="font-semibold">Verified & Secure</h4>
                                                <p className="text-sm text-muted-foreground">Code audited for security and privacy.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Zap className="h-5 w-5 text-blue-500 mt-1" />
                                            <div>
                                                <h4 className="font-semibold">High Performance</h4>
                                                <p className="text-sm text-muted-foreground">Optimized for speed and accuracy.</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="capabilities" className="mt-4">
                            <Card>
                                <CardContent className="pt-6">
                                    <ul className="space-y-2">
                                        {listing.tags.map((tag, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                                <span>Expert in {tag}</span>
                                            </li>
                                        ))}
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-primary" />
                                            <span>24/7 Availability</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-primary" />
                                            <span>API Integration Ready</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="reviews" className="mt-4">
                            <Card>
                                <CardContent className="pt-6 text-center text-muted-foreground">
                                    Reviews coming soon.
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Right Column: Pricing & CTA */}
                <div className="space-y-6">
                    <Card className="sticky top-8">
                        <CardHeader>
                            <CardTitle>Get Access</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="text-3xl font-bold">
                                {listing.price === 0 ? 'Free' : `$${listing.price}`}
                                {listing.price > 0 && <span className="text-lg font-normal text-muted-foreground">/month</span>}
                            </div>

                            <Button
                                className="w-full"
                                size="lg"
                                onClick={async () => {
                                    try {
                                        const response = await fetch('/api/marketplace/purchase', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({
                                                listingId: listing.id,
                                                userId: '00000000-0000-0000-0000-000000000000', // Mock user ID for demo
                                                amount: listing.price
                                            })
                                        });
                                        const data = await response.json();
                                        if (data.success) {
                                            alert('Purchase successful! (Demo)');
                                        } else {
                                            alert('Purchase failed: ' + data.error);
                                        }
                                    } catch (e) {
                                        alert('Error processing purchase');
                                    }
                                }}
                            >
                                {listing.price === 0 ? 'Install Agent' : 'Subscribe Now'}
                            </Button>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="w-full">
                                        <Play className="mr-2 h-4 w-4" /> Try Demo
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[500px] p-0 border-none bg-transparent shadow-none">
                                    <MarketplaceChat
                                        agentName={listing.title}
                                        agentImage={listing.images[0]}
                                    />
                                </DialogContent>
                            </Dialog>

                            <div className="text-xs text-muted-foreground text-center">
                                30-day money-back guarantee. Cancel anytime.
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">Developer</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="font-bold text-primary">D</span>
                            </div>
                            <div>
                                <div className="font-semibold">AgentDev Studios</div>
                                <div className="text-xs text-muted-foreground">Verified Developer</div>
                            </div>
                            <Button variant="ghost" size="icon" className="ml-auto">
                                <MessageSquare className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
