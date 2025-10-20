import { useState } from 'react';
import { Header } from './components/Header';
import { HeroFullscreen } from './components/HeroFullscreen';
import { GridContent } from './components/GridContent';
import { About } from './components/About';
import { Artists } from './components/Artists';
import { Exhibitions } from './components/Exhibitions';
import { Fairs } from './components/Fairs';
import { News } from './components/News';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export type PageType = 'home' | 'about' | 'artists' | 'exhibitions' | 'fairs' | 'news' | 'contact';
export type LanguageType = 'en' | 'kr';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [language, setLanguage] = useState<LanguageType>('en');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <HeroFullscreen />
            <GridContent language={language} />
          </>
        );
      case 'about':
        return <About language={language} />;
      case 'artists':
        return <Artists language={language} />;
      case 'exhibitions':
        return <Exhibitions language={language} />;
      case 'fairs':
        return <Fairs language={language} />;
      case 'news':
        return <News language={language} />;
      case 'contact':
        return <Contact language={language} />;
      default:
        return (
          <>
            <HeroFullscreen />
            <GridContent language={language} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        language={language}
        setLanguage={setLanguage}
      />
      <div id="content">
        {renderPage()}
      </div>
      <Footer language={language} />
    </div>
  );
}
