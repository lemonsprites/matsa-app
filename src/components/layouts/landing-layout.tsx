// components/Layout.tsx
import LandingFooter from "@/components/layouts/block/landing-footer";
import Navbar from "@/components/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area"

const LandingLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
                <ScrollArea>
                    <Outlet /> {/* Render subroutes here */}
                </ScrollArea>
            </main>
            <LandingFooter />
        </div>

    );
};

export default LandingLayout;
