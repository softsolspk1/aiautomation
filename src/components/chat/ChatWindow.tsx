"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, Smile } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    text: string;
    sender: "user" | "agent" | "bot";
    timestamp: string;
}

interface ChatWindowProps {
    conversationId: string;
    userName: string;
}

export function ChatWindow({ conversationId, userName }: ChatWindowProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Hi, I need help with my invoice.",
            sender: "user",
            timestamp: "10:30 AM",
        },
        {
            id: "2",
            text: "Hello! I'd be happy to help you with that. Could you please provide the invoice number?",
            sender: "agent",
            timestamp: "10:32 AM",
        },
        {
            id: "3",
            text: "It's INV-2023-001.",
            sender: "user",
            timestamp: "10:33 AM",
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: "agent",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages([...messages, newMessage]);
        setInputValue("");
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold">{userName}</h3>
                        <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                </div>
                <Button variant="outline" size="sm">Resolve Ticket</Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={cn(
                            "flex w-full",
                            msg.sender === "agent" ? "justify-end" : "justify-start"
                        )}
                    >
                        <div
                            className={cn(
                                "max-w-[70%] rounded-lg p-3 text-sm",
                                msg.sender === "agent"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted"
                            )}
                        >
                            <p>{msg.text}</p>
                            <p className={cn(
                                "text-[10px] mt-1 text-right",
                                msg.sender === "agent" ? "text-primary-foreground/70" : "text-muted-foreground"
                            )}>
                                {msg.timestamp}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Paperclip className="h-5 w-5" />
                    </Button>
                    <Input
                        placeholder="Type a message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        className="flex-1"
                    />
                    <Button variant="ghost" size="icon">
                        <Smile className="h-5 w-5" />
                    </Button>
                    <Button onClick={handleSend} size="icon">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
