import { useQuery } from "@tanstack/react-query";

export type TimeGranularity = "day" | "week" | "month";

export function useWordsOverTimeChart(
    session: any,
    granularity: TimeGranularity
) {
    return useQuery({
        queryKey: ["words-over-time-chart", granularity, session?.accessToken],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/statistics/words-over-time/chart?granularity=${granularity}`,
                {
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                }
            );

            if (!res.ok) {
                throw new Error("Failed to fetch words over time chart");
            }

            return res.json();
        },
        enabled: !!session?.accessToken,
        staleTime: 5 * 60 * 1000,
        // keepPreviousData: true,
    });
}
