import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { RotateCcw, Headphones, Play } from 'lucide-react';
import tours from '../lib/tours';
import { getTourTypeBadge } from '../lib/utils';

const VirtualTours: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTour, setSelectedTour] = useState(null);
  const filteredTours = tours.filter(tour =>
    tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tour.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="py-20 bg-gradient-to-b from-black via-gray-900 to-black min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-monastery-gold mb-4 drop-shadow-lg">
            Immersive Virtual Experiences
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the sacred monasteries of Sikkim through cutting-edge virtual reality,<br />
            narrated walkthroughs, and intelligent audio guides
          </p>
        </div>
        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search monasteries..."
            className="w-full max-w-md px-4 py-2 rounded-full bg-black/60 text-monastery-gold border border-monastery-gold focus:outline-none focus:ring-2 focus:ring-monastery-gold"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <Card key={tour.id} className="monastery-card flex flex-col h-[500px] min-h-[500px] overflow-hidden bg-black/60 backdrop-blur-lg border-none shadow-2xl rounded-2xl transition-all duration-700 hover:scale-[1.025] cursor-pointer">
              <div className="relative">
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <Badge className={`absolute top-4 left-4 ${getTourTypeBadge(tour.type)} text-xs px-3 py-1 rounded-full shadow-lg`}>
                  <div className="flex items-center gap-1">
                    {getTourTypeIcon(tour.type)}
                    {tour.type === '360' ? '360° Tour' : tour.type === 'walkthrough' ? 'Walkthrough' : 'Audio Guide'}
                  </div>
                </Badge>
                <div className="absolute top-4 right-4 bg-black/70 text-monastery-gold px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                  {tour.duration}
                </div>
              </div>
              <div className="pb-2 pl-6">
                <div className="text-xl text-white drop-shadow">{tour.name}</div>
                <p className="text-gray-300">{tour.description}</p>
              </div>
              <div className="flex flex-col flex-1 justify-between pl-6 pr-6">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Languages Available:</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {tour.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs border-white text-white bg-transparent">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm font-medium text-white mt-4 mb-2">Highlights:</p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {tour.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-monastery-gold rounded-full"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto flex justify-center">
                  <Button 
                    onClick={() => setSelectedTour(tour)}
                    className="w-5/6 mx-auto mb-4 bg-monastery-gold text-black font-semibold rounded-full shadow-lg hover:bg-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none transition-all duration-200 border-2 border-monastery-gold"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Experience
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

function getTourTypeIcon(type: string) {
  switch (type) {
    case '360':
      return <RotateCcw className="w-4 h-4" />;
    case 'walkthrough':
      return <Play className="w-4 h-4" />;
    case 'audio-guide':
      return <Headphones className="w-4 h-4" />;
    default:
      return null;
  }
}

export default VirtualTours;