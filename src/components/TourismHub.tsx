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
    <div className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-800 mb-6">
            Tourism Integration & Navigation
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
            Complete travel companion for your monastery journey featuring interactive maps, 
            smart route planning, accommodation booking, and comprehensive tourism services.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 max-w-2xl mx-auto">
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Interactive Map
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Hotel className="w-4 h-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="planner" className="flex items-center gap-2">
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