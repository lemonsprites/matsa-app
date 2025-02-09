import KontenArtikel from '@/components/matsa/artikel/artikel-konten';
import LandingComponent from '@/components/matsa/landing/landing-component';
import Slideshow from '@/components/matsa/landing/landing-slideshow';
import SelayangPandang from '@/components/matsa/landing/selayang-pandang';
import StatistikLembaga from '@/components/matsa/landing/statistik-lembaga';
import MaintenancePage from '@/components/matsa/maintenance-page';
import { createClient } from '@/utils/supabase/client';
import React from 'react'
const supabase = createClient();


const AppProvider = async () => {
    try {
        const { data, error } = await supabase
            .from('web_config')
            .select('web_mode')
            .eq('id', 1)
            .single();

        if (error) {
            console.error(error);
            return <div>Error loading data</div>; // Handle error case
        }

        return data?.web_mode === 1 ? (
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