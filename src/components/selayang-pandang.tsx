import { Badge } from '@/components/ui/badge'

const SelayangPandang = () => {
    return (
        <div className='matsa-wrapper grid grid-cols-4 gap-12 py-16'>
            <div className='flex justify-center items-center flex-col col-span-4'>
                <Badge>MTsN 1 Ciamis</Badge>
                <h1 className='text-4xl font-bold mt-2'>Selayang Pandang</h1>
            </div>

            <div className="col-span-2 text-justify leading-relaxed">
                <p>
                    MTsN 1 Ciamis berdiri sebagai lembaga pendidikan yang berupaya mencetak generasi muda berkarakter Islami, unggul dalam ilmu pengetahuan, dan kompeten di era modern. Dengan memadukan kurikulum nasional dan nilai-nilai keislaman, madrasah ini menawarkan pendidikan yang komprehensif dan menyeluruh. Peserta didik dibekali dengan pemahaman agama yang mendalam, kemampuan akademik yang solid, serta keterampilan abad ke-21 yang relevan untuk menjawab tantangan global.</p>
                <br />
                <p>
                    Dalam mendukung pembelajaran yang optimal, MTsN 1 Ciamis menyediakan lingkungan belajar yang kondusif serta fasilitas modern yang memadai. Program unggulan seperti penguatan literasi Al-Qur'an, pelatihan sains dan teknologi, serta pengembangan soft skills melalui berbagai kegiatan ekstrakurikuler menjadi prioritas utama. Dengan bimbingan tenaga pendidik yang profesional dan berpengalaman, peserta didik diarahkan untuk mengembangkan potensi terbaiknya baik dalam aspek intelektual, spiritual, maupun sosial.</p>

            </div>

            <div className="col-span-2 flex items-center justify-center truncate rounded-md relative">
                <iframe className='block rounded-lg truncate'
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/VIDEO_ID"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
                </iframe>
            </div>
        </div>
    )
}

export default SelayangPandang