// components/Layout.tsx
import LandingFooter from "@/components/layouts/block/landing-footer";
import ZonaIntegritasPop from "@/components/layouts/integritas/integritas-popup";
import Navbar from "@/components/layouts/landing-navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Outlet } from "react-router-dom";

const LandingLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
                <ScrollArea>
                    <Outlet /> {/* Render subroutes here */}
                </ScrollArea>
            </main>
            <LandingFooter />
            <ZonaIntegritasPop />
        </div>

    );
};

export default LandingLayout;
