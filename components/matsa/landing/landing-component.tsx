"use server"
import LandingFooter from '@/components/matsa/landing/footer/landing-footer'
import LandingNavbar from '@/components/matsa/landing/navbar/landing-navbar'
import React from 'react'

type Props = {
    children: React.ReactNode | null
    className?: string | null
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