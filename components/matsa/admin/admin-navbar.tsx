import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { createClient } from '@/utils/supabase/server';

const AdminNavbar = async () => {
    const supabase = createClient();
    const user = (await supabase).auth.getUser();


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
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Sign out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

        </nav>

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