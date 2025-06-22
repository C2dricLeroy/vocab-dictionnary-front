import {ReactNode} from 'react';
import './[locale]/globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Lexit',
    description: 'Apprendre avec Lexit',
};

type Props = {
    children: ReactNode;
};

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" href="/logo.png" type="image/png" />
            <title>Lexit</title>
        </head>
        <body>{children}</body>
        </html>
    );
}