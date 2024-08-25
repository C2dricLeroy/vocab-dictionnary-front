import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import GoogleButton from "@/components/ui/googleButton";


export default function SigninComponent() {
    return (
        <>
            <div className="max-w-md mx-auto mt-10 my-10 p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
                    Sign In
                </h2>
                <GoogleButton />
                <br/>
                <hr/>
                <br/>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
                            Email
                        </label>
                        <Input
                            variant="neumorphism"
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
                            Password
                        </label>
                        <Input
                            variant="neumorphism"
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="w-full"
                        />
                    </div>
                    <Button type="submit" className="w-full" variant="neumorphism">
                        Sign In
                    </Button>
                    <div className="text-center mt-6">
                        <a>Doesn't have an account ?</a>
                        <a href="/signup" className="text-blue-500 ml-2">Sign Up</a>
                    </div>
                </form>
            </div>
        </>
    )
}