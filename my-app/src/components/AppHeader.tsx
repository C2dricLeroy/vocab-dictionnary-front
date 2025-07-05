'use client';

import { ModeToggle } from "@/components/Modetoggle";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function AppHeader() {
    return (
        <header className="bg-gray-100 dark:bg-gray-800 py-4 px-8 flex items-center justify-between shadow-md w-full">
            <Logo
                logoSrc="/logo.png"
                altText="Lexit Logo"
                variant="default"
                variantSize="lg"
            />
            <div className="ml-auto flex space-x-4 pr-8">
                <ModeToggle />
                <Button
                    variant="default"
                    onClick={() => signOut({ callbackUrl: "/signin" })}
                >
                    Logout
                </Button>
            </div>
        </header>
    );
}
