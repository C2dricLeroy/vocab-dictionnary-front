import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const DashboardStatistics: React.FC = () => {
    return (
        <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
                <div className="text-xl font-bold text-gray-800 dark:text-white">Statistiques</div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <p>Nombre total de mots : <span className="font-bold">500</span></p>
                    <p>Mots appris ce mois-ci : <span className="font-bold">50</span></p>
                    <p>Progrès moyen : <span className="font-bold">75%</span></p>
                </div>
            </CardContent>
        </Card>
    );
};