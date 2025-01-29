// components/PtkByLevel.js

import LandingComponent from "@/components/matsa/landing/landing-component";

const PtkByLevel = async () => {
    const ptkData = [
        {
            name: 'Drs. Ahmad Junaedi',
            level: 'Kepala Sekolah',
            position: 'Kepala Sekolah',
            education: 'S2 Pendidikan Agama Islam',
            imageUrl: '/images/ahmad.jpg',
        },
        {
            name: 'Siti Aminah, M.Pd.',
            level: 'Tata Usaha',
            position: 'Kepala Tata Usaha',
            education: 'S1 Administrasi Pendidikan',
            imageUrl: '/images/siti.jpg',
        },
        {
            name: 'Budi Santoso, S.Pd.',
            level: 'Wakil Kepala Sekolah',
            position: 'Wakil Kepala Sekolah 1',
            education: 'S1 Pendidikan Matematika',
            imageUrl: '/images/budi.jpg',
        },
        {
            name: 'Rina Puspita, S.Si.',
            level: 'Guru',
            position: 'Guru Fisika',
            education: 'S1 Pendidikan Fisika',
            imageUrl: '/images/rina.jpg',
        },
        {
            name: 'Andi Wijaya, S.T.',
            level: 'Guru',
            position: 'Guru Teknologi Informasi',
            education: 'S1 Teknologi Informasi',
            imageUrl: '/images/andi.jpg',
        },
        {
            name: 'Dewi Lestari, M.Pd.',
            level: 'Wakil Kepala Sekolah',
            position: 'Wakil Kepala Sekolah 2',
            education: 'S1 Pendidikan Bahasa Inggris',
            imageUrl: '/images/dewi.jpg',
        },
        // Add more PTK data here
    ];

    // Group PTK by level
    const groupedByLevel = ptkData.reduce((acc: any, ptk) => {
        if (!acc[ptk.level]) {
            acc[ptk.level] = [];
        }
        acc[ptk.level].push(ptk);
        return acc;
    }, {});

    return (
        <LandingComponent>
            <div className="matsa-wrapper mx-auto px-8 p-6">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Pendidik dan Tenaga Kependidikan (PTK) MTsN 1 Ciamis</h2>

                {/* Loop through each level */}
                {Object.keys(groupedByLevel).map((level) => (
                    <div key={level} className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">{level}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {groupedByLevel[level].map((ptk: any, index: number) => (
                                <div
                                    key={index}
                                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    <img
                                        src={ptk.imageUrl}
                                        alt={ptk.name}
                                        className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                                    />
                                    <h4 className="text-lg font-semibold text-center text-gray-800">{ptk.name}</h4>
                                    <p className="text-xs text-center text-gray-600">{ptk.position}</p>
                                    <p className="text-xs text-center text-gray-500">{ptk.education}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>
        </LandingComponent>
    );
};

export default PtkByLevel;
