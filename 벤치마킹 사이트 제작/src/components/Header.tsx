import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { PageType, LanguageType } from '../App';

interface HeaderProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
}

export function Header({ currentPage, setCurrentPage, language, setLanguage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems: { name: string; page: PageType }[] = [
    { name: 'ABOUT kwanhoonarte', page: 'about' },
    { name: 'ARTISTS', page: 'artists' },
    { name: 'EXHIBITION', page: 'exhibitions' },
    { name: 'FAIRS', page: 'fairs' },
    { name: 'NEWS', page: 'news' },
    { name: 'CONTACT', page: 'contact' },
  ];

  // Handle scroll for header background
  useState(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white border-b border-gray-200' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => handleNavigate('home')}
            className="tracking-wider hover:text-gray-600 transition-colors"
          >
            KWANHOONARTE
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigate(item.page)}
                className={`tracking-wider text-xs transition-colors ${
                  currentPage === item.page ? 'text-black' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Language Toggle - Desktop */}
          <div className="hidden lg:flex items-center gap-2 text-xs tracking-wider">
            <button 
              onClick={() => setLanguage('kr')}
              className={`transition-colors ${
                language === 'kr' ? 'text-black font-bold' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              KR
            </button>
            <span className="text-gray-300">|</span>
            <button 
              onClick={() => setLanguage('en')}
              className={`transition-colors ${
                language === 'en' ? 'text-black font-bold' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-6 pb-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigate(item.page)}
                className={`tracking-wider text-sm text-left transition-colors ${
                  currentPage === item.page ? 'text-black' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {item.name}
              </button>
            ))}
            <div className="flex items-center gap-2 text-sm tracking-wider mt-2">
              <button 
                onClick={() => setLanguage('kr')}
                className={`transition-colors ${
                  language === 'kr' ? 'text-black font-bold' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                KR
              </button>
              <span className="text-gray-300">|</span>
              <button 
                onClick={() => setLanguage('en')}
                className={`transition-colors ${
                  language === 'en' ? 'text-black font-bold' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                EN
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
