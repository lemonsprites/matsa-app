import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const MaintenancePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-xs sm:max-w-[540px]">
                {/* Video Element for the WebM Animation */}
                <DotLottieReact
                    src="https://lottie.host/f8da7b3a-ebcf-4a64-9458-23b7dbeae791/NXdlGaaF3H.lottie"
                    loop
                    style={{ width: "100%", height: "auto" }}
                    autoplay
                />
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mt-6 text-center">
                Kami sedang melakukan pemeliharaan!
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mt-4 text-center">
                Silahkan tunggu, kami sedang memperbaiki fasilitas layanan!
            </p>
        </div>
    );
};

export default MaintenancePage