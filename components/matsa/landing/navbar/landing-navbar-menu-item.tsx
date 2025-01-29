import { NavigationMenuItem, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import Link from 'next/link'
import React from 'react'

type Props = {
    href: string;
    label: string
}

const LandingNavbarMenuItem = ({ href, label }: Props) => {
    return (
        <NavigationMenuItem>

            <Link className={navigationMenuTriggerStyle()} href={href}>
                {label}
            </Link>
        </NavigationMenuItem>
    )
}

export default LandingNavbarMenuItem