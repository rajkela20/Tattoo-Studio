import Hero from '../components/Hero';
import { SparklesIcon, ArrowPathIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <Hero />

      {/* Dark-themed Services Section */}
<section className="py-16 px-4 max-w-8xl mx-auto bg-gray-950">
  {/* Section Header */}
  <div className="text-center mb-16">
    <h2 className="text-4xl font-bold text-white mb-4">
      <span className="text-red-600"></span> Our Services
    </h2>
    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
      Where art meets skin—tailored to your vision, crafted with precision.
    </p>
  </div>

  {/* Services Cards */}
  <div className="grid md:grid-cols-3 gap-6">
    {[
      {
        title: "Custom Tattoos",
        description: "Unique designs created just for you",
        icon: <SparklesIcon className="h-6 w-6 text-white" />,
        bgClass: "bg-gray-900"
      },
      {
        title: "Cover Ups",
        description: "Transform old tattoos into new art",
        icon: <ArrowPathIcon className="h-6 w-6 text-white" />,
        bgClass: "bg-gray-800"
      },
      {
        title: "Consultations",
        description: "Free 30-minute design consultations",
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

      {/* Artist Spotlight */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="md:flex items-center gap-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src="/artist.jpg" 
                alt="Tattoo Artist" 
                className="rounded-lg shadow-xl w-full h-auto max-h-[500px] object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Meet Your Artist</h2>
              <p className="text-lg mb-6 text-gray-300">
                With over 30 years of experience in fine art and tattooing.
              </p>
              <div className="space-y-4">
                {[
                  "Certified Professional Artist",
                  "Sterile, Single-Use Needles",
                  "Comfortable Studio Environment"
                ].map((item, i) => (
                  <div key={i} className="flex items-center">
                    <span className="text-red-400 mr-2">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-red-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready for Your New Tattoo?</h2>
          <p className="text-xl mb-8">
            Book a consultation today and let's create something amazing together.
          </p>
          <a 
            href="/booking" 
            className="inline-block bg-white text-red-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Book Now
          </a>
        </div>
      </section>
    </div>
  );
}