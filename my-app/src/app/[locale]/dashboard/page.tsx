'use client';

import { ModeToggle } from "@/components/Modetoggle";
import { Logo } from "@/components/ui/logo";
import Footer from "@/components/footer";
import WelcomeSection from "@/components/WelcomeSection";
import LanguageFilter from "@/components/LanguageFilter";
import { AddDictionnaryModal } from "@/components/AddDictionnaryModal";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {useTranslations} from "next-intl";
import {Dictionary} from "@/components/Dictionary";

class Language {
    // TODO: refactor to add different models
    constructor(id: number) {
        this.id = id;
    }
    id: number;
}

export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
    const [dictionaryData, setDictionaryData] = useState<any | null>(null);

    const t = useTranslations('Dashboard');

    const fetchDictionaryData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/dictionary/${selectedLanguage?.id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: Unable to fetch dictionary data`);
            }

            const data = await response.json();
            setDictionaryData(data);
        } catch (error) {
            console.error("Failed to fetch dictionary data:", error);
        }
    };

    useEffect(() => {
        if (selectedLanguage) {
            fetchDictionaryData(selectedLanguage);
        }
    }, [selectedLanguage]); // eslint-disable-line

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-gray-100 dark:bg-gray-800 py-4 px-8 flex items-center justify-between shadow-md w-full">
                <Logo
                    logoSrc="/logo.png"
                    altText="LexiLearn Logo"
                    variant="default"
                    variantSize="lg"
                />

                <div className="ml-auto flex space-x-4 pr-8">
                    <ModeToggle />
                </div>
            </header>

            <main className="flex-grow flex flex-col justify-top px-4">
                <WelcomeSection />
                <div className="flex items-center space-x-2 mt-4">
                    <LanguageFilter onSelectLanguage={(language: Language | null) => setSelectedLanguage(language)} />
                    <Button
                        variant="neumorphism"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add Dictionary
                    </Button>
                </div>

                <div id="dictionary" className="mt-4 space-y-4 flex-grow overflow-y-auto overflow-x-hidden pr-4 pb-4 scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800">
                    {dictionaryData ? (
                        <Dictionary dictionaryData={dictionaryData} />
                    ) : (
                        <p>{selectedLanguage ? t("No data found for this language") : t("Select a language to view dictionary data")}</p>
                    )}
                </div>

                <AddDictionnaryModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </main>

            <footer className="w-full">
                <Footer />
            </footer>
        </div>
    );
}
