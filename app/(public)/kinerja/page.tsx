
import KPIMadrasah from '@/app/(public)/kinerja/kinerja-konten'
import LandingComponent from '@/components/matsa/landing/landing-component'
import { NextPage } from 'next'

interface Props { }

const Page: NextPage<Props> = ({ }) => {
  return (
    <LandingComponent className='matsa-wrapper px-4'>
      <KPIMadrasah />
    </LandingComponent>
  )
}

export default Page