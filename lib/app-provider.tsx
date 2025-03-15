import KontenArtikel from '@/components/matsa/artikel/artikel-konten';
import LandingComponent from '@/components/matsa/landing/landing-component';
import Slideshow from '@/components/matsa/landing/landing-slideshow';
import SelayangPandang from '@/components/matsa/landing/selayang-pandang';
import StatistikLembaga from '@/components/matsa/landing/statistik-lembaga';
import MaintenancePage from '@/components/matsa/maintenance-page';
import { createClient } from '@/lib/helper/supabase-client';
import React from 'react'
const supabase = createClient();


const AppProvider = async () => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"; // Fallback if env is missing
        const response = await fetch(`${baseUrl}/api/config`, { cache: "no-store" });
        const result = await response.json();

        return result?.data.web_mode === 1 ? (
            <MaintenancePage />
        ) : (
            <LandingComponent>
                <Slideshow />
                <SelayangPandang />
                <KontenArtikel />
                <StatistikLembaga />
            </LandingComponent>
        );
    } catch (error) {
        console.error(error);
        return <div>Something went wrong</div>; // Handle catch errors
    }
}

export default AppProvider