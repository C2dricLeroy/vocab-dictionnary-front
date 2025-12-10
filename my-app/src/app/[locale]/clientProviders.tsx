"use client";

import { ReactNode, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl"; 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <SessionProvider> 
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </SessionProvider>
    );
}

type IntlProviderWrapperProps = {
    children: ReactNode;
    messages: Record<string, string>;
    locale: string;
};

export function IntlProviderWrapper({ children, messages, locale }: IntlProviderWrapperProps) {
    return (
        <NextIntlClientProvider messages={messages} locale={locale} timeZone="Europe/Paris"> 
        {children}
        </NextIntlClientProvider>
    );
    }
