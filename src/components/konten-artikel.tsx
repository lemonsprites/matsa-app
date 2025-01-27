import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import supabase from "@/lib/supabase-client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

const KontenArtikel = () => {
  const [mainArticle, setMainArticle] = useState<any | null>(null);
  const [smallArticles, setSmallArticles] = useState<any[]>([]);

  useEffect(() => {
    // Fetch articles from Supabase
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from("tb_artikel")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          // Assume the first article is the main article
          setMainArticle(data[0]);

          // Remaining articles as smaller articles
          setSmallArticles(data.slice(1));
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const SmallCard = ({ article }: { article: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Link to={`/artikel/${article.slug}`}>
        <div className="bg-gray-100 p-4 rounded-lg min-h-[300px]">
          <img
            className="h-36 rounded w-full object-cover object-center mb-4"
            src={article.thumbnail_url || "https://dummyimage.com/721x401"}
            alt={article.title}
          />
          <Badge className="tracking-widest mb-2">
            {article.created_at
              ? Intl.DateTimeFormat("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(new Date(article.created_at))
              : "SUBTITLE"}
          </Badge>
          <h2 className="text-sm text-gray-900 font-medium mb-2">
            {article.title}
          </h2>
          <p className="leading-relaxed text-sm">{article.description}</p>
        </div>
      </Link>

    </motion.div>
  );

  if (!mainArticle) {
    return <p className="text-center py-8">Loading articles...</p>;
  }
  const firstWords = (content: string, wordLimit: number) => {
    return content.split(" ").slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div className="bg-yellow-200 py-8">
      <div className="matsa-wrapper grid grid-cols-8 gap-4">
        {/* Header Section */}
        <motion.div
          className="flex flex-wrap w-full mb-8 col-span-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Berita Terkini Kami
            </h1>
            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
            Dapatkan informasi terbaru seputar kegiatan dan perkembangan
            madrasah, serta agenda dan inovasi yang mendukung pendidikan
            berkualitas bagi generasi muda.
          </p>
        </motion.div>

        {/* Left Side (Main Article) */}
        <motion.div
          className="col-span-4 gap-4 items-center flex"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.8 }}
        >
          <Link to={`/artikel/${mainArticle.slug}`}>
            <Card className="relative overflow-hidden w-full">
              <CardHeader className="p-0 aspect-[1/1] overflow-hidden object-center rounded">
                <img
                  className="h-full object-cover"
                  src={mainArticle.thumbnail_url || "https://dummyimage.com/400x400"}
                  alt={mainArticle.title}
                />
              </CardHeader>
              <CardContent className="absolute bottom-0 bg-gradient-to-t from-black/75 via-black/65 to-transparent h-1/2 p-4 text-white">

                <h2 className="text-2xl uppercase font-bold mb-4 pt-5">
                  {mainArticle.title}
                </h2>
                <p className="leading-relaxed text-sm">
                  <ReactMarkdown>{firstWords(mainArticle.content, 50)}</ReactMarkdown>
                </p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

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
