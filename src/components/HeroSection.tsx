import React from 'react';
import { Search, Sparkles, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/context/AppContext';
import heroImage from '@/assets/monastery-hero.jpg';

const HeroSection: React.FC = () => {
  const { state, setSearchQuery, setCurrentView } = useAppContext();
  const [localQuery, setLocalQuery] = React.useState('');

  const handleSearch = () => {
    setSearchQuery(localQuery);
    // In a real app, this would trigger filtering of monasteries
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-start overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-start justify-center max-w-2xl px-8 py-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow">
          UNVEIL THE <br/> MYSTICAL BEAUTY AND <br/>TIMELESS SOUL OF SIKKIM<br/>
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
          Embark on a spiritual journey through ancient monasteries, experience sacred traditions, and connect with the timeless wisdom of the Himalayas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button
            onClick={() => setCurrentView('experiences')}
            className="bg-monastery-gold text-monastery-gold-foreground font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-200 hover:shadow-[0_0_24px_4px_rgba(212,175,55,0.5)] hover:bg-monastery-gold/90 focus:ring-2 focus:ring-monastery-gold/60 focus:outline-none"
            size="lg"
          >
            Start Virtual Experience
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentView('tourism')}
            className="border-monastery-gold/60 text-white font-semibold px-8 py-4 rounded-full bg-transparent transition-all duration-200 hover:shadow-[0_0_24px_4px_rgba(212,175,55,0.4)] hover:bg-monastery-gold/10 focus:ring-2 focus:ring-monastery-gold/60 focus:outline-none"
            size="lg"
          >
            Plan Your Visit
          </Button>
        </div>
        
      </div>
    </section>
  );
};

export default HeroSection;