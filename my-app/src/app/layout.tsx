import { ReactNode } from "react";
import { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./[locale]/clientProviders";

export const metadata: Metadata = {
    title: "Lexit",
    description: "Apprendre avec Lexit",
};

type Props = {
    children: ReactNode;
};

export default function RootLayout({children}: Props) {
    return (
        <html lang="fr"> 
            <body>
                <AuthProvider> 
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}