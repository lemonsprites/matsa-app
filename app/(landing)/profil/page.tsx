import LandingComponent from '@/components/matsa/landing/landing-component'
import ProfilFasilitas from '@/components/matsa/landing/profil/profil-fasilitas'
import ProfilSejarah from '@/components/matsa/landing/profil/profil-sejarah'
import ProfilVisi from '@/components/matsa/landing/profil/profil-visi'
import { NextPage } from 'next'

interface Props { }

const ProfilPage: NextPage<Props> = async ({ }) => {
  return (
    <LandingComponent>
      <div className='matsa-wrapper px-8'>
        <ProfilSejarah />
      </div>
      <ProfilVisi />
      <ProfilFasilitas />
    </LandingComponent>
  )
}

export default ProfilPage

export async function generateMetadata() {
  return {
    title: `MTsN 1 Ciamis | Profil`,
  };
}