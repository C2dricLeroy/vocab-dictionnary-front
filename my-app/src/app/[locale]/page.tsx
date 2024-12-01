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
            title: t("Your personal dictionaries"),
            description: t("Create your own word lists in several languages, adapted to your objectives and level of proficiency"),
        },
        {
            icon: Globe,
            title: t("Interactive exercises"),
            description: t("Test and reinforce your knowledge with a variety of fun exercises designed to make learning stimulating"),
        },
        {
            icon: Brain,
            title: t("Smart progress tracking"),
            description: t("Analyze your progress with detailed statistics, identify your strengths and focus on areas for improvement"),
        },
        {
            icon: Trophy,
            title: t("Multilingual learning"),
            description: t("Learn an unlimited number of languages by creating YOUR own dictionaries"),
        },
        {
            icon: Users,
            title: t("Spacing-based revisions (SRS)"),
            description: t("Benefit from a spaced repetition system to memorize each new word added to your vocabulary"),
        },
        {
            icon: Rocket,
            title: t("Sharing and community"),
            description: t("Share your progress and discover new approaches by interacting with a community of passionate learners"),
        },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <header className="w-full">
                <WelcomeHeader />
            </header>

            <main className="flex-grow">
                <section className="relative py-20 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center space-y-8">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-4xl md:text-6xl font-bold text-gray-900"
                            >
                                {t("Welcome on LexiLearn")}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="max-w-2xl mx-auto text-xl text-gray-500"
                            >
                                {t("Ready to transform your language learning? Join LexiLearn today and master the vocabulary that will make all the difference!")}
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
                                {t("Learn, enrich, master Your multilingual vocabulary at your fingertips")}
                            </h2>
                            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                                {t("Whether you're a student, professional or language enthusiast, LexiLearn helps you build a solid, relevant vocabulary in the languages of your choice More than just an application, it's your intelligent revision companion")}
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