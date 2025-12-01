"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, DollarSign } from "lucide-react";
import { supabase } from '@/lib/db/client';
import { useRouter } from 'next/navigation';

export default function SubmitAgentPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        tags: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (value: string) => {
        setFormData({ ...formData, category: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // In a real app, you would get the current user ID
            // const { data: { user } } = await supabase.auth.getUser();

            // Mock submission for now
            const { error } = await supabase
                .from('marketplace_listings')
                .insert({
                    title: formData.title,
                    description: formData.description,
                    price: parseFloat(formData.price) || 0,
                    category: formData.category,
                    tags: formData.tags.split(',').map(t => t.trim()),
                    status: 'published', // Auto-publish for demo
                    // seller_id: user?.id // Needs auth
                });

            if (error) {
                console.error('Error submitting agent:', error);
                // alert('Failed to submit agent. Please try again.');
                // For demo, we'll just redirect since we might not have auth set up perfectly
            }

            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            router.push('/marketplace');
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto py-12 max-w-2xl">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Sell Your Agent</h1>
                <p className="text-muted-foreground mt-2">
                    Join the AgentX marketplace and monetize your AI innovations.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Agent Details</CardTitle>
                    <CardDescription>Provide comprehensive information to attract buyers.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Agent Name</Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="e.g., SEO Content Writer Pro"
                                required
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select onValueChange={handleCategoryChange} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Marketing">Marketing</SelectItem>
                                    <SelectItem value="Development">Development</SelectItem>
                                    <SelectItem value="Support">Customer Support</SelectItem>
                                    <SelectItem value="Data">Data Analysis</SelectItem>
                                    <SelectItem value="Productivity">Productivity</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Describe what your agent does, its key features, and use cases..."
                                className="min-h-[150px]"
                                required
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Price (Monthly)</Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        placeholder="29.99"
                                        className="pl-9"
                                        min="0"
                                        step="0.01"
                                        required
                                        value={formData.price}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags</Label>
                                <Input
                                    id="tags"
                                    name="tags"
                                    placeholder="SEO, Writing, Blog (comma separated)"
                                    value={formData.tags}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Agent Image</Label>
                            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                    <Upload className="h-8 w-8" />
                                    <span>Click to upload or drag and drop</span>
                                    <span className="text-xs">SVG, PNG, JPG or GIF (max. 800x400px)</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-4">
                        <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit Agent'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
