import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Search, Brain, Sparkles, BookOpen, Gem, Scroll, 
  Eye, Download, Zap, Filter, Calendar, Tag,
  ZoomIn, ZoomOut, RotateCcw, Maximize2, 
  ChevronLeft, ChevronRight, Star, Heart,
  Globe, Users, Clock, Database
} from 'lucide-react';

interface ArchiveItem {
  id: string;
  title: string;
  category: 'manuscript' | 'artifact' | 'architecture' | 'audio' | 'treasure' | 'photo';
  monastery: string;
  period: string;
  description: string;
  thumbnail: string;
  highRes?: string;
  fileSize: string;
  downloadCount: number;
  rating: number;
  tags: string[];
  aiInsights: string[];
  culturalSignificance: string;
  historicalContext: string;
  preservation: {
    condition: 'excellent' | 'good' | 'fair' | 'fragile';
    digitizationDate: string;
    technique: string;
  };
  related: string[];
}

interface AISearchResult {
  query: string;
  confidence: number;
  results: ArchiveItem[];
  semanticMatches: string[];
  suggestedQueries: string[];
}

const EnhancedDigitalArchive: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<ArchiveItem | null>(null);
  const [aiSearchResults, setAiSearchResults] = useState<AISearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);
  const viewerRef = useRef<HTMLDivElement>(null);

  const archiveItems: ArchiveItem[] = [
    {
      id: 'ms-001',
      title: 'Kangyur Manuscript - Prajnaparamita Sutra',
      category: 'manuscript',
      monastery: 'Rumtek Monastery',
      period: '16th Century',
      description: 'Ancient Tibetan Buddhist scripture on the Perfection of Wisdom',
      thumbnail: '/src/assets/ancient-manuscript.jpg',
      highRes: '/src/assets/ancient-manuscript.jpg',
      fileSize: '145.7 MB',
      downloadCount: 342,
      rating: 4.9,
      tags: ['buddhist-scripture', 'tibetan', 'prajnaparamita', 'wisdom-literature'],
      aiInsights: [
        'This manuscript contains one of the most important Mahayana Buddhist texts',
        'The calligraphy style indicates it was written in the Dbus province of Tibet',
        'Gold leaf illuminations suggest royal patronage during creation'
      ],
      culturalSignificance: 'Central text of Mahayana Buddhism, foundational to Tibetan spiritual practice',
      historicalContext: 'Created during the golden age of Tibetan Buddhist scholarship',
      preservation: {
        condition: 'good',
        digitizationDate: '2023-03-15',
        technique: 'High-resolution multispectral imaging'
      },
      related: ['ms-002', 'art-001']
    },
    {
      id: 'treasure-001',
      title: 'Golden Buddha Statue - Shakyamuni',
      category: 'treasure',
      monastery: 'Pemayangtse Monastery',
      period: '17th Century',
      description: 'Exquisite golden statue of Buddha Shakyamuni with precious stone inlays',
      thumbnail: '/src/assets/ritual-artifacts.jpg',
      fileSize: '89.4 MB',
      downloadCount: 186,
      rating: 4.8,
      tags: ['golden-statue', 'shakyamuni', 'precious-metals', 'sacred-art'],
      aiInsights: [
        'Crafted using traditional lost-wax casting technique',
        'Inlaid gems include turquoise from local Sikkim mines',
        'Represents the classical Gandhara artistic style'
      ],
      culturalSignificance: 'Sacred object of daily worship and meditation practice',
      historicalContext: 'Commissioned by the 3rd Chogyal of Sikkim as a diplomatic gift',
      preservation: {
        condition: 'excellent',
        digitizationDate: '2023-07-22',
        technique: '3D photogrammetry and color calibrated photography'
      },
      related: ['treasure-002', 'arch-001']
    },
    {
      id: 'arch-001',
      title: 'Architectural Plans - Enchey Monastery',
      category: 'architecture',
      monastery: 'Enchey Monastery',
      period: '19th Century',
      description: 'Original architectural drawings and construction details',
      thumbnail: '/src/assets/pemayangtse-monastery.jpg',
      fileSize: '234.1 MB',
      downloadCount: 94,
      rating: 4.7,
      tags: ['architecture', 'blueprints', 'construction', 'monastery-design'],
      aiInsights: [
        'Design follows traditional Tibetan architectural principles',
        'Incorporates local Sikkimese building materials and techniques',
        'Shows influence of Nepalese artisan traditions'
      ],
      culturalSignificance: 'Represents fusion of Tibetan and local architectural styles',
      historicalContext: 'Built during the reign of Sidkeong Tulku Namgyal',
      preservation: {
        condition: 'fair',
        digitizationDate: '2023-05-10',
        technique: 'Large format scanning with color correction'
      },
      related: ['arch-002', 'ms-001']
    },
    {
      id: 'photo-001',
      title: 'Historical Photographs - Sikkim Monasteries 1920-1950',
      category: 'photo',
      monastery: 'Multiple Monasteries',
      period: '20th Century',
      description: 'Rare photographic documentation of monastic life in early 20th century',
      thumbnail: '/src/assets/historical-photos.jpg',
      fileSize: '178.9 MB',
      downloadCount: 267,
      rating: 4.9,
      tags: ['historical-photos', 'monastic-life', 'black-white', 'documentary'],
      aiInsights: [
        'Photographs show traditional practices that continue today',
        'Images reveal changes in monastery architecture over time',
        'Valuable documentation of monks who became renowned teachers'
      ],
      culturalSignificance: 'Irreplaceable visual record of Sikkimese Buddhist heritage',
      historicalContext: 'Captured during British colonial period in the Himalayas',
      preservation: {
        condition: 'good',
        digitizationDate: '2023-08-15',
        technique: 'High-resolution scanning with dust and scratch removal'
      },
      related: ['ms-001', 'treasure-001']
    },
    {
      id: 'artifact-001',
      title: 'Ritual Bell and Dorje Set',
      category: 'artifact',
      monastery: 'Tashiding Monastery',
      period: '18th Century',
      description: 'Traditional Tibetan Buddhist ritual implements used in ceremonies',
      thumbnail: '/src/assets/ritual-artifacts.jpg',
      fileSize: '67.3 MB',
      downloadCount: 152,
      rating: 4.6,
      tags: ['ritual-objects', 'bronze', 'ceremonial', 'tantric-buddhism'],
      aiInsights: [
        'Dorje symbolizes indestructible nature of enlightenment',
        'Bell represents wisdom and the feminine principle',
        'Used together in advanced Vajrayana Buddhist practices'
      ],
      culturalSignificance: 'Essential tools for Vajrayana Buddhist ritual practices',
      historicalContext: 'Created during the golden age of Tibetan metalwork',
      preservation: {
        condition: 'excellent',
        digitizationDate: '2023-06-30',
        technique: '360-degree photography with macro detail shots'
      },
      related: ['treasure-001', 'ms-001']
    },
    {
      id: 'audio-001',
      title: 'Monastic Chants - Mahakala Puja',
      category: 'audio',
      monastery: 'Rumtek Monastery',
      period: 'Contemporary (2023)',
      description: 'Sacred chanting recorded during protective deity rituals',
      thumbnail: '/src/assets/ritual-artifacts.jpg',
      fileSize: '98.7 MB',
      downloadCount: 421,
      rating: 4.8,
      tags: ['chanting', 'mahakala', 'protective-ritual', 'tibetan-music'],
      aiInsights: [
        'Chants follow traditional melodic patterns from Tibet',
        'Multi-tonal overtone singing technique used',
        'Specific rhythms invoke protective energies'
      ],
      culturalSignificance: 'Living tradition of sacred sound and spiritual protection',
      historicalContext: 'Ritual practices brought from Tibet and preserved in Sikkim',
      preservation: {
        condition: 'excellent',
        digitizationDate: '2023-09-12',
        technique: 'Professional multi-track recording with ambient sound'
      },
      related: ['ms-001', 'artifact-001']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Items', icon: '📚', color: 'bg-slate-100 text-slate-800' },
    { id: 'manuscript', name: 'Manuscripts', icon: '📜', color: 'bg-amber-100 text-amber-800' },
    { id: 'treasure', name: 'Treasures', icon: '💎', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'artifact', name: 'Artifacts', icon: '🏺', color: 'bg-orange-100 text-orange-800' },
    { id: 'architecture', name: 'Architecture', icon: '🏛️', color: 'bg-blue-100 text-blue-800' },
    { id: 'photo', name: 'Photographs', icon: '📷', color: 'bg-purple-100 text-purple-800' },
    { id: 'audio', name: 'Audio', icon: '🎵', color: 'bg-green-100 text-green-800' }
  ];

  const handleAISearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    // Simulate AI search processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock AI search results based on semantic understanding
    const semanticMatches = [
      'Buddhist wisdom texts',
      'Sacred artifacts from Tibet',
      'Monastery architectural heritage',
      'Traditional chanting recordings'
    ];
    
    const suggestedQueries = [
      'Show me manuscripts about meditation',
      'Find golden artifacts from the 17th century',
      'What audio recordings of chants are available?',
      'Display photographs from the British period'
    ];
    
    // Filter items based on AI understanding of the query
    const results = archiveItems.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.tags.some(tag => tag.includes(query.toLowerCase())) ||
      item.aiInsights.some(insight => insight.toLowerCase().includes(query.toLowerCase()))
    );
    
    setAiSearchResults({
      query,
      confidence: 0.87,
      results,
      semanticMatches: semanticMatches.slice(0, 3),
      suggestedQueries: suggestedQueries.slice(0, 3)
    });
    
    setIsSearching(false);
  };

  const filteredItems = selectedCategory === 'all' 
    ? (aiSearchResults?.results || archiveItems)
    : (aiSearchResults?.results || archiveItems).filter(item => item.category === selectedCategory);

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'fragile': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-3">
            <Database className="w-10 h-10 text-amber-600" />
            Enhanced Digital Archive
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            Explore our AI-enhanced digital collection with intelligent search, detailed manuscript viewing, 
            and interactive cultural treasures. Discover hidden connections and deep insights.
          </p>
        </div>

        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="search">AI-Powered Search</TabsTrigger>
            <TabsTrigger value="browse">Browse Collection</TabsTrigger>
            <TabsTrigger value="viewer">Manuscript Viewer</TabsTrigger>
          </TabsList>

          {/* AI-Powered Search Tab */}
          <TabsContent value="search" className="space-y-6">
            {/* AI Search Interface */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  Intelligent Archive Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Brain className="absolute left-3 top-3 w-5 h-5 text-purple-500" />
                    <Input
                      placeholder="Ask me anything: 'Show manuscripts about enlightenment' or 'Find golden artifacts'"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAISearch(searchQuery)}
                      className="pl-12 text-lg py-6"
                    />
                    <Button
                      onClick={() => handleAISearch(searchQuery)}
                      disabled={isSearching}
                      className="absolute right-2 top-2 bg-gradient-to-r from-purple-500 to-blue-600"
                    >
                      {isSearching ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Analyzing...
                        </div>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          AI Search
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Quick AI Prompts */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Buddhist manuscripts',
                      'Golden treasures',
                      'Historical photos',
                      'Sacred chants',
                      'Monastery architecture'
                    ].map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => {
                          setSearchQuery(prompt);
                          handleAISearch(prompt);
                        }}
                        className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Search Results */}
            {aiSearchResults && (
              <div className="space-y-6">
                {/* Search Confidence & Insights */}
                <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Zap className="w-5 h-5 text-purple-600" />
                        AI Analysis Results
                      </h3>
                      <Badge className="bg-green-100 text-green-800">
                        {Math.round(aiSearchResults.confidence * 100)}% Confidence
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Semantic Matches:</h4>
                        <ul className="space-y-1">
                          {aiSearchResults.semanticMatches.map((match, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-slate-600">
                              <Sparkles className="w-3 h-3 text-purple-500" />
                              {match}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Suggested Queries:</h4>
                        <div className="space-y-1">
                          {aiSearchResults.suggestedQueries.map((query, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setSearchQuery(query);
                                handleAISearch(query);
                              }}
                              className="block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              "{query}"
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Search Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aiSearchResults.results.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="relative">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className={categories.find(c => c.id === item.category)?.color}>
                            {categories.find(c => c.id === item.category)?.icon} {categories.find(c => c.id === item.category)?.name}
                          </Badge>
                        </div>
                        <button
                          onClick={() => toggleFavorite(item.id)}
                          className="absolute top-3 right-3"
                        >
                          <Heart className={`w-5 h-5 ${favorites.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                        </button>
                      </div>
                      
                      <CardHeader>
                        <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                        <div className="flex items-center justify-between text-sm text-slate-600">
                          <span>{item.monastery}</span>
                          <span>{item.period}</span>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-3">
                        <p className="text-sm text-slate-600 line-clamp-3">{item.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <Badge className={getConditionColor(item.preservation.condition)}>
                            {item.preservation.condition}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm">{item.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedItem(item)}
                            className="flex-1"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" className="flex-1">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Browse Collection Tab */}
          <TabsContent value="browse" className="space-y-6">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    selectedCategory === category.id
                      ? 'bg-amber-500 text-white'
                      : 'bg-white text-slate-600 hover:bg-amber-100 border'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>

            {/* Collection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <Badge className={categories.find(c => c.id === item.category)?.color}>
                        {categories.find(c => c.id === item.category)?.icon} {categories.find(c => c.id === item.category)?.name}
                      </Badge>
                    </div>
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className="absolute top-3 right-3"
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    </button>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm">{item.rating}</span>
                        <span className="text-xs opacity-80">• {item.downloadCount} downloads</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>{item.monastery}</span>
                      <span>{item.period}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <p className="text-sm text-slate-600 line-clamp-3">{item.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {item.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{item.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedItem(item)}
                        className="flex-1"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                      <Button size="sm" className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Manuscript Viewer Tab */}
          <TabsContent value="viewer">
            {selectedItem ? (
              <div className="space-y-6">
                {/* Viewer Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">{selectedItem.title}</CardTitle>
                        <p className="text-slate-600">{selectedItem.monastery} • {selectedItem.period}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getConditionColor(selectedItem.preservation.condition)}>
                          {selectedItem.preservation.condition}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download High-Res
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Image Viewer */}
                  <div className="lg:col-span-2">
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div ref={viewerRef} className="relative bg-gray-100">
                          <img
                            src={selectedItem.highRes || selectedItem.thumbnail}
                            alt={selectedItem.title}
                            className="w-full h-auto object-contain"
                            style={{ transform: `scale(${zoomLevel})` }}
                          />
                          
                          {/* Viewer Controls */}
                          <div className="absolute bottom-4 left-4 right-4 bg-black/70 rounded-lg p-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
                                className="text-white hover:bg-white/20"
                              >
                                <ZoomOut className="w-4 h-4" />
                              </Button>
                              <span className="text-white text-sm">{Math.round(zoomLevel * 100)}%</span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.1))}
                                className="text-white hover:bg-white/20"
                              >
                                <ZoomIn className="w-4 h-4" />
                              </Button>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setZoomLevel(1)}
                                className="text-white hover:bg-white/20"
                              >
                                <RotateCcw className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-white hover:bg-white/20"
                              >
                                <Maximize2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Details Panel */}
                  <div className="space-y-4">
                    {/* Description */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Description</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600">{selectedItem.description}</p>
                        
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">File Size:</span>
                            <span className="text-sm text-slate-600">{selectedItem.fileSize}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Downloads:</span>
                            <span className="text-sm text-slate-600">{selectedItem.downloadCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Rating:</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm">{selectedItem.rating}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* AI Insights */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Brain className="w-5 h-5 text-purple-600" />
                          AI Insights
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedItem.aiInsights.map((insight, index) => (
                            <div key={index} className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg">
                              <Sparkles className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-slate-700">{insight}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Cultural Significance */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Gem className="w-5 h-5 text-amber-600" />
                          Cultural Context
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Cultural Significance:</h4>
                          <p className="text-sm text-slate-600">{selectedItem.culturalSignificance}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Historical Context:</h4>
                          <p className="text-sm text-slate-600">{selectedItem.historicalContext}</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Preservation Info */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Preservation Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Condition:</span>
                          <Badge className={getConditionColor(selectedItem.preservation.condition)}>
                            {selectedItem.preservation.condition}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Digitized:</span>
                          <span className="text-sm text-slate-600">{selectedItem.preservation.digitizationDate}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Technique:</span>
                          <p className="text-sm text-slate-600 mt-1">{selectedItem.preservation.technique}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-xl font-medium text-slate-700 mb-2">Select an Item to View</h3>
                <p className="text-slate-500">Choose any manuscript, artifact, or treasure from the collection to explore in detail</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Archive Statistics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-amber-600 mb-2">1,247</div>
              <div className="text-sm text-slate-600">Digital Items</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">4.2TB</div>
              <div className="text-sm text-slate-600">High-Res Data</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">87%</div>
              <div className="text-sm text-slate-600">AI Accuracy</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">24,891</div>
              <div className="text-sm text-slate-600">Total Views</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDigitalArchive;