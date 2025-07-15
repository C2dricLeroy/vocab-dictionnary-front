import { Dictionary } from "@/models/Dictionary";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useDictionaries() {
    const [dictionaries, setDictionaries] = useState<Dictionary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const session = useSession();

    useEffect(() => {
        const fetchDictionaries = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/dictionary/`, {
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${session?.accessToken}`,
                    },
                });
                if (!res.ok) throw new Error("Failed to fetch dictionaries");
                const data = await res.json();
                setDictionaries(data);
            } catch (e) {
                setError(e as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchDictionaries();
    }, []);

    return { dictionaries, setDictionaries, loading, error };
}