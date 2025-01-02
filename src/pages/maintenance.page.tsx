import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const MaintenantePage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="animation-container">
                {/* Video Element for the WebM Animation */}
                <DotLottieReact
                    src="https://lottie.host/f8da7b3a-ebcf-4a64-9458-23b7dbeae791/NXdlGaaF3H.lottie"
                    loop
                    style={{ width: '340px', height: '340px' }}
                    autoplay
                />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mt-4">
                Kami sedang melakukan pemeliharaan!
            </h1>
            <p className="text-lg text-gray-600 mt-2">
                Silahkan tunggu, kami sedang memperbaiki fasilitas layanan!
            </p>
        </div>
    )
}

export default MaintenantePage