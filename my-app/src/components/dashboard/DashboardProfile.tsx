import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from '@/i18n/navigation';
import useAuth from "@/utils/context/AuthContext";

export const DashboardProfile: React.FC = () => {

    const t = useTranslations("Dashboard");

    const { user } = useAuth();

    return (
        <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
                <div className="text-xl font-bold text-gray-800 dark:text-white">Profil</div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <p>{t('Name')} : {user?.name ?? "Inconnu"}</p>
                    <p>{t('Email')} : {user?.email ?? "Inconnu"}</p>
                    <Button variant="default">
                        {/* @ts-expect-error on Link href*/}
                        <Link href="/profile">{t("Modify Profile")}</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};