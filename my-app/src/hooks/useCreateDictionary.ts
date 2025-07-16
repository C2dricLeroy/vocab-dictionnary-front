import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateDictionary(session: any) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newDict: { name: string; language_code: string }) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/dictionary`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.accessToken}`,
            },
            body: JSON.stringify(newDict),
        });
        if (!res.ok) throw new Error("Failed to create dictionary");
        return res.json();
        },
        onSuccess: (data) => {
            queryClient.setQueryData<any[]>(['dictionaries', session.accessToken], (old = []) => [...old, data]);
        },
        onError: (error) => {
            console.error("Error during dictionary creation:", error);
            alert(error.message);
        },
    });
}
