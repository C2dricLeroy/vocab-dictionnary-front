'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
];

export function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const handleLanguageChange = (lang: string) => {
        router.replace(pathname, { locale: lang });
    };

    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Globe size={16} />
            {LANGUAGES.find((l) => l.code === locale)?.label ?? 'Language'}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            {LANGUAGES.map((lang) => (
            <DropdownMenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code)}>
                {lang.label}
            </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
        </DropdownMenu>
    );
}
