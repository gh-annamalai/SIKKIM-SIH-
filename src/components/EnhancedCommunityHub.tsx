import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserProfiles from './UserProfiles';
import DiscussionForums from './DiscussionForums';
import ContentSharing from './ContentSharing';
import { 
  Users, 
  MessageCircle, 
  Share2, 
  Heart, 
  Star, 
  Camera,
  Calendar,
  MapPin,
  Clock,
  UserPlus,
  BookOpen,
  Award,
  ThumbsUp,
  MessageSquare,
  Eye,
  Bookmark,
  Bell,
  Search,
  Filter,
  TrendingUp,
  User,
  Image
} from 'lucide-react';

const EnhancedCommunityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('forums');
  const [selectedTopic, setSelectedTopic] = useState('all');

  const communityStats = {
    totalMembers: 2847,
    activeToday: 156,
    totalPosts: 1284,
    totalPhotos: 3567,
    onlineModerators: 4
  };

  const recentDiscussions = [
    {
      id: 1,
      title: 'Best time to visit Rumtek Monastery for the annual festival?',
      author: {
        name: 'Sarah Chen',
        avatar: '/src/assets/ancient-manuscript.jpg',
        badge: 'Frequent Visitor',
        joinedMonths: 8
      },
      category: 'Travel Planning',
      replies: 23,
      views: 145,
      lastActivity: '2 hours ago',
      likes: 12,
      isHot: true,
      tags: ['Rumtek', 'Festival', 'Travel'],
      preview: 'I\'m planning to visit during the monastery\'s annual celebration. Has anyone been during this time? What should I expect...'
    },
    {
      id: 2,
      title: 'Meditation techniques learned at Pemayangtse - sharing my experience',
      author: {
        name: 'Tenzin Norbu',
        avatar: '/src/assets/ritual-artifacts.jpg',
        badge: 'Spiritual Guide',
        joinedMonths: 24
      },
      category: 'Spiritual Practice',
      replies: 45,
      views: 289,
      lastActivity: '4 hours ago',
      likes: 34,
      isHot: true,
      tags: ['Meditation', 'Pemayangtse', 'Spirituality'],
      preview: 'After spending a week at Pemayangtse, I learned some profound meditation techniques from the monks. Here\'s what I discovered...'
    },
    {
      id: 3,
      title: 'Photography guidelines for monastery visits - respectful practices',
      author: {
        name: 'Maria Rodriguez',
        avatar: '/src/assets/historical-photos.jpg',
        badge: 'Photography Expert',
        joinedMonths: 15
      },
      category: 'Photography',
      replies: 18,
      views: 167,
      lastActivity: '1 day ago',
      likes: 28,
      isHot: false,
      tags: ['Photography', 'Guidelines', 'Respect'],
      preview: 'As a professional photographer who has visited several monasteries, I\'d like to share some guidelines for respectful photography...'
    },
    {
      id: 4,
      title: 'Vegetarian recipes from monastery kitchens',
      author: {
        name: 'Pemba Sherpa',
        avatar: '/src/assets/monastery-hero.jpg',
        badge: 'Local Expert',
        joinedMonths: 36
      },
      category: 'Culture & Food',
      replies: 31,
      views: 234,
      lastActivity: '6 hours ago',
      likes: 19,
      isHot: false,
      tags: ['Food', 'Recipes', 'Culture'],
      preview: 'I\'ve collected some traditional vegetarian recipes that are commonly prepared in monastery kitchens. These are simple yet nutritious...'
    }
  ];

  const featuredMembers = [
    {
      name: 'Lama Gyatso',
      role: 'Monastery Elder',
      avatar: '/src/assets/ancient-manuscript.jpg',
      contributions: 156,
      speciality: 'Buddhist Philosophy',
      verified: true,
      followers: 1247
    },
    {
      name: 'Dr. Priya Sharma',
      role: 'Cultural Researcher',
      avatar: '/src/assets/historical-photos.jpg',
      contributions: 89,
      speciality: 'Himalayan Culture',
      verified: true,
      followers: 834
    },
    {
      name: 'Jin Wu',
      role: 'Travel Blogger',
      avatar: '/src/assets/ritual-artifacts.jpg',
      contributions: 67,
      speciality: 'Photography & Travel',
      verified: false,
      followers: 456
    }
  ];

  const recentSharedContent = [
    {
      id: 1,
      type: 'photo',
      title: 'Sunrise at Tashiding Monastery',
      author: 'Alex Thompson',
      avatar: '/src/assets/tashiding-monastery.jpg',
      image: '/src/assets/tashiding-monastery.jpg',
      likes: 89,
      comments: 12,
      timeAgo: '3 hours ago',
      location: 'Tashiding, West Sikkim'
    },
    {
      id: 2,
      type: 'story',
      title: 'My spiritual awakening journey at Rumtek',
      author: 'Anna Kumar',
      avatar: '/src/assets/rumtek-monastery.jpg',
      excerpt: 'Three months ago, I arrived at Rumtek with a heavy heart and countless questions. Today, I leave with peace and clarity that I never thought possible...',
      likes: 156,
      comments: 23,
      timeAgo: '1 day ago',
      readTime: '5 min read'
    },
    {
      id: 3,
      type: 'video',
      title: 'Prayer Wheel Blessing Ceremony',
      author: 'Michael Chen',
      avatar: '/src/assets/pemayangtse-monastery.jpg',
      thumbnail: '/src/assets/pemayangtse-monastery.jpg',
      duration: '2:45',
      likes: 234,
      comments: 18,
      timeAgo: '2 days ago',
      views: 1456
    }
  ];

  const topicCategories = [
    { id: 'all', name: 'All Topics', count: 284, color: 'bg-blue-100 text-blue-800' },
    { id: 'spiritual', name: 'Spiritual Practice', count: 89, color: 'bg-purple-100 text-purple-800' },
    { id: 'travel', name: 'Travel Planning', count: 67, color: 'bg-green-100 text-green-800' },
    { id: 'culture', name: 'Culture & Traditions', count: 54, color: 'bg-orange-100 text-orange-800' },
    { id: 'photography', name: 'Photography', count: 43, color: 'bg-pink-100 text-pink-800' },
    { id: 'food', name: 'Food & Recipes', count: 31, color: 'bg-yellow-100 text-yellow-800' }
  ];

  return (
  <div className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-left mb-12">
          <h1 className="text-5xl font-bold text-white mb-6 drop-shadow">
            Community Platform & Engagement
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mb-8">
            Connect with fellow spiritual seekers, share your monastery experiences, 
            participate in meaningful discussions, and build lasting connections within our community.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="text-center bg-black/60 border-none shadow-lg rounded-xl">
            <CardContent className="pt-4">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{communityStats.totalMembers.toLocaleString()}</div>
              <div className="text-sm text-slate-600">Total Members</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-black/60 border-none shadow-lg rounded-xl">
            <CardContent className="pt-4">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{communityStats.activeToday}</div>
              <div className="text-sm text-slate-600">Active Today</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-black/60 border-none shadow-lg rounded-xl">
            <CardContent className="pt-4">
              <MessageCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{communityStats.totalPosts.toLocaleString()}</div>
              <div className="text-sm text-slate-600">Discussions</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-black/60 border-none shadow-lg rounded-xl">
            <CardContent className="pt-4">
              <Camera className="w-8 h-8 text-pink-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{communityStats.totalPhotos.toLocaleString()}</div>
              <div className="text-sm text-slate-600">Photos Shared</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-black/60 border-none shadow-lg rounded-xl">
            <CardContent className="pt-4">
              <Award className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{communityStats.onlineModerators}</div>
              <div className="text-sm text-slate-600">Online Guides</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8 max-w-4xl mx-auto">
            <TabsTrigger value="discussions">
              <MessageCircle className="w-4 h-4 mr-1" />
              Discussions
            </TabsTrigger>
            <TabsTrigger value="forums">
              <MessageSquare className="w-4 h-4 mr-1" />
              Forums
            </TabsTrigger>
            <TabsTrigger value="sharing">
              <Share2 className="w-4 h-4 mr-1" />
              Sharing
            </TabsTrigger>
            <TabsTrigger value="content">
              <Image className="w-4 h-4 mr-1" />
              Content
            </TabsTrigger>
            <TabsTrigger value="members">
              <Users className="w-4 h-4 mr-1" />
              Members
            </TabsTrigger>
            <TabsTrigger value="profiles">
              <User className="w-4 h-4 mr-1" />
              Profiles
            </TabsTrigger>
          </TabsList>

          {/* Discussion Forums Tab */}
          <TabsContent value="forums">
            <DiscussionForums />
          </TabsContent>

          {/* Content Sharing Tab */}
          <TabsContent value="content">
            <ContentSharing />
          </TabsContent>

          {/* User Profiles Tab */}
          <TabsContent value="profiles">
            <UserProfiles />
          </TabsContent>

          <TabsContent value="discussions">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Topic Categories Sidebar */}
              <div className="lg:col-span-1">
                <Card className="bg-black/60 border-none shadow-lg rounded-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="w-5 h-5 text-blue-600" />
                      Discussion Topics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {topicCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedTopic(category.id)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedTopic === category.id 
                            ? 'bg-blue-50 border-2 border-blue-200' 
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{category.name}</span>
                          <Badge className={category.color}>{category.count}</Badge>
                        </div>
                      </button>
                    ))}
                  </CardContent>
                </Card>

                {/* Featured Members */}
                <Card className="mt-4 bg-black/60 border-none shadow-lg rounded-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-600" />
                      Featured Members
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {featuredMembers.map((member, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="font-medium truncate">{member.name}</span>
                            {member.verified && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                          </div>
                          <div className="text-xs text-slate-600">{member.role}</div>
                          <div className="text-xs text-slate-500">{member.contributions} contributions</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Main Discussion Feed */}
              <div className="lg:col-span-3">
                {/* Discussion Actions */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Start Discussion
                    </Button>
                    <Button variant="outline">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-slate-400" />
                    <span className="text-sm text-slate-600">Stay updated on replies</span>
                  </div>
                </div>

                {/* Discussion Posts */}
                <div className="space-y-4">
                  {recentDiscussions.map((discussion) => (
                    <Card key={discussion.id} className="bg-black/60 border-none shadow-lg hover:shadow-2xl transition-shadow rounded-xl">
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                            <AvatarFallback>{discussion.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold text-lg hover:text-blue-600 cursor-pointer">
                                    {discussion.title}
                                  </h3>
                                  {discussion.isHot && <Badge className="bg-red-100 text-red-700">Hot</Badge>}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                  <span className="font-medium">{discussion.author.name}</span>
                                  <Badge variant="outline">{discussion.author.badge}</Badge>
                                  <span>•</span>
                                  <span>{discussion.lastActivity}</span>
                                </div>
                              </div>
                              <Badge className="bg-slate-100 text-slate-700">{discussion.category}</Badge>
                            </div>

                            {/* Preview */}
                            <p className="text-slate-600 mb-3 line-clamp-2">{discussion.preview}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-3">
                              {discussion.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>

                            {/* Stats and Actions */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-slate-600">
                                <div className="flex items-center gap-1">
                                  <MessageCircle className="w-4 h-4" />
                                  <span>{discussion.replies} replies</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="w-4 h-4" />
                                  <span>{discussion.views} views</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <ThumbsUp className="w-4 h-4" />
                                  <span>{discussion.likes} likes</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  <Heart className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Bookmark className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Share2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-8">
                  <Button variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Load More Discussions
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sharing">
            <div className="space-y-6">
              {/* Content Sharing Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Community Sharing</h2>
                  <p className="text-slate-600">Share your monastery experiences, photos, and stories with the community</p>
                </div>
                <Button className="bg-gradient-to-r from-green-600 to-blue-600">
                  <Camera className="w-4 h-4 mr-2" />
                  Share Content
                </Button>
              </div>

              {/* Shared Content Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentSharedContent.map((content) => (
                  <Card key={content.id} className="bg-black/60 border-none shadow-lg hover:shadow-2xl transition-shadow rounded-xl">
                    {content.type === 'photo' && (
                      <div className="relative">
                        <img 
                          src={content.image} 
                          alt={content.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-2 right-2 bg-white/90 text-slate-700">
                          Photo
                        </Badge>
                      </div>
                    )}
                    {content.type === 'video' && (
                      <div className="relative">
                        <img 
                          src={content.thumbnail} 
                          alt={content.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-2 right-2 bg-white/90 text-slate-700">
                          Video
                        </Badge>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          {content.duration}
                        </div>
                      </div>
                    )}
                    {content.type === 'story' && (
                      <div className="p-6">
                        <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
                        <Badge className="mb-4">Story</Badge>
                      </div>
                    )}

                    <CardContent className="pt-4">
                      <h3 className="font-semibold mb-2">{content.title}</h3>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={content.avatar} alt={content.author} />
                          <AvatarFallback>{content.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{content.author}</span>
                        <span className="text-xs text-slate-500">• {content.timeAgo}</span>
                      </div>

                      {content.excerpt && (
                        <p className="text-sm text-slate-600 mb-3 line-clamp-3">{content.excerpt}</p>
                      )}

                      {content.location && (
                        <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
                          <MapPin className="w-3 h-3" />
                          {content.location}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4 text-red-500" />
                            <span>{content.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4 text-blue-500" />
                            <span>{content.comments}</span>
                          </div>
                          {content.views && (
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4 text-slate-400" />
                              <span>{content.views}</span>
                            </div>
                          )}
                        </div>
                        {content.readTime && (
                          <span className="text-xs text-slate-500">{content.readTime}</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="members">
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Community Members</h3>
              <p className="text-slate-600 mb-6">
                Connect with {communityStats.totalMembers.toLocaleString()} spiritual seekers from around the world
              </p>
              <Button size="lg">
                <Search className="w-4 h-4 mr-2" />
                Explore Members
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="connections">
            <div className="text-center py-12">
              <UserPlus className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Monastery Connections</h3>
              <p className="text-slate-600 mb-6">
                Connect directly with monasteries, monks, and spiritual teachers for guidance and learning
              </p>
              <Button size="lg">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Connection
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedCommunityHub;