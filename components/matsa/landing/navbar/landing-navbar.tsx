"use client"
import LandingNavbarMenu from '@/components/matsa/landing/navbar/landing-navbar-menu'
import NavbarLogo from '@/components/matsa/landing/navbar/logo'
import NavbarSheet from '@/components/matsa/landing/navbar/navbar-sheet'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/context/auth-context'
import { ArrowUpRight, ChartCandlestick, Images, MessageCircleQuestion, Newspaper, Trophy, UsersRound } from 'lucide-react'
import Link from 'next/link'

export const foods = [
    {
        title: "Berita dan Pengumuman",
        icon: Newspaper,
        description: "Berita dan Pengumuman  Madrasah.",
        link: "/berita"
    },
    {
        title: "Galeri Kegiatan",
        icon: Images,
        description: "Galeri Kegiatan Madrasah",
        link: "galeri"

    },
    {
        title: "Prestasi dan Penghargaan",
        icon: Trophy,
        description: "Prestasi dan Capaian Madrasah.",
        link: "prestasi"
    },
    {
        title: "Anggaran dan Kinerja",
        icon: ChartCandlestick,
        description: "Kinerja dan Anggaran Madrasah",
        link: "kinerja"
    },
    {
        title: "Alumni dan Jejaring Lulusan",
        icon: UsersRound,
        description: "Alumni dan Lulusan",
        link: "alumni"
    },
    {
        title: "Aduan & Masukan",
        icon: MessageCircleQuestion,
        description: "Berikan saran dan masukan.",
        link: "masukan"
    },
];


const LandingNavbar = () => {
    const { isGuest, user } = useAuth()

    return (
        <nav className="h-20 bg-background border-b sticky z-50 shadow-md top-0">
            <div className="h-full matsa-wrapper flex items-center justify-between max-w-screen-lg mx-auto px-4 sm:px-8">
                <div className="flex items-center  gap-8">
                    <NavbarLogo />
                    {/* Desktop Menu */}
                </div>
                <div className="flex items-center gap-3">
                    <LandingNavbarMenu foods={foods} />
                    {/* <ThemeSwitcher /> */}

                    {isGuest ? (
                        <>
                            <Link href="/masuk" className=''>
                                <Button className='hidden md:flex' variant={"outline"}>
                                    Masuk <ArrowUpRight />
                                </Button>
                            </Link>
                        </>) : (
                        <>
                            <Link href="/admin" className=''>
                                <Button className='hidden md:flex' variant={"default"}>
                                    Dashboard <ArrowUpRight />
                                </Button>
                            </Link>
                        </>)}
                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <NavbarSheet foods={foods} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default LandingNavbar