"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Workflow,
    Bot,
    FileText,
    Settings,
    Puzzle,
    MessageSquare,
    Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Workflows",
        icon: Workflow,
        href: "/workflows",
        color: "text-violet-500",
    },
    {
        label: "AI Agents",
        icon: Bot,
        href: "/agents",
        color: "text-pink-700",
    },
    {
        label: "Documents",
        icon: FileText,
        href: "/documents",
        color: "text-orange-700",
    },
    {
        label: "Integrations",
        icon: Puzzle,
        href: "/integrations",
        color: "text-emerald-500",
    },
    {
        label: "Chat & Support",
        icon: MessageSquare,
        href: "/chat",
        color: "text-green-700",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    },
];

export function Sidebar() {
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        {/* Logo placeholder */}
                        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-xl">
                            A
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold">
                        Auto<span className="text-indigo-500">Flow</span>
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                // pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
                                "text-zinc-400" // Default for now
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function MobileSidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-[#111827]">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
}
