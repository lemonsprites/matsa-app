
import ArtikelList from "@/components/matsa/artikel/artikel-list";
import AdminContent from "@/components/matsa/admin/admin-content";
import { Artikel } from "@/lib/interface/artikel.interface";


const AdminArtikelList = async () => {
  // const [posts, setPosts] = useState<Artikel[]>([]);

  // const supabase = createClient();
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const fetchArtikel = await fetch(`${baseURL}/api/artikel`);
  const artikel_list: Artikel[] = await fetchArtikel.json();

  return (
    <AdminContent title="Daftar Artikel">
      <ArtikelList artikel_list={artikel_list} />
    </AdminContent>
  );
};

export default AdminArtikelList;
