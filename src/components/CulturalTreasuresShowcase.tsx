import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Gem, Crown, Star, Heart, Eye, RotateCcw, 
  ZoomIn, ZoomOut, Play, Pause, Volume2, 
  MapPin, Calendar, Users, Sparkles, 
  ChevronLeft, ChevronRight, Share2,
  BookOpen, Globe, Award, Camera
} from 'lucide-react';

interface Treasure {
  id: string;
  name: string;
  category: 'sculpture' | 'jewelry' | 'instrument' | 'textile' | 'painting' | 'relic';
  monastery: string;
  period: string;
  material: string[];
  dimensions: string;
  weight?: string;
  rarity: 'common' | 'rare' | 'very-rare' | 'legendary';
  images: string[];
  video?: string;
  audio?: string;
  description: string;
  culturalValue: string;
  historicalSignificance: string;
  craftsmanship: {
    technique: string;
    artisan: string;
    timeToCreate: string;
  };
  stories: string[];
  currentLocation: string;
  accessibility: 'public-display' | 'restricted' | 'special-viewing' | 'digital-only';
  virtualTour: boolean;
  interactiveFeatures: string[];
  relatedTreasures: string[];
}

const CulturalTreasuresShowcase: React.FC = () => {
  const [selectedTreasure, setSelectedTreasure] = useState<Treasure | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'gallery' | 'showcase' | 'timeline'>('gallery');
  const [favorites, setFavorites] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const treasures: Treasure[] = [
    {
      id: 'treasure-001',
      name: 'Golden Buddha of Compassion (Avalokiteshvara)',
      category: 'sculpture',
      monastery: 'Rumtek Monastery',
      period: '16th Century',
      material: ['24-karat gold', 'copper alloy', 'precious stones', 'turquoise'],
      dimensions: '45cm H × 32cm W × 28cm D',
      weight: '12.5 kg',
      rarity: 'legendary',
      images: [
        '/src/assets/ritual-artifacts.jpg',
        '/src/assets/ancient-manuscript.jpg',
        '/src/assets/rumtek-monastery.jpg'
      ],
      video: '/src/assets/rumtek-video.mp4',
      audio: '/src/assets/rumtek-audio-en.mp3',
      description: 'This exquisite golden statue represents Avalokiteshvara, the Bodhisattva of Compassion, created by master craftsmen from Tibet using traditional lost-wax casting techniques.',
      culturalValue: 'Central object of daily worship and meditation practice, believed to emanate compassionate energy',
      historicalSignificance: 'Commissioned by the 10th Karmapa Chöying Dorje, this statue traveled from Tibet to Sikkim during the 1960s exodus',
      craftsmanship: {
        technique: 'Lost-wax casting with fire-gilding and stone inlay',
        artisan: 'Master Norbu Tenzin and workshop',
        timeToCreate: '2 years and 3 months'
      },
      stories: [
        'Legend says the statue shed tears during the 1959 Tibetan uprising',
        'Pilgrims report experiencing profound peace in its presence',
        'The turquoise stones were personally selected by the 16th Karmapa'
      ],
      currentLocation: 'Main Prayer Hall, Rumtek Monastery',
      accessibility: 'special-viewing',
      virtualTour: true,
      interactiveFeatures: ['360° rotation', 'detailed zoom', 'audio narration', 'historical timeline'],
      relatedTreasures: ['treasure-002', 'treasure-003']
    },
    {
      id: 'treasure-002',
      name: 'Ancient Ritual Bell and Dorje Set',
      category: 'instrument',
      monastery: 'Pemayangtse Monastery',
      period: '17th Century',
      material: ['bronze', 'silver', 'coral', 'bone'],
      dimensions: 'Bell: 18cm H, Dorje: 12cm L',
      weight: '850g (combined)',
      rarity: 'very-rare',
      images: [
        '/src/assets/ritual-artifacts.jpg',
        '/src/assets/ancient-manuscript.jpg'
      ],
      description: 'Sacred ritual implements used in Vajrayana Buddhist ceremonies, representing the union of wisdom and compassion',
      culturalValue: 'Essential tools for advanced tantric practices and empowerment ceremonies',
      historicalSignificance: 'Used by the great meditation master Lhatsun Chempo in establishing Buddhism in Sikkim',
      craftsmanship: {
        technique: 'Bronze casting with intricate engravings and precious metal inlay',
        artisan: 'Tibetan monastery workshop tradition',
        timeToCreate: '6 months'
      },
      stories: [
        'Said to produce otherworldly sounds that aid deep meditation',
        'The dorje is believed to channel protective energies',
        'Survived the monastery fire of 1705 miraculously undamaged'
      ],
      currentLocation: 'Sacred Relic Chamber, Pemayangtse',
      accessibility: 'restricted',
      virtualTour: true,
      interactiveFeatures: ['sound samples', '3D model', 'ritual demonstration'],
      relatedTreasures: ['treasure-001', 'treasure-004']
    },
    {
      id: 'treasure-003',
      name: 'Royal Silk Thangka - Wheel of Life',
      category: 'painting',
      monastery: 'Tashiding Monastery',
      period: '18th Century',
      material: ['silk canvas', 'natural pigments', 'gold leaf', 'silver thread'],
      dimensions: '180cm H × 120cm W',
      rarity: 'rare',
      images: [
        '/src/assets/pemayangtse-monastery.jpg',
        '/src/assets/ancient-manuscript.jpg'
      ],
      description: 'Masterpiece thangka depicting the Buddhist Wheel of Life (Bhavachakra), painted with rare mineral pigments on precious silk',
      culturalValue: 'Teaching aid for understanding Buddhist concepts of karma, rebirth, and enlightenment',
      historicalSignificance: 'Commissioned by Queen Phuntsog Pal for the monastery\'s consecration ceremony',
      craftsmanship: {
        technique: 'Traditional thangka painting with natural pigments and gold illumination',
        artisan: 'Master painter Lobsang Phuntsok',
        timeToCreate: '1 year and 4 months'
      },
      stories: [
        'Colors remain vibrant after 300 years due to special mineral preparation',
        'The painting is said to reveal different details to different viewers',
        'Protected from invaders by being hidden in a secret chamber for 50 years'
      ],
      currentLocation: 'Main Assembly Hall, Tashiding',
      accessibility: 'public-display',
      virtualTour: true,
      interactiveFeatures: ['ultra-high resolution viewing', 'symbolic interpretation', 'color analysis'],
      relatedTreasures: ['treasure-001', 'treasure-005']
    },
    {
      id: 'treasure-004',
      name: 'Ceremonial Crown of the Dharma King',
      category: 'jewelry',
      monastery: 'Enchey Monastery',
      period: '19th Century',
      material: ['gold', 'silver', 'rubies', 'sapphires', 'pearls'],
      dimensions: '25cm diameter × 20cm height',
      weight: '2.8 kg',
      rarity: 'legendary',
      images: [
        '/src/assets/ritual-artifacts.jpg',
        '/src/assets/tashiding-monastery.jpg'
      ],
      description: 'Ornate ceremonial crown worn during special religious ceremonies, featuring intricate filigree work and precious gemstones',
      culturalValue: 'Symbol of spiritual authority and connection to the divine realm of Buddhist deities',
      historicalSignificance: 'Gifted by the 13th Dalai Lama to commemorate Sikkim\'s dedication to Buddhist teachings',
      craftsmanship: {
        technique: 'Filigree goldwork with traditional Tibetan gem-setting methods',
        artisan: 'Royal court jeweler Tenzin Norbu',
        timeToCreate: '8 months'
      },
      stories: [
        'Each gemstone represents one of the Five Buddha Families',
        'Worn only during the most sacred ceremonies',
        'Said to grant the wearer clarity of mind and compassionate speech'
      ],
      currentLocation: 'Treasury Vault, Enchey Monastery',
      accessibility: 'digital-only',
      virtualTour: true,
      interactiveFeatures: ['gemstone identification', 'symbolic meaning guide', 'historical timeline'],
      relatedTreasures: ['treasure-001', 'treasure-002']
    },
    {
      id: 'treasure-005',
      name: 'Sacred Manuscript - Prajnaparamita in Gold',
      category: 'relic',
      monastery: 'Dubdi Monastery',
      period: '15th Century',
      material: ['paper', 'gold ink', 'cinnabar', 'lapis lazuli'],
      dimensions: '40cm × 8cm (folded format)',
      rarity: 'legendary',
      images: [
        '/src/assets/ancient-manuscript.jpg',
        '/src/assets/historical-photos.jpg'
      ],
      description: 'One of the world\'s rarest manuscripts, written entirely in gold ink with illuminations in precious mineral pigments',
      culturalValue: 'Contains the essence of Buddhist wisdom teachings, considered a treasure beyond material value',
      historicalSignificance: 'One of only three known complete manuscripts of its kind, predating the printing press era',
      craftsmanship: {
        technique: 'Hand-written calligraphy in gold with mineral pigment illustrations',
        artisan: 'Scholar-monk Kunzang Paljor',
        timeToCreate: '3 years'
      },
      stories: [
        'Legend says it glows softly in candlelight',
        'Survived multiple monastery fires without damage',
        'Each page took one month to complete due to the precious materials'
      ],
      currentLocation: 'Climate-controlled vault, Dubdi Monastery',
      accessibility: 'digital-only',
      virtualTour: false,
      interactiveFeatures: ['page-by-page viewing', 'translation overlay', 'calligraphy analysis'],
      relatedTreasures: ['treasure-001', 'treasure-003']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Treasures', icon: '💎', count: treasures.length },
    { id: 'sculpture', name: 'Sculptures', icon: '🗿', count: treasures.filter(t => t.category === 'sculpture').length },
    { id: 'jewelry', name: 'Jewelry', icon: '👑', count: treasures.filter(t => t.category === 'jewelry').length },
    { id: 'instrument', name: 'Instruments', icon: '🔔', count: treasures.filter(t => t.category === 'instrument').length },
    { id: 'painting', name: 'Paintings', icon: '🎨', count: treasures.filter(t => t.category === 'painting').length },
    { id: 'relic', name: 'Relics', icon: '📜', count: treasures.filter(t => t.category === 'relic').length }
  ];

  const rarityColors = {
    'common': 'bg-gray-100 text-gray-800',
    'rare': 'bg-blue-100 text-blue-800',
    'very-rare': 'bg-purple-100 text-purple-800',
    'legendary': 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800'
  };

  const accessibilityColors = {
    'public-display': 'bg-green-100 text-green-800',
    'restricted': 'bg-yellow-100 text-yellow-800',
    'special-viewing': 'bg-blue-100 text-blue-800',
    'digital-only': 'bg-purple-100 text-purple-800'
  };

  const filteredTreasures = selectedCategory === 'all' 
    ? treasures 
    : treasures.filter(t => t.category === selectedCategory);

  const toggleFavorite = (treasureId: string) => {
    setFavorites(prev => 
      prev.includes(treasureId) 
        ? prev.filter(id => id !== treasureId)
        : [...prev, treasureId]
    );
  };

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (!selectedTreasure) return;
    
    const totalImages = selectedTreasure.images.length;
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }
  };

  return (
    <div className="py-20 bg-gradient-to-b from-yellow-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-3">
            <Gem className="w-10 h-10 text-yellow-600" />
            Cultural Treasures Showcase
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto">
            Discover the most precious cultural artifacts and sacred treasures of Sikkim's monasteries. 
            Each piece tells a story of devotion, craftsmanship, and spiritual heritage.
          </p>
        </div>

        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="gallery">Treasure Gallery</TabsTrigger>
            <TabsTrigger value="showcase">Interactive Showcase</TabsTrigger>
            <TabsTrigger value="timeline">Historical Timeline</TabsTrigger>
          </TabsList>

          {/* Gallery View */}
          <TabsContent value="gallery" className="space-y-6">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-yellow-500 text-white'
                      : 'bg-white text-slate-600 hover:bg-yellow-100 border'
                  }`}
                >
                  <span>{category.icon}</span>
                  {category.name}
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {category.count}
                  </Badge>
                </button>
              ))}
            </div>

            {/* Treasures Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTreasures.map((treasure) => (
                <Card key={treasure.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 group">
                  <div className="relative">
                    <img
                      src={treasure.images[0]}
                      alt={treasure.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <Badge className={rarityColors[treasure.rarity]}>
                        <Star className="w-3 h-3 mr-1" />
                        {treasure.rarity.replace('-', ' ')}
                      </Badge>
                      <Badge className={accessibilityColors[treasure.accessibility]}>
                        {treasure.accessibility.replace('-', ' ')}
                      </Badge>
                    </div>
                    
                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(treasure.id)}
                      className="absolute top-3 right-3"
                    >
                      <Heart 
                        className={`w-6 h-6 ${
                          favorites.includes(treasure.id) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-white hover:text-red-300'
                        }`} 
                      />
                    </button>

                    {/* Virtual Tour Indicator */}
                    {treasure.virtualTour && (
                      <div className="absolute bottom-3 right-3">
                        <Badge className="bg-blue-500 text-white">
                          <Camera className="w-3 h-3 mr-1" />
                          Virtual Tour
                        </Badge>
                      </div>
                    )}

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-lg mb-1 line-clamp-2">{treasure.name}</h3>
                      <div className="flex items-center justify-between text-sm opacity-90">
                        <span>{treasure.monastery}</span>
                        <span>{treasure.period}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <p className="text-slate-600 line-clamp-3">{treasure.description}</p>
                    
                    {/* Materials */}
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-2">Materials:</p>
                      <div className="flex flex-wrap gap-1">
                        {treasure.material.slice(0, 3).map((material) => (
                          <Badge key={material} variant="outline" className="text-xs">
                            {material}
                          </Badge>
                        ))}
                        {treasure.material.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{treasure.material.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {/* Dimensions */}
                    <div className="text-sm text-slate-600">
                      <strong>Dimensions:</strong> {treasure.dimensions}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedTreasure(treasure);
                          setCurrentImageIndex(0);
                          setViewMode('showcase');
                        }}
                        className="flex-1"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Explore
                      </Button>
                      <Button size="sm" className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-600">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Interactive Showcase */}
          <TabsContent value="showcase">
            {selectedTreasure ? (
              <div className="space-y-6">
                {/* Showcase Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">{selectedTreasure.name}</CardTitle>
                        <div className="flex items-center gap-4 mt-2 text-slate-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {selectedTreasure.monastery}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {selectedTreasure.period}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={rarityColors[selectedTreasure.rarity]}>
                          <Crown className="w-3 h-3 mr-1" />
                          {selectedTreasure.rarity.replace('-', ' ')}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Media Viewer */}
                  <div className="space-y-4">
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={selectedTreasure.images[currentImageIndex]}
                            alt={`${selectedTreasure.name} - View ${currentImageIndex + 1}`}
                            className="w-full h-96 object-cover"
                          />
                          
                          {/* Navigation Arrows */}
                          {selectedTreasure.images.length > 1 && (
                            <>
                              <button
                                onClick={() => handleImageNavigation('prev')}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/70 text-white p-2 rounded-full hover:bg-black/80"
                              >
                                <ChevronLeft className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleImageNavigation('next')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/70 text-white p-2 rounded-full hover:bg-black/80"
                              >
                                <ChevronRight className="w-5 h-5" />
                              </button>
                            </>
                          )}

                          {/* Image Counter */}
                          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                            {currentImageIndex + 1} / {selectedTreasure.images.length}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Interactive Features */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-yellow-600" />
                          Interactive Features
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                          {selectedTreasure.interactiveFeatures.map((feature, index) => (
                            <Button key={index} variant="outline" size="sm" className="justify-start">
                              <Eye className="w-4 h-4 mr-2" />
                              {feature}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Audio/Video Player */}
                    {selectedTreasure.audio && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Volume2 className="w-5 h-5 text-green-600" />
                            Audio Guide
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <audio controls className="w-full">
                            <source src={selectedTreasure.audio} type="audio/mpeg" />
                          </audio>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {/* Details Panel */}
                  <div className="space-y-4">
                    {/* Description */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Description</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 leading-relaxed">{selectedTreasure.description}</p>
                      </CardContent>
                    </Card>

                    {/* Specifications */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Specifications</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-slate-700">Materials:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedTreasure.material.map((material) => (
                              <Badge key={material} variant="outline" className="text-xs">
                                {material}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-slate-700">Dimensions:</p>
                            <p className="text-slate-600">{selectedTreasure.dimensions}</p>
                          </div>
                          {selectedTreasure.weight && (
                            <div>
                              <p className="font-medium text-slate-700">Weight:</p>
                              <p className="text-slate-600">{selectedTreasure.weight}</p>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-slate-700">Current Location:</p>
                          <p className="text-slate-600">{selectedTreasure.currentLocation}</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Cultural Significance */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Globe className="w-5 h-5 text-blue-600" />
                          Cultural Value
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-slate-700 mb-2">Cultural Significance:</p>
                          <p className="text-sm text-slate-600">{selectedTreasure.culturalValue}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-700 mb-2">Historical Context:</p>
                          <p className="text-sm text-slate-600">{selectedTreasure.historicalSignificance}</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Craftsmanship */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Award className="w-5 h-5 text-purple-600" />
                          Craftsmanship
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div>
                          <p className="text-sm font-medium">Technique:</p>
                          <p className="text-sm text-slate-600">{selectedTreasure.craftsmanship.technique}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Artisan:</p>
                          <p className="text-sm text-slate-600">{selectedTreasure.craftsmanship.artisan}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Creation Time:</p>
                          <p className="text-sm text-slate-600">{selectedTreasure.craftsmanship.timeToCreate}</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Stories & Legends */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-orange-600" />
                          Stories & Legends
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedTreasure.stories.map((story, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                              <Sparkles className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-slate-700">{story}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Gem className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-xl font-medium text-slate-700 mb-2">Select a Treasure to Explore</h3>
                <p className="text-slate-500">Choose any cultural treasure from the gallery to view in detail</p>
              </div>
            )}
          </TabsContent>

          {/* Historical Timeline */}
          <TabsContent value="timeline">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-2xl">Cultural Heritage Timeline</CardTitle>
                  <p className="text-center text-slate-600">Journey through centuries of artistic and spiritual treasures</p>
                </CardHeader>
              </Card>

              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500"></div>
                
                {treasures
                  .sort((a, b) => parseInt(a.period.split(' ')[0].replace(/\D/g, '')) - parseInt(b.period.split(' ')[0].replace(/\D/g, '')))
                  .map((treasure, index) => (
                    <div key={treasure.id} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-8`}>
                      <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                        <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => {
                          setSelectedTreasure(treasure);
                          setViewMode('showcase');
                        }}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <Badge className="bg-yellow-100 text-yellow-800">{treasure.period}</Badge>
                              <Badge className={rarityColors[treasure.rarity]}>
                                {treasure.rarity.replace('-', ' ')}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg">{treasure.name}</CardTitle>
                            <p className="text-slate-600 text-sm">{treasure.monastery}</p>
                          </CardHeader>
                          <CardContent>
                            <img
                              src={treasure.images[0]}
                              alt={treasure.name}
                              className="w-full h-32 object-cover rounded mb-3"
                            />
                            <p className="text-sm text-slate-600 line-clamp-3">{treasure.description}</p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      {/* Timeline dot */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-4 border-white shadow-lg"></div>
                    </div>
                  ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{treasures.length}</div>
              <div className="text-sm text-slate-600">Cultural Treasures</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">{treasures.filter(t => t.rarity === 'legendary').length}</div>
              <div className="text-sm text-slate-600">Legendary Items</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">{treasures.filter(t => t.virtualTour).length}</div>
              <div className="text-sm text-slate-600">Virtual Tours</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
              <div className="text-sm text-slate-600">Monasteries</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CulturalTreasuresShowcase;