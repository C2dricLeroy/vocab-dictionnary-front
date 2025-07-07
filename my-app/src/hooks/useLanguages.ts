import { Language } from "@/models/Language";
import { useEffect, useState } from "react";

export function useLanguages() {
    const [languages, setLanguages] = useState<Language[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/language/`, {
                    credentials: "include",
                });
                if (!res.ok) throw new Error("Failed to fetch languages");
                const data = await res.json();
                setLanguages(data);
            } catch (e) {
                setError(e as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchLanguages();
    }, []);

    return { languages, loading, error };
}
