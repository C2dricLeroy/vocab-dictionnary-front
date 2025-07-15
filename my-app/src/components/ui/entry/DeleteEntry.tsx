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

interface DeleteEntryProps {
    entryId: number;
    onDeleted?: (id: number) => void;  // eslint-disable-line
}

export default function DeleteEntry({ entryId, onDeleted }: DeleteEntryProps) {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async () => {

        setLoading(true);
        try {
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/entry/${entryId}`;
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete entry");

            }

            onDeleted?.(entryId);
            setShowModal(false);
        } catch (err) {
            console.error(err);
            alert("Could not delete entry.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowModal(true)}
                disabled={loading}
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
          This action cannot be undone. The entry will be permanently deleted.
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