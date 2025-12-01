"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Star, ShoppingBag } from "lucide-react";
import Link from 'next/link';
import { supabase, MarketplaceListing } from '@/lib/db/client';

export default function MarketplacePage() {
    const [listings, setListings] = useState<MarketplaceListing[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        // In a real app, fetch from Supabase
        const fetchListings = async () => {
            const { data, error } = await supabase
                .from('marketplace_listings')
                .select('*')
                .eq('status', 'published');

            if (data && data.length > 0) {
                setListings(data);
            }
        };
        fetchListings();
    }, []);

    const filteredListings = listings.filter(listing => {
        const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            listing.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory ? listing.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    const categories = Array.from(new Set(listings.map(l => l.category).filter(Boolean))) as string[];

    return (
        <div className="container mx-auto py-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">Agent Marketplace</h1>
                    <p className="text-muted-foreground mt-2">Discover and hire top-tier AI agents for your business.</p>
                </div>
                <Link href="/marketplace/submit">
                    <Button>Sell Your Agent</Button>
                </Link>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 items-center bg-card p-4 rounded-lg border shadow-sm">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Search agents (e.g., 'SEO Writer', 'Data Analyst')..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                    <Button
                        variant={selectedCategory === null ? "default" : "outline"}
                        onClick={() => setSelectedCategory(null)}
                        size="sm"
                    >
                        All
                    </Button>
                    {categories.map(cat => (
                        <Button
                            key={cat}
                            variant={selectedCategory === cat ? "default" : "outline"}
                            onClick={() => setSelectedCategory(cat)}
                            size="sm"
                        >
                            {cat}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
                    <Card key={listing.id} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <Badge variant="secondary" className="mb-2">{listing.category}</Badge>
                                <div className="flex items-center text-yellow-500">
                                    <Star className="h-4 w-4 fill-current" />
                                    <span className="ml-1 text-sm font-medium">4.8</span>
                                </div>
                            </div>
                            <CardTitle className="text-xl">{listing.title}</CardTitle>
                            <CardDescription className="line-clamp-2">{listing.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {listing.tags.map(tag => (
                                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center border-t pt-4">
                            <div className="text-lg font-bold">
                                {listing.price === 0 ? 'Free' : `$${listing.price}`}
                                {listing.price > 0 && <span className="text-xs font-normal text-muted-foreground">/mo</span>}
                            </div>
                            <Link href={`/marketplace/${listing.id}`}>
                                <Button size="sm" className="gap-2">
                                    <ShoppingBag className="h-4 w-4" />
                                    View Details
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {filteredListings.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">No agents found matching your criteria.</p>
                    <Button variant="link" onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}>Clear filters</Button>
                </div>
            )}
        </div>
    );
}
