import { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import tet1 from '../tattoos/tet1.JPG';
import tet2 from '../tattoos/tet2.JPG';
import tet3 from '../tattoos/tet3.JPG';
import tet4 from '../tattoos/tet4.jpg';
import tet5 from '../tattoos/tet5.JPG';
import tet6 from '../tattoos/tet6.JPG';
import tet7 from '../tattoos/tet7.JPG';
import tet8 from '../tattoos/tet8.JPG';
import tet9 from '../tattoos/tet9.jpg';
import tet10 from '../tattoos/tet10.JPG';
import tet11 from '../tattoos/tet11.JPG';
import tet12 from '../tattoos/tet12.JPG';
import tet13 from '../tattoos/tet13.JPG';
import tet14 from '../tattoos/tet14.JPG';
import tet15 from '../tattoos/tet15.JPG';

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const tattooImages = [
    { id: 1, src: tet1, category: 'Sleeves' },
    { id: 2, src: tet2, category: 'Blackwork' },
    { id: 3, src: tet3, category: 'Realism' },
    { id: 4, src: tet4, category: 'Minimalist' },
    { id: 5, src: tet5, category: 'Geometric' },
    { id: 6, src: tet6, category: 'Watercolor' },
    { id: 7, src: tet7, category: 'Sleeves' },
    { id: 8, src: tet8, category: 'Blackwork' },
    { id: 9, src: tet9, category: 'Realism' },
    { id: 10, src: tet10, category: 'Minimalist' },
    { id: 11, src: tet11, category: 'Geometric' },
    { id: 12, src: tet12, category: 'Watercolor' },
    { id: 13, src: tet13, category: 'Watercolor' },
    { id: 14, src: tet14, category: 'Watercolor' },
    { id: 15, src: tet15, category: 'Watercolor' },
  ];

  return (
    <section className="bg-gray-950 py-16 px-4">
      {/* Gallery Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Naši Radovi</h2>
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
             style={{ minHeight: "300px" }}
            onClick={() => setSelectedImg(img)}
          >
            <img
              src={img.src}
              alt={`Tattoo ${img.id}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
          console.error('Failed to load:', img.src);
        e.target.style.display = 'none'; 
        }}
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