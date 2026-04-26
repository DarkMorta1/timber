"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";

interface User {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "USER";
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
            setUser(res.data.user);
            // Update access token cookie is handled by server (httpOnly)
        } catch (error) {
            localStorage.removeItem("refreshToken");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const res = await axios.post(`${API_URL}/auth/login`, { email, password });
            setUser(res.data.user);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            toast.success("Welcome back!");

            // Handle redirect
            const redirectUrl = localStorage.getItem("redirectAfterLogin") || (res.data.user.role === "ADMIN" ? "/admin" : "/");
            localStorage.removeItem("redirectAfterLogin");
            router.push(redirectUrl);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Login failed");
            throw error;
        }
    };

    const logout = async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        await axios.post(`${API_URL}/auth/logout`, { refreshToken });
        localStorage.removeItem("refreshToken");
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
