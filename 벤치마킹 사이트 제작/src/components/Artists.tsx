import { useState } from 'react';
import { Grid, List } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LanguageType } from '../App';

type FilterType = 'all' | 'featured' | 'emerging' | 'international';
type ViewType = 'grid' | 'list';

interface ArtistsProps {
  language: LanguageType;
}

export function Artists({ language }: ArtistsProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [viewType, setViewType] = useState<ViewType>('grid');
  const [visibleCount, setVisibleCount] = useState(12);

  const artists = [
    { id: 1, name: 'Kim Seo-yeon', nationality: { en: 'South Korea', kr: '대한민국' }, category: 'featured', image: 'https://images.unsplash.com/photo-1751003801857-30d275cc8243?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjBwb3J0cmFpdCUyMHN0dWRpb3xlbnwxfHx8fDE3NjA4MzQ5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 2, name: 'Zhang Wei', nationality: { en: 'China', kr: '중국' }, category: 'international', image: 'https://images.unsplash.com/photo-1563204719-44395a035bb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcnRpc3QlMjB3b3JrfGVufDF8fHx8MTc2MDkyNTA3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 3, name: 'Lee Min-jung', nationality: { en: 'South Korea', kr: '대한민국' }, category: 'emerging', image: 'https://images.unsplash.com/photo-1688215699594-29f51efb3fc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludGVyJTIwaW4lMjBzdHVkaW98ZW58MXx8fHwxNzYwOTI1MDcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 4, name: 'Maria Santos', nationality: { en: 'Philippines', kr: '필리핀' }, category: 'international', image: 'https://images.unsplash.com/photo-1598564254441-be3be79c2b9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY3VscHRvciUyMGFydGlzdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MDkyNTA3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 5, name: 'Park Ji-hoon', nationality: { en: 'South Korea', kr: '대한민국' }, category: 'featured', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
    { id: 6, name: 'Yuki Tanaka', nationality: { en: 'Japan', kr: '일본' }, category: 'emerging', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
    { id: 7, name: 'Choi Hana', nationality: { en: 'South Korea', kr: '대한민국' }, category: 'featured', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400' },
    { id: 8, name: 'David Chen', nationality: { en: 'Taiwan', kr: '대만' }, category: 'international', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' },
    { id: 9, name: 'Jung Su-bin', nationality: { en: 'South Korea', kr: '대한민국' }, category: 'emerging', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400' },
    { id: 10, name: 'Alex Rivera', nationality: { en: 'Mexico', kr: '멕시코' }, category: 'international', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400' },
    { id: 11, name: 'Han Ye-jin', nationality: { en: 'South Korea', kr: '대한민국' }, category: 'featured', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400' },
    { id: 12, name: 'Lin Mei', nationality: { en: 'Singapore', kr: '싱가포르' }, category: 'international', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400' },
    { id: 13, name: 'Kang Min-ho', nationality: { en: 'South Korea', kr: '대한민국' }, category: 'emerging', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400' },
    { id: 14, name: 'Sarah Kim', nationality: { en: 'USA', kr: '미국' }, category: 'international', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400' },
    { id: 15, name: 'Lim Da-eun', nationality: { en: 'South Korea', kr: '대한민국' }, category: 'featured', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400' },
    { id: 16, name: 'Raj Patel', nationality: { en: 'India', kr: '인도' }, category: 'emerging', image: 'https://images.unsplash.com/photo-1507152832244-10d45c7eda57?w=400' },
  ];

  const filteredArtists = artists.filter((artist) => {
    if (filter === 'all') return true;
    return artist.category === filter;
  });

  const visibleArtists = filteredArtists.slice(0, visibleCount);

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Header Section */}
      <section className="py-12 px-6 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-center mb-8 tracking-widest">
            ARTISTS
          </h1>

          {/* Filter Options */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-4 flex-wrap justify-center">
              {(['all', 'featured', 'emerging', 'international'] as FilterType[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2 text-xs tracking-widest uppercase transition-all ${
                    filter === f
                      ? 'bg-black text-white'
                      : 'bg-white text-black border border-black hover:bg-gray-100'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 border border-gray-300">
              <button
                onClick={() => setViewType('grid')}
                className={`p-2 ${viewType === 'grid' ? 'bg-black text-white' : 'bg-white text-black'}`}
                aria-label="Grid view"
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewType('list')}
                className={`p-2 ${viewType === 'list' ? 'bg-black text-white' : 'bg-white text-black'}`}
                aria-label="List view"
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Artists Grid/List */}
      <section className="py-16 px-6">
        <div className="max-w-[1440px] mx-auto">
          {viewType === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {visibleArtists.map((artist) => (
                <div key={artist.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden mb-4 aspect-square">
                    <ImageWithFallback
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-sm tracking-widest">VIEW ARTIST</span>
                    </div>
                  </div>
                  <h3 className="tracking-wide mb-1">{artist.name}</h3>
                  <p className="text-sm text-gray-600">{artist.nationality[language]}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {visibleArtists.map((artist) => (
                <div
                  key={artist.id}
                  className="flex items-center gap-6 p-4 border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="w-24 h-24 overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="tracking-wide mb-1">{artist.name}</h3>
                    <p className="text-sm text-gray-600">{artist.nationality[language]}</p>
                  </div>
                  <button className="px-6 py-2 border border-black text-xs tracking-widest hover:bg-black hover:text-white transition-all">
                    VIEW
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {visibleCount < filteredArtists.length && (
            <div className="mt-16 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 8)}
                className="px-12 py-3 border border-black text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-300"
              >
                LOAD MORE
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
