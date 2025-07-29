import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-black/30 backdrop-blur-sm border-b border-gray-800/50 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo - Kept your original styling */}
          <Link to="/" className="text-2xl font-bold text-white">
            INK STUDIO RANKO
          </Link>

          {/* Desktop Navigation - Enhanced hover effects */}
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="text-white hover:text-red-400 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/gallery" 
              className="text-white hover:text-red-400 transition-colors"
            >
              Gallery
            </Link>
            <Link 
              to="/booking" 
              className="text-white hover:text-red-400 transition-colors"
            >
              Booking
            </Link>
            <Link 
              to="/contact" 
              className="text-white hover:text-red-400 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button - Same as your original */}
          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu - Improved styling */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 mt-4 rounded-lg py-2">
            <div className="flex flex-col space-y-3 px-4">
              <Link 
                to="/" 
                className="text-white py-3 border-b border-gray-800 hover:text-red-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/gallery" 
                className="text-white py-3 border-b border-gray-800 hover:text-red-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                to="/booking" 
                className="text-white py-3 border-b border-gray-800 hover:text-red-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Booking
              </Link>
              <Link 
                to="/contact" 
                className="text-white py-3 hover:text-red-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}