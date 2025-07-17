import { useQuery } from "@tanstack/react-query";

export function useEntries(session: any, dictionaryId: number) {
    return useQuery({
        queryKey: ["entries", session?.accessToken, dictionaryId],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/entry/dictionary/${dictionaryId}`, {
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            });
            if (!res.ok) throw new Error("Failed to fetch entries");
            return res.json();
        },
        enabled: !!session?.accessToken && !!dictionaryId,
        staleTime: 5 * 60 * 1000,
    });
}
