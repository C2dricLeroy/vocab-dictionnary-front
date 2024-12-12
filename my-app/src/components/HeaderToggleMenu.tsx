'use client';

import { Button } from "@/components/ui/button";
import {Link} from "@/i18n/routing";
import {useTranslations} from 'next-intl';
import { ModeToggle } from "@/components/Modetoggle";

export default function HeaderToggleMenu(context: any) {

    const t = useTranslations('WelcomeHeader');

    return (
        <div className="flex flex-col mt-4 space-y-4 items-center">
            <Button size="sm" variant="outline" className="w-3/4 h-[50px]">
                {/* @ts-expect-error on Link href*/}
                <Link href="/pricing">{t("Pricing")}</Link>
            </Button>
            <Button size="sm" variant="outline" className="w-3/4 h-[50px]">
                {/* @ts-expect-error on Link href*/}
                <Link href="/about">{t("About")}</Link>
            </Button>
            {context.isAuthenticated ? (
                <Button size="sm" onClick={context.logout} className="w-3/4 h-[50px]">
                    {t("Logout")}
                </Button>
            ) : (
                <Button size="sm" className="w-3/4 h-[50px]">
                    {/* @ts-expect-error on Link href*/}
                    <Link href="/signin">{t("Login")}</Link>
                </Button>
            )}
            <ModeToggle />
        </div>
    );
}