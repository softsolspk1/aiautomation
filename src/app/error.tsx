"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="h-[calc(100vh-65px)] flex flex-col items-center justify-center space-y-4">
            <div className="p-4 bg-red-100 rounded-full">
                <AlertTriangle className="h-10 w-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold">Something went wrong!</h2>
            <p className="text-muted-foreground text-center max-w-md">
                An unexpected error occurred. Our team has been notified.
            </p>
            <Button onClick={() => reset()}>Try again</Button>
        </div>
    );
}
