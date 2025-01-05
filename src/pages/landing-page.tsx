import AppSlot from '@/components/app-slot'
import Slideshow from '@/components/layouts/landing-slideshow'

const LandingPage = ({title}: any) => {
  return (
    <AppSlot title={title}>
      <Slideshow />
    </ AppSlot>
  )
}

export default LandingPage