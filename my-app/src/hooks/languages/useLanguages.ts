import { useQuery } from "@tanstack/react-query";

export function useLanguages() {
    return useQuery({
        queryKey: ["languages"],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/language`, {
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to fetch languages");
            return res.json();
        },
        staleTime: 60 * 60 * 1000,
    });
}
