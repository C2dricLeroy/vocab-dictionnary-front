import Footer from "@/components/footer";
import WelcomeHeader from "@/components/WelcomeHeader";

export default function About() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="w-full">
                <WelcomeHeader />
            </header>

            <main className="flex-grow flex flex-col items-center justify-center px-4">
                <p>About</p>
            </main>

            <footer className="w-full">
                <Footer />
            </footer>

        </div>
    );
}