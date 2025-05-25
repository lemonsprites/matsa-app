
import PrestasiMasonry from '@/app/(public)/prestasi/prestasi-konten'
import LandingComponent from '@/components/matsa/landing/landing-component'
import { NextPage } from 'next'

interface Props { }

const PrestasiPage: NextPage<Props> = ({ }) => {
    return (
        <LandingComponent className='matsa-wrapper px-4'>
            <PrestasiMasonry />
        </LandingComponent>
    )
}

export default PrestasiPage