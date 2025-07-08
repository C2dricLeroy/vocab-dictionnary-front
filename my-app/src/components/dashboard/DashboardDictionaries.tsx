import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {Link} from '@/i18n/navigation';
import { useTranslations } from "next-intl";
import { AddDictionaryModal } from "@/components/AddDictionaryModal";
import { Button } from "@/components/ui/button";
import { Language } from "@/models/Language";
import { AddDictionaryFormData } from "@/models/AddDictionaryFormType";
import { useSession } from "next-auth/react";
import DeleteDictionary from "../ui/dictionary/DeleteDictionary";

interface Dictionary {
    id: number;
    name: string;
}

interface DictionariesProps {
    dictionaries: Dictionary[];
    onDictionaryCreated?: (newDict: Dictionary) => void;
}

export const DashboardDictionaries: React.FC<DictionariesProps> = (
    { dictionaries, onDictionaryCreated },
) => {
    const t = useTranslations("Dashboard");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: session } = useSession();
    const [localDictionaries, setDictionaries] = useState(dictionaries);


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
    setDictionaries(dictionaries);
  }, [dictionaries]);


    const handleModalSubmit = async (data: AddDictionaryFormData) => {
        if (!data.sourceLanguage || !data.targetLanguage ||!data.name) {
            console.warn("Missing data for creating a dictionary. Please fill at least Name, source language & targetLanguage.");
            return;
        }
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/dictionary", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    description: data.description,
                    source_language_id: data.sourceLanguage.id,
                    target_language_id: data.targetLanguage.id,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error response:", errorData);
                alert(`Failed to create dictionary: ${errorData.detail || response.statusText}`);
                return;
            }

            const created = await response.json();
            console.log("Dictionary created:", created);
            onDictionaryCreated?.(created);
            closeModal();
        } catch (error) {
            console.error("Error creating dictionary:", error);
            alert("An unexpected error occurred.");
        }
    };

    
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
                            <span className="font-semibold">{localDictionaries.length}</span>
                        </p>

                        {localDictionaries.length === 0 ? (
                            <p className="italic text-gray-500">{t("No dictionary available")}</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-80 overflow-y-auto pr-2">
                                {localDictionaries.map((dictionary) => (
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
                                        <DeleteDictionary 
                                            dictionaryId={dictionary.id} 
                                            onDeleted={(id) => setDictionaries(prev => prev.filter(d => d.id !== id))} 
                                        />
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
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                />
        </>
    );
};