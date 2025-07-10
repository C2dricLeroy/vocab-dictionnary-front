'use client';

import { useState } from "react";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface QuickAddEntryProps {
    dictionaryId: number;
}

export default function QuickAddEntry({ dictionaryId }: QuickAddEntryProps) {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [originalName, setOriginalName] = useState('');
    const [translation, setTranslation] = useState('');
    const [description, setDescription] = useState('');
    const [isExpression, setIsExpression] = useState(false);

    const resetForm = () => {
        setOriginalName('');
        setTranslation('');
        setDescription('');
        setIsExpression(false);
    };

    const handleSubmit = async () => {
        if (!originalName || !translation) {
        alert("Original and translation fields are required.");
        return;
        }

        setLoading(true);

        try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/entry`, {
            method: "POST",
            headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            original_name: originalName,
            translation,
            dictionary_id: dictionaryId,
            description,
            is_expression: isExpression,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error response:", errorData);
            alert(`Failed to add entry: ${errorData.detail || response.statusText}`);
            return;
        }

        resetForm();
        setOpen(false);
        } catch (error) {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred.");
        } finally {
        setLoading(false);
        }
    };

    return (
        <>
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(true)}
            className="text-black hover:text-green-600 dark:text-white dark:hover:text-green-400"
        >
            <Plus className="w-5 h-5" />
        </Button>

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-white dark:bg-gray-900 sm:max-w-md w-[90vw] rounded-xl shadow-xl">
            <DialogHeader>
                <DialogTitle className="text-lg font-semibold">
                Add new entry
                </DialogTitle>
            </DialogHeader>

            <div className="space-y-3">
                <div>
                <Label>Original</Label>
                <Input
                    value={originalName}
                    onChange={(e) => setOriginalName(e.target.value)}
                    placeholder="e.g., Bonjour"
                />
                </div>

                <div>
                <Label>Translation</Label>
                <Input
                    value={translation}
                    onChange={(e) => setTranslation(e.target.value)}
                    placeholder="e.g., Hello"
                />
                </div>

                <div>
                <Label>Description (optional)</Label>
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., Formal greeting in French"
                />
                </div>

                <div className="flex items-center gap-2">
                <Switch
                    checked={isExpression}
                    onCheckedChange={setIsExpression}
                    id="isExpression"
                />
                <Label htmlFor="isExpression">This is an expression</Label>
                </div>
            </div>

            <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Saving..." : "Add Entry"}
                </Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
        </>
    );
}
