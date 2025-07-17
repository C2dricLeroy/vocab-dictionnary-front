import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Language } from "@/models/Language";
import { LanguageSelector } from "@/components/LanguageSelector";
import { FormEvent, useState } from "react";
import { AddDictionaryFormData } from "@/models/AddDictionaryFormType";
import { Input } from "./ui/input";

interface AddDictionaryModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: AddDictionaryFormData) => void; // eslint-disable-line
    loading?: boolean;
    error?: string | null;
}

export function AddDictionaryModal({
    open,
    onClose,
    onSubmit,
    loading = false,
    error = null,
}: AddDictionaryModalProps) {
    const [name, setName] = useState("");
    const [sourceLanguage, setSourceLanguage] = useState<Language | null>(null);
    const [targetLanguage, setTargetLanguage] = useState<Language | null>(null);
    const [description, setDescription] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({ name, description, sourceLanguage, targetLanguage });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg bg-white">
                <DialogHeader>
                    <DialogTitle>Add Dictionary</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant="default"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description
                        </label>
                        <Input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            variant="default"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Source Language
                        </label>
                        <LanguageSelector
                            selected={sourceLanguage}
                            onChange={setSourceLanguage}
                            placeholder="Select source language"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Target Language
                        </label>
                        <LanguageSelector
                            selected={targetLanguage}
                            onChange={setTargetLanguage}
                            placeholder="Select source language"
                        />
                    </div>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <DialogFooter className="pt-2 flex justify-between">
                        <Button type="submit" disabled={loading}>
                            {loading ? "Adding..." : "Add"}
                        </Button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
                        >
                            Cancel
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
