"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

export interface AuthContextType {
    userId: string | null;
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    authenticate: () => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);

    const authenticate = async () => {
        setIsAuthenticating(true);
        try {
            // const userInfo = await fetchUserInfo();
            // setUserId(userInfo.user_id);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("User is not authenticated", error);
            setUserId(null);
            setIsAuthenticated(false);
        } finally {
            setIsAuthenticating(false);
        }
    };

    const logout = () => {
        setUserId(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{ userId, isAuthenticated, isAuthenticating, authenticate, logout }}
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
