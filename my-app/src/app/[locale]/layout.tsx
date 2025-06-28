import {setRequestLocale} from 'next-intl/server';
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/utils/context/AuthContext";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {

  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <AuthProvider>
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
        </AuthProvider>
      </body>
    </html>
  );
}
