
import CalendarTimeline from '@/app/(public)/berita/calendar-timeline'
import LandingComponent from '@/components/matsa/landing/landing-component'
import { NextPage } from 'next'

interface Props {}

const BeritaPage: NextPage<Props> = ({}) => {
  return (
    <LandingComponent className='p-6'>
        <CalendarTimeline></CalendarTimeline>
    </LandingComponent>
  )
}

export default BeritaPage