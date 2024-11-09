import { useState } from 'react';

export default function WelcomeSection() {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <section className="relative flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400 text-white py-16 px-8 rounded-lg shadow-lg dark:to-gray-600 dark:text-gray-100">
            <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white hover:text-gray-200 text-xl font-bold dark:text-gray-100 dark:hover:text-gray-300"
                aria-label="Close welcome message"
            >
                &times;
            </button>
            <h1 className="text-4xl font-bold mb-4">Bienvenue sur LexiLearn!</h1>
            <p className="text-lg text-center">
                Construisez et enrichissez votre dictionnaire de vocabulaire personnalisé dans différentes langues.
            </p>
        </section>
    );
}
