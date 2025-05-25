import LandingNavbarMenuExt from '@/components/matsa/landing/navbar/landing-navbar-menu-ext'
import LandingNavbarMenuItem from '@/components/matsa/landing/navbar/landing-navbar-menu-item'
import LandingNavbarMenuList from '@/components/matsa/landing/navbar/landing-navbar-menu-list'
import { NavigationMenu } from '@/components/ui/navigation-menu'
import { NavigationMenuList, NavigationMenuProps } from '@radix-ui/react-navigation-menu'

type Props = {
    props?: NavigationMenuProps
    foods: any[]
}

const LandingNavbarMenu = ({foods }: Props) => {
    return (
        <NavigationMenu className='hidden md:block'>
            <NavigationMenuList className="gap-0 space-x-0 text-sm mr-5 flex">
                <LandingNavbarMenuItem href="/" label="Beranda" />
                <LandingNavbarMenuExt title="Profil Madrasah" />
                <LandingNavbarMenuList title="Informasi Publik" data={foods} />
                <LandingNavbarMenuItem href="/integritas" label="Zona Integritas" />
                <LandingNavbarMenuItem href="https://ppdb.mtsn1ciamis.sch.id/" label="PPDBM" />
            </NavigationMenuList>
        </NavigationMenu>
    )
}




export default LandingNavbarMenu