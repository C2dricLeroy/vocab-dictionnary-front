import { setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { QueryProvider } from '@/app/provider';

export default async function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{locale: string}>;
}) {

  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
        <>
        <QueryProvider>
        <SessionProvider>
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
            <NextIntlClientProvider>
              {children}
            </NextIntlClientProvider>
          {/* </ThemeProvider> */}
          </SessionProvider>
          </QueryProvider>
        </>
  );
}