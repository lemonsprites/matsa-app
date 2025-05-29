import AlumniDashboard from '@/app/(public)/alumni/alumni-konten'
import LandingComponent from '@/components/matsa/landing/landing-component'
import { NextPage } from 'next'

interface Props { }

const Page: NextPage<Props> = ({ }) => {
    return (
        <LandingComponent className="px-4 matsa-wrapper">
            <AlumniDashboard />
        </LandingComponent>
    )
}

export default Page