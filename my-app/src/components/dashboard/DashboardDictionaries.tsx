import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {Link} from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface Dictionary {
    id: number;
    name: string;
}

interface DictionariesProps {
    dictionaries: Dictionary[];
}

export const DashboardDictionaries: React.FC<DictionariesProps> = ({ dictionaries }) => {
    const t = useTranslations("Dashboard");
    if (!dictionaries || dictionaries.length === 0) {
        return (
            <Card className="bg-white dark:bg-gray-800 h-full">
            <CardHeader>
                <div className="text-xl font-bold text-gray-800 dark:text-white">{t('My dictionaries')}</div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <p>{t('Total dictionaries')}: <span className="font-bold">{dictionaries.length}</span></p>
                    <div className="max-h-60 overflow-y-auto">
                        <p>{t('No dictionary available')}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
        );
    }

    return (
        <Card className="bg-white dark:bg-gray-800 h-full">
            <CardHeader>
                <div className="text-xl font-bold text-gray-800 dark:text-white">{t('My dictionaries')}</div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <p>{t('Total dictionaries')}: {dictionaries.length}</p>
                    <div className="max-h-60 overflow-y-auto">
                        <ul>
                            {dictionaries.map((dictionary) => (
                                <li key={dictionary.id} className="mb-2">
                                    <Link
                                        href={`/dictionary/${dictionary.id}`}
                                        className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500"
                                    >
                                        {dictionary.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
