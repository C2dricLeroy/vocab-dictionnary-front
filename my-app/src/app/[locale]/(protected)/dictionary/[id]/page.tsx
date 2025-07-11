'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import QuickAddEntry from "@/components/ui/dictionary/QuickAddEntry";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/footer";
import DictionaryTable from "@/components/dictionary/DictionaryTable";
import DictionaryOverview from "@/components/dictionary/DictionaryOverview";

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
        <div className="flex flex-col min-h-screen bg-muted/40">
            <AppHeader />

            <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-8 space-y-8">
                <div className="text-sm text-muted-foreground mb-2">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="hover:underline"
                    >
                        ← Retour au tableau de bord
                    </button>
                </div>

                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        📘 {dictionary.name}
                    </h1>
                    {dictionary.description && (
                        <p className="text-muted-foreground mt-1">{dictionary.description}</p>
                    )}
                </div>

                <DictionaryOverview dictionary={dictionary} />


                <section className="space-y-4">
                    <QuickAddEntry dictionaryId={dictionary.id} />
                    <DictionaryTable dictionaryId={dictionary.id} />
                </section>

                <div className="text-center pt-6">
                    <button disabled className="text-sm text-gray-400 hover:text-gray-500">
                        📖 Réviser ce dictionnaire (bientôt)
                    </button>
                </div>


            </main>

            <footer className="bg-gray-100 dark:bg-gray-800">
                <Footer />
            </footer>
        </div>
    );
}
