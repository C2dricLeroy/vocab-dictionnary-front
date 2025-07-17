'use client';

import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import QuickAddEntry from "@/components/ui/dictionary/QuickAddEntry";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/footer";
import DictionaryTable from "@/components/dictionary/DictionaryTable";
import DictionaryOverview from "@/components/dictionary/DictionaryOverview";
import DeleteDictionary from "@/components/ui/dictionary/DeleteDictionary";
import UpdateDictionary from "@/components/ui/dictionary/UpdateDictionary";
import { useTranslations } from "next-intl";
import { useOneDictionary } from "@/hooks/dictionaries/useDictionaries";

export default function DictionaryClientPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const t = useTranslations("Dashboard");

    const dictionaryId = Array.isArray(id) ? id[0] : id;

    const {
        data: dictionary,
        isLoading,
        isError,
        refetch
    } = useOneDictionary(session, dictionaryId);

    if (isLoading) {
        return <p className="text-center text-gray-500 mt-10">Chargement du dictionnaire...</p>;
    }

    if (isError || !dictionary) {
        return <p className="text-center text-red-500 mt-10">Dictionnaire introuvable.</p>;
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
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <UpdateDictionary
                            dictionaryId={dictionary.id}
                            initialName={dictionary.name}
                            initialDescription={dictionary.description}
                            onUpdated={(id, name, description) => {
                                refetch();
                            }}
                        />
                        <QuickAddEntry dictionaryId={dictionary.id} />
                        <DeleteDictionary
                            dictionaryId={dictionary.id}
                            onDeleted={() => router.push("/dashboard")}
                        />
                    </div>
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
