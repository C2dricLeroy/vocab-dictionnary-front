import {ModeToggle} from "@/components/Modetoggle";
import { Logo } from "@/components/ui/logo";

export default function Profile() {
    return (
        <>
            <header className="bg-gray-100 dark:bg-gray-800 py-4 px-8 flex items-center justify-between shadow-md w-full">
                <Logo
                    logoSrc="/logo.png"
                    altText="LexiLearn Logo"
                    variant="default"
                    variantSize="lg"
                />
                <div className="ml-auto flex space-x-4 pr-8">
                    <ModeToggle />
                </div>
            </header>
            <h1>Profile</h1>
        </>
    );
}