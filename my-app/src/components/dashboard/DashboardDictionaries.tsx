'use client';

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from '@/i18n/navigation';
import { useTranslations } from "next-intl";
import { AddDictionaryModal } from "@/components/AddDictionaryModal";
import { Button } from "@/components/ui/button";
import { AddDictionaryFormData } from "@/models/AddDictionaryFormType";
import DeleteDictionary from "@/components/ui/dictionary/DeleteDictionary";
import UpdateDictionary from "@/components/ui/dictionary/UpdateDictionary";
import QuickAddEntry from "@/components/ui/dictionary/QuickAddEntry";
import { useSession } from "next-auth/react";
import { useDictionaries } from "@/hooks/dictionaries/useDictionaries";
import { useCreateDictionary } from "@/hooks/dictionaries/useCreateDictionary";

interface Dictionary {
  id: number;
  name: string;
  description: string;
}

export const DashboardDictionaries: React.FC = () => {
    const t = useTranslations("Dashboard");
    const { data: session } = useSession();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        data: dictionaries = [],
        isLoading,
        isError,
        refetch,
    } = useDictionaries(session);

    const { mutate: createDictionary } = useCreateDictionary(session);

    const handleModalSubmit = (data: AddDictionaryFormData) => {
        if (!data.name || !data.sourceLanguage || !data.targetLanguage) return;

        createDictionary(
        {
            name: data.name,
            description: data.description,
            source_language_id: data.sourceLanguage.id,
            target_language_id: data.targetLanguage.id,
        },
        {
            onSuccess: () => {
            refetch();
            },
        }
        );

        setIsModalOpen(false);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (!session) return null;
    if (isLoading) return <div>Loading dictionaries...</div>;
    if (isError) return <div>Error loading dictionaries</div>;

    return (
        <>
        <Card className="bg-white dark:bg-gray-800 h-full">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xl font-bold text-gray-800 dark:text-white">
                {t("My dictionaries")}
            </div>
            <Button variant="default" onClick={openModal}>
                {t("Add dictionary")}
            </Button>
            </CardHeader>
            <CardContent>
            <div className="text-gray-800 dark:text-white space-y-4">
                <p>
                {t("Total dictionaries")}:{" "}
                <span className="font-semibold">{dictionaries.length}</span>
                </p>

                {dictionaries.length === 0 ? (
                <p className="italic text-gray-500">{t("No dictionary available")}</p>
                ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-80 overflow-y-auto pr-2">
                    {dictionaries.map((dictionary: Dictionary) => (
                    <div
                        key={dictionary.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <div className="flex justify-between items-center mb-2">
                        <Link href={`/dictionary/${dictionary.id}`}>
                            <h3 className="text-md font-medium text-blue-700 dark:text-blue-300 truncate">
                            {dictionary.name}
                            </h3>
                        </Link>
                        <div className="flex justify-end">
                            <UpdateDictionary
                            dictionaryId={dictionary.id}
                            initialName={dictionary.name}
                            initialDescription={dictionary.description}
                            onUpdated={(id, name, description) => {
                                // Tu peux aussi utiliser refetch ici si tu veux forcer le refresh
                            }}
                            />
                            <QuickAddEntry dictionaryId={dictionary.id} />
                            <DeleteDictionary
                            dictionaryId={dictionary.id}
                            onDeleted={() => {
                                refetch();
                            }}
                            />
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                )}
            </div>
            </CardContent>
        </Card>
        <AddDictionaryModal
            open={isModalOpen}
            onClose={closeModal}
            onSubmit={handleModalSubmit}
        />
        </>
    );
};
