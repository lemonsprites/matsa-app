"use client"
import { signOutAction } from '@/app/(auth)/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';

const AdminNavbar = () => {
    return (
        <nav className="bg-sidebar text-sidebar-foreground shadow-md sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-16">
            <div className="flex items-center gap-2 px-4 justify-between relative w-full">
                <div className="flex h-16 w-full items-center justify-between px-2">
                    <div className="flex shrink-0 items-center">
                        <SidebarTrigger className="-ml-1" />
                    </div>
                    <div className='profile flex items-center'>
                        <div className="p-1 text-sidebar-foreground hover:text-white">
                            <span className="sr-only">View notifications</span>
                            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                            </svg>
                        </div>

                        {/* Profile dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src="https://github.com/lemonsprites.png" alt="@shadcn" />
                                    <AvatarFallback>MA</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className='min-w-[250px]'>
                                <DropdownMenuLabel className='text-center uppercase flex flex-col justify-center items-center gap-1'>
                                    Nidaan Khofiyah Matsa
                                    <Badge variant={"secondary"} className=" block w-fit">Guru Mapel</Badge>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>Main Menu</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profil Pengguna</DropdownMenuItem>
                                <DropdownMenuItem>Pengaturan Pengguna</DropdownMenuItem>
                                <DropdownMenuItem>Notifikasi</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel onClick={() => signOutAction()} className='bg-red-400 text-white text-center cursor-pointer hover:bg-red-600 hover:text-white hover rounded-md'>
                                    Keluar Aplikasi
                                </DropdownMenuLabel>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>

        </nav >

        // <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        //     <div className="flex items-center gap-2 px-4">
        //         <SidebarTrigger className="-ml-1" />
        //         <Separator orientation="vertical" className="mr-2 h-4" />
        //         <Breadcrumb>
        //             <BreadcrumbList>
        //                 <BreadcrumbItem className="hidden md:block">
        //                     <BreadcrumbLink href="#">
        //                         Building Your Application
        //                     </BreadcrumbLink>
        //                 </BreadcrumbItem>
        //                 <BreadcrumbSeparator className="hidden md:block" />
        //                 <BreadcrumbItem>
        //                     <BreadcrumbPage>Data Fetching</BreadcrumbPage>
        //                 </BreadcrumbItem>
        //             </BreadcrumbList>
        //         </Breadcrumb>
        //     </div>
        // </header>
    )
}

export default AdminNavbar