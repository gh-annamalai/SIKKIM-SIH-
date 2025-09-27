import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  FileText, 
  Image,
  Languages,
  Clock,
  Eye,
  Download,
  Star,
  BookOpen,
  Scroll,
  Camera,
  Mic,
  Brain,
  Zap,
  Settings,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  AlertCircle,
  Info,
  Share2
} from 'lucide-react';

const AdvancedSearchEngine: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['english']);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const searchTypes = [
    { id: 'all', name: 'All Content', icon: Search, description: 'Search across all manuscripts and artifacts' },
    { id: 'manuscripts', name: 'Manuscripts', icon: Scroll, description: 'Ancient texts and documents' },
    { id: 'artifacts', name: 'Artifacts', icon: Star, description: 'Physical objects and relics' },
    { id: 'images', name: 'Images', icon: Image, description: 'Photographs and visual content' },
    { id: 'translations', name: 'Translations', icon: Languages, description: 'Translated texts and content' },
    { id: 'ocr', name: 'OCR Text', icon: Eye, description: 'Extracted text from images using OCR' }
  ];

  const languages = [
    { code: 'english', name: 'English', native: 'English' },
    { code: 'tibetan', name: 'Tibetan', native: 'བོད་སྐད་' },
    { code: 'sanskrit', name: 'Sanskrit', native: 'संस्कृतम्' },
    { code: 'hindi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'nepali', name: 'Nepali', native: 'नेपाली' },
    { code: 'chinese', name: 'Chinese', native: '中文' },
    { code: 'dzongkha', name: 'Dzongkha', native: 'རྫོང་ཁ' }
  ];

  const searchSuggestions = [
    'Buddhist meditation techniques',
    'Ancient prayer wheels',
    'Monastery architecture',
    'Tibetan manuscripts',
    'Sacred rituals and ceremonies',
    'Historical artifacts from 15th century',
    'Translated Sanskrit texts',
    'Himalayan monastery history'
  ];

  const mockResults = [
    {
      id: 1,
      type: 'manuscript',
      title: 'The Lotus Sutra - Ancient Tibetan Translation',
      description: 'A 500-year-old manuscript containing the complete Lotus Sutra translated into classical Tibetan. Features gold illuminations and intricate calligraphy.',
      content: 'རྒྱུད་བླ་མའི་བསྟན་བཅོས། ཐེག་པ་ཆེན་པོའི་རྒྱུད་ཀྱི་རྒྱལ་པོ། The Jewel in the Lotus, a sacred text...',
      originalLanguage: 'Tibetan',
      translatedTo: ['English', 'Hindi'],
      date: '1523 CE',
      location: 'Rumtek Monastery Library',
      confidence: 95,
      ocrExtracted: true,
      pages: 156,
      condition: 'Good',
      image: '/src/assets/ancient-manuscript.jpg',
      tags: ['lotus sutra', 'buddhism', 'tibetan', 'sacred text', 'meditation']
    },
    {
      id: 2,
      type: 'artifact',
      title: 'Golden Prayer Wheel with Mantras',
      description: 'Intricately carved prayer wheel containing over 1000 Om Mani Padme Hum mantras. OCR analysis reveals hidden inscriptions.',
      content: 'OM MANI PADME HUM - རྩེ་གསུམ་སངས་རྒྱས་ - Hidden mantras discovered through advanced OCR scanning...',
      originalLanguage: 'Sanskrit',
      translatedTo: ['English', 'Tibetan'],
      date: '1689 CE',
      location: 'Pemayangtse Monastery',
      confidence: 87,
      ocrExtracted: true,
      material: 'Gold-plated copper',
      dimensions: '15cm x 8cm',
      condition: 'Excellent',
      image: '/src/assets/ritual-artifacts.jpg',
      tags: ['prayer wheel', 'mantras', 'gold', 'sanskrit', 'meditation tool']
    },
    {
      id: 3,
      type: 'manuscript',
      title: 'Medical Texts of Traditional Tibetan Medicine',
      description: 'Collection of ancient medical prescriptions and healing practices. Recently digitized with OCR for easier access.',
      content: 'སྨན་པའི་རིག་པ། Traditional healing methods using herbs from the Himalayas. Chapter on meditation as medicine...',
      originalLanguage: 'Tibetan',
      translatedTo: ['English'],
      date: '1456 CE',
      location: 'Tashiding Monastery',
      confidence: 91,
      ocrExtracted: true,
      pages: 89,
      condition: 'Fair',
      image: '/src/assets/historical-photos.jpg',
      tags: ['medicine', 'healing', 'herbs', 'traditional knowledge', 'health']
    }
  ];

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1500);
  };

  const toggleLanguage = (langCode: string) => {
    setSelectedLanguages(prev => 
      prev.includes(langCode) 
        ? prev.filter(l => l !== langCode)
        : [...prev, langCode]
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'manuscript': return Scroll;
      case 'artifact': return Star;
      case 'image': return Image;
      default: return FileText;
    }
  };

  return (
    <div className="py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Advanced Search Engine</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Discover ancient manuscripts, artifacts, and treasures using AI-powered search with OCR text recognition and intelligent translation
          </p>
        </div>

        {/* Main Search Interface */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            {/* Search Input */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search ancient manuscripts, artifacts, or ask questions in natural language..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <div className="absolute right-2 top-2 flex gap-2">
                <Button size="sm" variant="outline">
                  <Mic className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Camera className="w-4 h-4" />
                </Button>
                <Button 
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="px-6"
                >
                  {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Search'}
                </Button>
              </div>
            </div>

            {/* Search Type Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {searchTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSearchType(type.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      searchType === type.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    title={type.description}
                  >
                    <IconComponent className="w-4 h-4" />
                    {type.name}
                  </button>
                );
              })}
            </div>

            {/* Search Suggestions */}
            <div className="mb-6">
              <p className="text-sm text-slate-600 mb-3">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(suggestion)}
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Advanced Filters
                {showAdvancedFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>

              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Brain className="w-4 h-4 text-blue-600" />
                  AI-Powered
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4 text-green-600" />
                  OCR Enabled
                </div>
                <div className="flex items-center gap-1">
                  <Languages className="w-4 h-4 text-purple-600" />
                  Multi-language
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Filters Panel */}
        {showAdvancedFilters && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Advanced Search Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Language Selection */}
              <div>
                <label className="block text-sm font-medium mb-3">Languages</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => toggleLanguage(lang.code)}
                      className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${
                        selectedLanguages.includes(lang.code)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        selectedLanguages.includes(lang.code) ? 'bg-blue-600' : 'bg-slate-300'
                      }`} />
                      <div>
                        <div className="text-sm font-medium">{lang.name}</div>
                        <div className="text-xs text-slate-500">{lang.native}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">From Date</label>
                  <Input
                    type="text"
                    placeholder="e.g., 1400 CE"
                    value={dateRange.from}
                    onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">To Date</label>
                  <Input
                    type="text"
                    placeholder="e.g., 1600 CE"
                    value={dateRange.to}
                    onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                  />
                </div>
              </div>

              {/* Additional Filters */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option value="">All Locations</option>
                    <option value="rumtek">Rumtek Monastery</option>
                    <option value="pemayangtse">Pemayangtse Monastery</option>
                    <option value="tashiding">Tashiding Monastery</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Condition</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option value="">All Conditions</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">OCR Status</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option value="">All Items</option>
                    <option value="processed">OCR Processed</option>
                    <option value="pending">OCR Pending</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search Results */}
        {isSearching && (
          <Card className="mb-8">
            <CardContent className="py-12 text-center">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-slate-600">Searching through ancient manuscripts and artifacts...</p>
              <p className="text-sm text-slate-500 mt-2">Using AI and OCR to analyze content</p>
            </CardContent>
          </Card>
        )}

        {searchResults.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Search Results ({searchResults.length})</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Sort by Relevance
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Results
                </Button>
              </div>
            </div>

            {searchResults.map((result) => {
              const TypeIcon = getTypeIcon(result.type);
              return (
                <Card key={result.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="grid lg:grid-cols-4 gap-6">
                      {/* Image */}
                      <div className="lg:col-span-1">
                        <div className="relative">
                          <img 
                            src={result.image} 
                            alt={result.title}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div className="absolute top-2 left-2 flex gap-1">
                            <Badge className="bg-black/70 text-white">
                              <TypeIcon className="w-3 h-3 mr-1" />
                              {result.type}
                            </Badge>
                            {result.ocrExtracted && (
                              <Badge className="bg-green-600">
                                <Eye className="w-3 h-3 mr-1" />
                                OCR
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="lg:col-span-3">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-semibold text-slate-800 hover:text-blue-600 cursor-pointer">
                            {result.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-green-600">
                              {result.confidence}% match
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Star className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <p className="text-slate-600 mb-4">{result.description}</p>

                        {/* Extracted Content */}
                        <div className="bg-slate-50 rounded-lg p-4 mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Eye className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium">OCR Extracted Text</span>
                          </div>
                          <p className="text-sm text-slate-700 font-mono">{result.content}</p>
                        </div>

                        {/* Metadata */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Languages className="w-4 h-4 text-purple-600" />
                            <span className="text-slate-600">Language:</span>
                            <span className="font-medium">{result.originalLanguage}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            <span className="text-slate-600">Date:</span>
                            <span className="font-medium">{result.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-red-600" />
                            <span className="text-slate-600">Location:</span>
                            <span className="font-medium">{result.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-orange-600" />
                            <span className="text-slate-600">Condition:</span>
                            <span className="font-medium">{result.condition}</span>
                          </div>
                        </div>

                        {/* Translations */}
                        <div className="mb-4">
                          <span className="text-sm text-slate-600 mr-2">Available in:</span>
                          {result.translatedTo.map((lang) => (
                            <Badge key={lang} variant="secondary" className="mr-1">
                              {lang}
                            </Badge>
                          ))}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {result.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                          <Button size="sm">
                            <BookOpen className="w-4 h-4 mr-2" />
                            View Full Text
                          </Button>
                          <Button variant="outline" size="sm">
                            <Languages className="w-4 h-4 mr-2" />
                            Translate
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline">
                Load More Results
              </Button>
            </div>
          </div>
        )}

        {/* Help Section */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Info className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Search Tips</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
                  <div>
                    <p className="mb-2"><strong>OCR Search:</strong> Search within extracted text from ancient manuscripts</p>
                    <p className="mb-2"><strong>Natural Language:</strong> Ask questions like "What are meditation techniques?"</p>
                  </div>
                  <div>
                    <p className="mb-2"><strong>Multi-language:</strong> Search in Tibetan, Sanskrit, or English</p>
                    <p className="mb-2"><strong>Visual Search:</strong> Upload images to find similar artifacts</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedSearchEngine;