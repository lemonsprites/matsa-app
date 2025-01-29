import LandingNavbarMenu from '@/components/matsa/landing/navbar/landing-navbar-menu'
import NavbarLogo from '@/components/matsa/landing/navbar/logo'
import NavbarSheet from '@/components/matsa/landing/navbar/navbar-sheet'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/server'
import { ArrowUpRight, Backpack, CakeSlice, Coffee, Grape, Hotel, IceCream, MapPin, Package, Pizza, Plane, Sandwich, Smile } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const foods = [
    {
        title: "Dessert",
        icon: CakeSlice,
        description: "Sweet treats to satisfy your cravings.",
        link: "#"
    },
    {
        title: "Pizza",
        icon: Pizza,
        description: "Delicious, cheesy slices of goodness.",
        link: "#"

    },
    {
        title: "Sandwich",
        icon: Sandwich,
        description: "Classic and hearty fast food options.",
        link: "#"
    },
    {
        title: "Coffee",
        icon: Coffee,
        description: "Your go-to boost of caffeine.",
        link: "#"
    },
    {
        title: "Ice Cream",
        icon: IceCream,
        description: "Cold, creamy delights for any mood.",
        link: "#"
    },
    {
        title: "Fruit",
        icon: Grape,
        description: "Fresh and healthy natural snacks.",
        link: "#"
    },
];
export const travelMenuItems = [
    {
        title: "Destinations",
        icon: MapPin,
        description: "Discover amazing places to visit.",
        link: "#"
    },
    {
        title: "Hotels",
        icon: Hotel,
        description: "Find the best stays for your trips.",
        link: "#"

    },
    {
        title: "Flights",
        icon: Plane,
        description: "Get deals and tips on air travel.",
        link: "#"

    },
    {
        title: "Packing",
        icon: Package,
        description: "Essential checklists for stress-free packing.",
        link: "#"

    },
    {
        title: "Activities",
        icon: Smile,
        description: "Exciting things to do wherever you go.",
        link: "#"

    },
    {
        title: "Travel Tips",
        icon: Backpack,
        description: "Make every trip smooth and memorable.",
        link: "#"
    },
];


const LandingNavbar = async () => {
    const supabase = createClient();
    const user = (await supabase).auth.getUser();

    return (
        <nav className="h-20 bg-background border-b sticky z-50 shadow-md top-0">
            <div className="h-full matsa-wrapper flex items-center justify-between max-w-screen-lg mx-auto px-4 sm:px-8">
                <div className="flex items-center  gap-8">
                    <NavbarLogo />
                    {/* Desktop Menu */}
                </div>
                <div className="flex items-center gap-3">
                    <LandingNavbarMenu foods={foods} travelMenuItems={travelMenuItems} />
                    {/* <ThemeSwitcher /> */}
                    <Link href="/masuk" className=''>
                        <Button className='hidden md:flex' variant= {(await user).error ? "outline" : "default" }>
                            {(await user).error ? (<>Masuk <ArrowUpRight /></>) : (<>Dashboard <ArrowUpRight /></>) }
                        </Button>
                    </Link>
                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <NavbarSheet foods={foods} travelMenuItems={travelMenuItems} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default LandingNavbar