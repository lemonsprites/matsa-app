import { Card, CardContent, CardHeader } from "@/components/ui/card";

const KontenArtikel = () => {
    const mainArticle = {
        image: "https://dummyimage.com/400x400", // Ensure square placeholder
        subtitle: "SUBTITLE",
        title: "Chichen Itza",
        description: "Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.",
    };

    const smallArticles = [
        {
            image: "https://dummyimage.com/721x401",
            subtitle: "SUBTITLE",
            title: "Colosseum Roma",
            description: "Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.",
        },
        {
            image: "https://dummyimage.com/722x402",
            subtitle: "SUBTITLE",
            title: "Great Pyramid of Giza",
            description: "Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.",
        },
        {
            image: "https://dummyimage.com/722x402",
            subtitle: "SUBTITLE",
            title: "Great Pyramid of Giza",
            description: "Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.",
        },
        {
            image: "https://dummyimage.com/722x402",
            subtitle: "SUBTITLE",
            title: "Great Pyramid of Giza",
            description: "Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.",
        },
    ];

    const SmallCard = ({ article }: { article: typeof smallArticles[0] }) => (
        <div>
            <div className="bg-gray-100 p-4 rounded-lg">
                <img
                    className="h-36 rounded w-full object-cover object-center mb-4"
                    src={article.image}
                    alt={article.title}
                />
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium">{article.subtitle}</h3>
                <h2 className="text-sm text-gray-900 font-medium mb-2">{article.title}</h2>
                <p className="leading-relaxed text-sm">{article.description}</p>
            </div>
        </div>
    );

    return (
        <div className="bg-yellow-200 py-8">
            <div className="matsa-wrapper grid grid-cols-8 gap-4">
                <div className="flex flex-wrap w-full mb-8 col-span-8">
                    <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                            Berita dan Kabar Terbaru Kami
                        </h1>
                        <div className="h-1 w-20 bg-indigo-500 rounded"></div>
                    </div>
                    <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
                        Dapatkan informasi terbaru seputar kegiatan dan perkembangan madrasah, serta agenda dan inovasi yang
                        mendukung pendidikan berkualitas bagi generasi muda.
                    </p>
                </div>

                {/* Left Side (Square Article) */}
                <div className="col-span-4 gap-4 items-center flex">
                    <Card className="relative overflow-hidden w-full">
                        <CardHeader className="p-0 aspect-[1/1] overflow-hidden object-center rounded">
                            <img
                                className="h-full object-cover"
                                src={mainArticle.image}
                                alt={mainArticle.title}
                            />
                        </CardHeader>
                        <CardContent className="absolute bottom-0 bg-gradient-to-t from-black/75 via-black/50 to-transparent h-1/2 p-4 text-white">
                            <h3 className="tracking-widest text-indigo-500 text-xs font-medium">{mainArticle.subtitle}</h3>
                            <h2 className="text-lg font-medium mb-4">{mainArticle.title}</h2>
                            <p className="leading-relaxed text-sm">{mainArticle.description}</p>
                        </CardContent>
                    </Card>
                </div>


                {/* Right Side (Smaller Articles) */}
                <div className="col-span-4 grid grid-cols-2 gap-4">
                    {smallArticles.map((article, index) => (
                        <SmallCard key={index} article={article} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default KontenArtikel;
