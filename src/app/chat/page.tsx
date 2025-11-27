"use client";

import { useState } from "react";
import { ChatList } from "@/components/chat/ChatList";
import { ChatWindow } from "@/components/chat/ChatWindow";

const CONVERSATIONS = [
    {
        id: "1",
        user: {
            name: "Alice Smith",
            initials: "AS",
        },
        lastMessage: "It's INV-2023-001.",
        time: "10:33 AM",
        unread: 1,
        channel: "Web" as const,
    },
    {
        id: "2",
        user: {
            name: "Bob Jones",
            initials: "BJ",
        },
        lastMessage: "Thanks for your help!",
        time: "Yesterday",
        unread: 0,
        channel: "WhatsApp" as const,
    },
    {
        id: "3",
        user: {
            name: "Charlie Brown",
            initials: "CB",
        },
        lastMessage: "When will my order ship?",
        time: "Yesterday",
        unread: 0,
        channel: "Email" as const,
    },
];

export default function ChatPage() {
    const [selectedId, setSelectedId] = useState<string | null>("1");

    const selectedConversation = CONVERSATIONS.find((c) => c.id === selectedId);

    return (
        <div className="flex h-[calc(100vh-65px)] overflow-hidden">
            <div className="w-80 flex-shrink-0">
                <ChatList
                    conversations={CONVERSATIONS}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                />
            </div>
            <div className="flex-1 bg-background">
                {selectedConversation ? (
                    <ChatWindow
                        conversationId={selectedConversation.id}
                        userName={selectedConversation.user.name}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        Select a conversation to start chatting.
                    </div>
                )}
            </div>
        </div>
    );
}
