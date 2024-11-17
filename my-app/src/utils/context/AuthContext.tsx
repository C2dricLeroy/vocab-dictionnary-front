"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextType {
    userId: string | null;
    isAuthenticated: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const authenticate = async () => {
            try {
                // const userInfo = await fetchUserInfo();
                // setUserId(userInfo.user_id);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("User is not authenticated", error);
                setIsAuthenticated(false);
            }
        };

        authenticate();
    }, []);

    const logout = () => {
        setUserId(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ userId, isAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export default function useAuth()  {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
