import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateDictionaryPayload {
    name: string;
    description: string;
}

export function useUpdateDictionary(session: any, dictionaryId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newDict: UpdateDictionaryPayload) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/dictionary/${dictionaryId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.accessToken}`,
                },
                body: JSON.stringify(newDict),
            });
            if (!res.ok) throw new Error("Failed to update dictionary");
            return res.json();
        },
        onSuccess: (data) => {
            queryClient.setQueryData<any[]>(["dictionaries", session.accessToken], (old = []) =>
                old.map((dict) => (dict.id === data.id ? data : dict))
            );
        },
        onError: (error) => {
            console.error("Error during dictionary update:", error);
            alert(error.message);
        },
    });
}
