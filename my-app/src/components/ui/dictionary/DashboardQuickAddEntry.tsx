"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateEntry } from "@/hooks/entries/useAddEntry";
import { useTranslations } from "next-intl";
import toast, { Toaster } from "react-hot-toast";

interface QuickAddEntryProps {
    dictionaryId: number;
    // eslint-disable-next-line no-unused-vars
    onAdded?: (id: number) => void;
}

export default function DashboardQuickAddEntry({ dictionaryId, onAdded }: QuickAddEntryProps) {
    const t = useTranslations("Dashboard");
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);

    const [originalName, setOriginalName] = useState("");
    const [translation, setTranslation] = useState("");
    const [description, setDescription] = useState("");
    const [isExpression, setIsExpression] = useState(false);

    const createEntryMutation = useCreateEntry(session);

    const resetForm = () => {
        setOriginalName("");
        setTranslation("");
        setDescription("");
        setIsExpression(false);
    };

    const handleSubmit = () => {
        if (!originalName || !translation) {
            alert("Original and translation fields are required.");
            return;
        }

        createEntryMutation.mutate(
            {
                original_name: originalName,
                translation,
                dictionary_id: dictionaryId,
                description,
                is_expression: isExpression,
            },
            {
                onSuccess: () => {
                    resetForm();
                    setOpen(false);
                    onAdded?.(dictionaryId);
                    toast.success(t("Entry created"))
                },
                onError: (error: Error) => {
                    toast.error(t("Failed to create entry"))
                },
            }
        );
    };

    return (
        <>
            <Toaster position="top-right"/>
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
                        <DialogTitle className="text-lg font-semibold">Add new entry</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Original
                            </label>
                            <Input
                                value={originalName}
                                onChange={(e) => setOriginalName(e.target.value)}
                                placeholder="e.g., Bonjour"
                                variant="default"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Translation
                            </label>
                            <Input
                                value={translation}
                                onChange={(e) => setTranslation(e.target.value)}
                                placeholder="e.g., Hello"
                                variant="default"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Description (Optional)
                            </label>
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="e.g., Formal greeting in French"
                            />
                        </div>

                        <div className="flex items-center justify-center">
                            <Button
                                variant={isExpression ? "default" : "outline"}
                                id="isExpression"
                                onClick={() => setIsExpression((prev) => !prev)}
                            >
                                {isExpression ? "Is an expression" : "Not an expression"}
                            </Button>
                        </div>
                    </div>

                    <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit}>{"Add Entry"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
