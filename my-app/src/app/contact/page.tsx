import {ModeToggle} from "@/components/Modetoggle";
import SigninComponent from "@/components/SigninComponent";
import {Logo} from "@/components/ui/logo";
import Footer from "@/components/footer";
import { ContactForm } from "@/components/ContactForm"
export default function Contact() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-gray-100 dark:bg-gray-800 py-4 px-8 flex items-center justify-between shadow-md w-full">
                <Logo
                    logoSrc="/logo.png"
                    altText="LexiLearn Logo"
                    variant="default"
                    variantSize="lg"
                />

                <div className="ml-auto flex space-x-4 pr-8">
                    <ModeToggle/>
                </div>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center px-4">
                <ContactForm/>
            </main>

            <footer className="w-full">
                <Footer />
            </footer>

        </div>
    );
}