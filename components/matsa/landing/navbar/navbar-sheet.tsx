import NavbarLogo from '@/components/matsa/landing/navbar/logo'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ArrowUpRight, Menu } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
    foods: any[],
}

const NavbarSheet = ({ foods }: Props) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent className="overflow-auto">
                <SheetTitle className='hidden'></SheetTitle>
                <NavbarLogo />
                <div className="mt-12 text-base space-y-4 flex flex-col">
                    <Link href="#" className='font-bold'>Home</Link>
                    <div>
                        <div className="font-bold">Food</div>
                        <ul className="mt-2 space-y-3 ml-1 pl-4 border-l">
                            {foods.map((foodItem) => (
                                <li key={foodItem.title}>
                                    <Link href="#" className="flex items-center gap-2">
                                        <foodItem.icon className="h-5 w-5 mr-2 text-muted-foreground" />
                                        {foodItem.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Link href="#" className='font-bold'>Repositori</Link>
                    <Link href="#" className='font-bold'>Zona Integritas</Link>

                    <Button className='flex'>
                        Get Started <ArrowUpRight />
                    </Button>

                </div>
            </SheetContent>
        </Sheet>
    )
}

export default NavbarSheet