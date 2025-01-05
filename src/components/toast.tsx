import React from "react";
import { toast } from "sonner";

interface ToastProps {
    variant?: "success" | "error" | "info" | "warning"; // Optional variant
    title: string;
    desc?: string; // Optional description
}

const Toast: React.FC<ToastProps> = ({ variant, title = "Matsa App | Informasi", desc }) => {
    const validVariants = ["success", "error", "info", "warning"] as const;

    if (variant && validVariants.includes(variant)) {
        // Use variant-specific toast
        toast[variant](title, {
            description: desc,
            duration: 2000, // Toast duration in milliseconds
        });
    } else {
        // Default to basic toast if no valid variant is provided
        toast(title, {
            description: desc,
            duration: 2000, // Toast duration in milliseconds
        });
    }

    // Return null because this component doesn't render anything
    return null;
};

export default Toast;
