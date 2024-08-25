import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/Modetoggle";

export default function WelcomeHeader() {
    return (
        <div className="bg-gray-100 dark:bg-gray-800 py-4 px-8 flex items-center justify-between shadow-md w-full">
            <Logo
                logoSrc="/logo.png"
                altText="LexiLearn Logo"
                variant="default"
                variantSize="lg"
            />

            <div className="ml-auto flex space-x-4 pr-8">
                <Button variant="neumorphism">
                    Pricing
                </Button>
                <Button variant="neumorphism">
                    About
                </Button>
                <Button variant="neumorphism" link="/signin">
                    Signin
                </Button>
                <ModeToggle />
            </div>
        </div>
    );
}
