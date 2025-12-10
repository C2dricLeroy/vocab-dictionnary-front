import { IntlProviderWrapper } from "./clientProviders";
import { ReactNode } from "react";

export default async function LocaleLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ locale: string }>; 
}) {
    const { locale } = await params;

    const messages = await import(`../../../messages/${locale}.json`).then((m) => m.default);

    return (
        <IntlProviderWrapper messages={messages} locale={locale}> 
        {children}
        </IntlProviderWrapper>
    );
}
