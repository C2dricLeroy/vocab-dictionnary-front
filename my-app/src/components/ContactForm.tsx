'use client';

import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import {useTranslations} from "next-intl";

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export function ContactForm() {
    const t = useTranslations('Contact');
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFormChange = useCallback((field: keyof FormData) => {
        return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { value } = e.target;
            setFormData((prev) => ({
                ...prev,
                [field]: value,
            }));
        };
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
        const res = await fetch('', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            setSubmitted(true);
        } else {
            setError('Failed to send message, Please try again');
        }
        } catch (error) {
        console.error('Error while sending form', error);
        setError('An error has occured.');
        }
    };

    if (submitted) {
        return <p className="text-green-500">{t('Thanks for yous message!')}</p>;
    }

    return (
        <section className="bg-white dark:bg-gray-900 m-5">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">{t('Contact Us')}</h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                    {t('Feel free to contact us')}
                </p>
                {error && <p className="text-red-500">{t({error})}</p>}
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t('Your email')}</label>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange('email')}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        placeholder="contact@lexilearn.com"
                        required
                        />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t('Subject')}</label>
                        <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleFormChange('subject')}
                        className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        placeholder={t("Let us know how we can help you")}
                        required
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{t('Your message')}</label>
                        <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleFormChange('message')}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder={t("Leave a comment")}
                        required
                        />
                    </div>
                    <Button variant="default" type="submit">
                        {t('Send')}
                    </Button>
                </form>
            </div>
        </section>
    );
}
