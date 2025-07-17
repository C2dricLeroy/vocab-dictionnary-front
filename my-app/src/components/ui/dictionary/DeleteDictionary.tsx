'use client';

import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteDictionary } from "@/hooks/dictionaries/useDeletedictionary";

interface DeleteDictionaryProps {
    dictionaryId: number;
    onDeleted?: (id: number) => void;
}

export default function DeleteDictionary({ dictionaryId, onDeleted }: DeleteDictionaryProps) {
    const { data: session } = useSession();
    const [showModal, setShowModal] = useState(false);

    const deleteMutation = useDeleteDictionary(session);

    const handleDelete = async () => {
        deleteMutation.mutate(dictionaryId, {
            onSuccess: () => {
                onDeleted?.(dictionaryId);
                setShowModal(false);
            }
        });
    };

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowModal(true)}
                disabled={deleteMutation.isPending}
                className="text-black hover:text-red-600 dark:text-white dark:hover:text-red-400"
            >
                <Trash2 className="w-5 h-5" />
            </Button>

            <ConfirmDeleteModal
                open={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
            />
        </>
    );
}

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmDeleteModal({ open, onClose, onConfirm }: ConfirmDeleteModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-md w-[90vw] max-w-[400px] rounded-xl shadow-xl z-50">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Are you sure?</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-gray-700">
          This action cannot be undone. The dictionary will be permanently deleted.
        </div>
        <DialogFooter className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}