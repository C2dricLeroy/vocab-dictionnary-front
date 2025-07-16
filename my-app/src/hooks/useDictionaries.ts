import { useQuery } from '@tanstack/react-query';

export function useDictionaries(session: any) {
    return useQuery({
        queryKey: ['dictionaries', session?.accessToken],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/dictionary`, {
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            });
            if (!res.ok) throw new Error("Failed to fetch dictionaries");
            return res.json();
        },
        staleTime: 5 * 60 * 1000,
    });
}
