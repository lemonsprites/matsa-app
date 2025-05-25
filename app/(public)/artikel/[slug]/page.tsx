import LandingComponent from '@/components/matsa/landing/landing-component'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { estimasiMembaca } from '@/lib/helper/estimasi-membaca'
import { formatTanggal } from '@/lib/helper/format-tanggal'
import { createClient } from '@/lib/supabase-client'
import { Tag } from '@/lib/type/tag-type'
import Link from 'next/link'
import Script from 'next/script'
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm"



type Props = {
    params: Promise<{ slug: string | null }>
}


async function Page({ params }: Props) {

    const supabase = createClient()
    const slug = (await params).slug
    const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    try {
        // Fetch the article
        const { data, error } = await supabase.from('artikel').select('id').eq('slug', slug).single()
        if (error) {
            console.error('Error fetching article:', error.message)
            return (
                <div>Failed to load the article. Please try again later.</div>
            )
        }

        const artikel = await fetch(`${baseURL}/api/artikel/${data?.id}`);
        const artikelData = await artikel.json();
       


        // // Fetch tags for the article
        // const { data: tags, error: tagsError } = await supabase
        //     .from('artikel_tag')
        //     .select('tb_tag(id, tag, tag_slug)')
        //     .eq('artikel_id', article.id)

        // if (tagsError) {
        //     console.error('Error fetching tags:', tagsError)
        // }

        // const formattedTags = tags?.map((item: any) => item.tb_tag) || [];

        const jsonLd = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": artikelData.judul,
            "description": artikelData.deskripsi,
            "image": artikelData.thumbnail_url,
            "author": {
                "@type": "Person",
                // @ts-ignore
                // "name": artikelData.penulis.nama,
            },
            "datePublished": artikelData.created_at,
            "dateModified": artikelData.updated_at,
        };

        return (
            <LandingComponent>

                <div
                    className="my-8 px-4 md:px-8 max-w-screen-md mx-auto"

                >
                    <div
                        id="artikel"
                        className="text-left"
                    >
                        <div id="artikelHeader" className="mb-6">
                            <h1 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
                                {artikelData?.judul}
                            </h1>
                            <div id="metadata" className="text-sm flex flex-col md:flex-row justify-between mt-4">
                                <div className="flex space-x-4 items-center mb-2 md:mb-0 md:w-full">
                                    <Avatar className="shadow-md">
                                        <AvatarImage src="https://github.com/lemonsprites.png" alt="@shadcn" />
                                        <AvatarFallback>LS</AvatarFallback>
                                    </Avatar>
                                    <div className="w-full md:flex md:justify-between">
                                        <div className="flex flex-col">
                                            <span>{formatTanggal(artikelData?.created_at)}</span>
                                            <span>
                                                Ditulis oleh{' '}
                                                <Link className="author text-blue-600" href={`${baseURL}/profil/${artikelData?.penulis?.id}`}>
                                                    {artikelData.penulis?.nama ?? ''}
                                                </Link>
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-start md:items-end">
                                            <span>
                                                Estimasi waktu membaca{' '}
                                                <u>
                                                    <b>{artikelData?.konten ? estimasiMembaca(artikelData.konten) : 'Content is unavailable'}</b>
                                                </u>
                                            </span>
                                            <span>
                                                Direview oleh{' '}
                                                <Link className="author text-blue-600" href="https://www.google.com">
                                                    {/* {artikelData.author?.display_name ?? ''} */}
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
                            {artikelData?.konten}
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
                                {artikelData?.tags && artikelData?.tags.length > 0 ? (
                                    artikelData.tags.map((tag: Tag, index: number) => (
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
                <Script
                    id="json-ld"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </LandingComponent>
        )
    } catch (err) {
        console.error('Error fetching article:', err)
        return (
            <div>Something went wrong. Please try again later.</div>
        )
    }
}

export default Page;


export async function generateMetadata({ params }: Props) {
    const supabase = createClient()
    const slug = (await params).slug
    const baseURL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    try {
        // Fetch the article
        const { data, error } = await supabase.from('artikel').select('id').eq('slug', slug).single()
        if (error) {
            console.error('Error fetching article:', error.message)
            return (
                <div>Failed to load the article. Please try again later.</div>
            )
        }

        const artikel = await fetch(`${baseURL}/api/artikel/${data?.id}`);
        const artikelData = await artikel.json();

        if (error || !artikelData) {
            console.error('Error fetching article for metadata:', error);
            return {
                title: `Artikel | ${artikelData.judul}`,
            };
        }

        return {
            title: `MTsN 1 Ciamis | ${artikelData.judul}`,
            description: artikelData.deskripsi,
            openGraph: {
                title: artikelData.judul,
                description: artikelData.deskripsi,
                images: [
                    {
                        url: artikelData.thumbnail_url || "/default-thumbnail.jpg",
                        width: 1200,
                        height: 630,
                        alt: artikelData.slug,
                    },
                ],
                type: "article",
            },
            twitter: {
                card: "summary_large_image",
                title: artikelData.judul,
                description: artikelData.deskripsi,
                images: [artikelData.thumbnail_url || "/default-thumbnail.jpg"],
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: `Artikel - ${slug}`,
        };
    }
}