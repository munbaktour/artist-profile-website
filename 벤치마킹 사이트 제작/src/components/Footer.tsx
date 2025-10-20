import { Instagram, Facebook, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h4 className="mb-4 tracking-wider">KWANHOONARTE</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Connecting Eastern and Western contemporary art since 1993
            </p>
          </div>

          <div>
            <h5 className="mb-4 tracking-wide">QUICK LINKS</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#exhibitions" className="hover:text-white transition-colors">
                  Exhibitions
                </a>
              </li>
              <li>
                <a href="#artists" className="hover:text-white transition-colors">
                  Artists
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-4 tracking-wide">VISIT US</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Seoul</li>
              <li>Hong Kong</li>
              <li>Shanghai</li>
            </ul>
          </div>

          <div>
            <h5 className="mb-4 tracking-wide">FOLLOW US</h5>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-gray-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-gray-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; 2025 kwanhoonarte. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
