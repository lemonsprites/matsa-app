import AdminNavbar from "@/components/matsa/admin/admin-navbar";
import { AdminSidebar } from "@/components/matsa/admin/admin-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/lib/helper/supabase-server";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode
  modal: React.ReactNode
}

export default async function AdminLayout({ children, modal }: Props) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/masuk");
  }


  return (
    user ? (<SidebarProvider>
      <AdminSidebar className="" />
      <SidebarInset>
        <AdminNavbar />
        {children}
        {modal}
      </SidebarInset>
    </SidebarProvider>) : (<>
      <Link href="/" />
      {/* <Toast title="Auth Error" desc="Mohon maaf! Anda tidak terautentikasi!😉" variant="error" /> */}
    </>)
  )

}

export const generateMetadata = () => ({
  title: "Daftar Artikel",
});