import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import useAuth from "@/utils/context/AuthContext";

export const DashboardStatistics: React.FC = () => {
    const t = useTranslations("Dashboard");
    const userId = useAuth().userId;

    const [statistics, setStatistics] = useState<{
        totalWordsAdded: number;
        wordsAddedThisMonth: number;
    } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchTotalWordsAdded = useCallback(async () => {
        try {
            const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/stats/user/${userId}/`;
            const response = await fetch(url, {
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error("Failed to fetch statistics");
            }

            const data = await response.json();
            setStatistics({
                totalWordsAdded: data.total_dictionaries,
                wordsAddedThisMonth: data.total_entries,
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchTotalWordsAdded();
    }, [fetchTotalWordsAdded]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
                <div className="text-xl font-bold text-gray-800 dark:text-white">Statistiques</div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <p>{t("total words added")} : <span className="font-bold">{statistics?.totalWordsAdded}</span></p>
                    <p>{t("words added this month")} : <span className="font-bold">{statistics?.wordsAddedThisMonth}</span></p>
                </div>
            </CardContent>
        </Card>
    );
};
