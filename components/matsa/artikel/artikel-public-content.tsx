import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { estimasiMembaca } from "@/lib/helper/estimasi-membaca"
import { Tag } from "@/lib/type/tag-type"
import dynamic from "next/dynamic"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const MotionDiv = dynamic(() => import('framer-motion').then((mod) => mod.motion.div), { ssr: true })

// Article Page Component
interface Props {
    article: any | null
    tags?: Tag[] | null
    error?: string | null
}

// Article Content Component
const PostPageContent = ({ article, tags, error }: Props) => {
   

    if (error) {
        return <div>{error}</div>
    }

    const artikel = article.json()
    console.log(artikel)

    return (
       <></>
    )
}

export default PostPageContent;