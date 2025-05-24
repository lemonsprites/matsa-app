// import { useSpring, animated } from 'react-spring';
import TestimoniRotor from '@/components/matsa/landing/profil/components/testimoni-rotor';
import Image from 'next/image';

import { FaBullseye } from 'react-icons/fa';

const ProfilVisi = () => {
    //   const props = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 1000 } });

    return (
        <section className='relative matsa-wrapper justify-center mt-10 grid grid-cols-3 px-8'>
            <Image src="/img/visi-misi.jpg" width={400} height={500} alt='visi-misi-restra-2019-2025' layout='responsive' className='col-span-2 rounded-xl -mt-20' />
            <div className=' rounded-tr-xl relative px-4 rounded-br-xl truncate -ml-5 -z-20'>
                <div className='absolute bottom-20 left-0 h-fit w-full px-8'>
                    <TestimoniRotor />

                </div>
            </div>
        </section>
    );
};

export default ProfilVisi;

const missions = [
    'Meningkatkan kualitas pendidikan dan pembelajaran.',
    'Membentuk karakter siswa yang berakhlak mulia.',
    'Menyediakan fasilitas yang mendukung perkembangan potensi siswa.',
    'Menumbuhkan rasa cinta tanah air dan nilai-nilai kebangsaan.',
    'Mendorong kreativitas dan inovasi di bidang teknologi dan seni.'
];