'use client';

import Footer from "@/components/footer";
import {DashboardDictionaries} from "@/components/dashboard/DashboardDictionaries";
import {DashboardProfile} from "@/components/dashboard/DashboardProfile";
import {DashboardStatistics} from "@/components/dashboard/DashboardStatistics";
import {DashboardFavorites} from "@/components/dashboard/DashboardFavorites";
import {DashboardActivities} from "@/components/dashboard/DashboardActivities";
import AppHeader from "@/components/AppHeader";
import {useState, useEffect} from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function DashboardClient() {
    const { data: session } = useSession();
    const [dictionaries, setDictionaries] = useState<any[]>([]);

    useEffect(() => {
    if (!session?.accessToken) return;
    const fetchDictionaries = async () => {
        const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/user/dictionary";
        const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
        },
    });
        const data = await response.json();
        setDictionaries(data);
    };

    fetchDictionaries();
  }, [session]);

    // if (!session) {
    //     redirect("/signin");
    // }

    return (
        <div className="bg-gray-100 text-white min-h-screen dark:bg-gray-900">
            <AppHeader/>

            <div className="flex">
                <div className="w-full p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-6">
                    <div className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 shadow-md rounded-lg">
                        <DashboardDictionaries dictionaries={dictionaries} />
                    </div>

                    <div className="col-span-1 sm:col-span-1 lg:col-span-2 row-span-1 bg-white shadow-md rounded-lg">
                        <DashboardProfile />
                    </div>

                    <div className="col-span-1 sm:col-span-1 lg:col-span-1 row-span-1 shadow-md rounded-lg">
                        <DashboardStatistics />
                    </div>

                    <div className="col-span-1 sm:col-span-1 lg:col-span-1 row-span-1 shadow-md rounded-lg">
                        <DashboardFavorites />
                    </div>
                </div>
                <div className="shadow-md rounded-lg">
                    <DashboardActivities/>
                </div>
                </div>
            </div>

            <footer className="bg-gray-100 dark:bg-gray-800 text-center">
                <Footer />
            </footer>
        </div>
    );
}
