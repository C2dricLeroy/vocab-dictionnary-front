'use client';

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import GoogleButton from "@/components/ui/googleButton";
import {useState, FormEvent} from "react";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/routing";


export default function SigninComponent() {
    const t = useTranslations('Signin');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const router = useRouter()

    const signinSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const url = '';

        const data = {
            "email": email,
            'password': password
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
              }

            const responseData = response.json();

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
              }
    
            router.push('/dashboard');
        } catch (error) {
            console.error('Error fetching data:', error);
          }
    }

    return (
        <>
            <div className="max-w-md mx-auto mt-10 my-10 p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
                    {t('Sign in')}
                </h2>
                <GoogleButton />
                <br/>
                <hr/>
                <br/>
                <form onSubmit={signinSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
                            {t('Email')}
                        </label>
                        <Input
                            variant="neumorphism"
                            type="email"
                            id="email"
                            placeholder={t('Enter your email')}
                            className="w-full"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
                            {t('Password')}
                        </label>
                        <Input
                            variant="neumorphism"
                            type="password"
                            id="password"
                            placeholder={t('Enter your password')}
                            className="w-full"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full" variant="default">
                        {t('Sign in')}
                    </Button>
                    <div className="text-center mt-6">
                        <p>{t('Dont have an account?')}</p>
                        <Link href="/signup" className="text-blue-500 ml-2">{t('Sign up')}</Link>
                    </div>
                </form>
            </div>
        </>
    )
}