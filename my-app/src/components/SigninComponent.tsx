'use client';

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import GoogleButton from "@/components/ui/googleButton";
import {useState, FormEvent} from "react";
import {useRouter} from '@/i18n/routing';
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/routing";
import useAuth from "@/utils/context/AuthContext";

export default function SigninComponent() {
    const t = useTranslations('Signin');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const router = useRouter();
    const authContext = useAuth();
    const signinSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const response: { success: boolean, message?: string } = await authContext.login(email, password);

        if (!response.success) {
            setErrorMessage(t(response.message));
        } else {
            router.push("/dashboard" as any);
        }
    };

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
                    {errorMessage && (
                        <p className="text-red-500 text-sm mb-4 text-center">
                            {errorMessage}
                        </p>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
                            {t('Email')}
                        </label>
                        <Input
                            variant="neumorphism"
                            type="text"
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
                        {/* @ts-expect-error on Link href*/}
                        <Link href="/signup" className="text-blue-500 ml-2">{t('Sign up')}</Link>
                    </div>
                </form>
            </div>
        </>
    );
}