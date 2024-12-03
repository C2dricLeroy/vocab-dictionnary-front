"use client";

import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import WelcomeHeader from "@/components/WelcomeHeader";
import { motion } from "framer-motion";
import { Book, Globe, Brain, Rocket, Users, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

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
        <div className="flex flex-col min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
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
                                className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100"
                            >
                                {t("Welcome on LexiLearn")}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400"
                            >
                                {t(
                                    "Ready to transform your language learning? Join LexiLearn today and master the vocabulary that will make all the difference!"
                                )}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="flex justify-center space-x-4"
                            >
                                {/* @ts-expect-error on Link href*/}
                                <Button size="lg" href="/signin">
                                    {t("Join LexiLearn")}
                                </Button>
                                {/* @ts-expect-error on Link href*/}
                                <Button size="lg" variant="outline" href="/about">
                                    {t("Learn More")}
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-gray-50 dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                {t("Learn, enrich, master Your multilingual vocabulary at your fingertips")}
                            </h2>
                            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                                {t(
                                    "Whether you're a student, professional or language enthusiast, LexiLearn helps you build a solid, relevant vocabulary in the languages of your choice More than just an application, it's your intelligent revision companion"
                                )}
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

                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>{t("What is LexiLearn and how does it work?")}</AccordionTrigger>
                                <AccordionContent>
                                    {t("LexiLearn is a language-learning application designed to help you expand and master your vocabulary in multiple languages You can build personalized vocabulary lists, track your progress with intelligent revision tools, and access interactive quizzes to reinforce your learning")}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>{t(" Is LexiLearn suitable for beginners?")}</AccordionTrigger>
                                <AccordionContent>
                                    {t("Absolutely! LexiLearn caters to all levels, from beginners to advanced learners You can start with basic vocabulary and progress at your own pace, leveraging features like customizable study plans and contextual examples")}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>{t("Can I use LexiLearn offline?")}</AccordionTrigger>
                                <AccordionContent>
                                    {t("No, for the moment you cannot use LexiLearn offline, but we are working on it")}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </section>
            </main>

            <footer className="w-full">
                <Footer />
            </footer>
        </div>
    );
}