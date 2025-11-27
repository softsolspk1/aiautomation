"use client";

import { useState, useCallback } from "react";
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface DocumentUploadProps {
    onUploadComplete: (file: File) => void;
}

export function DocumentUpload({ onUploadComplete }: DocumentUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [currentFile, setCurrentFile] = useState<File | null>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    }, []);

    const handleFile = (file: File) => {
        setCurrentFile(file);
        simulateUpload(file);
    };

    const simulateUpload = (file: File) => {
        setUploadProgress(0);
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    onUploadComplete(file);
                    setTimeout(() => {
                        setCurrentFile(null);
                        setUploadProgress(0);
                    }, 1000);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    return (
        <div className="w-full">
            {!currentFile ? (
                <div
                    className={cn(
                        "border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors",
                        isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("file-upload")?.click()}
                >
                    <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                    />
                    <div className="flex flex-col items-center gap-2">
                        <div className="p-4 bg-muted rounded-full">
                            <Upload className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold text-lg">Upload Documents</h3>
                        <p className="text-sm text-muted-foreground">
                            Drag & drop or click to upload invoices, receipts, or contracts.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <File className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium text-sm">{currentFile.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {(currentFile.size / 1024).toFixed(2)} KB
                                </p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setCurrentFile(null)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                </div>
            )}
        </div>
    );
}
