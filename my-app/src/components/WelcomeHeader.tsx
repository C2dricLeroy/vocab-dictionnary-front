import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/Modetoggle";
import {useTranslations} from 'next-intl';
import {Link} from "@/i18n/routing";

export default function WelcomeHeader() {
    const t = useTranslations('WelcomeHeader');
    return (
        <div className="bg-gray-100 dark:bg-gray-800 py-4 px-8 flex items-center justify-between shadow-md w-full">
            <Logo
                logoSrc="/logo.png"
                altText="LexiLearn Logo"
                variant="default"
                variantSize="lg"
            />

            <div className="ml-auto flex space-x-4 pr-8">
                <Button variant="neumorphism">
                    <Link href="/pricing">
                        {t('Pricing')}
                    </Link>
                </Button>
                <Button variant="neumorphism">
                    <Link href="/about">
                        {t('About')}
                    </Link>
                </Button>
                <Button variant="neumorphism">
                    <Link href="/signin">
                        {t('Login')}
                    </Link>
                </Button>
                <ModeToggle />
            </div>
        </div>
    );
}
