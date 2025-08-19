import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative bg-black text-white h-screen min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg" 
          alt="Tattoo studio interior"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-2 font-serif tracking-tight">
            INKMASTERS
          </h1>
          
          <div className="w-24 h-1 bg-red-600 mx-auto my-6"></div>
          <h2 className="text-xl md:text-2xl font-medium text-gray-300 mb-8">
            CUSTOM TATTOO STUDIO
          </h2>

         
<div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg max-w-md mx-auto mb-10 border border-gray-800">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
    <div className="min-w-[120px]">
      <h3 className="text-red-500 font-semibold mb-2">ADRESA</h3>
      <p className="whitespace-nowrap">Novi Bečej</p>
      <p className="whitespace-nowrap">Zmaj Jovina 39.</p>
    </div>
    <div className="min-w-[140px]">
      <h3 className="text-red-500 font-semibold mb-2">KONTAKT</h3>
      <p className="whitespace-nowrap">+381 63 3514 438</p>
      <p className="whitespace-nowrap">+385 92 44 0811</p>
    </div>
    <div className="min-w-[120px]">
      <h3 className="text-red-500 font-semibold mb-2">RADNO VREME</h3>
      <p className="whitespace-nowrap">KONTAKT</p>
    </div>
  </div>
</div>

          <Link
            to="/booking"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-10 py-4 text-lg font-bold uppercase tracking-wider transition-colors duration-300 shadow-lg"
          >
            ZAKAŽITE TERMIN
          </Link>
        </div>
      </div>
    </div>
  );
}