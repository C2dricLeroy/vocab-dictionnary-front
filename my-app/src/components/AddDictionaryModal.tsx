import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Language } from "@/models/Language";
import { LanguageSelector } from "@/components/LanguageSelector";
import { FormEvent, useState } from "react";
import { AddDictionaryFormData } from "@/models/AddDictionaryFormType";

interface AddDictionaryModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AddDictionaryFormData) => void;
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
