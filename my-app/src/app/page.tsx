import { ModeToggle } from "@/components/Modetoggle";
import Footer from "@/components/footer";
import WelcomeHeader from "@/components/WelcomeHeader";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="w-full">
                <WelcomeHeader />
            </header>

            <main className="flex-grow flex flex-col items-center justify-center px-4">
                <h1 className="text-3xl font-bold mt-4">Hello World</h1>
            </main>

            <footer className="w-full">
                <Footer />
            </footer>
        </div>
    );
}
