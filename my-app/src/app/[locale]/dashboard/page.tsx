'use client';

import {ModeToggle} from "@/components/Modetoggle";
import {Logo} from "@/components/ui/logo";
import Footer from "@/components/footer";
import useAuth from "@/utils/context/AuthContext";
import {useRouter} from '@/i18n/routing';
import {DashboardDictionaries} from "@/components/dashboard/DashboardDictionaries";
import {DashboardProfile} from "@/components/dashboard/DashboardProfile";
import {DashboardStatistics} from "@/components/dashboard/DashboardStatistics";
import {DashboardFavorites} from "@/components/dashboard/DashboardFavorites";
import {DashboardActivities} from "@/components/dashboard/DashboardActivities";
import {useState, useEffect} from "react";

export default function Dashboard() {
    const router = useRouter();
    const authContext = useAuth();
    const [dictionaries, setDictionaries] = useState<any[]>([]);

    if (!authContext.isAuthenticated) {
        router.push('/signin');
    }

    const fetchDictionaries = async () => {
        const url = process.env.NEXT_PUBLIC_BASE_URL + '/api/dictionaries/';
        const response = await fetch(url, {
            credentials: 'include',
        });
        const data = await response.json();
        setDictionaries(data);
    };

    useEffect(() => {
        fetchDictionaries();
    }, []);

    return (
        <div className="bg-gray-100 text-white min-h-screen dark:bg-gray-900">
            <header className="bg-gray-100 dark:bg-gray-800 py-4 px-8 flex items-center justify-between shadow-md w-full">
                <Logo
                    logoSrc="/logo.png"
                    altText="LexiLearn Logo"
                    variant="default"
                    variantSize="lg"
                />
                <div className="ml-auto flex space-x-4 pr-8">
                    <ModeToggle />
                </div>
            </header>

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
