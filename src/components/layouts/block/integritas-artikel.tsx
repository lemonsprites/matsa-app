import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";


const IntegritasArtikel = () => {
    const articles = [
        {
            id: 1,
            title: "Penerapan Zona Integritas",
            description: "MTsN 1 Ciamis mencanangkan Zona Integritas untuk meningkatkan transparansi dan birokrasi bersih.",
            imageUrl: "https://via.placeholder.com/300x200",
            hashtags: ["#ZonaIntegritas", "#MadrasahHebat", "#BersihMelayani"],
            link: "#",
        },
        {
            id: 2,
            title: "WBBM di MTsN 1 Ciamis",
            description: "Dengan predikat WBBM, MTsN 1 Ciamis meningkatkan layanan pendidikan yang berkualitas, efisien, dan inklusif.",
            imageUrl: "https://via.placeholder.com/300x200",
            hashtags: ["#WBBM", "#PendidikanBerkualitas"],
            link: "#",
        },
        {
            id: 3,
            title: "Masa Depan MTsN 1 Ciamis",
            description: "MTsN 1 Ciamis terus berinovasi untuk menciptakan pendidikan yang lebih baik dan terpercaya di tingkat nasional.",
            imageUrl: "https://via.placeholder.com/300x200",
            hashtags: ["#InovasiPendidikan", "#MadrasahModern"],
            link: "#",
        },
    ];

    return (
        <>
            <div className="mb-8 pt-5 text-left border-lime-300 border-l-2 mt-10">
                <h2 className="text-3xl font-bold text-gray-800 pl-4">Berita Terkini</h2>
                <p className="text-gray-600 mt-2  pl-4">
                    Temukan berita terbaru seputar kegiatan, inovasi, dan pencapaian MTsN 1 Ciamis dalam Mewujudkan WBBM dan Zona Integritas
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {articles.map((article) => (
                    <Card key={article.id} className="shadow-md">
                        <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-48 object-cover"
                            width={300}
                            height={200}
                        />
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">{article.title}</CardTitle>
                            <CardDescription className="text-sm text-gray-600">{article.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {article.hashtags.map((hashtag, index) => (
                                    <span
                                        key={index}
                                        className="text-xs font-medium text-blue-500 bg-blue-100 px-2 py-1 rounded-md"
                                    >
                                        {hashtag}
                                    </span>
                                ))}
                            </div>
                            <a
                                href={article.link}
                                className="text-blue-500 text-sm font-semibold hover:underline"
                            >
                                Baca Selengkapnya →
                            </a>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default IntegritasArtikel