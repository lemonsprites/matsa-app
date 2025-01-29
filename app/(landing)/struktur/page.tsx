import LandingComponent from '@/components/matsa/landing/landing-component'
import { NextPage } from 'next'

interface Props { }

const StrukturPage: NextPage<Props> = async ({ }) => {
    return (
        <LandingComponent>
            <div className="container mx-auto p-6">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Struktur Organisasi MTsN 1 Ciamis</h2>
                <div className="flex justify-center">
                    <div className="space-y-8">
                        {/* Ketua */}
                        <div className="flex justify-center">
                            <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-semibold text-center">Kepala Sekolah</h3>
                                <p className="mt-2 text-center">Nama Kepala Sekolah</p>
                            </div>
                        </div>

                        {/* Bagian 1 */}
                        <div className="flex justify-center space-x-8">
                            <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-semibold text-center">Wakil Kepala Sekolah 1</h3>
                                <p className="mt-2 text-center">Nama Wakil 1</p>
                            </div>
                            <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-semibold text-center">Wakil Kepala Sekolah 2</h3>
                                <p className="mt-2 text-center">Nama Wakil 2</p>
                            </div>
                        </div>

                        {/* Bagian 2 */}
                        <div className="flex justify-center space-x-8">
                            <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-semibold text-center">Kepala Bidang Kurikulum</h3>
                                <p className="mt-2 text-center">Nama Kepala Bidang</p>
                            </div>
                            <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-semibold text-center">Kepala Bidang Kesiswaan</h3>
                                <p className="mt-2 text-center">Nama Kepala Bidang</p>
                            </div>
                        </div>

                        {/* Bagian 3 */}
                        <div className="flex justify-center space-x-8">
                            <div className="bg-red-500 text-white p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-semibold text-center">Kepala Tata Usaha</h3>
                                <p className="mt-2 text-center">Nama Kepala TU</p>
                            </div>
                            <div className="bg-red-500 text-white p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-semibold text-center">Kepala Laboratorium</h3>
                                <p className="mt-2 text-center">Nama Kepala Lab</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LandingComponent>
    )
}

export default StrukturPage