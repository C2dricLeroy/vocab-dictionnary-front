import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import { AuthProvider } from "@/utils/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
  params: { locale }, // eslint-disable-line
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {

  const messages = await getMessages();

  return (
    <html lang="{locale}">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}