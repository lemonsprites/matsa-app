import { motion } from "framer-motion"; // Import Framer Motion
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { estimasiMembaca } from "@/lib/services/estimasi-membaca";
import supabase from "@/lib/supabase-client";
import { Artikel } from "@/lib/type/artikel-type";
import { Tag } from "@/lib/type/tag.type";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";

// Dummy comments data
const comments = [
    { author: "Jane Doe", comment: "Great article! Really enjoyed reading it." },
    { author: "John Smith", comment: "I agree, the topic is really insightful." },
    { author: "Alice Johnson", comment: "Interesting perspective. Thanks for sharing!" },
    { author: "Bob Brown", comment: "Can you provide more details on this topic?" },
    { author: "Charlie Green", comment: "Looking forward to reading more articles like this!" },
];

const ArtikelPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [article, setArticle] = useState<Artikel | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [tags, setTags] = useState<Tag[] | null>(null);

    useEffect(() => {
        const fetchTags = async (artikel_id: string) => {
            try {
                const { data, error } = await supabase
                    .from("artikel_tag")
                    .select("tb_tag(id, tag, tag_slug)")
                    .eq("artikel_id", artikel_id);

                if (error) {
                    console.error("Failed to fetch tags:", error);
                    return [];
                }

                return data?.map((item: any) => item.tb_tag) || [];
            } catch (error) {
                console.error("Error in fetchTags:", error);
                return [];
            }
        };

        const fetchArticle = async () => {
            try {
                const { data, error } = await supabase
                    .from("tb_artikel")
                    .select(
                        "id, title, content, created_at, author_id, thumbnail_url, status, user_profiles(display_name)"
                    )
                    .eq("slug", slug)
                    .single();

                if (error) {
                    console.error("Failed to fetch article:", error);
                    setError("Failed to load article. Please try again later.");
                    return;
                }

                if (data) {
                    const tags = await fetchTags(data.id);
                    setTags(tags);

                    const postWithAuthor = {
                        ...data,
                        author: data.user_profiles ? data.user_profiles : "Unknown",
                    };

                    setArticle(postWithAuthor as any);
                }
            } catch (error) {
                console.error("Error in fetchArticle:", error);
                setError("Failed to load article. Please try again later.");
            }
        };

        fetchArticle();
    }, [slug]);

    const formatTanggal = (data: any) => {
        return Intl.DateTimeFormat("id", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(new Date(data));
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!article) {
        return <div>Loading...</div>;
    }

    return (
        <motion.div
            className=" my-8 px-4 md:px-8 max-w-screen-md mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <motion.div
                id="artikel"
                className="text-left"
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <div id="artikelHeader" className="mb-6">
                    <h1 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
                        {article.title}
                    </h1>
                    <div
                        id="metadata"
                        className="text-sm flex flex-col md:flex-row justify-between mt-4"
                    >
                        {/* Avatar and Author Info */}
                        <div className="flex space-x-4 items-center mb-2 md:mb-0 md:w-full ">
                            <Avatar className="shadow-md">
                                <AvatarImage
                                    src="https://github.com/lemonsprites.png"
                                    alt="@shadcn"
                                />
                                <AvatarFallback>LS</AvatarFallback>
                            </Avatar>
                            <div className="w-full md:flex md:justify-between">
                                <div className="flex flex-col">
                                    <span>{formatTanggal(article.created_at)}</span>
                                    <span>
                                        Ditulis oleh{" "}
                                        <Link className="author text-blue-600" to="www.google.com">
                                            {article.author?.display_name}
                                        </Link>
                                    </span>
                                </div>
                                <div className="flex flex-col items-start md:items-end">
                                    <span>
                                        Estimasi waktu membaca{" "}
                                        <u>
                                            <b>{estimasiMembaca(article.content)}</b>
                                        </u>
                                    </span>
                                    <span className="hidden md:block">
                                        Direview oleh{" "}
                                        <Link className="author text-blue-600" to="www.google.com">
                                            {article.author?.display_name}
                                        </Link>
                                        .
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Reading Time and Reviewer Info */}
                    </div>

                </div>
                <hr />
            </motion.div>
            <motion.div
                id="artikelKonten"
                className="markdown-content prose max-w-full pt-5 text-gray-800"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
            >
                <ReactMarkdown remarkPlugins={[remarkGfm]} className="overflow-hidden">
                    {article.content.trim()}
                </ReactMarkdown>
            </motion.div>
            <hr />
            <motion.div
                id="artikelFooter"
                className="text-left"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
            >
                <div className="mt-4 text-center md:text-left">
                    <p className="mb-2 font-semibold text-gray-700">Tags:</p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {tags && tags.length > 0 ? (
                            tags.map((tag: Tag, index: number) => (
                                <Badge
                                    key={index}
                                    className="rounded-full cursor-pointer inline-flex items-center"
                                >
                                    {tag.tag}
                                </Badge>
                            ))
                        ) : (
                            <span className="text-gray-500 text-sm">No tags available</span>
                        )}
                    </div>
                </div>
            </motion.div>
            <motion.div
                className="mt-5"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <Card>
                    <CardTitle className="flex justify-between items-center mb-6">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 px-4 mt-5 dark:text-white">
                            Komentar ({comments.length})
                        </h2>
                    </CardTitle>
                    <CardContent>
                        {comments.map((comment, index) => (
                            <div key={index} className="mb-4">
                                <p>
                                    <strong>{comment.author}</strong>: {comment.comment}
                                </p>
                            </div>
                        ))}
                        <form className="mt-6">
                            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                                <textarea
                                    id="comment"
                                    rows={3}
                                    className="resize-none px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                                    placeholder="Write a comment..."
                                    required
                                ></textarea>
                            </div>
                            <div className="text-right">
                                <Button variant="default" type="submit">
                                    Post comment
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default ArtikelPage;