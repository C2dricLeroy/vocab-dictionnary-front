"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import {
    useWordsOverTimeChart,
    TimeGranularity,
} from "@/hooks/stats/useWordsOvertTimeChart";


const CHART_COLORS = [
    "#2563eb", 
    "#16a34a",
    "#dc2626",
    "#9333ea",
    "#ea580c",
    "#0891b2",
    "#4f46e5",
];


export const DashboardStatistics: React.FC = () => {
    const t = useTranslations("Dashboard");
    const { data: session } = useSession();
    const [granularity, setGranularity] =
        useState<TimeGranularity>("day");

    const [statistics, setStatistics] = useState<{
            // eslint-disable-line
            totalWordsAdded: number;
            totalDictionaries: number;
        } | null>(null);

    const { data, isLoading, isError } =
        useWordsOverTimeChart(session, granularity);

        const fetchStatistics = useCallback(async () => {
            try {
                const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/statistics/user`;
                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch statistics");
                }
                const data = await response.json();
                setStatistics({
                    totalDictionaries: data.number_of_dictionaries,
                    totalWordsAdded: data.total_words_added,
                });
                } catch (error) {
                    console.error(error);
                }
        }, []);

    useEffect(() => {
        fetchStatistics();
    }, [fetchStatistics]);

    if (!session) return null;

    return (
        <Card className="bg-white dark:bg-gray-800">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xl font-bold text-gray-800 dark:text-white">
                    {t("Statistics")}
                </div>

                {/* Granularity selector */}
                <div className="flex gap-2 mt-2 sm:mt-0">
                    {(["day", "week", "month"] as TimeGranularity[]).map((g) => (
                        <button
                            key={g}
                            onClick={() => setGranularity(g)}
                            className={`px-3 py-1 rounded text-sm
                                ${
                                    granularity === g
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                                }`}
                        >
                            {g}
                        </button>
                    ))}
                </div>
            </CardHeader>

            <CardContent>
                {isLoading && <div>Loading chart…</div>}
                {isError && <div>Error loading statistics</div>}

                {data && (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data.data}>
                            <XAxis dataKey="date" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            {data.series.map((s: any, index: number) => (
                                <Line
                                    key={s.key}
                                    dataKey={s.key}
                                    name={s.label}
                                    type="monotone"
                                    stroke={CHART_COLORS[index % CHART_COLORS.length]}
                                    strokeWidth={2}
                                    dot={false}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                )}

                    <div className="space-y-4">
                        <p className="text-gray-800 dark:text-white">
                            {t("total words added")} : <span className="font-bold">{statistics?.totalWordsAdded}</span>
                        </p>
                        <p className="text-gray-800 dark:text-white">
                            {t("total dictionaries")} : <span className="font-bold">{statistics?.totalDictionaries}</span>
                        </p>
                        <p>{t("words added this month")} : <span className="font-bold">{statistics?.wordsAddedThisMonth}</span></p>
                </div>
            </CardContent>
        </Card>
    );
};

