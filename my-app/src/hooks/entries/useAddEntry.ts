import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";

interface CreateEntryPayload {
    original_name: string;
    translation: string;
    dictionary_id: number;
    description?: string;
    is_expression: boolean;
}

export function useCreateEntry(session: any): UseMutationResult<any, Error, CreateEntryPayload, unknown> {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newEntry: CreateEntryPayload) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/entry`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.accessToken}`,
                },
                body: JSON.stringify(newEntry),
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.detail || "Failed to add entry");
            }
            return res.json();
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["entries", session?.accessToken, data.dictionary_id], (old: any[] = []) => [
                ...old,
                data,
            ]);
        },
    });
}
