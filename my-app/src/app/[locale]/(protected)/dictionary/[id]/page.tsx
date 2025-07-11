'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import DictionaryMeta from "@/components/dictionary/DictionaryMeta";
import DictionaryStats from "@/components/dictionary/DictionaryStats";
import QuickAddEntry from "@/components/ui/dictionary/QuickAddEntry";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/footer";

export default function DictionaryClientPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const [dictionary, setDictionary] = useState<any>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!id || !session?.accessToken) return;

        const fetchDictionary = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/dictionary/${Number(id)}`,
                    {
                        headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                        "Content-Type": "application/json",
                        },
                    }
                );

                if (!res.ok) throw new Error("Not found");

                const data = await res.json();
                setDictionary(data);
            } catch (err) {
                setError(true);
            }
        };
    fetchDictionary();
    }, [id, session]);

    if (error) {
        return <p className="text-center text-red-500 mt-10">Dictionnaire introuvable.</p>;
    }

    if (!dictionary) {
        return <p className="text-center text-gray-500 mt-10">Chargement du dictionnaire...</p>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <AppHeader />

            <div className="max-w-7xl mx-auto p-4">
            <button
                onClick={() => router.push('/dashboard')}
                className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
                aria-label="Retour au dashboard"
            >
            <span className="mr-2 text-2xl">←</span>
                Retour
            </button>
            </div>

            <main className="flex-grow max-w-7xl mx-auto p-6">
            <div className="flex gap-x-6">
                <div className="flex-1 bg-white p-4 rounded shadow">
                <DictionaryMeta dictionary={dictionary} />
                </div>
                <div className="flex-1 bg-white p-4 rounded shadow">
                <DictionaryStats dictionary={dictionary} />
                </div>
                <div className="flex-1 bg-white p-4 rounded shadow">
                <QuickAddEntry dictionaryId={dictionary.id} />
                </div>
            </div>

            <div className="text-center mt-12">
                <button disabled className="text-sm text-gray-400 hover:text-gray-500">
                📖 Réviser ce dictionnaire (bientôt)
                </button>
            </div>
            </main>

            <footer className="bg-gray-100 dark:bg-gray-800 text-center">
                <Footer />
            </footer>
        </div>
    );
}
