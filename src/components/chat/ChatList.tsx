import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Conversation {
    id: string;
    user: {
        name: string;
        avatar?: string;
        initials: string;
    };
    lastMessage: string;
    time: string;
    unread: number;
    channel: "Web" | "WhatsApp" | "Email";
}

interface ChatListProps {
    conversations: Conversation[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export function ChatList({ conversations, selectedId, onSelect }: ChatListProps) {
    return (
        <div className="flex flex-col gap-2 p-4 h-full overflow-y-auto border-r bg-muted/10">
            <h3 className="font-semibold mb-2 px-2">Conversations</h3>
            {conversations.map((conv) => (
                <button
                    key={conv.id}
                    className={cn(
                        "flex items-start gap-3 p-3 rounded-lg text-left transition-colors hover:bg-muted",
                        selectedId === conv.id ? "bg-muted" : "bg-transparent"
                    )}
                    onClick={() => onSelect(conv.id)}
                >
                    <Avatar>
                        <AvatarImage src={conv.user.avatar} />
                        <AvatarFallback>{conv.user.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm truncate">{conv.user.name}</span>
                            <span className="text-xs text-muted-foreground">{conv.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate mb-1">
                            {conv.lastMessage}
                        </p>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px] px-1 py-0 h-5">
                                {conv.channel}
                            </Badge>
                            {conv.unread > 0 && (
                                <Badge className="text-[10px] px-1.5 py-0 h-5 bg-primary rounded-full">
                                    {conv.unread}
                                </Badge>
                            )}
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
}
