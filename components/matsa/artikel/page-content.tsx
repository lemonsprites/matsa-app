import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { estimasiMembaca } from "@/lib/function/estimasi-membaca"
import { Tag } from "@/lib/type/tag-type"
import dynamic from "next/dynamic"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const MotionDiv = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), { ssr: true })

// Article Page Component
interface Props {
    article: any | null
    tags: Tag[] | null
    error: string | null
}

// Article Content Component
const PostPageContent = ({ article, tags, error }: Props) => {
    const formatTanggal = (data: any) => {
        return Intl.DateTimeFormat('id', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(new Date(data))
    }

    if (error) {
        return <div>{error}</div>
    }

    // console.log(article.user_profiles.display_name)

    return (
        <div
            className="my-8 px-4 md:px-8 max-w-screen-md mx-auto"

        >
            <div
                id="artikel"
                className="text-left"
            >
                <div id="artikelHeader" className="mb-6">
                    <h1 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
                        {article?.title}
                    </h1>
                    <div id="metadata" className="text-sm flex flex-col md:flex-row justify-between mt-4">
                        <div className="flex space-x-4 items-center mb-2 md:mb-0 md:w-full">
                            <Avatar className="shadow-md">
                                <AvatarImage src="https://github.com/lemonsprites.png" alt="@shadcn" />
                                <AvatarFallback>LS</AvatarFallback>
                            </Avatar>
                            <div className="w-full md:flex md:justify-between">
                                <div className="flex flex-col">
                                    <span>{formatTanggal(article?.created_at)}</span>
                                    <span>
                                        Ditulis oleh{' '}
                                        <Link className="author text-blue-600" href="https://www.google.com">
                                            {article.author?.display_name ?? ''}
                                        </Link>
                                    </span>
                                </div>
                                <div className="flex flex-col items-start md:items-end">
                                    <span>
                                        Estimasi waktu membaca{' '}
                                        <u>
                                            <b>{article?.content ? estimasiMembaca(article.content) : 'Content is unavailable'}</b>
                                        </u>
                                    </span>
                                    <span>
                                        Direview oleh{' '}
                                        <Link className="author text-blue-600" href="https://www.google.com">
                                            {article.author?.display_name ?? ''}
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            <div
                id="artikelKonten"
                className="markdown-content prose max-w-full pt-5 text-gray-800"
            >
                <ReactMarkdown remarkPlugins={[remarkGfm]} className="overflow-hidden">
                    {article?.content.trim()}
                </ReactMarkdown>
            </div>
            <hr />
            <div
                id="artikelFooter"
                className="text-left"
            >
                <div className="mt-4 text-center md:text-left">
                    <p className="mb-2 font-semibold text-gray-700">Tags:</p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {tags && tags.length > 0 ? (
                            tags.map((tag: Tag, index: number) => (
                                <Badge key={index} className="rounded-full cursor-pointer inline-flex items-center">
                                    {tag.tag}
                                </Badge>
                            ))
                        ) : (
                            <span className="text-gray-500 text-sm">No tags available</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostPageContent;