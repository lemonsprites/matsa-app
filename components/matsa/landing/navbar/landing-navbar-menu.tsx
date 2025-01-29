import LandingNavbarMenuExt from '@/components/matsa/landing/navbar/landing-navbar-menu-ext'
import LandingNavbarMenuItem from '@/components/matsa/landing/navbar/landing-navbar-menu-item'
import LandingNavbarMenuList from '@/components/matsa/landing/navbar/landing-navbar-menu-list'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { NavigationMenuList, NavigationMenuProps } from '@radix-ui/react-navigation-menu'

type Props = {
    props?: NavigationMenuProps
    foods: any[]
    travelMenuItems: any[]
}

const LandingNavbarMenu = ({foods, travelMenuItems }: Props) => {
    return (
        <NavigationMenu className='hidden md:block'>
            <NavigationMenuList className="gap-0 space-x-0 text-sm mr-5 flex">
                <LandingNavbarMenuItem href="/" label="Beranda" />
                <LandingNavbarMenuExt title="Profil Madrasah" />
                <LandingNavbarMenuList title="Informasi Publik" data={travelMenuItems} />
                <LandingNavbarMenuItem href="/berita" label="Berita" />
                <LandingNavbarMenuItem href="/integritas" label="Zona Integritas" />
            </NavigationMenuList>
        </NavigationMenu>
    )
}




export default LandingNavbarMenu