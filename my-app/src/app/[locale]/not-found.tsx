import {Link} from "@/i18n/routing";
import {useTranslations} from "next-intl";

export default function NotFound() {
    const t = useTranslations('notFound');

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('404 - Page Not Found')}</h1>
            <p className="text-lg text-gray-600 mb-6">
                {t('Sorry, the page you are looking for does not exist')}
            </p>
            <Link href="/">
                <p className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    {t('Go back home')}
                </p>
            </Link>
        </div>
    );
}
