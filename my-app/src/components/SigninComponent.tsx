'use client';

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import GoogleButton from "@/components/ui/googleButton";
import {useState, FormEvent} from "react";
import {useRouter} from "next/navigation";


export default function SigninComponent() {
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const router = useRouter()

    const signinSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const url = '';

        const data = {
            "email": email,
            'password': password
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
              }

            const responseData = response.json();

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
              }
    
            router.push('/dashboard');
        } catch (error) {
            console.error('Error fetching data:', error);
          }
    }

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
                <form onSubmit={signinSubmit}>
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
                            onChange={(e) => setEmail(e.target.value)}
                            required
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
                            onChange={(e) => setPassword(e.target.value)}
                            required
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