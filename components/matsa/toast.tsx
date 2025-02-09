"use client"

import React from "react";
import { toast } from "sonner";

interface ToastProps {
    variant?: "success" | "error" | "info" | "warning"; // Optional variant
    title: string;
    desc?: string; // Optional description
}

const Toast: React.FC<ToastProps> = ({ variant, title = "Matsa App | Informasi", desc }) => {
    const validVariants = {
        success: toast.success,
        error: toast.error,
        info: toast.info,
        warning: toast.warning,
    };

    if (variant && validVariants[variant]) {
        validVariants[variant](title, {
            description: desc,
            duration: 2000, // Toast duration in milliseconds
        });
    } else {
        // Default toast if variant is not provided or invalid
        toast(title, {
            description: desc,
            duration: 2000,
        });
    }

    // Return null because this component doesn't render anything
    return null;
};

export default Toast;
