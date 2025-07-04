import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from '@/i18n/navigation';
import { useSession } from "next-auth/react";

export const DashboardProfile: React.FC = () => {

    const t = useTranslations("Dashboard");

    const { data: session } = useSession();



    return (
        <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
                <div className="text-xl font-bold text-gray-800 dark:text-white">Profil</div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <p className="text-gray-800 dark:text-white">{t('Name')} : {session?.user?.name ?? "Inconnu"}</p>
                    <p className="text-gray-800 dark:text-white">{t('Email')} : {session?.user?.email ?? "Inconnu"}</p>
                    <Button variant="default">
                        <Link href="/profile">{t("Modify Profile")}</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};