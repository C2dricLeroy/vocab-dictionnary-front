'use client';

import { ModeToggle } from "@/components/Modetoggle";
import { Logo } from "@/components/ui/logo";
import Footer from "@/components/footer";
import useAuth from "@/utils/context/AuthContext";
import { useRouter } from '@/i18n/routing';
import { DashboardDictionaries } from "@/components/DashboardDictionaries";
import { DashboardProfile } from "@/components/DashboardProfile";
import { DashboardStatistics } from "@/components/DashboardStatistics";
import { DashboardFavorites } from "@/components/DashboardFavorites";
import { DashboardActivities } from "@/components/DashboardActivities";

export default function Dashboard() {
    const router = useRouter();
    const authContext = useAuth();

    if (!authContext.isAuthenticated) {
        router.push('/signin');
    }

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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-6">

                        <DashboardDictionaries dictionaries={[]} />
                        <DashboardProfile />
                        <DashboardStatistics />
                        <DashboardFavorites />
                    </div>
                    <DashboardActivities />
                </div>
            </div>

            <footer className="bg-gray-100 dark:bg-gray-800 text-center">
                <Footer />
            </footer>
        </div>
    );
}
