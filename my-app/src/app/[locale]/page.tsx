"use client";

import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import WelcomeHeader from "@/components/WelcomeHeader";
import { motion } from "framer-motion";
import { Book, Globe, Brain, Rocket, Users, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Home() {
    const t = useTranslations("HomePage");

    const features = [
        {
            icon: Book,
            title: t("feature1.title"),
            description: t("feature1.description"),
        },
        {
            icon: Globe,
            title: t("feature2.title"),
            description: t("feature2.description"),
        },
        {
            icon: Brain,
            title: t("feature3.title"),
            description: t("feature3.description"),
        },
        {
            icon: Trophy,
            title: t("feature4.title"),
            description: t("feature4.description"),
        },
        {
            icon: Users,
            title: t("feature5.title"),
            description: t("feature5.description"),
        },
        {
            icon: Rocket,
            title: t("feature6.title"),
            description: t("feature6.description"),
        },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <header className="w-full">
                <WelcomeHeader />
            </header>

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative py-20 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center space-y-8">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-4xl md:text-6xl font-bold text-gray-900"
                            >
                                {t("hero.title")}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="max-w-2xl mx-auto text-xl text-gray-500"
                            >
                                {t("hero.subtitle")}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="flex justify-center space-x-4"
                            >
                                <Button size="lg">{t("hero.cta.primary")}</Button>
                                <Button size="lg" variant="outline">
                                    {t("hero.cta.secondary")}
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                {t("features.title")}
                            </h2>
                            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                                {t("features.subtitle")}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <FeatureCard {...feature} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-primary rounded-2xl p-8 md:p-16 text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">
                                {t("cta.title")}
                            </h2>
                            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                                {t("cta.description")}
                            </p>
                            <Button size="lg" variant="secondary">
                                {t("cta.button")}
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="w-full">
                <Footer />
            </footer>
        </div>
    );
}