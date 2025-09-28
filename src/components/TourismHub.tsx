import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EnhancedInteractiveMap from './EnhancedInteractiveMap';
import TourismServicesHub from './TourismServicesHub';
import RoutePlanner from './RoutePlanner';
import { MapPin, Hotel, Route, Compass } from 'lucide-react';

const TourismHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('map');

  return (
    <div className="py-20 bg-gradient-to-b from-black via-gray-900 to-black min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-monastery-gold mb-6">
            Tourist Navigation
          </h1>
          <p className="text-xl text-white max-w-4xl mx-auto mb-8">
            Complete travel companion for your monastery journey featuring interactive maps, 
            smart route planning, accommodation booking, and comprehensive tourism services.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 max-w-6xl mx-auto bg-black/70 border border-monastery-gold/40 rounded-xl p-1">
            <TabsTrigger value="map" className="flex items-center gap-2 text-monastery-gold font-semibold bg-black/40 rounded-xl data-[state=active]:bg-monastery-gold data-[state=active]:text-black transition-all">
              <MapPin className="w-4 h-4" />
              Interactive Map
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2 text-monastery-gold font-semibold bg-black/40 rounded-xl data-[state=active]:bg-monastery-gold data-[state=active]:text-black transition-all">
              <Hotel className="w-4 h-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="planner" className="flex items-center gap-2 text-monastery-gold font-semibold bg-black/40 rounded-xl data-[state=active]:bg-monastery-gold data-[state=active]:text-black transition-all">
              <Route className="w-4 h-4" />
              Route Planner
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map">
            <EnhancedInteractiveMap />
          </TabsContent>

          <TabsContent value="services">
            <TourismServicesHub />
          </TabsContent>

          <TabsContent value="planner">
            <RoutePlanner />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TourismHub;