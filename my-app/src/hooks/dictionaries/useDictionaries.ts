import { useQuery } from '@tanstack/react-query';

export function useDictionaries(session: any) {
    useQuery(['todos'], () => fetch('/api/todos'));
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


export function useOneDictionary(session: any, dictionaryId?: string) {
    return useQuery({
        queryKey: ['dictionary', session?.accessToken, dictionaryId],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/dictionary/${dictionaryId}`, {
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            });
            if (!res.ok) throw new Error("Failed to fetch dictionary");
            return res.json();
        },
        enabled: !!session?.accessToken && !!dictionaryId,
        staleTime: 5 * 60 * 1000,
    });
}