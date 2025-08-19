import Hero from '../components/Hero';
import { SparklesIcon, ArrowPathIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/*hero kog nema lol*/}
      <Hero />
<section className="py-16 px-4 max-w-8xl mx-auto bg-gray-950">
  <div className="text-center mb-16">
    <h2 className="text-4xl font-bold text-white mb-4">
      <span className="text-red-600"></span> Naše Usluge
    </h2>
    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
      Where art meets skin tailored to your vision, crafted with precision.
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-6">
    {[
      {
        title: "Prilagođene Tetovaže",
        description: "Jedinstveni dizajni napravljeni samo za tebe  ",
        icon: <SparklesIcon className="h-6 w-6 text-white" />,
        bgClass: "bg-gray-900"
      },
      {
        title: "Prekrivanje starih tetovaža",
        description: "Stare tetovaže pretvaramo u nove",
        icon: <ArrowPathIcon className="h-6 w-6 text-white" />,
        bgClass: "bg-gray-800"
      },
      {
        title: "Konsultacije",
        description: "Besplatne 30-minutne konsultacije o dizajnu",
        icon: <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />,
        bgClass: "bg-gray-900"
      }
    ].map((service, index) => (
      <div 
        key={index} 
        className={`${service.bgClass} group p-8 rounded-xl border border-gray-700 hover:border-red-500 transition-all duration-300`}
      >
        <div className="flex items-center mb-6">
          <div className="p-3 rounded-lg bg-gray-700 text-white mr-4 group-hover:bg-red-600 transition-colors">
            {service.icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{service.title}</h3>
            <p className="text-gray-300 mb-6">{service.description}</p>
          </div>
        </div>
        <a 
          href="/booking" 
          className="inline-flex items-center text-white hover:text-red-400 font-medium transition-colors"
        >
          Learn more
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    ))}
  </div>
</section>

     <section className="py-16 bg-gray-900 text-white">
  <div className="max-w-7xl mx-auto px-4">
    <div className="md:flex items-center gap-12">
      <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
          <img 
            src="/artist.jpg" 
            alt="Tattoo Artist" 
            className="rounded-full border-4 border-red-600 shadow-2xl w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute -inset-4 rounded-full border-2 border-gray-500 opacity-20 pointer-events-none"></div>
        </div>
      </div>

      <div className="md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif tracking-tight">
          Upoznajte svog umetnika
        </h2>
        <p className="text-lg md:text-xl mb-8 text-gray-300 leading-relaxed">
          Sa više od 30 godina iskustva u tetoviranju i savršenim osećajem za detalje.
        </p>
        <div className="space-y-4">
          {[
            "Certifikovani profesionalni umetnik",
            "Radimo sa sterilnim priborom za jednokratnu upotrebu",
            "Studio opremljen za maksimalnu udobnost"
          ].map((item, i) => (
            <div key={i} className="flex items-center group">
              <span className="text-red-400 mr-3 text-xl transition-all group-hover:text-red-500">✓</span>
              <span className="text-gray-200 group-hover:text-white transition-colors">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

      <section className="py-16 px-4 bg-red-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Spremni za novu tetovažu?</h2>
          <p className="text-xl mb-8">
              Zakažite konsultaciju već danas.
          </p>
          <a 
            href="/booking" 
            className="inline-block bg-white text-red-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Zakaži termin
          </a>
        </div>
      </section>
    </div>
  );
}