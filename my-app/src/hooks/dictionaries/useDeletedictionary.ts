import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteDictionary(session: any) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (dictionaryId: number) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/dictionary/${dictionaryId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            });
            if (!res.ok) throw new Error("Failed to delete dictionary");
            return dictionaryId;
        },
        onSuccess: (deletedId) => {
            queryClient.setQueryData<any[]>(['dictionaries', session.accessToken], (old = []) =>
                old ? old.filter(dict => dict.id !== deletedId) : []
            );
        },
        onError: (error) => {
            console.error("Error deleting dictionary:", error);
            alert(error.message);
        },
    });
}