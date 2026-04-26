"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export function useCMS(key: string) {
    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchContent() {
            try {
                const res = await axios.get(`${API_URL}/content/${key}`);
                setContent(res.data);
            } catch (error) {
                console.error(`Error fetching CMS content for ${key}:`, error);
            } finally {
                setLoading(false);
            }
        }
        fetchContent();
    }, [key]);

    return { content, loading };
}
