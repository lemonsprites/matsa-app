import AgendaSection from '@/app/program-kegiatan/agenda';
import TimelineSection from '@/app/program-kegiatan/journey-list';
import FeaturedActivities from '@/app/program-kegiatan/kegiatan-list';
import SchoolProgramsSection from '@/app/program-kegiatan/program-list';
import LandingComponent from '@/components/matsa/landing/landing-component';

export default function InteractivePrograms() {

    return (
        <>
            <LandingComponent>
                <AgendaSection />
                <div className='grid grid-cols-1 md:grid-cols-2 matsa-wrapper '>
                    <FeaturedActivities />
                    <div>section</div>
                </div>
                <SchoolProgramsSection />

                <TimelineSection />
            </LandingComponent >
        </>
    );
}
