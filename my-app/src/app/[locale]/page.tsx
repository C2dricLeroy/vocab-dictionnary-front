import Footer from "@/components/footer";
import WelcomeHeader from "@/components/WelcomeHeader";
import {useTranslations} from 'next-intl';

export default function Home() {

    const t = useTranslations('HomePage')

    return (
        <div className="flex flex-col min-h-screen">
            <header className="w-full">
                <WelcomeHeader />
            </header>

            <main className="flex-grow flex flex-col items-center justify-center px-4">
                <h1 className="text-3xl font-bold mt-4">{t('title')}</h1>
            </main>

            <footer className="w-full">
                <Footer />
            </footer>
        </div>
    );
}
