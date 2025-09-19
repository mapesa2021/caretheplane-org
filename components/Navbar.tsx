import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-3">
          {/* Logo - Far Left */}
          <Link href="/" className="flex items-center space-x-2">
            <div 
              className="w-8 h-8 bg-[#1abc9c] rounded-full flex items-center justify-center cursor-pointer"
            >
              <span className="text-white font-bold text-lg">🌱</span>
            </div>
            <span className="text-xl font-bold text-[#1abc9c]">CareThePlanet</span>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-[#1abc9c] transition-colors duration-200 font-medium relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1abc9c] transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-[#1abc9c] transition-colors duration-200 font-medium relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1abc9c] transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/projects" 
              className="text-gray-700 hover:text-[#1abc9c] transition-colors duration-200 font-medium relative group"
            >
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1abc9c] transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-700 hover:text-[#1abc9c] transition-colors duration-200 font-medium relative group"
            >
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1abc9c] transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-[#1abc9c] transition-colors duration-200 font-medium relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1abc9c] transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </div>

          {/* CTA Button - Far Right */}
          <div className="hidden md:block">
            <button className="bg-[#1abc9c] hover:bg-[#16a085] text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2">
              <span className="text-white">🌳</span>
              <span className="text-white">PLANT A TREE</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-[#1abc9c] hover:bg-gray-100 transition-colors duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-[#1abc9c] transition-colors duration-200 font-medium px-4 py-2 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-[#1abc9c] transition-colors duration-200 font-medium px-4 py-2 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/projects"
                className="text-gray-700 hover:text-[#1abc9c] transition-colors duration-200 font-medium px-4 py-2 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-[#1abc9c] transition-colors duration-200 font-medium px-4 py-2 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-[#1abc9c] transition-colors duration-200 font-medium px-4 py-2 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <button className="bg-[#1abc9c] hover:bg-[#16a085] text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 mt-4">
                <span className="text-white">🌳</span>
                <span className="text-white">PLANT A TREE</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 