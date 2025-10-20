import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LanguageType } from '../App';

type FilterType = 'all' | 'press' | 'media' | 'announcements';

interface NewsProps {
  language: LanguageType;
}

export function News({ language }: NewsProps) {
  const [filter, setFilter] = useState<FilterType>('all');

  const articles = [
    {
      id: 1,
      category: 'press',
      headline: 'kwanhoonarte Announces Major Expansion to New York',
      date: 'October 18, 2025',
      excerpt: 'Leading contemporary art gallery kwanhoonarte is pleased to announce the opening of a new gallery space in New York\'s Chelsea district, marking a significant milestone in the gallery\'s international expansion.',
      image: 'https://images.unsplash.com/photo-1591643018014-431ac4cd4edc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBuZXdzJTIwcHJlc3N8ZW58MXx8fHwxNzYwOTI1MTg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      featured: true,
    },
    {
      id: 2,
      category: 'media',
      headline: 'Contemporary Visions Exhibition Featured in Art Asia Magazine',
      date: 'October 15, 2025',
      excerpt: 'Art Asia Magazine features our current group exhibition, highlighting the innovative works that challenge conventional boundaries.',
      image: 'https://images.unsplash.com/photo-1600227338741-9ec29e846b58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBtYWdhemluZSUyMGFydGljbGV8ZW58MXx8fHwxNzYwOTI1MTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      featured: false,
    },
    {
      id: 3,
      category: 'announcements',
      headline: 'Gallery Opening Reception: October 28',
      date: 'October 12, 2025',
      excerpt: 'Join us for the opening reception of our latest exhibition featuring emerging artists from across Asia.',
      image: 'https://images.unsplash.com/photo-1596649300028-340ad0ec6146?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxsZXJ5JTIwb3BlbmluZyUyMGV2ZW50fGVufDF8fHx8MTc2MDkyNTE4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      featured: false,
    },
    {
      id: 4,
      category: 'press',
      headline: 'Artist Zhang Wei Wins Prestigious International Award',
      date: 'October 10, 2025',
      excerpt: 'Gallery artist Zhang Wei has been awarded the prestigious Asian Contemporary Art Prize 2025.',
      image: 'https://images.unsplash.com/photo-1591643018014-431ac4cd4edc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBuZXdzJTIwcHJlc3N8ZW58MXx8fHwxNzYwOTI1MTg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      featured: false,
    },
    {
      id: 5,
      category: 'media',
      headline: 'Gallery Director Interview in Contemporary Art Review',
      date: 'October 5, 2025',
      excerpt: 'Our founder discusses the future of contemporary art in Asia in an exclusive interview.',
      image: 'https://images.unsplash.com/photo-1600227338741-9ec29e846b58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBtYWdhemluZSUyMGFydGljbGV8ZW58MXx8fHwxNzYwOTI1MTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      featured: false,
    },
    {
      id: 6,
      category: 'announcements',
      headline: 'New Artist Representation Announced',
      date: 'September 28, 2025',
      excerpt: 'We are thrilled to announce the representation of three emerging Korean artists.',
      image: 'https://images.unsplash.com/photo-1596649300028-340ad0ec6146?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYWxsZXJ5JTIwb3BlbmluZyUyMGV2ZW50fGVufDF8fHx8MTc2MDkyNTE4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      featured: false,
    },
  ];

  const filteredArticles = articles.filter((article) => {
    if (filter === 'all') return true;
    return article.category === filter;
  });

  const featuredArticle = filteredArticles.find((article) => article.featured);
  const regularArticles = filteredArticles.filter((article) => !article.featured);

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Header with Filter */}
      <section className="py-12 px-6 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-center mb-8 tracking-widest">NEWS</h1>
          
          <div className="flex justify-center gap-4 flex-wrap">
            {(['all', 'press', 'media', 'announcements'] as FilterType[]).map((f) => (
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
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-16 px-6">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="relative overflow-hidden group cursor-pointer">
                <ImageWithFallback
                  src={featuredArticle.image}
                  alt={featuredArticle.headline}
                  className="w-full h-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-xs tracking-widest mb-4 text-gray-500 uppercase">
                  {featuredArticle.category}
                </p>
                <h2 className="mb-4 tracking-wide">{featuredArticle.headline}</h2>
                <p className="text-sm text-gray-500 mb-4">{featuredArticle.date}</p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {featuredArticle.excerpt}
                </p>
                <button className="self-start px-8 py-3 border border-black text-xs tracking-widest hover:bg-black hover:text-white transition-all">
                  READ MORE
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="py-16 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article) => (
              <div key={article.id} className="group cursor-pointer">
                <div className="relative overflow-hidden mb-4 aspect-[16/10]">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.headline}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="text-xs tracking-widest mb-2 text-gray-500 uppercase">
                  {article.category}
                </p>
                <h3 className="tracking-wide mb-2 group-hover:text-gray-600 transition-colors">
                  {article.headline}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{article.date}</p>
                <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <button className="text-xs tracking-widest border-b border-black hover:text-gray-600 transition-colors">
                  READ MORE →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-[600px] mx-auto text-center">
          <h3 className="mb-4 tracking-wider">
            {language === 'en' ? 'Stay Updated' : '최신 소식 받기'}
          </h3>
          <p className="text-gray-700 mb-8">
            {language === 'en'
              ? 'Subscribe to our newsletter for the latest news, exhibition announcements, and exclusive content.'
              : '최신 뉴스, 전시 공지, 독점 콘텐츠를 받아보시려면 뉴스레터를 구독하세요.'}
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-black"
            />
            <button className="px-8 py-3 bg-black text-white text-xs tracking-widest hover:bg-gray-800 transition-all">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
