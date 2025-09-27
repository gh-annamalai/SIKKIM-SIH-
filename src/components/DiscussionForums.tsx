import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  Users, 
  Calendar, 
  Clock, 
  Pin,
  Reply,
  Heart,
  Eye,
  Search,
  Filter,
  Plus,
  Star,
  Flag,
  ArrowUp,
  ArrowDown,
  MessageCircle,
  BookOpen,
  Flower,
  Mountain,
  Flame,
  Compass,
  ChevronRight,
  Edit,
  Trash2,
  MoreHorizontal
} from 'lucide-react';

const DiscussionForums: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [showNewTopicForm, setShowNewTopicForm] = useState(false);

  const categories = [
    { id: 'all', name: 'All Discussions', icon: MessageSquare, count: 245, color: 'blue' },
    { id: 'meditation', name: 'Meditation & Practice', icon: Flower, count: 89, color: 'purple' },
    { id: 'monasteries', name: 'Monastery Visits', icon: Mountain, count: 67, color: 'green' },
    { id: 'teachings', name: 'Teachings & Philosophy', icon: BookOpen, count: 43, color: 'orange' },
    { id: 'community', name: 'Community Support', icon: Users, count: 32, color: 'pink' },
    { id: 'spiritual-journey', name: 'Spiritual Journey', icon: Compass, count: 28, color: 'indigo' },
    { id: 'rituals', name: 'Rituals & Festivals', icon: Flame, count: 21, color: 'red' }
  ];

  const discussions = [
    {
      id: 1,
      title: 'Best practices for morning meditation in a busy schedule?',
      author: {
        name: 'Sarah Chen',
        avatar: '/src/assets/ancient-manuscript.jpg',
        username: '@sarahc_seeker',
        level: 'Dedicated Practitioner'
      },
      category: 'meditation',
      content: "I'm struggling to maintain a consistent morning meditation practice with my work schedule. Any tips from fellow practitioners?",
      createdAt: '2 hours ago',
      replies: 12,
      views: 89,
      likes: 23,
      isPinned: false,
      isAnswered: true,
      tags: ['morning-practice', 'busy-schedule', 'consistency'],
      lastReply: {
        author: 'Monk Tenzin',
        time: '30 minutes ago'
      }
    },
    {
      id: 2,
      title: 'Rumtek Monastery visit - what to expect?',
      author: {
        name: 'Michael Kumar',
        avatar: '/src/assets/historical-photos.jpg',
        username: '@mikek_explorer',
        level: 'Spiritual Explorer'
      },
      category: 'monasteries',
      content: "Planning my first visit to Rumtek Monastery next month. Would love to hear about others' experiences and any preparation tips.",
      createdAt: '5 hours ago',
      replies: 18,
      views: 156,
      likes: 34,
      isPinned: true,
      isAnswered: false,
      tags: ['rumtek', 'first-visit', 'preparation'],
      lastReply: {
        author: 'Local Guide Pemba',
        time: '1 hour ago'
      }
    },
    {
      id: 3,
      title: 'Understanding the concept of emptiness in Buddhist philosophy',
      author: {
        name: 'Dr. Lisa Wang',
        avatar: '/src/assets/ritual-artifacts.jpg',
        username: '@drwang_wisdom',
        level: 'Wisdom Seeker'
      },
      category: 'teachings',
      content: "I've been studying Buddhist philosophy and finding the concept of 'emptiness' quite complex. Could someone explain it in simpler terms?",
      createdAt: '1 day ago',
      replies: 25,
      views: 234,
      likes: 67,
      isPinned: false,
      isAnswered: true,
      tags: ['philosophy', 'emptiness', 'buddhism', 'learning'],
      lastReply: {
        author: 'Rinpoche Karma',
        time: '3 hours ago'
      }
    },
    {
      id: 4,
      title: 'Dealing with spiritual dryness - how do you reconnect?',
      author: {
        name: 'James Rodriguez',
        avatar: '/src/assets/monastery-hero.jpg',
        username: '@jamesR_seeker',
        level: 'Novice Practitioner'
      },
      category: 'spiritual-journey',
      content: "Going through a phase where my spiritual practice feels empty and routine. Has anyone else experienced this? How did you overcome it?",
      createdAt: '2 days ago',
      replies: 31,
      views: 187,
      likes: 45,
      isPinned: false,
      isAnswered: false,
      tags: ['spiritual-dryness', 'reconnection', 'practice'],
      lastReply: {
        author: 'Community Elder Maria',
        time: '6 hours ago'
      }
    },
    {
      id: 5,
      title: 'Photography guidelines for monastery visits',
      author: {
        name: 'Camera Club Admin',
        avatar: '/src/assets/pemayangtse-monastery.jpg',
        username: '@photo_admin',
        level: 'Community Moderator'
      },
      category: 'community',
      content: "Important guidelines for respectful photography during monastery visits. Please read before your next trip.",
      createdAt: '3 days ago',
      replies: 8,
      views: 298,
      likes: 52,
      isPinned: true,
      isAnswered: false,
      tags: ['photography', 'guidelines', 'respect', 'etiquette'],
      lastReply: {
        author: 'Photo Volunteer Sam',
        time: '1 day ago'
      }
    }
  ];

  const pinnedDiscussions = discussions.filter(d => d.isPinned);
  const regularDiscussions = discussions.filter(d => !d.isPinned);

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || 'blue';
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.icon || MessageSquare;
  };

  const formatTime = (timeStr: string) => {
    return timeStr;
  };

  return (
    <div className="py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Discussion Forums</h1>
              <p className="text-slate-600">Connect, learn, and share your spiritual journey with our community</p>
            </div>
            <Button 
              onClick={() => setShowNewTopicForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Discussion
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
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
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                        selectedCategory === category.id
                          ? `bg-${category.color}-100 text-${category.color}-800 border border-${category.color}-200`
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <IconComponent className={`w-5 h-5 text-${category.color}-600`} />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{category.name}</div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Forum Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Forum Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Total Discussions</span>
                  <span className="font-bold text-blue-600">245</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Active Members</span>
                  <span className="font-bold text-green-600">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Today's Posts</span>
                  <span className="font-bold text-purple-600">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Answered Questions</span>
                  <span className="font-bold text-orange-600">89%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Search discussions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border rounded-lg text-sm"
                    >
                      <option value="recent">Most Recent</option>
                      <option value="popular">Most Popular</option>
                      <option value="answered">Answered First</option>
                      <option value="unanswered">Unanswered First</option>
                    </select>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pinned Discussions */}
            {pinnedDiscussions.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Pin className="w-5 h-5 text-blue-600" />
                  Pinned Discussions
                </h2>
                <div className="space-y-4">
                  {pinnedDiscussions.map((discussion) => {
                    const CategoryIcon = getCategoryIcon(discussion.category);
                    return (
                      <Card key={discussion.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                              <AvatarFallback>{discussion.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <Pin className="w-4 h-4 text-blue-600" />
                                <Badge variant="outline" className="text-xs">
                                  <CategoryIcon className="w-3 h-3 mr-1" />
                                  {categories.find(c => c.id === discussion.category)?.name}
                                </Badge>
                                {discussion.isAnswered && (
                                  <Badge className="bg-green-100 text-green-800 text-xs">
                                    ✓ Answered
                                  </Badge>
                                )}
                              </div>
                              
                              <h3 className="font-semibold text-slate-800 hover:text-blue-600 cursor-pointer mb-2">
                                {discussion.title}
                              </h3>
                              
                              <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                                {discussion.content}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 mb-3">
                                {discussion.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-slate-600">
                                  <span>by {discussion.author.name}</span>
                                  <span>{discussion.createdAt}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {discussion.author.level}
                                  </Badge>
                                </div>
                                
                                <div className="flex items-center gap-4 text-sm text-slate-600">
                                  <div className="flex items-center gap-1">
                                    <MessageCircle className="w-4 h-4" />
                                    {discussion.replies}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    {discussion.views}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Heart className="w-4 h-4" />
                                    {discussion.likes}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Regular Discussions */}
            <div className="space-y-4">
              {regularDiscussions.map((discussion) => {
                const CategoryIcon = getCategoryIcon(discussion.category);
                return (
                  <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                          <AvatarFallback>{discussion.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              <CategoryIcon className="w-3 h-3 mr-1" />
                              {categories.find(c => c.id === discussion.category)?.name}
                            </Badge>
                            {discussion.isAnswered && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                ✓ Answered
                              </Badge>
                            )}
                          </div>
                          
                          <h3 className="font-semibold text-slate-800 hover:text-blue-600 cursor-pointer mb-2">
                            {discussion.title}
                          </h3>
                          
                          <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                            {discussion.content}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {discussion.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-slate-600">
                              <span>by {discussion.author.name}</span>
                              <span>{discussion.createdAt}</span>
                              <Badge variant="outline" className="text-xs">
                                {discussion.author.level}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-slate-600">
                              <div className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                {discussion.replies}
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {discussion.views}
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {discussion.likes}
                              </div>
                            </div>
                          </div>
                          
                          {discussion.lastReply && (
                            <div className="mt-3 pt-3 border-t border-slate-100">
                              <div className="text-xs text-slate-500">
                                Last reply by <span className="font-medium">{discussion.lastReply.author}</span> {discussion.lastReply.time}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
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
                Load More Discussions
              </Button>
            </div>
          </div>
        </div>

        {/* New Topic Modal/Form */}
        {showNewTopicForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
              <CardHeader>
                <CardTitle>Start a New Discussion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option value="">Select a category...</option>
                    {categories.filter(c => c.id !== 'all').map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Discussion Title</label>
                  <Input placeholder="What would you like to discuss?" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea 
                    placeholder="Share your thoughts, questions, or experiences..."
                    className="h-32"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Tags (optional)</label>
                  <Input placeholder="Add tags separated by commas..." />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button className="flex-1">
                    Create Discussion
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowNewTopicForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscussionForums;