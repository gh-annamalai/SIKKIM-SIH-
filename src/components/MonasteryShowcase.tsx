import React from 'react';
import { Eye, Volume2, Calendar, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/context/AppContext';
import { MOCK_MONASTERIES, type Monastery } from '@/context/AppContext';
import { useAnimateOnScroll } from '@/hooks/use-animate-on-scroll';
import NarratedWalkthroughModal from '@/components/modals/NarratedWalkthroughModal';

interface MonasteryCardProps {
  monastery: Monastery;
  onExplore360: () => void;
  onNarratedWalkthrough: () => void;
}

const MonasteryCard: React.FC<MonasteryCardProps> = ({
  monastery,
  onExplore360,
  onNarratedWalkthrough,
}) => {
  const cardRef = useAnimateOnScroll<HTMLDivElement>();
  return (
    <Card ref={cardRef} className="monastery-card opacity-0 translate-y-8 overflow-hidden group bg-black/60 backdrop-blur-lg border-none shadow-2xl rounded-2xl transition-all duration-700 hover:scale-[1.025]">
      <div className="relative overflow-hidden">
        <img
          src={monastery.image}
          alt={monastery.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110 rounded-t-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute top-4 right-4">
          <Badge className="bg-monastery-gold/90 text-monastery-gold-foreground shadow-lg px-3 py-1 rounded-full">
            <Star className="h-3 w-3 mr-1" />
            Sacred Site
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center text-white text-sm drop-shadow">
            <MapPin className="h-4 w-4 mr-1" />
            {monastery.location}
          </div>
        </div>
      </div>

      <CardHeader className="pb-3">
        <h3 className="text-xl font-bold text-monastery-gold mb-2 drop-shadow">
          {monastery.name}
        </h3>
        <p className="text-white text-sm leading-relaxed">
          {monastery.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {monastery.features.map((feature) => (
            <Badge
              key={feature}
              variant="secondary"
              className="text-xs bg-white/10 text-white border-white/20"
            >
              {feature}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-2 pt-2">
        </div>
      </CardContent>
    </Card>
  );
};

const MonasteryShowcase: React.FC = () => {
  const { state, setSelectedMonastery } = useAppContext();
  const [selectedModal, setSelectedModal] = React.useState<'360' | 'walkthrough' | 'booking' | null>(null);

  const filteredMonasteries = React.useMemo(() => {
    if (!state.searchQuery) return MOCK_MONASTERIES;
    
    return MOCK_MONASTERIES.filter(monastery =>
      monastery.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      monastery.location.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      monastery.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      monastery.features.some(feature => 
        feature.toLowerCase().includes(state.searchQuery.toLowerCase())
      )
    );
  }, [state.searchQuery]);

  const handleExplore360 = (monastery: Monastery) => {
    setSelectedMonastery(monastery);
    // In a real app, this would open a 360° viewer
    alert(`Opening 360° experience for ${monastery.name}`);
  };

  const handleNarratedWalkthrough = (monastery: Monastery) => {
    setSelectedMonastery(monastery);
    setSelectedModal('walkthrough');
  };


  const closeModal = () => {
    setSelectedModal(null);
    setSelectedMonastery(null);
  };

  return (
  <section className="py-16 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-left mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-monastery-gold mb-4 drop-shadow">
            Sacred Monasteries
          </h2>
          <p className="text-xl text-white max-w-3xl">
            Explore centuries-old monasteries, each with its unique history, architecture, 
            and spiritual significance in the heart of the Himalayas.
          </p>
          {state.searchQuery && (
            <div className="mt-6">
              <Badge variant="outline" className="text-sm px-4 py-2 bg-white/10 text-white border-white/20">
                Showing results for: "{state.searchQuery}"
              </Badge>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMonasteries.map((monastery) => (
            <MonasteryCard
              key={monastery.id}
              monastery={monastery}
              onExplore360={() => handleExplore360(monastery)}
              onNarratedWalkthrough={() => handleNarratedWalkthrough(monastery)}
            />
          ))}
        </div>

        {filteredMonasteries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No monasteries found matching your search. Try different keywords.
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <NarratedWalkthroughModal 
        isOpen={selectedModal === 'walkthrough'}
        onClose={closeModal}
      />
    </section>
  );
};

export default MonasteryShowcase;