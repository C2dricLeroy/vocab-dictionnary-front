"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

export interface AuthContextType {
    userId: string | null;
    isAuthenticated: boolean;
    // eslint-disable-next-line no-unused-vars
    login: (email: string | null, password: string | null) => Promise<{ success: boolean, message?: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);



    const login = async (email: string | null, password: string | null): Promise<{ success: boolean, message?: string }> => {
        const url = process.env.NEXT_PUBLIC_BASE_URL + '/api/auth/login/';

        const data = {
            "username": email,
            'password': password
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    return {success: false, message: "Invalid username or password"};
                } else {
                    return {success: false, message: "An error occurred. Please try again"};
                }
            }

            const responseData = await response.json();

            console.log(responseData);

            setUserId(responseData.user_id);
            setIsAuthenticated(true);
            localStorage.setItem('userId', responseData.user_id);

            return {success: true};
        } catch (error) {
            console.error('Error fetching data:', error);
            return { success: false, message: "Network error. Please try again." };
        }
    };

    const logout = () => {
        setUserId(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{ userId, isAuthenticated, logout, login }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
