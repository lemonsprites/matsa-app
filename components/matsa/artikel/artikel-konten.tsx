"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

import { useEffect, useState } from "react";
import { Artikel } from "@/lib/type/artikel-type";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase-client";
import { POST_STATUS } from "@/lib/enum/post-status.enum";

const KontenArtikel = () => {
  const firstWords = (content: string, wordLimit: number) =>
    content.split(" ").slice(0, wordLimit).join(" ") + "...";

  const [mainArticle, setMainArticle] = useState<any | null>(null);
  const [smallArticles, setSmallArticles] = useState<any[]>([]);

  const supabase = createClient();
  useEffect(() => {

    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from("artikel")
          .select("*")
          .limit(5)
          .order("created_at", { ascending: false })
          .eq("status", POST_STATUS.PUBLISH);

        if (error) throw error;

        if (data && data.length > 0) {
          setMainArticle(data[0]);
          setSmallArticles(data.slice(1));
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles()

  }, [""])

  const SmallCard = ({ article }: { article: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Link href={`/artikel/${article.slug}`}>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md md:min-h-[300px]">
          <img
            className="h-44 rounded w-full object-cover object-center mb-4"
            src={article.thumbnail_url || "https://dummyimage.com/721x401"}
            alt={article.judul}
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
          <h2 className="text-base truncate line-clamp-2 text-wrap text-gray-900 font-medium mb-2">
            {article.judul}
          </h2>
          {/* <p className="leading-relaxed text-sm line-clamp-2">
            {article.description}
          </p> */}
        </div>
      </Link>
    </motion.div>
  );

  if (!mainArticle) {
    return <p className="text-center py-8">Loading articles...</p>;
  }

 
  return (
    <div className="bg-yellow-200 py-8">
      <div className="matsa-wrapper grid grid-cols-1 md:grid-cols-8 gap-6 px-4 sm:px-8">
        {/* Header Section */}
        <motion.div
          className="w-full mb-8 col-span-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-medium title-font mb-2 text-gray-900">
              Berita Terkini Kami
            </h1>
            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
          <p className="text-gray-500 text-sm md:text-base lg:text-lg leading-relaxed">
            Dapatkan informasi terbaru seputar kegiatan dan perkembangan
            madrasah, serta agenda dan inovasi yang mendukung pendidikan
            berkualitas bagi generasi muda.
          </p>
        </motion.div>

        {/* Main Article */}
        <motion.div
          className="col-span-8 md:col-span-4 md:gap-4 items-center flex"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Link href={`/artikel/${mainArticle.slug}`}>
            <Card className="relative overflow-hidden w-full shadow-lg">
              <CardHeader className="p-0 aspect-[1/1] overflow-hidden rounded">
                <img
                  className="w-full h-full object-cover"
                  src={mainArticle.thumbnail_url || "https://dummyimage.com/400x400"}
                  alt={mainArticle.judul}
                />
              </CardHeader>
              <CardContent className="absolute bottom-0 bg-gradient-to-t from-black/75 via-black/65 to-transparent p-4 text-white">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">
                  {mainArticle.judul}
                </h2>
                <div className="leading-relaxed text-sm sm:text-base">
                  <ReactMarkdown>{firstWords(mainArticle.deskripsi, 50)}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        {/* Smaller Articles */}
        <div className="col-span-8 md:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {smallArticles.map((article, index) => (
            <SmallCard key={index} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};


export default KontenArtikel;
