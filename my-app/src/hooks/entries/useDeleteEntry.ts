import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteEntry(session: any) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (entryId: number) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/entry/${entryId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            });
            if (!res.ok) throw new Error("Failed to delete entry");
            return entryId;
        },
        onSuccess: (deletedId) => {
            queryClient.setQueryData<any[]>(['entries', session.accessToken], (old = []) =>
                old ? old.filter(dict => dict.id !== deletedId) : []
            );
        },
        onError: (error) => {
            console.error("Error deleting entry:", error);
            alert(error.message);
        },
    });
}