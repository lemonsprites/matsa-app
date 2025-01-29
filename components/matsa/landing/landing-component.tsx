
import KontenArtikel from '@/components/matsa/artikel/artikel-konten'
import LandingFooter from '@/components/matsa/landing/footer/landing-footer'
import Slideshow from '@/components/matsa/landing/landing-slideshow'
import LandingNavbar from '@/components/matsa/landing/navbar/landing-navbar'
import SelayangPandang from '@/components/matsa/landing/selayang-pandang'
import StatistikLembaga from '@/components/matsa/landing/statistik-lembaga'
import { createClient } from '@/utils/supabase/client'
import React, { useEffect, useState } from 'react'

type Props = {
    children: React.ReactNode | null
    className?: string
}

const LandingComponent = ({ children, className }: Props) => {
    return (
        <div>
            <LandingNavbar />
            <div className={`min-h-96 ${className}`}>
                {children}
            </div>
            <LandingFooter />
        </div>

    )
}

export default LandingComponent