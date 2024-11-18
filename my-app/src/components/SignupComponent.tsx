'use client';

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import GoogleButton from "@/components/ui/googleButton";
import {useState, FormEvent} from "react";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/routing";
import {useRouter} from '@/i18n/routing';

export default function SignupComponent() {
    const t = useTranslations('Signup');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<boolean>(false);

    const router = useRouter();

    const passwordMatch = () => password === confirmPassword;

    const signupSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const base_url = process.env.NEXT_PUBLIC_BASE_URL;
        const url = base_url + '/api/auth/register/';

        const data = {
            "username": username,
            "email": email,
            'password': password,
        };

        if (!passwordMatch()) {
            setPasswordError(true);
            return;
        }

        setPasswordError(false);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Signup error: ${response.status}`);
            }

            router.push('/signin' as any);
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 my-10 p-8 px-16 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
                {t('Sign up')}
            </h2>
            <GoogleButton />
            <br/>
            <hr/>
            <br/>
            <form onSubmit={signupSubmit}>
                <div className="mb-6 relative">
                    <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="username">
                        {t('Username')}
                        <span className="relative group">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-4 h-4 inline-block ml-1 text-gray-500 cursor-pointer"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M12 12h.01M12 6h.01" />
                            </svg>
                            <div className="absolute bottom-full left-0 mb-2 hidden w-64 px-3 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:block group-hover:opacity-100 transition-opacity">
                                {t('Your username can be used for login and will be used throughout the application')}
                            </div>
                        </span>
                    </label>
                    <Input
                        variant="neumorphism"
                        type="text"
                        id="username"
                        placeholder={t('Enter your username')}
                        className="w-full"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
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
                <div className="mb-6">
                    <Input
                        variant="neumorphism"
                        type="password"
                        id="passwordConfirm"
                        placeholder={t('Confirm your password')}
                        className="w-full"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {passwordError && (
                        <p className="text-red-500 text-sm mt-2">
                            {t('Passwords do not match')}
                        </p>
                    )}
                </div>
                <Button type="submit" className="w-full" variant="default">
                    {t('Sign Up')}
                </Button>
                <div className="text-center mt-6">
                    <p>{t('Already have an account?')}</p>
                    {/* @ts-expect-error on Link href*/}
                    <Link href="/signin" className="text-blue-500 ml-2">{t('Sign In')}</Link>
                </div>
            </form>
        </div>
    );
}
