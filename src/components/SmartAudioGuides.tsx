import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Headphones, Play, Pause, Volume2, VolumeX, Search, 
  Mic, Bot, MapPin, Clock, Zap, Star, MessageCircle,
  ChevronRight, Settings, Globe, Brain
} from 'lucide-react';

interface AudioSegment {
  id: string;
  title: string;
  content: string;
  audioFile: string;
  duration: number;
  category: 'history' | 'architecture' | 'culture' | 'ritual' | 'nature';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  relatedTopics: string[];
  aiInsights: string[];
}

interface SmartGuide {
  id: string;
  name: string;
  monastery: string;
  description: string;
  image: string;
  totalSegments: number;
  languages: { code: string; name: string }[];
  features: string[];
  segments: AudioSegment[];
  aiPersonality: {
    name: string;
    voice: string;
    expertise: string[];
  };
}

const SmartAudioGuides: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<SmartGuide | null>(null);
  const [currentSegment, setCurrentSegment] = useState<AudioSegment | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAIInsights, setShowAIInsights] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const smartGuides: SmartGuide[] = [
    {
      id: 'rumtek-ai-guide',
      name: 'Rumtek Monastery Smart Guide',
      monastery: 'Rumtek Monastery',
      description: 'AI-powered contextual audio guide with dynamic content adaptation',
      image: '/src/assets/rumtek-monastery.jpg',
      totalSegments: 12,
      languages: [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'Hindi' },
        { code: 'fr', name: 'French' },
        { code: 'sp', name: 'Spanish' }
      ],
      features: [
        'Location-aware content',
        'Adaptive difficulty levels',
        'Real-time insights',
        'Personalized recommendations',
        'Interactive Q&A'
      ],
      aiPersonality: {
        name: 'Dharma',
        voice: 'Warm, knowledgeable',
        expertise: ['Buddhist philosophy', 'Himalayan history', 'Cultural traditions']
      },
      segments: [
        {
          id: 'intro',
          title: 'Welcome to Rumtek',
          content: 'AI-generated introduction based on your interests and experience level',
          audioFile: '/src/assets/rumtek-audio-en.mp3',
          duration: 180,
          category: 'history',
          difficulty: 'beginner',
          relatedTopics: ['Monastery history', 'Karmapa lineage', 'Tibetan Buddhism'],
          aiInsights: [
            'This monastery houses the Black Crown of the Karmapa',
            'Built to replicate the original Tsurphu monastery in Tibet',
            'Considered the largest monastery in Sikkim'
          ]
        },
        {
          id: 'golden-stupa',
          title: 'The Golden Stupa',
          content: 'Interactive exploration of the sacred reliquary',
          audioFile: '/src/assets/rumtek-audio-en.mp3',
          duration: 240,
          category: 'architecture',
          difficulty: 'intermediate',
          relatedTopics: ['Stupa symbolism', 'Sacred geometry', 'Relics'],
          aiInsights: [
            'The stupa represents the enlightened mind of Buddha',
            'Contains relics of the 16th Karmapa',
            'The golden color symbolizes the purity of enlightenment'
          ]
        },
        {
          id: 'prayer-hall',
          title: 'Main Prayer Hall',
          content: 'Understanding monastic daily life and rituals',
          audioFile: '/src/assets/rumtek-audio-en.mp3',
          duration: 300,
          category: 'ritual',
          difficulty: 'intermediate',
          relatedTopics: ['Daily prayers', 'Monastic discipline', 'Buddhist chants'],
          aiInsights: [
            'Monks gather here for morning and evening prayers',
            'The hall can accommodate over 300 monks',
            'Acoustics designed for chanting and meditation'
          ]
        },
        {
          id: 'artifacts',
          title: 'Sacred Artifacts',
          content: 'AI-guided tour through precious religious objects',
          audioFile: '/src/assets/rumtek-audio-en.mp3',
          duration: 200,
          category: 'culture',
          difficulty: 'advanced',
          relatedTopics: ['Ritual objects', 'Historical preservation', 'Tibetan art'],
          aiInsights: [
            'Many artifacts were brought from Tibet during the exodus',
            'Each object has specific ritual and symbolic significance',
            'The preservation techniques follow traditional methods'
          ]
        }
      ]
    },
    {
      id: 'tashiding-ai-guide',
      name: 'Tashiding Sacred Journey',
      monastery: 'Tashiding Monastery',
      description: 'Context-aware guide adapting to your spiritual journey',
      image: '/src/assets/tashiding-monastery.jpg',
      totalSegments: 8,
      languages: [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'Hindi' },
        { code: 'ne', name: 'Nepali' }
      ],
      features: [
        'Sacred site recognition',
        'Festival calendar integration',
        'Meditation guidance',
        'Cultural storytelling'
      ],
      aiPersonality: {
        name: 'Tara',
        voice: 'Gentle, spiritual',
        expertise: ['Sacred geography', 'Meditation practices', 'Local folklore']
      },
      segments: [
        {
          id: 'sacred-hill',
          title: 'The Sacred Hill',
          content: 'Understanding the spiritual significance of the location',
          audioFile: '/src/assets/rumtek-audio-hi.mp3',
          duration: 220,
          category: 'nature',
          difficulty: 'beginner',
          relatedTopics: ['Sacred geography', 'Spiritual energy', 'Pilgrimage'],
          aiInsights: [
            'This hilltop is considered especially sacred in Tibetan Buddhism',
            'The location offers panoramic views of the Himalayas',
            'Many pilgrims consider this their spiritual center'
          ]
        }
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Content', icon: '🎯' },
    { id: 'history', name: 'History', icon: '📚' },
    { id: 'architecture', name: 'Architecture', icon: '🏛️' },
    { id: 'culture', name: 'Culture', icon: '🎭' },
    { id: 'ritual', name: 'Rituals', icon: '🕉️' },
    { id: 'nature', name: 'Nature', icon: '🌿' }
  ];

  const filteredSegments = selectedGuide?.segments.filter(segment => {
    const matchesCategory = selectedCategory === 'all' || segment.category === selectedCategory;
    const matchesSearch = segment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         segment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         segment.relatedTopics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  }) || [];

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSegmentSelect = (segment: AudioSegment) => {
    setCurrentSegment(segment);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCategoryIcon = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      history: '📚', architecture: '🏛️', culture: '🎭', 
      ritual: '🕉️', nature: '🌿'
    };
    return categoryMap[category] || '🎯';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="py-20 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            AI-Powered Smart Audio Guides
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Experience intelligent, context-aware guidance that adapts to your interests, 
            location, and knowledge level for a personalized cultural journey
          </p>
        </div>

        <Tabs defaultValue="guides" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="guides">Smart Guides</TabsTrigger>
            <TabsTrigger value="experience">Current Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="guides" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {smartGuides.map((guide) => (
                <Card key={guide.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <img
                      src={guide.image}
                      alt={guide.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-purple-100 text-purple-800">
                        <Brain className="w-3 h-3 mr-1" />
                        AI-Powered
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      {guide.totalSegments} segments
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl">{guide.name}</CardTitle>
                    <p className="text-slate-600">{guide.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* AI Personality */}
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{guide.aiPersonality.name}</p>
                        <p className="text-xs text-slate-600">{guide.aiPersonality.voice} AI Guide</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-2">Smart Features:</p>
                      <div className="grid grid-cols-2 gap-1">
                        {guide.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-1 text-xs text-slate-600">
                            <Zap className="w-3 h-3 text-purple-500" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Languages */}
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-2">Languages:</p>
                      <div className="flex flex-wrap gap-1">
                        {guide.languages.map((lang) => (
                          <Badge key={lang.code} variant="outline" className="text-xs">
                            <Globe className="w-3 h-3 mr-1" />
                            {lang.name}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button 
                      onClick={() => setSelectedGuide(guide)}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                    >
                      <Headphones className="w-4 h-4 mr-2" />
                      Activate Smart Guide
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="experience">
            {selectedGuide ? (
              <div className="max-w-7xl mx-auto">
                {/* Guide Header */}
                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <Bot className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{selectedGuide.aiPersonality.name}</h3>
                          <p className="text-slate-600">{selectedGuide.name}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-purple-100 text-purple-800">
                              <Brain className="w-3 h-3 mr-1" />
                              AI-Powered
                            </Badge>
                            <Badge variant="outline">
                              <Globe className="w-3 h-3 mr-1" />
                              {selectedGuide.languages.length} Languages
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 mr-1" />
                          Customize
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Content Browser */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Search and Filters */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="relative">
                            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                            <Input
                              placeholder="Ask me anything about the monastery..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                              <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                                  selectedCategory === category.id
                                    ? 'bg-purple-500 text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                              >
                                <span className="mr-1">{category.icon}</span>
                                {category.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Segments List */}
                    <div className="space-y-3">
                      {filteredSegments.map((segment) => (
                        <Card 
                          key={segment.id} 
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            currentSegment?.id === segment.id ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                          }`}
                          onClick={() => handleSegmentSelect(segment)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-lg">{getCategoryIcon(segment.category)}</span>
                                  <h4 className="font-medium">{segment.title}</h4>
                                  <Badge className={getDifficultyColor(segment.difficulty)}>
                                    {segment.difficulty}
                                  </Badge>
                                </div>
                                <p className="text-sm text-slate-600 mb-3">{segment.content}</p>
                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {formatTime(segment.duration)}
                                  </span>
                                  <span>{segment.relatedTopics.length} topics</span>
                                </div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-slate-400" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Current Segment Player */}
                  <div className="space-y-6">
                    {currentSegment ? (
                      <>
                        {/* Audio Player */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <span>{getCategoryIcon(currentSegment.category)}</span>
                              {currentSegment.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <audio
                              ref={audioRef}
                              src={currentSegment.audioFile}
                              onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
                              onEnded={() => setIsPlaying(false)}
                            />
                            
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm text-slate-500">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(currentSegment.duration)}</span>
                              </div>
                              <Progress 
                                value={(currentTime / currentSegment.duration) * 100}
                                className="w-full"
                              />
                            </div>
                            
                            <div className="flex items-center justify-center gap-3">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setVolume(Math.max(0, volume - 0.1))}
                              >
                                <Volume2 className="w-4 h-4" />
                              </Button>
                              
                              <Button
                                onClick={handlePlayPause}
                                className="bg-gradient-to-r from-purple-500 to-pink-600"
                              >
                                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                              </Button>
                              
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setVolume(Math.min(1, volume + 0.1))}
                              >
                                <Volume2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>

                        {/* AI Insights */}
                        {showAIInsights && (
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <Brain className="w-5 h-5 text-purple-500" />
                                AI Insights
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                {currentSegment.aiInsights.map((insight, index) => (
                                  <div key={index} className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg">
                                    <Zap className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-slate-700">{insight}</p>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        {/* Related Topics */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Related Topics</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {currentSegment.relatedTopics.map((topic, index) => (
                                <button
                                  key={index}
                                  className="w-full text-left p-2 rounded hover:bg-slate-50 flex items-center gap-2"
                                >
                                  <MessageCircle className="w-4 h-4 text-slate-400" />
                                  <span className="text-sm">{topic}</span>
                                </button>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    ) : (
                      <Card>
                        <CardContent className="p-8 text-center">
                          <Headphones className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                          <h3 className="text-lg font-medium text-slate-700 mb-2">Select Content</h3>
                          <p className="text-slate-500">Choose a segment to start your AI-guided experience</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Bot className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-xl font-medium text-slate-700 mb-2">Activate Smart Guide</h3>
                <p className="text-slate-500">Choose an AI guide to begin your personalized cultural experience</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SmartAudioGuides;