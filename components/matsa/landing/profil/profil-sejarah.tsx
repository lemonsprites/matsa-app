// import { useSpring, } from 'react-spring';
import { FaBullseye } from 'react-icons/fa';

import Image from 'next/image'; // Menggunakan Next.js Image untuk optimasi gambar
import ReactMarkdown from "react-markdown";


const ProfilSejarah = () => {
    //   const props = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 1000 } });

    return (
        <section className='my-8'>
            <div className='h-16 flex flex-col gap-3 my-10 items-center justify-center text-4xl font-bold'>
                <div className='bg-yellow-200 block text-xl px-5 py-2'>We are Proudly To Be Part</div>
                <h1>Madrasah Negeri 1 Ciamis Kab. Ciamis</h1>
            </div>

            <div className='bg-slate-200 min-h-[240px] rounded-md truncate'>
                <Image src="/img/profil-banner.png" layout='responsive' width={1136} height={240} alt='profil-banner'/>
            </div>

            <div className='grid grid-cols-5 mt-5 gap-10'>
                <div className='paragraf col-span-3 markdown-content prose max-w-full text-gray-800'>
                    <h1 className='text-4xl font-bold mb-5 pt-10'>Gambaran Umum</h1>
                    <ReactMarkdown>
                        {`Madrasah Tsanawiyah Negeri 1 Ciamis, yang sering disingkat MTsN 1 Ciamis, merupakan salah satu lembaga pendidikan formal yang berada di Kabupaten Ciamis, Jawa Barat. Sekolah ini berdiri dengan tujuan untuk mencetak generasi muda yang tidak hanya unggul dalam bidang akademik, tetapi juga memiliki akhlak yang mulia dan siap menghadapi tantangan global.
                        
Sebagai lembaga pendidikan, MTsN 1 Ciamis juga turut serta dalam pengembangan karakter siswa dengan mengedepankan nilai-nilai keislaman, kedisiplinan, serta keterampilan hidup yang berguna bagi masa depan. Dengan komitmen yang kuat, MTsN 1 Ciamis terus berusaha menjadi pusat pendidikan yang unggul dan berwawasan luas di tengah masyarakat.`}
                    </ReactMarkdown>
                </div>

                <div className='ilustrasi col-span-2 gap-5 relative justify-center bg-teal-500 px-4 pt-8  truncate flex items-end rounded-2xl'>
                    <Image src="/img/pic-ibu-ibu-1.png" alt='Tim MTsN 1 Ciamis' width={500} height={1080} className='-mb-10' />
                </div>
            </div>
        </section>
    );
};

export default ProfilSejarah;
