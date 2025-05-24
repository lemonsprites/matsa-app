import BudgetPerformance from '@/app/(landing)/kinerja/anggaran-konten'
import KPIMadrasah from '@/app/(landing)/kinerja/kinerja-konten'
import LandingComponent from '@/components/matsa/landing/landing-component'
import { NextPage } from 'next'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <LandingComponent className='matsa-wrapper px-4'>
        <KPIMadrasah/>
        <BudgetPerformance/>
    </LandingComponent>
  )
}

export default Page