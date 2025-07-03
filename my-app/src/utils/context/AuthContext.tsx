"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

export interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (
        email: string | null,
        password: string | null
    ) => Promise<{ success: boolean; message?: string }>;
    logout: () => void;
}

export interface User {
    id: string;
    name: string;
    email: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const login = async (
        email: string | null,
        password: string | null
    ): Promise<{ success: boolean; message?: string }> => {
        const login_url =
            process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/user/login";
        const fetchme_url =
            process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/user/me";

        const data = {
            "email": email,
            "password": password
        };

        try {
            const response = await fetch(login_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",
            });

            if (!response.ok) {
                if (response.status === 401) {
                    return {
                        success: false,
                        message: "Invalid username or password",
                    };
                } else {
                    return {
                        success: false,
                        message: "An error occurred, please try again",
                    };
                }
            }

            const responseData = await response.json();
            setToken(responseData.token);

            const meRes = await fetch(fetchme_url, {
                headers: {
                    Authorization: `Bearer ${responseData.token}`,
                },
                credentials: "include",
            });

            if (meRes.ok) {
                const userData = await meRes.json();
                setUser(userData);
                setIsAuthenticated(true);
                return { success: true };
            } else {
                return {
                    success: false,
                    message: "Login succeeded but failed to fetch user data",
                };
            }
        } catch (error) {
            console.error("Error during login:", error);
            return {
                success: false,
                message: "Network error, please try again",
            };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{ user, token, isAuthenticated, logout, login }}
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
