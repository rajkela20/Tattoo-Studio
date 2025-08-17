const TattooGrid = ({ images, onImageSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {images.map((img) => (
        <div 
          key={img.id}
          onClick={() => onImageSelect(img)}
          className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer"
        >
          <img
            src={img.src}
            alt={`Tattoo ${img.id}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
            <span className="text-white font-medium">{img.category}</span>
          </div>
        </div>
      ))}
    </div>
  );
};