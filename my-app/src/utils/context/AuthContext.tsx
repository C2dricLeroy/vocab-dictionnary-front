"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

export interface AuthContextType {
    userId: string | null;
    isAuthenticated: boolean;
    setUserId: (id: string | null) => void;
    setIsAuthenticated: (value: boolean) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const logout = () => {
        setUserId(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{ userId, setUserId, isAuthenticated, setIsAuthenticated, logout }}
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
