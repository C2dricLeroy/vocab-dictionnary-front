'use client';

import { Button } from "@/components/ui/button";
import {Link} from '@/i18n/navigation';
import {useTranslations} from 'next-intl';
import { ModeToggle } from "@/components/Modetoggle";

export default function HeaderToggleMenu() {

    const t = useTranslations('WelcomeHeader');

    return (
        <div className="flex flex-col mt-4 space-y-4 items-center">
            <Button size="sm" variant="outline" className="w-3/4 h-[50px]">
                <Link href="/pricing">{t("Pricing")}</Link>
            </Button>
            <Button size="sm" variant="outline" className="w-3/4 h-[50px]">
                <Link href="/about">{t("About")}</Link>
            </Button>
            
            <Button size="sm" className="w-3/4 h-[50px]">
                <Link href="/signin">{t("Login")}</Link>
            </Button>
            <ModeToggle />
        </div>
    );
}