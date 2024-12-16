import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

interface Dictionary {
    id: number;
    title: string;
}

interface DictionariesProps {
    dictionaries: Dictionary[];
}

export const DashboardDictionaries: React.FC<DictionariesProps> = ({ dictionaries }) => {
    if (!dictionaries || dictionaries.length === 0) {
        return (
            <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
                <div className="text-xl font-bold text-gray-800 dark:text-white">Mes Dictionnaires</div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <p>Total de dictionnaires : <span className="font-bold">{dictionaries.length}</span></p>
                    <div className="max-h-60 overflow-y-auto">
                        <p>Aucun dictionnaire disponible</p>
                    </div>
                </div>
            </CardContent>
        </Card>
        );
    }

    return (
        <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
                <div className="text-xl text-gray-800 dark:text-white">Mes Dictionnaires</div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <p>Total de dictionnaires : {dictionaries.length}</p>
                    <div className="max-h-60 overflow-y-auto">
                        <ul>
                            {dictionaries.map((dictionary) => (
                                <li key={dictionary.id} className="mb-2">
                                    <Link
                                        href={`/dictionary/${dictionary.id}`}
                                        className="text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-500"
                                    >
                                        {dictionary.title}
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
