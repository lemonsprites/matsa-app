import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import supabase from "@/lib/supabase-client";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";

// Dummy comments data
const comments = [
    { author: 'Jane Doe', comment: 'Great article! Really enjoyed reading it.' },
    { author: 'John Smith', comment: 'I agree, the topic is really insightful.' },
    { author: 'Alice Johnson', comment: 'Interesting perspective. Thanks for sharing!' },
    { author: 'Bob Brown', comment: 'Can you provide more details on this topic?' },
    { author: 'Charlie Green', comment: 'Looking forward to reading more articles like this!' },
];

const ArtikelPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [article, setArticle] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            const { data, error } = await supabase
                .from('tb_artikel')
                .select('id, title, content, created_at, author_id, thumbnail_url, status, user_profiles(display_name)')
                .eq('id', slug)
                .single(); // Make sure we're only fetching one article

            if (error) {
                setError("Failed to load article. Please try again later.");
            } else {
                // Safely handle missing author
                const postWithAuthor = {
                    ...data,
                    author: data.user_profiles ? data.user_profiles.display_name : "Unknown",
                };

                setArticle(postWithAuthor);
            }
        };

        fetchArticle();
    }, [slug]);

    console.log(article)

    const formatTanggal = (data: any) => {
        return Intl.DateTimeFormat('id', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(new Date(data));
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!article) {
        return <div>Loading...</div>;
    }

    return (
        <div className="matsa-wrapper my-8">
            <div className="mx-auto w-[720px]">
                <div id="artikel" className="text-left">
                    <div id="artikelHeader">
                        <h1 className="mb-2">{article.title}</h1>
                        <div id="metadata" className="text-sm flex flex-col">
                            <span>Direview oleh <Link className="author" to="www.google.com">{article.author}</Link>. </span>
                            <span>Diposting pada {formatTanggal(article.created_at)} oleh <Link className="author" to="www.google.com">{article.author}</Link>. </span>
                        </div>
                    </div>
                    <hr />
                    <div id="artikelKonten" className="markdown-content prose max-w-full">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content.trim()}</ReactMarkdown>
                    </div>
                    <hr />
                    <div id="artikelFooter" className="text-left">
                        <div>
                            <p className="my-2">Tags:</p>
                            <span className="space-x-2">
                                {article.tags?.length > 0 ? article.tags.map((tag: string, index: number) => (
                                    <Badge key={index} className="rounded-full cursor-pointer">
                                        {tag}
                                    </Badge>
                                )) : <span>No tags available</span>}
                            </span>
                        </div>
                    </div>
                </div>
                {/* Komentar Section */}
                <Card className="mt-5">
                    <CardTitle className="flex justify-between items-center mb-6">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 px-4 mt-5 dark:text-white">
                            Komentar ({comments.length})
                        </h2>
                    </CardTitle>
                    <CardContent>
                        {comments.map((comment, index) => (
                            <div key={index} className="mb-4">
                                <p><strong>{comment.author}</strong>: {comment.comment}</p>
                            </div>
                        ))}
                        <form className="mt-6">
                            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                <label htmlFor="comment" className="sr-only">Your comment</label>
                                <textarea
                                    id="comment"
                                    rows={3}
                                    className="resize-none px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
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
            </div>
        </div>
    );
};


export default ArtikelPage