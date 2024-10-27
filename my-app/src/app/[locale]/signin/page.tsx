'use client';

import {ModeToggle} from "@/components/Modetoggle";
import SigninComponent from "@/components/SigninComponent";
import {Logo} from "@/components/ui/logo";
import Footer from "@/components/footer";
import useAuth from "@/utils/context/AuthContext";
import {useRouter} from '@/i18n/routing';
export default function Signin() {
    const router = useRouter();
    const context = useAuth();

    if (context.isAuthenticated) {
        router.push('/dashboard');
    }
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-gray-100 dark:bg-gray-800 py-4 px-8 flex items-center justify-between shadow-md w-full">
                <Logo
                    logoSrc="/logo.png"
                    altText="LexiLearn Logo"
                    variant="default"
                    variantSize="lg"
                />

                <div className="ml-auto flex space-x-4 pr-8">
                    <ModeToggle/>
                </div>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center px-4">
                <SigninComponent/>
            </main>


            <footer className="w-full">
                <Footer />
            </footer>

        </div>
    );
}