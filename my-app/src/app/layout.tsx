import { ReactNode } from "react";
import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Lexit",
    description: "Apprendre avec Lexit",
};

type Props = {
    children: ReactNode;
};

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
