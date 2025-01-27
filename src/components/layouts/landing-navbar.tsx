"use client"



import {
    NavigationMenu,
    NavigationMenuList
} from "@/components/ui/navigation-menu";



import MenuItem from "@/components/layouts/menu-item";
import MenuListItem from "@/components/layouts/menu-list-item";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { ArrowUpRight, Backpack, CakeSlice, Coffee, Grape, Hotel, IceCream, MapPin, Menu, Package, Pizza, Plane, Sandwich, Smile } from "lucide-react";
import { Link } from "react-router-dom";


const LandingNavbar = () => {
    return (
        <nav className="h-20 bg-background border-b sticky z-50 shadow-md top-0">
            <div className="h-full matsa-wrapper flex items-center justify-between max-w-screen-lg mx-auto px-4 sm:px-8">
                <div className="flex items-center  gap-8">
                    <Logo />
                    {/* Desktop Menu */}
                </div>
                <div className="flex items-center gap-3">
                    <NavMenu className="hidden md:block" />
                    <Button className='hidden md:flex'>
                        Get Started <ArrowUpRight />
                    </Button>
                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <NavigationSheet />
                    </div>
                </div>
            </div>
        </nav>
        
    )
}


export default LandingNavbar



export const Logo = () => (
    <div id="brandLogo">
        <img src={""} className="h-[80px]" />
    </div>
);


export const NavMenu = (props: NavigationMenuProps) => (
    <NavigationMenu {...props}>
        <NavigationMenuList className="gap-0 space-x-0 text-sm mr-5">
            <MenuItem href="/" label="Beranda" />
            <MenuListItem title="Profil Madrasah" data={foods}  />
            <MenuListItem title="Informasi Publik" data={travelMenuItems}  />
            <MenuItem href="/" label="Repositori" />
            <MenuItem href="/integritas" label="Zona Integritas" />
        </NavigationMenuList>
    </NavigationMenu>
);


export const NavigationSheet = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent className="overflow-auto">
                <Logo />
                <div className="mt-12 text-base space-y-4 flex flex-col">
                    <Link to="#" className='font-bold'>Home</Link>
                    <div>
                        <div className="font-bold">Food</div>
                        <ul className="mt-2 space-y-3 ml-1 pl-4 border-l">
                            {foods.map((foodItem) => (
                                <li key={foodItem.title}>
                                    <Link to="#" className="flex items-center gap-2">
                                        <foodItem.icon className="h-5 w-5 mr-2 text-muted-foreground" />
                                        {foodItem.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className="font-bold">Travel</div>
                        <ul className="mt-2 space-y-3 ml-1 pl-4 border-l">
                            {travelMenuItems.map((item) => (
                                <li key={item.title}>
                                    <Link to="#" className="flex items-center gap-2">
                                        <item.icon className="h-5 w-5 mr-2 text-muted-foreground" />
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Link to="#" className='font-bold'>Repositori</Link>
                    <Link to="#" className='font-bold'>Zona Integritas</Link>

                    <Button className='flex'>
                        Get Started <ArrowUpRight />
                    </Button>

                </div>
            </SheetContent>
        </Sheet>
    );
};


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
