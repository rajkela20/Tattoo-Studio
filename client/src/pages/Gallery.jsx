import { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/solid';

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  
  // Sample tattoo images - replace with your actual images
  const tattooImages = [
    { id: 1, src: '/tattoos/tet1.jpg', category: 'Sleeves' },
    { id: 2, src: '/tattoos/tet2.jpg', category: 'Blackwork' },
    { id: 3, src: '/tattoos/tet3.jpg', category: 'Realism' },
    { id: 4, src: '/tattoos/tet4.jpg', category: 'Minimalist' },
    { id: 5, src: '/tattoos/tet4.jpg', category: 'Geometric' },
    { id: 6, src: '/tattoos/tet5.jpg', category: 'Watercolor' },
    { id: 6, src: '/tattoos/tet6.jpg', category: 'Watercolor' },
    { id: 6, src: '/tattoos/tet7.jpg', category: 'Watercolor' },
    { id: 6, src: '/tattoos/tet8.jpg', category: 'Watercolor' },
    { id: 6, src: '/tattoos/tet9.jpg', category: 'Watercolor' },
    { id: 6, src: '/tattoos/tet10.jpg', category: 'Watercolor' },
    { id: 6, src: '/tattoos/tet11.jpg', category: 'Watercolor' },
    { id: 6, src: '/tattoos/tet12.jpg', category: 'Watercolor' },
    { id: 6, src: '/tattoos/tet13.jpg', category: 'Watercolor' },
    { id: 6, src: '/tattoos/tet14.jpg', category: 'Watercolor' },
    { id: 6, src: '/tattoos/tet15.jpg', category: 'Watercolor' },
  ];

  return (
    <section className="bg-gray-950 py-16 px-4">
      {/* Gallery Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Naši Radovi</h2>
        <p className="text-xl text-gray-300">
          Pogledajte naše najbolje tetovaže - svaka priča je jedinstvena
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-4xl mx-auto">
        {['Sve', 'Sleeves', 'Blackwork', 'Realism', 'Minimalist', 'Geometric', 'Watercolor'].map((cat) => (
          <button
            key={cat}
            className="px-4 py-2 rounded-full bg-gray-800 text-white hover:bg-red-600 transition-colors"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {tattooImages.map((img) => (
          <div 
            key={img.id} 
            className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer"
            onClick={() => setSelectedImg(img)}
          >
            <img
              src={img.src}
              alt={`Tattoo ${img.id}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <span className="text-white font-medium text-lg">{img.category}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button 
            onClick={() => setSelectedImg(null)}
            className="absolute top-4 right-4 text-white hover:text-red-500"
          >
            <XMarkIcon className="h-8 w-8" />
          </button>
          <div className="relative max-w-4xl w-full">
            <img
              src={selectedImg.src}
              alt={`Enlarged ${selectedImg.category}`}
              className="max-h-[80vh] w-full object-contain"
            />
            <div className="text-center mt-4 text-white">
              <h3 className="text-2xl font-bold">{selectedImg.category}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;