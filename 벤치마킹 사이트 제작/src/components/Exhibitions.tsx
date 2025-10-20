import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LanguageType } from '../App';

type TabType = 'current' | 'upcoming' | 'past';

interface ExhibitionsProps {
  language: LanguageType;
}

export function Exhibitions({ language }: ExhibitionsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('current');

  const exhibitions = {
    current: [
      {
        id: 1,
        title: 'CONTEMPORARY VISIONS',
        artist: 'Group Exhibition',
        date: 'October 15 - December 20, 2025',
        location: 'kwanhoonarte Seoul',
        image: 'https://images.unsplash.com/photo-1723974591057-ccadada1f283?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcnQlMjBleGhpYml0aW9ufGVufDF8fHx8MTc2MDg4NzkzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        featured: true,
      },
      {
        id: 2,
        title: 'SCULPTED FORMS',
        artist: 'Zhang Wei',
        date: 'October 20 - November 30, 2025',
        location: 'Main Gallery',
        image: 'https://images.unsplash.com/photo-1759608542767-e1a7c3ac09a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzY3VscHR1cmUlMjBleGhpYml0aW9ufGVufDF8fHx8MTc2MDkyNTExMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        featured: false,
      },
      {
        id: 3,
        title: 'ABSTRACT EXPRESSIONS',
        artist: 'Lee Min-jung',
        date: 'October 10 - December 15, 2025',
        location: 'Project Space',
        image: 'https://images.unsplash.com/photo-1615909407710-9fe4c6b11f97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHBhaW50aW5nJTIwZ2FsbGVyeXxlbnwxfHx8fDE3NjA4ODQ3MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        featured: false,
      },
    ],
    upcoming: [
      {
        id: 4,
        title: 'DIGITAL HORIZONS',
        artist: 'Kim Seo-yeon',
        date: 'January 15 - March 20, 2026',
        location: 'kwanhoonarte Seoul',
        image: 'https://images.unsplash.com/photo-1723242017406-7a7630de23c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWxsYXRpb24lMjBhcnQlMjBtdXNldW18ZW58MXx8fHwxNzYwOTI1MTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        featured: true,
      },
      {
        id: 5,
        title: 'CULTURAL NARRATIVES',
        artist: 'Maria Santos',
        date: 'February 5 - April 10, 2026',
        location: 'Main Gallery',
        image: 'https://images.unsplash.com/photo-1723974591057-ccadada1f283?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcnQlMjBleGhpYml0aW9ufGVufDF8fHx8MTc2MDg4NzkzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        featured: false,
      },
    ],
    past: [
      {
        id: 6,
        title: 'TIMELESS PERSPECTIVES',
        artist: 'Park Ji-hoon',
        date: 'July 10 - September 20, 2025',
        location: 'kwanhoonarte Seoul',
        image: 'https://images.unsplash.com/photo-1615909407710-9fe4c6b11f97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHBhaW50aW5nJTIwZ2FsbGVyeXxlbnwxfHx8fDE3NjA4ODQ3MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        featured: false,
      },
      {
        id: 7,
        title: 'MATERIAL DIALOGUES',
        artist: 'Choi Hana',
        date: 'May 15 - July 5, 2025',
        location: 'Project Space',
        image: 'https://images.unsplash.com/photo-1759608542767-e1a7c3ac09a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzY3VscHR1cmUlMjBleGhpYml0aW9ufGVufDF8fHx8MTc2MDkyNTExMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        featured: false,
      },
      {
        id: 8,
        title: 'URBAN REFLECTIONS',
        artist: 'Group Exhibition',
        date: 'March 1 - May 10, 2025',
        location: 'Main Gallery',
        image: 'https://images.unsplash.com/photo-1723242017406-7a7630de23c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWxsYXRpb24lMjBhcnQlMjBtdXNldW18ZW58MXx8fHwxNzYwOTI1MTEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        featured: false,
      },
    ],
  };

  const currentExhibitions = exhibitions[activeTab];
  const featuredExhibition = currentExhibitions.find((ex) => ex.featured);
  const regularExhibitions = currentExhibitions.filter((ex) => !ex.featured);

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Tab Navigation */}
      <section className="py-12 px-6 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex justify-center gap-8">
            {(['current', 'upcoming', 'past'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm tracking-widest uppercase transition-all ${
                  activeTab === tab
                    ? 'border-b-2 border-black text-black'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Exhibition */}
      {featuredExhibition && (
        <section className="py-16 px-6">
          <div className="max-w-[1440px] mx-auto">
            <div className="relative group cursor-pointer overflow-hidden">
              <div className="aspect-[16/9] overflow-hidden">
                <ImageWithFallback
                  src={featuredExhibition.image}
                  alt={featuredExhibition.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end">
                <div className="p-8 md:p-12 text-white">
                  <p className="text-xs tracking-widest mb-2 text-gray-300">FEATURED</p>
                  <h2 className="mb-2 text-white tracking-wider">{featuredExhibition.title}</h2>
                  <p className="mb-2 text-lg">{featuredExhibition.artist}</p>
                  <p className="text-sm mb-1">{featuredExhibition.date}</p>
                  <p className="text-sm text-gray-300">{featuredExhibition.location}</p>
                  <button className="mt-6 px-8 py-3 bg-white text-black text-xs tracking-widest hover:bg-gray-200 transition-all">
                    VIEW EXHIBITION
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Exhibition Grid */}
      <section className="py-16 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularExhibitions.map((exhibition) => (
              <div key={exhibition.id} className="group cursor-pointer">
                <div className="relative overflow-hidden mb-4 aspect-[3/4]">
                  <ImageWithFallback
                    src={exhibition.image}
                    alt={exhibition.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm tracking-widest">VIEW EXHIBITION</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="tracking-wider">{exhibition.title}</h3>
                  <p className="text-gray-600">{exhibition.artist}</p>
                  <p className="text-sm text-gray-500">{exhibition.date}</p>
                  <p className="text-sm tracking-wide">{exhibition.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Archive Message for Past Exhibitions */}
      {activeTab === 'past' && (
        <section className="py-12 px-6 bg-gray-50">
          <div className="max-w-[800px] mx-auto text-center">
            <h3 className="mb-4 tracking-wider">
              {language === 'en' ? 'Exhibition Archive' : '전시 아카이브'}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {language === 'en' 
                ? 'Explore our complete exhibition history dating back to our founding. Each exhibition represents our commitment to showcasing groundbreaking contemporary art.'
                : '설립 이래 우리의 완전한 전시 역사를 탐험해보세요. 각 전시는 획기적인 현대 미술을 선보이려는 우리의 헌신을 대표합니다.'}
            </p>
            <button className="mt-6 px-8 py-3 border border-black text-xs tracking-widest hover:bg-black hover:text-white transition-all">
              VIEW FULL ARCHIVE
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
