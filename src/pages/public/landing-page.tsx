import AppSlot from '@/components/app-slot'
import KontenArtikel from '@/components/konten-artikel'
import Slideshow from '@/components/layouts/landing-slideshow'
import SelayangPandang from '@/components/selayang-pandang'
import StatistikLembaga from '@/components/statistik-lembaga'

const LandingPage = ({title}: any) => {

  return (
    <AppSlot title={title}>
      <Slideshow />
      <SelayangPandang />
      <KontenArtikel />
      <StatistikLembaga />
    </ AppSlot>
  )
}

export default LandingPage