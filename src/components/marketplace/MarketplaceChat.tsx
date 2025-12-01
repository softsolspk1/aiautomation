"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
}

interface MarketplaceChatProps {
    agentName: string;
    agentImage?: string;
    initialMessage?: string;
}

export function MarketplaceChat({ agentName, agentImage, initialMessage }: MarketplaceChatProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: initialMessage || `Hello! I am ${agentName}. How can I assist you today?`,
            sender: "bot",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        // Simulate bot response
        setTimeout(() => {
            const botResponses = [
                "That's an interesting request. I can certainly help with that.",
                "I'm processing your input...",
                "Here is what I found based on your query.",
                "Could you provide more details?",
                "I've updated the workflow based on your instructions."
            ];
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: randomResponse,
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-[500px] w-full border rounded-md overflow-hidden bg-background">
            <div className="flex items-center p-4 border-b bg-muted/30">
                <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={agentImage} />
                    <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-semibold text-sm">{agentName}</h3>
                    <p className="text-xs text-muted-foreground">AI Agent • Online</p>
                </div>
            </div>

            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex w-full gap-2",
                                msg.sender === "user" ? "justify-end" : "justify-start"
                            )}
                        >
                            {msg.sender === "bot" && (
                                <Avatar className="h-6 w-6 mt-1">
                                    <AvatarImage src={agentImage} />
                                    <AvatarFallback><Bot className="h-3 w-3" /></AvatarFallback>
                                </Avatar>
                            )}
                            <div
                                className={cn(
                                    "max-w-[80%] rounded-lg p-3 text-sm",
                                    msg.sender === "user"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted"
                                )}
                            >
                                <p>{msg.text}</p>
                                <span className="text-[10px] opacity-70 block mt-1">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            {msg.sender === "user" && (
                                <Avatar className="h-6 w-6 mt-1">
                                    <AvatarFallback><User className="h-3 w-3" /></AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex w-full gap-2 justify-start">
                            <Avatar className="h-6 w-6 mt-1">
                                <AvatarImage src={agentImage} />
                                <AvatarFallback><Bot className="h-3 w-3" /></AvatarFallback>
                            </Avatar>
                            <div className="bg-muted rounded-lg p-3 text-sm flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            <div className="p-4 border-t bg-background">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                    }}
                    className="flex gap-2"
                >
                    <Input
                        placeholder="Type a message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={!inputValue.trim() || isTyping}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
}
