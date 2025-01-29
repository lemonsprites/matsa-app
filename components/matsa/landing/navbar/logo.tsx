import React from 'react'
import LogoMadrasah from '@/public/logo.svg';

const NavbarLogo = () => {
    return (
        <div id="brandLogo">
            <img src={LogoMadrasah.src} className="h-[80px]" />
        </div>
    )
}

export default NavbarLogo