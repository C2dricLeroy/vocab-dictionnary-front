import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const DashboardProfile: React.FC = () => {
    return (
        <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
                <div className="text-xl font-bold text-gray-800 dark:text-white">Profil</div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <p>Nom : John Doe</p>
                    <p>Email : john.doe@example.com</p>
                    <Button variant="default">Modifier Profil</Button>
                </div>
            </CardContent>
        </Card>
    );
};