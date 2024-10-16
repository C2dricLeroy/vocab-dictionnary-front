'use client';

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import GoogleButton from "@/components/ui/googleButton";
import {useState, FormEvent} from "react";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";


export default function SignupComponent() {
    const t = useTranslations('Signup');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const router = useRouter();

    return (
        <>
            <div className="max-w-md mx-auto mt-10 my-10 p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
                    {t('Sign up')}
                </h2>
                <GoogleButton />
                <br/>
                <hr/>
                <br/>
                <form>
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
                        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
                            Confirm your password
                        </label>
                        <Input
                            variant="neumorphism"
                            type="password"
                            id="passwordConfirm"
                            placeholder={t('Confirm your password')}
                            className="w-full"
                        />
                    </div>
                    <Button type="submit" className="w-full" variant="neumorphism">
                        {t('Sign Up')}
                    </Button>
                    <div className="text-center mt-6">
                        <p>{t('Already have an account?')}</p>
                        <a href="/signin" className="text-blue-500 ml-2">{t('Sign In')}</a>
                    </div>
                </form>
            </div>
        </>
    )
}