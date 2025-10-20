import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ExhibitionCard } from './cards/ExhibitionCard';
import { NewsCard } from './cards/NewsCard';
import { ArtistCard } from './cards/ArtistCard';
import { EventCard } from './cards/EventCard';

interface ContentItem {
  id: number;
  type: 'exhibition' | 'news' | 'artist' | 'event';
  data: any;
}

// Mock data for infinite scroll
const generateContent = (startIndex: number, count: number): ContentItem[] => {
  const items: ContentItem[] = [];
  const types: Array<'exhibition' | 'news' | 'artist' | 'event'> = [
    'exhibition',
    'news',
    'artist',
    'event',
  ];

  for (let i = 0; i < count; i++) {
    const index = startIndex + i;
    const type = types[index % types.length];

    items.push({
      id: index,
      type,
      data: getDataForType(type, index),
    });
  }

  return items;
};

const getDataForType = (type: string, index: number) => {
  const images = [
    'https://images.unsplash.com/photo-1748787007524-d4bc8c7621da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwZW1wdHklMjBzcGFjZXxlbnwxfHx8fDE3NjA2ODc3NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1646747149414-e0bd32b1a121?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcnQlMjB3YWxsfGVufDF8fHx8MTc2MDY4Nzc2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1529943684416-9d29047b809e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjBzdHVkaW8lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA2MjAxODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1596649300028-340ad0ec6146?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxsZXJ5JTIwb3BlbmluZyUyMGV2ZW50fGVufDF8fHx8MTc2MDY4Nzc2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1660896478608-6d67fa739eb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydCUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzYwNjg3NzY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1513361159116-51e589abc801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBpbnRlcmlvciUyMG1pbmltYWx8ZW58MXx8fHwxNzYwNjg3NzY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  ];

  switch (type) {
    case 'exhibition':
      return {
        image: images[index % images.length],
        title: `Contemporary Vision ${index + 1}`,
        dateRange: 'October 15 - December 20, 2025',
        location: 'kwanhoonarte Seoul',
        description:
          'A groundbreaking exhibition exploring the intersection of traditional and contemporary art practices, featuring innovative works that challenge conventional boundaries.',
      };
    case 'news':
      return {
        image: images[index % images.length],
        category: index % 2 === 0 ? 'PRESS' : 'NEWS',
        headline: `Gallery Announces New Initiative ${index + 1}`,
        date: 'October 17, 2025',
        excerpt:
          'kwanhoonarte is pleased to announce a major new initiative that will transform the contemporary art landscape in Asia and beyond.',
      };
    case 'artist':
      return {
        image: images[index % images.length],
        artistName: `Featured Artist ${index + 1}`,
        workTitle: 'Untitled Series, 2025',
        statement:
          'Exploring themes of identity and cultural exchange through innovative mixed media techniques that bridge Eastern and Western artistic traditions.',
      };
    case 'event':
      return {
        image: images[index % images.length],
        title: `Gallery Talk ${index + 1}`,
        dateTime: 'November 5, 2025 at 6:00 PM',
        location: 'kwanhoonarte Seoul Gallery',
      };
    default:
      return {};
  }
};

export function GridContent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [items] = useState<ContentItem[]>(generateContent(0, 3));

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleReadMore = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderCard = (item: ContentItem) => {
    switch (item.type) {
      case 'exhibition':
        return <ExhibitionCard key={item.id} {...item.data} />;
      case 'news':
        return <NewsCard key={item.id} {...item.data} />;
      case 'artist':
        return <ArtistCard key={item.id} {...item.data} />;
      case 'event':
        return <EventCard key={item.id} {...item.data} />;
      default:
        return null;
    }
  };

  return (
    <section className="py-20 px-4 md:px-8 lg:px-12 bg-white">
      <div className="max-w-[1440px] mx-auto">
        {/* Carousel Container */}
        <div className="relative">
          {/* Carousel Slides */}
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${currentSlide * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {items.map((item, index) => (
                <div key={item.id} className="w-full flex-shrink-0 px-4">
                  <div className="max-w-[800px] mx-auto">
                    {renderCard(item)}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          {items.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-black hover:bg-black hover:text-white flex items-center justify-center transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-black hover:bg-black hover:text-white flex items-center justify-center transition-all"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-black w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Read More Button */}
        <div className="mt-16 text-center">
          <button
            onClick={handleReadMore}
            className="px-12 py-3 border border-black text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-300"
          >
            READ MORE
          </button>
        </div>
      </div>
    </section>
  );
}
