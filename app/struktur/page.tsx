
import StrukturOrganisasi from '@/app/struktur/struktur-konten'
import LandingComponent from '@/components/matsa/landing/landing-component'
import { NextPage } from 'next'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <LandingComponent>
        <StrukturOrganisasi></StrukturOrganisasi>
    </LandingComponent>
  )
}

export default Page