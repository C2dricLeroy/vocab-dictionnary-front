import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {Link} from '@/i18n/navigation';
import { useTranslations } from "next-intl";
import { AddDictionaryModal } from "@/components/AddDictionaryModal";
import { Button } from "@/components/ui/button";
import { Language } from "@/models/Language";
import { AddDictionaryFormData } from "@/models/AddDictionaryFormType";

interface Dictionary {
    id: number;
    name: string;
}

interface DictionariesProps {
    dictionaries: Dictionary[];
}

export const DashboardDictionaries: React.FC<DictionariesProps> = ({ dictionaries }) => {
    const t = useTranslations("Dashboard");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleModalSubmit = (data: AddDictionaryFormData) => {
        if (!data.sourceLanguage) {
            console.warn("Missing source language");
            return;
        }
        console.log("Submitted data:", data);
        closeModal();
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
                            <span className="font-semibold">{dictionaries.length}</span>
                        </p>

                        {dictionaries.length === 0 ? (
                            <p className="italic text-gray-500">{t("No dictionary available")}</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-80 overflow-y-auto pr-2">
                                {dictionaries.map((dictionary) => (
                                    <Link key={dictionary.id} href={`/dictionary/${dictionary.id}`}>
                                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800">
                                            <h3 className="text-md font-medium text-blue-700 dark:text-blue-300 truncate">
                                                {dictionary.name}
                                            </h3>
                                            {/* <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {dictionary.source_language} → {dictionary.target_language}
                                            </p> */}
                                        </div>
                                    </Link>
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