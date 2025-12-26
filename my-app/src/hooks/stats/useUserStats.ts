import { useQuery } from "@tanstack/react-query";



export function useUserStats(
    session: any,
) {
    return useQuery({
        queryKey: ["userStats", session?.accessToken],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/statistics/user`,
                {
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    }
                }
            );

            if (!res.ok) {
                throw new Error("Failed to fetch user statistics");
            }


            const data = await res.json()

            return {
                totalWordsAdded: data.total_words_added,
                totalDictionaries: data.number_of_dictionaries,
            };
        },
        enabled: !!session?.accessToken,
        staleTime: 5*60*1000
    })
}