'use client';

import { Pencil } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface UpdateDictionaryProps {
    dictionaryId: number;
    initialName: string;
    initialDescription: string;
    onUpdated?: (id: number, name: string, description: string) => void; // eslint-disable-line
}

export default function UpdateDictionary({
    dictionaryId,
    initialName,
    initialDescription,
    onUpdated,
}: UpdateDictionaryProps) {
    const { data: session } = useSession();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState(initialName);
    const [description, setDescription] = useState(initialDescription);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/dictionary/${dictionaryId}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.accessToken}`,
                },
                body: JSON.stringify({ name, description }),
            });

            if (!response.ok) {
                throw new Error('Failed to update dictionary');
            }

            onUpdated?.(dictionaryId, name, description);
            setShowModal(false);
        } catch (err) {
            console.error(err);
            alert('Could not update dictionary.');
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
                className="text-black hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
            >
                <Pencil className="w-5 h-5" />
            </Button>

            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent className="bg-white sm:max-w-md w-[90vw] max-w-[500px] rounded-xl shadow-xl z-50">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">Update dictionary</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name
                        </label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Dictionary name"
                        />
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description
                        </label>
                        <Textarea
                            value={description}
                            onChange={(e: any) => setDescription(e.target.value)}
                            placeholder="Short description"
                        />
                    </div>

                    <DialogFooter className="mt-4 flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUpdate}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={loading}
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
