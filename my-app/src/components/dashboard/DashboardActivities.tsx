import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const DashboardActivities: React.FC = () => {
    return (
        <Card className='p-6 bg-white dark:bg-gray-800'>
            <CardHeader>
                <div className="text-xl text-gray-800 dark:text-white">Activité récente</div>
            </CardHeader>
            <CardContent>
                <table className="min-w-full text-sm text-gray-800 dark:text-white">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-2">Mot</th>
                            <th className="text-left py-2">Traduction</th>
                            <th className="text-left py-2">Langue</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="py-2">Bonjour</td>
                            <td className="py-2">Hello</td>
                            <td className="py-2">Français</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2">Chat</td>
                            <td className="py-2">Cat</td>
                            <td className="py-2">Français</td>
                        </tr>
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
};