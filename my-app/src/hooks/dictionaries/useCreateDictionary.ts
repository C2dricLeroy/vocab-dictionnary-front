import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateDictionaryPayload {
    name: string;
    description?: string;
    source_language_id: number;
    target_language_id: number;
}

export function useCreateDictionary(session: any) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newDict: CreateDictionaryPayload) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/dictionary`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.accessToken}`,
                },
                body: JSON.stringify(newDict),
            });
            if (!res.ok) throw new Error("Failed to create dictionary");
            return res.json();
        },
        onSuccess: (data) => {
            queryClient.setQueryData<any[]>(["dictionaries", session.accessToken], (old = []) => [...old, data]);
        },
        onError: (error) => {
            console.error("Error during dictionary creation:", error);
        },
    });
}
