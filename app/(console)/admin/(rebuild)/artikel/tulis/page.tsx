"use client"
import AdminContent from "@/components/matsa/admin/admin-content";
import ArtikelEditor from "@/components/matsa/artikel/artikel-editor";
import { ArtikelProvider } from "@/lib/context/artikel-context";


export default function NextPage() {


    return (
        <AdminContent title="Tulis Artikel" >
            <ArtikelEditor />
        </AdminContent>
    );
}
