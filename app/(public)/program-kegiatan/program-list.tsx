"use client"

const schoolPrograms = [
  {
    title: "Tahfidz",
    icon: "📖",
    description: "Program penghafalan Al-Qur’an untuk membentuk karakter spiritual siswa.",
  },
  {
    title: "Pembiasaan Pagi",
    icon: "⏰",
    description: "Kegiatan rutin pagi untuk menanamkan kedisiplinan dan kebiasaan positif.",
  },
  {
    title: "Senam Pagi",
    icon: "🤸‍♂️",
    description: "Senam bersama untuk menjaga kesehatan dan kebugaran jasmani siswa.",
  },
  {
    title: "P5RA",
    icon: "🌱",
    description: "Program Pengembangan Perilaku Peduli dan Bertanggung Jawab terhadap Alam.",
  },
  {
    title: "Adiwiyata",
    icon: "🌿",
    description: "Gerakan sekolah peduli dan berbudaya lingkungan hidup.",
  },
  {
    title: "Bank Sampah",
    icon: "♻️",
    description: "Inisiatif pengelolaan sampah untuk mendukung kebersihan dan kelestarian lingkungan.",
  },
];

export default function SchoolProgramsSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-extrabold text-center text-green-800 mb-10">
        Program Unggulan MTSN 1 Ciamis
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {schoolPrograms.map(({ title, icon, description }) => (
          <div
            key={title}
            className="group bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transform transition-transform duration-300">
              {icon}
            </div>
            <h3 className="text-xl font-semibold text-green-700 mb-2 group-hover:text-green-900 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
