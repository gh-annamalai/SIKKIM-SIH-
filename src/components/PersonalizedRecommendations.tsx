import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Sparkles, 
  Target, 
  TrendingUp, 
  Heart, 
  BookOpen, 
  Star,
  Clock,
  Eye,
  Download,
  Share2,
  User,
  Brain,
  Compass,
  Calendar,
  MapPin,
  Award,
  Filter,
  Search,
  RefreshCw,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Play,
  Image as ImageIcon,
  FileText,
  Volume2,
  Languages,
  Settings,
  Zap,
  Globe,
  Users,
  MessageCircle,
  Camera
} from 'lucide-react';

const PersonalizedRecommendations: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userPreferences, setUserPreferences] = useState({
    interests: ['meditation', 'tibetan-buddhism', 'ancient-manuscripts'],
    experience_level: 'intermediate',
    preferred_languages: ['english', 'tibetan'],
    learning_style: 'visual'
  });

  const categories = [
    { id: 'all', name: 'All Recommendations', icon: Sparkles, count: 48 },
    { id: 'manuscripts', name: 'Manuscripts', icon: FileText, count: 18 },
    { id: 'practices', name: 'Meditation Practices', icon: Star, count: 12 },
    { id: 'history', name: 'Historical Content', icon: Clock, count: 8 },
    { id: 'artifacts', name: 'Artifacts', icon: Award, count: 10 }
  ];

  const userProfile = {
    name: 'Sarah Chen',
    avatar: '/src/assets/ancient-manuscript.jpg',
    level: 'Dedicated Practitioner',
    interests: ['Meditation', 'Tibetan Buddhism', 'Ancient Texts'],
    reading_history: 47,
    saved_items: 23,
    shared_content: 12,
    engagement_score: 85,
    learning_streak: 15
  };

  const recommendations = [
    {
      id: 1,
      type: 'manuscript',
      title: 'The Stages of Meditation by Kamalashila',
      description: 'A comprehensive guide to Buddhist meditation practices, perfectly aligned with your intermediate level and interest in systematic practice.',
      image: '/src/assets/ancient-manuscript.jpg',
      confidence: 95,
      reasons: [
        'Matches your meditation interest',
        'Appropriate for intermediate level',
        'Popular among similar users',
        'Complements your recent readings'
      ],
      metadata: {
        language: 'Tibetan with English translation',
        period: '8th Century CE',
        length: '89 pages',
        difficulty: 'Intermediate',
        read_time: '3-4 hours'
      },
      engagement: {
        views: 1247,
        saves: 89,
        shares: 34,
        rating: 4.8
      },
      tags: ['meditation', 'systematic-practice', 'kamalashila', 'stages'],
      related_users: 23,
      audio_available: true
    },
    {
      id: 2,
      type: 'practice',
      title: 'Morning Meditation Routine at Rumtek',
      description: 'Experience the daily meditation practice at Rumtek Monastery through this immersive guide, based on your preference for structured practice.',
      image: '/src/assets/rumtek-monastery.jpg',
      confidence: 92,
      reasons: [
        'Builds on your monastery visits',
        'Matches your morning practice preference',
        'Recommended by advanced practitioners',
        'Includes audio guidance'
      ],
      metadata: {
        duration: '45 minutes',
        location: 'Rumtek Monastery',
        instructor: 'Venerable Tenzin',
        difficulty: 'Beginner to Intermediate',
        equipment: 'Meditation cushion'
      },
      engagement: {
        views: 2156,
        saves: 156,
        shares: 67,
        rating: 4.9
      },
      tags: ['morning-practice', 'rumtek', 'guided-meditation', 'routine'],
      related_users: 45,
      audio_available: true
    },
    {
      id: 3,
      type: 'history',
      title: 'The Great Debate at Samye Monastery',
      description: 'Explore this pivotal moment in Tibetan Buddhist history, recommended based on your interest in historical Buddhism and philosophical debates.',
      image: '/src/assets/historical-photos.jpg',
      confidence: 88,
      reasons: [
        'Expands your historical knowledge',
        'Related to Tibetan Buddhism',
        'Popular among history enthusiasts',
        'Connects to your monastery interests'
      ],
      metadata: {
        period: '792-794 CE',
        participants: 'Kamalashila vs. Moheyan',
        significance: 'Shaped Tibetan Buddhism',
        length: '45 minutes read',
        complexity: 'Advanced'
      },
      engagement: {
        views: 892,
        saves: 67,
        shares: 23,
        rating: 4.6
      },
      tags: ['debate', 'samye', 'history', 'philosophy'],
      related_users: 18,
      audio_available: false
    },
    {
      id: 4,
      type: 'artifact',
      title: 'Sacred Ritual Objects Collection',
      description: 'Discover the meaning behind ritual objects used in Tibetan Buddhist ceremonies, curated based on your artifact viewing history.',
      image: '/src/assets/ritual-artifacts.jpg',
      confidence: 91,
      reasons: [
        'Matches your artifact interests',
        'Complements recent monastery visits',
        'High engagement from similar users',
        'Rich visual content'
      ],
      metadata: {
        items: 24,
        period: '15th-18th Century',
        materials: 'Bronze, Silver, Gold',
        origin: 'Tibetan Monasteries',
        condition: 'Well Preserved'
      },
      engagement: {
        views: 1543,
        saves: 112,
        shares: 45,
        rating: 4.7
      },
      tags: ['ritual-objects', 'artifacts', 'ceremonial', 'tibet'],
      related_users: 31,
      audio_available: true
    }
  ];

  const learningPath = {
    current_stage: 'Intermediate Practitioner',
    progress: 68,
    next_milestone: 'Advanced Studies',
    suggested_duration: '3-4 months',
    upcoming_content: [
      {
        title: 'Advanced Meditation Techniques',
        type: 'Practice Session',
        estimated_time: '2 weeks',
        prerequisites_met: true
      },
      {
        title: 'Philosophical Texts Analysis',
        type: 'Study Material',
        estimated_time: '3 weeks',
        prerequisites_met: true
      },
      {
        title: 'Monastery Visit Planning',
        type: 'Practical Guide',
        estimated_time: '1 week',
        prerequisites_met: false
      }
    ]
  };

  const similarUsers = [
    {
      id: 1,
      name: 'Michael Kumar',
      avatar: '/src/assets/historical-photos.jpg',
      level: 'Advanced Practitioner',
      similarity: 89,
      shared_interests: ['Meditation', 'Historical Texts'],
      recent_activity: 'Completed: Tibetan Language Basics'
    },
    {
      id: 2,
      name: 'Dr. Lisa Wang',
      avatar: '/src/assets/ritual-artifacts.jpg',
      level: 'Scholar',
      similarity: 76,
      shared_interests: ['Ancient Manuscripts', 'Philosophy'],
      recent_activity: 'Shared: Commentary on Heart Sutra'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'manuscript': return FileText;
      case 'practice': return Star;
      case 'history': return Clock;
      case 'artifact': return Award;
      default: return BookOpen;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 80) return 'text-blue-600 bg-blue-100';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="py-12 bg-black/60">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-monastery-gold mb-2">Personalized Recommendations</h1>
          <p className="text-white max-w-2xl mx-auto">
            Discover content tailored to your interests, learning style, and spiritual journey using AI-powered recommendations
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Profile Summary */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <Avatar className="w-16 h-16 mx-auto mb-3">
                    <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                    <AvatarFallback>{userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">{userProfile.name}</h3>
                  <Badge variant="outline">{userProfile.level}</Badge>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Items Read</span>
                    <span className="font-medium">{userProfile.reading_history}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Saved Content</span>
                    <span className="font-medium">{userProfile.saved_items}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Engagement Score</span>
                    <span className="font-medium text-green-600">{userProfile.engagement_score}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Learning Streak</span>
                    <span className="font-medium text-orange-600">{userProfile.learning_streak} days</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-slate-600 mb-2">Interests:</p>
                  <div className="flex flex-wrap gap-1">
                    {userProfile.interests.map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Learning Path */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Compass className="w-5 h-5 text-blue-600" />
                  Learning Path
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{learningPath.current_stage}</span>
                    <span className="text-sm text-slate-600">{learningPath.progress}%</span>
                  </div>
                  <Progress value={learningPath.progress} className="h-2" />
                  <p className="text-xs text-slate-600 mt-1">
                    Next: {learningPath.next_milestone}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Upcoming Content:</p>
                  {learningPath.upcoming_content.slice(0, 2).map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${
                        item.prerequisites_met ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                      <span className="flex-1">{item.title}</span>
                      <span className="text-xs text-slate-500">{item.estimated_time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left flex items-center justify-between p-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-100 text-blue-800'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4" />
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Similar Users */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Similar Users
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {similarUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{user.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {user.similarity}% match
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600">{user.recent_activity}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header Actions */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-monastery-gold">Recommended for You</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Preferences
                </Button>
              </div>
            </div>

            {/* Recommendations Grid */}
            <div className="space-y-6">
              {recommendations.map((item) => {
                const TypeIcon = getTypeIcon(item.type);
                return (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="grid lg:grid-cols-4 gap-6">
                        {/* Image */}
                        <div className="lg:col-span-1">
                          <div className="relative">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            <div className="absolute top-2 left-2 flex gap-1">
                              <Badge className="bg-black/70 text-white">
                                <TypeIcon className="w-3 h-3 mr-1" />
                                {item.type}
                              </Badge>
                              {item.audio_available && (
                                <Badge className="bg-green-600">
                                  <Volume2 className="w-3 h-3 mr-1" />
                                  Audio
                                </Badge>
                              )}
                            </div>
                            <div className="absolute top-2 right-2">
                              <Badge className={`${getConfidenceColor(item.confidence)}`}>
                                {item.confidence}% match
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-3">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-semibold text-slate-800 hover:text-blue-600 cursor-pointer">
                              {item.title}
                            </h3>
                            <Button variant="ghost" size="sm">
                              <Bookmark className="w-4 h-4" />
                            </Button>
                          </div>

                          <p className="text-slate-600 mb-4">{item.description}</p>

                          {/* Why Recommended */}
                          <div className="mb-4">
                            <p className="text-sm font-medium text-slate-700 mb-2">Why this is recommended:</p>
                            <div className="grid md:grid-cols-2 gap-2">
                              {item.reasons.map((reason, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                                  {reason}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Metadata */}
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            {Object.entries(item.metadata).slice(0, 3).map(([key, value]) => (
                              <div key={key} className="text-sm">
                                <span className="text-slate-500 capitalize">
                                  {key.replace('_', ' ')}:
                                </span>
                                <span className="font-medium ml-2">{value}</span>
                              </div>
                            ))}
                          </div>

                          {/* Engagement Stats */}
                          <div className="flex items-center gap-6 mb-4 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {item.engagement.views.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Bookmark className="w-4 h-4" />
                              {item.engagement.saves}
                            </div>
                            <div className="flex items-center gap-1">
                              <Share2 className="w-4 h-4" />
                              {item.engagement.shares}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              {item.engagement.rating}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {item.related_users} similar users
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {item.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-3">
                            <Button className ="bg-monastery-gold text-black font-semibold rounded-xl border border-monastery-gold hover:bg-monastery-gold hover:text-black hover:shadow-[0_0_8px_2px_rgba(255,221,51,0.5)] transition-all">
                              <BookOpen className="w-4 h-4 mr-2" />
                              Explore
                            </Button>
                            <Button variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                            <Button variant="outline">
                              <Share2 className="w-4 h-4 mr-2" />
                              Share
                            </Button>
                            {item.audio_available && (
                              <Button variant="outline">
                                <Play className="w-4 h-4 mr-2" />
                                Listen
                              </Button>
                            )}
                            <div className="flex gap-1 ml-auto">
                              <Button variant="ghost" size="sm">
                                <ThumbsUp className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <ThumbsDown className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline">
                Load More Recommendations
              </Button>
            </div>
          </div>
        </div>

        {/* AI Insights Section */}
        
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;