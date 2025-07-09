'use client';

import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/Modetoggle";
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {useState} from "react";
import HeaderToggleMenu from "@/components/HeaderToggleMenu";
import { LanguageSwitcher } from "./LangugageSwitcher";
import { useRouter } from "@/i18n/navigation";

import { useSession, signOut } from "next-auth/react";

export default function WelcomeHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const { data: session } = useSession();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const t = useTranslations('WelcomeHeader');

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push("/signin");
    };

    return (
        <div
            className={`bg-gray-100 dark:bg-gray-800 px-4 sm:px-8 py-4 shadow-md w-full transition-all duration-300 ${
                isMenuOpen ? "h-auto" : "h-16"
            }`}
        >
            <div className="flex items-center justify-between w-full">
                <Logo
                    logoSrc="/logo.png"
                    altText="Lexit Logo"
                    variant="default"
                    variantSize="lg"
                />

                <div className="hidden md:flex space-x-4 items-center">
                    <LanguageSwitcher/>
                    <Button size="lg" variant="outline">
                        <Link href="/pricing">{t("Pricing")}</Link>
                    </Button>
                    <Button size="lg" variant="outline">
                        <Link href="/about">{t("About")}</Link>
                    </Button>

            {session?.user ? (
                <Button size="lg" variant="default" onClick={handleLogout}>
                    {t("Logout")}
                </Button>
            ) : (
                <Button size="lg" variant="default">
                    <Link href="/signin">{t("Login")}</Link>
                </Button>
            )}
                    <ModeToggle />
                </div>

                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-700 dark:text-gray-300 focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="flex flex-col mt-4 space-y-4 w-full items-center">
                    <HeaderToggleMenu />
                </div>
            )}
        </div>
    );
}
