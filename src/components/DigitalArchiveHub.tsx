import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdvancedSearchEngine from './AdvancedSearchEngine';
import ArtifactExplorer from './ArtifactExplorer';
import AIAssistant from './AIAssistant';
import PersonalizedRecommendations from './PersonalizedRecommendations';
import { 
  Search, 
  Scan, 
  Brain, 
  Target,
  Database,
  Bot,
  Eye,
  Languages,
  Sparkles,
  FileText,
  Star,
  Users,
  TrendingUp,
  Calendar,
  Clock,
  Award,
  Zap,
  Settings,
  RefreshCw,
  Download,
  Share2,
  BookOpen,
  Image as ImageIcon,
  MessageCircle,
  Filter,
  Globe,
  Camera,
  Upload
} from 'lucide-react';

const DigitalArchiveHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const archiveStats = {
    totalManuscripts: 2847,
    ocrProcessed: 2134,
    languagesSupported: 12,
    aiAnalysisComplete: 1876,
    userQueries: 15243,
    recommendationsGenerated: 8965,
    averageAccuracy: 94.2,
    activeUsers: 456
  };

  const recentActivity = [
    {
      id: 1,
      type: 'ocr',
      title: 'New manuscript processed with OCR',
      description: 'Ancient Tibetan medical text from 15th century successfully digitized',
      timestamp: '2 hours ago',
      confidence: 92,
      language: 'Tibetan'
    },
    {
      id: 2,
      type: 'ai',
      title: 'AI analysis completed',
      description: 'Historical context analysis for 12 Sanskrit manuscripts',
      timestamp: '4 hours ago',
      confidence: 89,
      items: 12
    },
    {
      id: 3,
      type: 'search',
      title: 'Popular search query',
      description: 'Users increasingly searching for meditation techniques',
      timestamp: '6 hours ago',
      queries: 47,
      trend: 'up'
    },
    {
      id: 4,
      type: 'recommendation',
      title: 'Personalized recommendations updated',
      description: 'AI generated 234 new personalized recommendations',
      timestamp: '8 hours ago',
      users: 89,
      accuracy: 96
    }
  ];

  const featuredCapabilities = [
    {
      id: 1,
      title: 'Tesseract OCR Integration',
      description: 'Advanced text extraction from ancient manuscripts with 94% accuracy',
      icon: Eye,
      color: 'blue',
      stats: '2,134 processed',
      features: ['Multi-language support', 'Ancient script recognition', 'Text preservation']
    },
    {
      id: 2,
      title: 'AI-Powered Analysis',
      description: 'Intelligent manuscript analysis and historical context generation',
      icon: Brain,
      color: 'purple',
      stats: '1,876 analyzed',
      features: ['Historical context', 'Cultural insights', 'Cross-referencing']
    },
    {
      id: 3,
      title: 'Smart Recommendations',
      description: 'Personalized content discovery based on user behavior and interests',
      icon: Target,
      color: 'green',
      stats: '8,965 generated',
      features: ['User profiling', 'Learning paths', 'Similar user matching']
    },
    {
      id: 4,
      title: 'Semantic Search',
      description: 'Natural language queries across digitized manuscripts and artifacts',
      icon: Search,
      color: 'orange',
      stats: '15,243 queries',
      features: ['Natural language', 'Multi-modal search', 'Content discovery']
    }
  ];

  const languageSupport = [
    { name: 'Tibetan', native: 'བོད་སྐད་', manuscripts: 1456, accuracy: 92 },
    { name: 'Sanskrit', native: 'संस्कृतम्', manuscripts: 789, accuracy: 89 },
    { name: 'Chinese', native: '中文', manuscripts: 234, accuracy: 94 },
    { name: 'Dzongkha', native: 'རྫོང་ཁ', manuscripts: 167, accuracy: 87 },
    { name: 'Hindi', native: 'हिन्दी', manuscripts: 123, accuracy: 96 },
    { name: 'Nepali', native: 'नेपाली', manuscripts: 78, accuracy: 91 }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'ocr': return Eye;
      case 'ai': return Brain;
      case 'search': return Search;
      case 'recommendation': return Target;
      default: return FileText;
    }
  };

  return (
    <div className="py-12 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-monastery-gold mb-2">Digital Archive & AI Hub</h1>
          <p className="text-white max-w-2xl mx-auto">
            Advanced AI-powered tools for manuscript analysis, OCR text extraction, intelligent search, and personalized content discovery
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 max-w-4xl mx-auto bg-black/60 border border-monastery-gold rounded-xl p-1">
            <TabsTrigger value="overview" className="bg-black text-monastery-gold rounded-xl data-[state=active]:bg-monastery-gold data-[state=active]:text-black transition-all flex items-center gap-2">
              <Database className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="search" className="bg-black text-monastery-gold rounded-xl data-[state=active]:bg-monastery-gold data-[state=active]:text-black transition-all flex items-center gap-2">
              <Search className="w-4 h-4 mr-2" />
              Smart Search
            </TabsTrigger>
            <TabsTrigger value="ocr" className="bg-black text-monastery-gold rounded-xl data-[state=active]:bg-monastery-gold data-[state=active]:text-black transition-all flex items-center gap-2">
              <Scan className="w-4 h-4 mr-2" />
              OCR Explorer
            </TabsTrigger>
            <TabsTrigger value="ai" className="bg-black text-monastery-gold rounded-xl data-[state=active]:bg-monastery-gold data-[state=active]:text-black transition-all flex items-center gap-2">
              <Bot className="w-4 h-4 mr-2" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="bg-black text-monastery-gold rounded-xl data-[state=active]:bg-monastery-gold data-[state=active]:text-black transition-all flex items-center gap-2">
              <Target className="w-4 h-4 mr-2" />
              Recommendations
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="space-y-8">
              {/* Statistics Dashboard */}
              

              {/* Featured Capabilities */}
              <div className="grid md:grid-cols-2 gap-6">
                {featuredCapabilities.map((capability) => {
                  const IconComponent = capability.icon;
                  return (
                    <Card key={capability.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg bg-${capability.color}-100`}>
                            <IconComponent className={`w-6 h-6 text-${capability.color}-600`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">{capability.title}</h3>
                            <p className="text-slate-600 text-sm mb-3">{capability.description}</p>
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="outline">{capability.stats}</Badge>
                            </div>
                            <div className="space-y-1">
                              {capability.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2 text-xs text-slate-600">
                                  <div className="w-1 h-1 bg-slate-400 rounded-full" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Language Support */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Languages className="w-5 h-5 text-purple-600" />
                    Multi-language Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {languageSupport.map((lang) => (
                      <div key={lang.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <div className="font-medium">{lang.name}</div>
                          <div className="text-sm text-slate-600">{lang.native}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{lang.manuscripts}</div>
                          <div className="text-xs text-slate-500">{lang.accuracy}% accuracy</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-green-600" />
                      Recent Activity
                    </CardTitle>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => {
                      const IconComponent = getActivityIcon(activity.type);
                      return (
                        <div key={activity.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                          <div className="p-2 bg-white rounded-lg">
                            <IconComponent className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{activity.title}</h4>
                            <p className="text-sm text-slate-600">{activity.description}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs text-slate-500">{activity.timestamp}</span>
                              {activity.confidence && (
                                <Badge variant="outline" className="text-xs">
                                  {activity.confidence}% confidence
                                </Badge>
                              )}
                              {activity.language && (
                                <Badge variant="secondary" className="text-xs">
                                  {activity.language}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-16 flex flex-col gap-2"
                      onClick={() => setActiveTab('search')}
                    >
                      <Search className="w-5 h-5" />
                      <span className="text-sm">Search Archives</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-16 flex flex-col gap-2"
                      onClick={() => setActiveTab('ocr')}
                    >
                      <Upload className="w-5 h-5" />
                      <span className="text-sm">Upload & OCR</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-16 flex flex-col gap-2"
                      onClick={() => setActiveTab('ai')}
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">Ask AI Assistant</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-16 flex flex-col gap-2"
                      onClick={() => setActiveTab('recommendations')}
                    >
                      <Sparkles className="w-5 h-5" />
                      <span className="text-sm">Get Recommendations</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Advanced Search Tab */}
          <TabsContent value="search">
            <AdvancedSearchEngine />
          </TabsContent>

          {/* OCR Explorer Tab */}
          <TabsContent value="ocr">
            <ArtifactExplorer />
          </TabsContent>

          {/* AI Assistant Tab */}
          <TabsContent value="ai">
            <AIAssistant />
          </TabsContent>

          {/* Personalized Recommendations Tab */}
          <TabsContent value="recommendations">
            <PersonalizedRecommendations />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DigitalArchiveHub;