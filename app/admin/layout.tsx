import AdminNavbar from "@/components/matsa/admin/admin-navbar";
import { AdminSidebar } from "@/components/matsa/admin/admin-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import getConfig from "next/config";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode
}

export default async function AdminLayout({ children }: Props) {
  const { publicRuntimeConfig } = getConfig();
  const { __APP_VERSION__ } = publicRuntimeConfig;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/masuk");
  }

  return (
    user ? (<SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <AdminNavbar />
        <div className="flex flex-1 flex-col gap-4 px-6 py-4 overflow-y-auto">
          {children}
        </div>
        <div className="flex justify-center text-xs text-muted-foreground p-4 italic">Versi {__APP_VERSION__} © Copyright {new Date().getFullYear()}, Tim PIDL MTsN 1 Ciamis</div>
      </SidebarInset>
    </SidebarProvider>) : (<>
      <Link href="/" />
      {/* <Toast title="Auth Error" desc="Mohon maaf! Anda tidak terautentikasi!😉" variant="error" /> */}
    </>)
  )

}