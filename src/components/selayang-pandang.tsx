import { Badge } from "@/components/ui/badge";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SelayangPandang = () => {
  const textRef = useRef(null);
  const videoRef = useRef(null);

  const textInView = useInView(textRef, { once: false });
  const videoInView = useInView(videoRef, { once: false });

  return (
    <div className="matsa-wrapper grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 py-8 px-4 sm:px-8 lg:py-16">
      {/* Header Section */}
      <motion.div
        className="flex justify-center items-center flex-col col-span-1 sm:col-span-2 lg:col-span-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Badge>MTsN 1 Ciamis</Badge>
        </motion.div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 text-center">
          Selayang Pandang
        </h1>
      </motion.div>

      {/* Text Content Section */}
      <motion.div
        className="col-span-1 lg:col-span-2 text-justify leading-relaxed"
        ref={textRef}
        initial={{ opacity: 0, x: -50 }}
        animate={textInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p>
          MTsN 1 Ciamis berdiri sebagai lembaga pendidikan yang berupaya
          mencetak generasi muda berkarakter Islami, unggul dalam ilmu
          pengetahuan, dan kompeten di era modern. Dengan memadukan kurikulum
          nasional dan nilai-nilai keislaman, madrasah ini menawarkan pendidikan
          yang komprehensif dan menyeluruh. Peserta didik dibekali dengan
          pemahaman agama yang mendalam, kemampuan akademik yang solid, serta
          keterampilan abad ke-21 yang relevan untuk menjawab tantangan global.
        </p>
        <br />
        <p>
          Dalam mendukung pembelajaran yang optimal, MTsN 1 Ciamis menyediakan
          lingkungan belajar yang kondusif serta fasilitas modern yang memadai.
          Program unggulan seperti penguatan literasi Al-Qur'an, pelatihan sains
          dan teknologi, serta pengembangan soft skills melalui berbagai
          kegiatan ekstrakurikuler menjadi prioritas utama. Dengan bimbingan
          tenaga pendidik yang profesional dan berpengalaman, peserta didik
          diarahkan untuk mengembangkan potensi terbaiknya baik dalam aspek
          intelektual, spiritual, maupun sosial.
        </p>
      </motion.div>

      {/* Video Section */}
      <motion.div
        className="col-span-1 lg:col-span-2 flex items-center justify-center rounded-md relative"
        ref={videoRef}
        initial={{ opacity: 0, x: 50 }}
        animate={videoInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <iframe
          className="block rounded-lg w-full h-48 sm:h-64 lg:h-80 xl:h-[315px]"
          src="https://www.youtube.com/embed/SbBGXt9sW2s"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </motion.div>
    </div>
  );
};

export default SelayangPandang;
