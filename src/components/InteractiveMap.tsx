// This file has been removed as map functionality is now handled in dedicated pages.
import React from 'react';
import { MapPin, Car, Bed, Camera, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MOCK_MONASTERIES } from '@/context/AppContext';

const InteractiveMap: React.FC = () => {
  const [activeFilter, setActiveFilter] = React.useState<'all' | 'transport' | 'accommodation' | 'attractions'>('all');

  const filters = [
    { id: 'all', label: 'All', icon: MapPin },
    { id: 'transport', label: 'Transport', icon: Car },
    { id: 'accommodation', label: 'Hotels', icon: Bed },
    { id: 'attractions', label: 'Attractions', icon: Camera },
  ];

  const mockPins = [
    ...MOCK_MONASTERIES.map(monastery => ({
      id: monastery.id,
      name: monastery.name,
      type: 'monastery' as const,
      coordinates: monastery.coordinates,
      description: monastery.location
    })),
    {
      id: 'transport-1',
      name: 'Gangtok Bus Station',
      type: 'transport' as const,
      coordinates: [27.3389, 88.6065] as [number, number],
      description: 'Main bus terminal'
    },
    {
      id: 'accommodation-1',
      name: 'Hotel Tibet',
      type: 'accommodation' as const,
      coordinates: [27.3314, 88.6138] as [number, number],
      description: '4-star hotel near Rumtek'
    },
    {
      id: 'attraction-1',
      name: 'Tsomgo Lake',
      type: 'attractions' as const,
      coordinates: [27.2682, 88.7559] as [number, number],
      description: 'Sacred glacial lake'
    }
  ];

  const filteredPins = React.useMemo(() => {
    if (activeFilter === 'all') return mockPins;
    return mockPins.filter(pin => pin.type === activeFilter || pin.type === 'monastery');
  }, [activeFilter]);

  return (
  <section className="py-16 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-left mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow">
            Plan Your Visit
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl">
            Navigate through Sikkim's sacred sites with our interactive map. Find monasteries, 
            transportation, accommodation, and nearby attractions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden bg-black/60 backdrop-blur-lg border-none shadow-2xl rounded-2xl">
              <CardHeader className="pb-4">
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => {
                    const Icon = filter.icon;
                    return (
                      <Button
                        key={filter.id}
                        variant={activeFilter === filter.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveFilter(filter.id as any)}
                        className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        <Icon className="h-4 w-4" />
                        {filter.label}
                      </Button>
                    );
                  })}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/* Mock Map Display */}
                <div className="relative h-96 bg-gradient-to-br from-prayer-blue/30 to-prayer-green/30 rounded-lg overflow-hidden">
                  {/* Simulated Map Background */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30"></div>
                  </div>
                  {/* Map Pins */}
                  {filteredPins.map((pin) => {
                    const left = ((pin.coordinates[1] - 88.2) / (88.8 - 88.2)) * 100;
                    const top = ((27.4 - pin.coordinates[0]) / (27.4 - 27.2)) * 100;
                    const getIconAndColor = () => {
                      switch (pin.type) {
                        case 'monastery': return { icon: '🏛️', color: 'bg-monastery-gold' };
                        case 'transport': return { icon: '🚌', color: 'bg-prayer-blue' };
                        case 'accommodation': return { icon: '🏨', color: 'bg-prayer-green' };
                        case 'attractions': return { icon: '📸', color: 'bg-prayer-red' };
                        default: return { icon: '📍', color: 'bg-primary' };
                      }
                    };
                    const { icon, color } = getIconAndColor();
                    return (
                      <div
                        key={pin.id}
                        className={`absolute w-8 h-8 ${color} rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform shadow-lg`}
                        style={{
                          left: `${Math.max(5, Math.min(95, left))}%`,
                          top: `${Math.max(5, Math.min(95, top))}%`
                        }}
                        title={pin.name}
                      >
                        <span className="text-lg">{icon}</span>
                      </div>
                    );
                  })}
                  {/* Map Legend */}
                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-lg rounded-lg p-3 border border-white/10">
                    <div className="text-xs font-semibold text-white mb-2">Legend</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-monastery-gold rounded-full"></div>
                        <span className="text-white">Monasteries</span>
                      </div>
                      {activeFilter !== 'all' && (
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 ${
                            activeFilter === 'transport' ? 'bg-prayer-blue' :
                            activeFilter === 'accommodation' ? 'bg-prayer-green' :
                            'bg-prayer-red'
                          } rounded-full`}></div>
                          <span className="capitalize text-white">{activeFilter}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Locations</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredPins.map((pin) => (
                <Card key={pin.id} className="p-3 bg-black/60 border-none shadow-lg hover:shadow-2xl transition-shadow cursor-pointer rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 ${
                      pin.type === 'monastery' ? 'bg-monastery-gold' :
                      pin.type === 'transport' ? 'bg-prayer-blue' :
                      pin.type === 'accommodation' ? 'bg-prayer-green' :
                      'bg-prayer-red'
                    } rounded-full flex items-center justify-center text-xs`}>
                      {pin.type === 'monastery' ? '🏛️' :
                       pin.type === 'transport' ? '🚌' :
                       pin.type === 'accommodation' ? '🏨' : '📸'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-white truncate">
                        {pin.name}
                      </h4>
                      <p className="text-xs text-gray-300">
                        {pin.description}
                      </p>
                      <Badge 
                        variant="outline" 
                        className="mt-1 text-xs capitalize bg-white/10 text-white border-white/20"
                      >
                        {pin.type}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center bg-black/60 border-none shadow-lg hover:shadow-2xl transition-shadow rounded-xl">
            <Car className="h-8 w-8 text-prayer-blue mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">Transportation</h3>
            <p className="text-sm text-gray-300">Find buses, taxis, and helicopter services</p>
          </Card>
          <Card className="p-6 text-center bg-black/60 border-none shadow-lg hover:shadow-2xl transition-shadow rounded-xl">
            <Bed className="h-8 w-8 text-prayer-green mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">Accommodation</h3>
            <p className="text-sm text-gray-300">Discover hotels and guesthouses nearby</p>
          </Card>
          <Card className="p-6 text-center bg-black/60 border-none shadow-lg hover:shadow-2xl transition-shadow rounded-xl">
            <Camera className="h-8 w-8 text-prayer-red mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">Attractions</h3>
            <p className="text-sm text-gray-300">Explore lakes, viewpoints, and landmarks</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;