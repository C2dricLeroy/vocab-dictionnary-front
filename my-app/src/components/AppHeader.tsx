"use client";

import { ModeToggle } from "@/components/Modetoggle";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "@/i18n/navigation";



export default function AppHeader() {
    const router = useRouter();

    const handleLogout = async () => {
        await signOut({ redirect: false }); 
        
        router.push("/signin"); 
    };

    return (
        <header className="bg-gray-100 dark:bg-gray-800 py-4 px-8 flex items-center justify-between shadow-md w-full">
            <Logo logoSrc="/logo.png" altText="Lexit Logo" variant="default" variantSize="lg" />
            <div className="ml-auto flex space-x-4 pr-8">
                <ModeToggle />
                <Button variant="default" onClick={() => handleLogout()}>
                    Logout
                </Button>
            </div>
        </header>
    );
}
