import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EnhancedDigitalArchive from './EnhancedDigitalArchive';
import CulturalTreasuresShowcase from './CulturalTreasuresShowcase';
import { Database, Gem, BookOpen, Search, Filter, Download } from 'lucide-react';
import { Button } from './ui/button';

const DigitalArchive: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-12">
      <div className="container mx-auto px-4">
        {/* Overview Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-monastery-gold mb-4">Digital Archive & Research Hub</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore our extensive collection of digitized manuscripts, cultural artifacts, and historical treasures 
            enhanced with AI-powered search and analysis tools.
          </p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 max-w-2xl mx-auto bg-black/60 border-monastery-gold/20">
            <TabsTrigger 
              value="enhanced-archive" 
              className="flex items-center gap-2 data-[state=active]:bg-monastery-gold/20 data-[state=active]:text-monastery-gold"
            >
              <Database className="w-4 h-4" />
              AI Archive
            </TabsTrigger>
            <TabsTrigger 
              value="cultural-treasures" 
              className="flex items-center gap-2 data-[state=active]:bg-monastery-gold/20 data-[state=active]:text-monastery-gold"
            >
              <Gem className="w-4 h-4" />
              Treasures
            </TabsTrigger>
            <TabsTrigger 
              value="manuscripts" 
              className="flex items-center gap-2 data-[state=active]:bg-monastery-gold/20 data-[state=active]:text-monastery-gold"
            >
              <BookOpen className="w-4 h-4" />
              Manuscripts
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab Content */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-black/60 backdrop-blur-lg border-monastery-gold/20 hover:border-monastery-gold transition-colors">
                <CardHeader>
                  <CardTitle className="text-monastery-gold flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Smart Search
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    AI-powered search engine that understands context and meaning, not just keywords.
                  </p>
                  <Button variant="outline" className="w-full border-monastery-gold/20 text-monastery-gold hover:bg-monastery-gold hover:text-black">
                    Start Searching
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/60 backdrop-blur-lg border-monastery-gold/20 hover:border-monastery-gold transition-colors">
                <CardHeader>
                  <CardTitle className="text-monastery-gold flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Browse Collection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Explore our diverse collection of manuscripts, artifacts, and cultural treasures.
                  </p>
                  <Button variant="outline" className="w-full border-monastery-gold/20 text-monastery-gold hover:bg-monastery-gold hover:text-black">
                    View Collection
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/60 backdrop-blur-lg border-monastery-gold/20 hover:border-monastery-gold transition-colors">
                <CardHeader>
                  <CardTitle className="text-monastery-gold flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Download Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Access high-resolution scans and detailed documentation for research.
                  </p>
                  <Button variant="outline" className="w-full border-monastery-gold/20 text-monastery-gold hover:bg-monastery-gold hover:text-black">
                    Download Center
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="enhanced-archive">
            <EnhancedDigitalArchive />
          </TabsContent>

          <TabsContent value="cultural-treasures">
            <CulturalTreasuresShowcase />
          </TabsContent>

          <TabsContent value="manuscripts">
            <Card className="bg-black/60 backdrop-blur-lg border-monastery-gold/20 shadow-2xl max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-center flex items-center justify-center gap-3 text-monastery-gold">
                  <BookOpen className="w-8 h-8 text-monastery-gold" />
                  Interactive Manuscript Viewer
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 text-center">
                <p className="text-gray-300 mb-6">
                  Advanced manuscript viewing experience with page-by-page navigation, 
                  translation overlays, and detailed calligraphy analysis.
                </p>
                <div className="text-6xl mb-4">📜</div>
                <p className="text-gray-400">
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
