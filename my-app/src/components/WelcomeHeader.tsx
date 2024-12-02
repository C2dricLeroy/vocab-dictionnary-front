'use client';

import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/Modetoggle";
import {useTranslations} from 'next-intl';
import {Link} from "@/i18n/routing";
import useAuth from "@/utils/context/AuthContext";
import {useState} from "react";

export default function WelcomeHeader() {
    const context = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const t = useTranslations('WelcomeHeader');
    return (
        <div
            className={`bg-gray-100 dark:bg-gray-800 px-4 sm:px-8 py-4 shadow-md w-full transition-all duration-300 ${
                isMenuOpen ? "h-auto" : "h-16"
            }`}
        >
            <div className="flex flex-col items-center w-full">
                <div className="flex items-center justify-between w-full">
                    <Logo
                        logoSrc="/logo.png"
                        altText="LexiLearn Logo"
                        variant="default"
                        variantSize="lg"
                    />

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

                <div className="hidden md:flex mt-4 space-x-4">
                    <Button size="lg" variant="outline">
                        {/* @ts-expect-error on Link href*/}
                        <Link href="/pricing">{t('Pricing')}</Link>
                    </Button>
                    <Button size="lg" variant="outline">
                        {/* @ts-expect-error on Link href*/}
                        <Link href="/about">{t('About')}</Link>
                    </Button>
                    {context.isAuthenticated ? (
                        <Button size="lg" onClick={context.logout}>
                            {t('Logout')}
                        </Button>
                    ) : (
                        <Button size="lg">
                            {/* @ts-expect-error on Link href*/}
                            <Link href="/signin">{t('Login')}</Link>
                        </Button>
                    )}
                    <ModeToggle />
                </div>

                {isMenuOpen && (
                    <div className="flex flex-col mt-4 space-y-4 w-full items-center">
                        <Button size="lg" variant="outline" className="w-3/4">
                            {/* @ts-expect-error on Link href*/}
                            <Link href="/pricing">{t('Pricing')}</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="w-3/4">
                            {/* @ts-expect-error on Link href*/}
                            <Link href="/about">{t('About')}</Link>
                        </Button>
                        {context.isAuthenticated ? (
                            <Button size="lg" onClick={context.logout} className="w-3/4">
                                {t('Logout')}
                            </Button>
                        ) : (
                            <Button size="lg" className="w-3/4">
                                {/* @ts-expect-error on Link href*/}
                                <Link href="/signin">{t('Login')}</Link>
                            </Button>
                        )}
                        <ModeToggle />
                    </div>
                )}
            </div>
        </div>
    );
}
