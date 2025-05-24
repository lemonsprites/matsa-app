import AgendaSection from '@/app/(public)/program-kegiatan/agenda';
import TimelineSection from '@/app/(public)/program-kegiatan/journey-list';
import FeaturedActivities from '@/app/(public)/program-kegiatan/kegiatan-list';
import SchoolProgramsSection from '@/app/(public)/program-kegiatan/program-list';
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
