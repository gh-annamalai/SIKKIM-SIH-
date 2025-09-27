import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EnhancedDigitalArchive from './EnhancedDigitalArchive';
import CulturalTreasuresShowcase from './CulturalTreasuresShowcase';
import { Database, Gem, BookOpen } from 'lucide-react';

const DigitalArchive: React.FC = () => {
  const [activeTab, setActiveTab] = useState('enhanced-archive');

  return (
    <div className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-800 mb-6">
            Heritage & Archive System
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8">
            Explore our comprehensive digital heritage collection featuring AI-powered search, 
            interactive manuscript viewing, and immersive cultural treasures showcase.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 max-w-2xl mx-auto">
            <TabsTrigger value="enhanced-archive" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              AI Archive
            </TabsTrigger>
            <TabsTrigger value="cultural-treasures" className="flex items-center gap-2">
              <Gem className="w-4 h-4" />
              Treasures
            </TabsTrigger>
            <TabsTrigger value="manuscripts" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Manuscripts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="enhanced-archive">
            <EnhancedDigitalArchive />
          </TabsContent>

          <TabsContent value="cultural-treasures">
            <CulturalTreasuresShowcase />
          </TabsContent>

          <TabsContent value="manuscripts">
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-center flex items-center justify-center gap-3">
                  <BookOpen className="w-8 h-8 text-amber-600" />
                  Interactive Manuscript Viewer
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 text-center">
                <p className="text-slate-600 mb-6">
                  Advanced manuscript viewing experience with page-by-page navigation, 
                  translation overlays, and detailed calligraphy analysis.
                </p>
                <div className="text-amber-600 text-6xl mb-4">📜</div>
                <p className="text-slate-500">
                  Select any manuscript from the AI Archive to explore with our advanced viewer tools.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DigitalArchive;
