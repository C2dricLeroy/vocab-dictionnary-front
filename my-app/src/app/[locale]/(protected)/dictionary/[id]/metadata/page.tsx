"use client";

import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import QuickAddEntry from "@/components/ui/dictionary/QuickAddEntry";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/footer";
import DictionaryTable from "@/components/dictionary/DictionaryTable";
import DictionaryOverview from "@/components/dictionary/DictionaryOverview";
import DeleteDictionary from "@/components/ui/dictionary/DeleteDictionary";
import { useTranslations } from "next-intl";
import { useOneDictionary } from "@/hooks/dictionaries/useDictionaries";
import DictionaryMetadata from "@/components/dictionary/DictionaryMetadata";

export default function DictionaryClientPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const t = useTranslations("Dashboard");

    const dictionaryId = Array.isArray(id) ? id[0] : id;

    const { data: dictionary, isLoading, isError, refetch } = useOneDictionary(session, dictionaryId);

    if (isLoading) {
        return <p className="text-center text-gray-500 mt-10">Chargement du dictionnaire...</p>;
    }

    if (isError || !dictionary) {
        return <p className="text-center text-red-500 mt-10">Dictionnaire introuvable.</p>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-muted/40">
            <AppHeader />

            <main className="grow max-w-6xl w-full mx-auto px-4 py-8 space-y-8">
                <div className="text-sm text-muted-foreground mb-2">
                    <button onClick={() => router.push("/dashboard")} className="hover:underline">
                        ← Retour au tableau de bord
                    </button>
                </div>

                <div>
                    <h1 className="text-3xl font-bold tracking-tight">📘 {dictionary.name}</h1>
                    {dictionary.description && <p className="text-muted-foreground mt-1">{dictionary.description}</p>}
                </div>


                <section className="space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight">Métadonnées du dictionnaire</h2>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-lg font-bold tracking-tight">Nom du dictionnaire</h3>
                            <p className="text-muted-foreground">{dictionary.name}</p>
                        </div>
                    </div>
                </section>

            </main>

            <footer className="bg-gray-100 dark:bg-gray-800">
                <Footer />
            </footer>
        </div>
    );
}
