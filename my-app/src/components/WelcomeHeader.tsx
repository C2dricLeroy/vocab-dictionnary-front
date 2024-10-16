import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/Modetoggle";
import {useTranslations} from 'next-intl';

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
                    {t('Pricing')}
                </Button>
                <Button variant="neumorphism">
                    {t('About')}
                </Button>
                <Button variant="neumorphism" link="/signin">
                    {t('Login')}
                </Button>
                <ModeToggle />
            </div>
        </div>
    );
}
