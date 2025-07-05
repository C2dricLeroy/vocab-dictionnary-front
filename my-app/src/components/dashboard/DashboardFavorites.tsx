import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const DashboardFavorites: React.FC = () => {
    return (
        <Card className="bg-white dark:bg-gray-800 h-full">
            <CardHeader>
                <div className="text-xl font-bold text-gray-800 dark:text-white">Favoris</div>
            </CardHeader>
            <CardContent>
                <ul>
                    <li>Dictionnaire favori 1</li>
                    <li>Dictionnaire favori 2</li>
                </ul>
            </CardContent>
        </Card>
    );
};