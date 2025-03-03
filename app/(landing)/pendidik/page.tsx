import LandingComponent from "@/components/matsa/landing/landing-component";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/server";

const PtkByLevel = async () => {
    const supabase = createClient();

    // Fetch PTK data from Supabase
    const { data: ptkData, error } = await (await supabase)
        .from("tb_pegawai")
        .select("id, nama, unor_satker, foto");

    if (error) {
        console.error("Error fetching PTK data:", error);
        return <p className="text-red-500 text-center">Gagal memuat data pendidik.</p>;
    }

    // Definisikan urutan kategori
    const categoryOrder: { [key: string]: number } = {
        "Kepala Madrasah": 1,
        "Tenaga Kependidikan": 3,
        "Pendidik": 2,
    };

    // Group PTK by level
    const groupedByLevel = ptkData.reduce((acc: any, ptk) => {
        if (!acc[ptk.unor_satker]) {
            acc[ptk.unor_satker] = [];
        }
        acc[ptk.unor_satker].push(ptk);
        return acc;
    }, {});

    // Urutkan kategori berdasarkan urutan yang telah didefinisikan
    const sortedLevels = Object.keys(groupedByLevel).sort((a, b) => {
        return (categoryOrder[a] || 99) - (categoryOrder[b] || 99);
    });

    return (
        <LandingComponent>
            <div className="matsa-wrapper mx-auto px-8 p-6">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Pendidik dan Tenaga Kependidikan
                </h2>

                {/* Loop berdasarkan urutan kategori yang telah diatur */}
                {sortedLevels.map((level) => (
                    <div key={level} className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">{level}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
                            {groupedByLevel[level].map((ptk: any) => (
                                <div
                                    key={ptk.id}
                                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    <Avatar className="w-24 h-24 rounded-full mx-auto mb-3 object-cover">
                                        <AvatarFallback>{ptk.nama?.charAt(0) || "?"}</AvatarFallback>
                                        <AvatarImage src={ptk.foto || "/default-avatar.png"} alt={ptk.nama} />
                                    </Avatar>
                                    <h4 className="text-sm font-semibold text-center text-gray-800">{ptk.nama}</h4>
                                    <p className="text-xs text-center text-gray-600">{ptk.jabatan}</p>
                                    <p className="text-xs text-center text-gray-500">{ptk.pendidikan}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </LandingComponent>
    );
};

export default PtkByLevel;
