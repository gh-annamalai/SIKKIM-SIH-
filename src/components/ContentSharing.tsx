import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Camera, 
  Video,
  FileText,
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark,
  Plus,
  Upload,
  Search,
  Filter,
  Grid,
  List,
  Image,
  Play,
  MapPin,
  Clock,
  Eye,
  TrendingUp,
  Star,
  Download,
  Flag,
  MoreHorizontal,
  Edit,
  Trash2,
  X,
  Calendar,
  Users,
  Award,
  ThumbsUp,
  ThumbsDown,
  Send
} from 'lucide-react';

const ContentSharing: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const contentTypes = [
    { id: 'all', name: 'All Content', icon: Grid, count: 1247 },
    { id: 'photos', name: 'Photos', icon: Camera, count: 856 },
    { id: 'stories', name: 'Stories', icon: FileText, count: 234 },
    { id: 'videos', name: 'Videos', icon: Video, count: 157 },
    { id: 'experiences', name: 'Experiences', icon: Star, count: 89 }
  ];

  const posts = [
    {
      id: 1,
      type: 'photo',
      title: 'Sunrise meditation at Rumtek Monastery',
      description: 'The golden hour brings such peace and serenity. This moment during my morning meditation practice at Rumtek was truly transcendent.',
      author: {
        name: 'Sarah Chen',
        avatar: '/src/assets/ancient-manuscript.jpg',
        username: '@sarahc_seeker',
        level: 'Dedicated Practitioner',
        verified: true
      },
      media: '/src/assets/rumtek-monastery.jpg',
      location: 'Rumtek Monastery, Sikkim',
      timestamp: '2 hours ago',
      likes: 234,
      comments: 18,
      shares: 12,
      bookmarks: 45,
      views: 1205,
      tags: ['meditation', 'sunrise', 'rumtek', 'peaceful', 'spirituality'],
      isLiked: true,
      isBookmarked: false,
      category: 'Spiritual Moment'
    },
    {
      id: 2,
      type: 'video',
      title: 'Traditional butter tea preparation ceremony',
      description: 'Learning the ancient art of butter tea making from the monks at Pemayangtse. Each step is a meditation in itself.',
      author: {
        name: 'Michael Kumar',
        avatar: '/src/assets/historical-photos.jpg',
        username: '@mikek_explorer',
        level: 'Cultural Explorer',
        verified: false
      },
      media: '/src/assets/rumtek-video.mp4',
      thumbnail: '/src/assets/pemayangtse-monastery.jpg',
      location: 'Pemayangtse Monastery, Sikkim',
      timestamp: '5 hours ago',
      duration: '3:24',
      likes: 189,
      comments: 25,
      shares: 31,
      bookmarks: 67,
      views: 892,
      tags: ['culture', 'tradition', 'tea', 'ceremony', 'learning'],
      isLiked: false,
      isBookmarked: true,
      category: 'Cultural Experience'
    },
    {
      id: 3,
      type: 'story',
      title: 'My transformation journey: From tourist to pilgrim',
      description: 'Three years ago, I visited monasteries as a curious tourist. Today, I return as someone seeking deeper meaning. Here\'s how my perspective changed...',
      author: {
        name: 'Dr. Lisa Wang',
        avatar: '/src/assets/ritual-artifacts.jpg',
        username: '@drwang_wisdom',
        level: 'Wisdom Seeker',
        verified: true
      },
      media: null,
      coverImage: '/src/assets/tashiding-monastery.jpg',
      location: 'Multiple Locations',
      timestamp: '1 day ago',
      readTime: '8 min read',
      likes: 456,
      comments: 89,
      shares: 67,
      bookmarks: 123,
      views: 2341,
      tags: ['transformation', 'journey', 'spirituality', 'personal-growth', 'pilgrimage'],
      isLiked: true,
      isBookmarked: true,
      category: 'Personal Journey'
    },
    {
      id: 4,
      type: 'photo',
      title: 'Ancient manuscripts in monastery library',
      description: 'Discovered these incredible 400-year-old manuscripts during my research visit. The preservation work being done here is remarkable.',
      author: {
        name: 'Prof. James Rodriguez',
        avatar: '/src/assets/monastery-hero.jpg',
        username: '@prof_james_heritage',
        level: 'Heritage Scholar',
        verified: true
      },
      media: '/src/assets/ancient-manuscript.jpg',
      location: 'Monastery Library, Sikkim',
      timestamp: '2 days ago',
      likes: 167,
      comments: 34,
      shares: 28,
      bookmarks: 89,
      views: 1456,
      tags: ['heritage', 'manuscripts', 'preservation', 'history', 'research'],
      isLiked: false,
      isBookmarked: false,
      category: 'Heritage Discovery'
    },
    {
      id: 5,
      type: 'experience',
      title: 'Participating in the sacred dance festival',
      description: 'Words cannot describe the energy and devotion during the annual Cham dance festival. Being part of this centuries-old tradition was deeply moving.',
      author: {
        name: 'Maria Gonzalez',
        avatar: '/src/assets/ritual-artifacts.jpg',
        username: '@maria_cultural',
        level: 'Cultural Enthusiast',
        verified: false
      },
      media: '/src/assets/ritual-artifacts.jpg',
      location: 'Various Monasteries',
      timestamp: '3 days ago',
      likes: 298,
      comments: 42,
      shares: 19,
      bookmarks: 156,
      views: 1876,
      tags: ['festival', 'dance', 'tradition', 'culture', 'celebration'],
      isLiked: true,
      isBookmarked: true,
      category: 'Festival Experience'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'photo': return Camera;
      case 'video': return Video;
      case 'story': return FileText;
      case 'experience': return Star;
      default: return Image;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Content Sharing</h1>
              <p className="text-slate-600">Share your monastery experiences, photos, and spiritual journey with the community</p>
            </div>
            <Button 
              onClick={() => setShowUploadModal(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Share Content
            </Button>
          </div>
        </div>

        {/* Content Type Tabs */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {contentTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setActiveTab(type.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === type.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {type.name}
                    <Badge variant={activeTab === type.id ? "secondary" : "outline"} className="ml-1">
                      {type.count}
                    </Badge>
                  </button>
                );
              })}
            </div>

            {/* Search and View Controls */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
          {posts.map((post) => {
            const TypeIcon = getTypeIcon(post.type);
            
            return (
              <Card 
                key={post.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => setSelectedPost(post)}
              >
                {/* Media Header */}
                <div className="relative">
                  {post.type === 'video' ? (
                    <div className="relative">
                      <img 
                        src={post.thumbnail} 
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {post.duration}
                      </div>
                    </div>
                  ) : post.type === 'story' ? (
                    <div className="relative">
                      <img 
                        src={post.coverImage} 
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm">{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={post.media} 
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  
                  {/* Content Type Badge */}
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-black/70 text-white">
                      <TypeIcon className="w-3 h-3 mr-1" />
                      {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                    </Badge>
                  </div>

                  {/* Bookmark Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-black/20 hover:bg-black/40 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle bookmark toggle
                    }}
                  >
                    <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
                  </Button>
                </div>

                <CardContent className="p-4">
                  {/* Category */}
                  <Badge variant="outline" className="mb-3 text-xs">
                    {post.category}
                  </Badge>

                  {/* Title and Description */}
                  <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 group-hover:text-blue-600">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                    {post.description}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{post.author.name}</span>
                        {post.author.verified && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs px-1">
                            ✓
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-slate-500">
                        {post.author.level} • {post.timestamp}
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  {post.location && (
                    <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
                      <MapPin className="w-3 h-3" />
                      {post.location}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                    {post.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{post.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Engagement Stats */}
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                        {formatNumber(post.likes)}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {post.comments}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {formatNumber(post.views)}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Share2 className="w-4 h-4" />
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
            Load More Content
          </Button>
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Share Your Content</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowUploadModal(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Content Type Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">Content Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {contentTypes.filter(t => t.id !== 'all').map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <button
                          key={type.id}
                          className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <IconComponent className="w-6 h-6 text-blue-600" />
                          <span className="text-sm">{type.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 mb-2">Drop your files here or click to browse</p>
                  <p className="text-sm text-slate-500">Support: JPG, PNG, MP4, PDF (Max 10MB)</p>
                  <Button variant="outline" className="mt-4">
                    Choose Files
                  </Button>
                </div>

                {/* Content Details */}
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input placeholder="Give your content a meaningful title..." />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea 
                    placeholder="Share your story, experience, or insights..."
                    className="h-32"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Location (optional)</label>
                  <Input placeholder="Where was this taken or experienced?" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tags</label>
                  <Input placeholder="Add tags separated by commas (e.g., meditation, monastery, peaceful)" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option value="">Select a category...</option>
                    <option value="spiritual-moment">Spiritual Moment</option>
                    <option value="cultural-experience">Cultural Experience</option>
                    <option value="personal-journey">Personal Journey</option>
                    <option value="heritage-discovery">Heritage Discovery</option>
                    <option value="festival-experience">Festival Experience</option>
                  </select>
                </div>

                {/* Privacy Settings */}
                <div>
                  <label className="block text-sm font-medium mb-2">Privacy</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="privacy" value="public" defaultChecked />
                      <span className="text-sm">Public - Anyone can view</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="privacy" value="community" />
                      <span className="text-sm">Community - Only registered members</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="privacy" value="followers" />
                      <span className="text-sm">Followers - Only people who follow you</span>
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button className="flex-1">
                    <Upload className="w-4 h-4 mr-2" />
                    Share Content
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Content Detail Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto w-full">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedPost.author.avatar} alt={selectedPost.author.name} />
                    <AvatarFallback>{selectedPost.author.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{selectedPost.author.name}</span>
                      {selectedPost.author.verified && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs px-1">✓</Badge>
                      )}
                    </div>
                    <div className="text-sm text-slate-600">{selectedPost.timestamp}</div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedPost(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">{selectedPost.title}</h2>
                
                {/* Media */}
                <div className="mb-6">
                  {selectedPost.type === 'video' ? (
                    <video 
                      controls 
                      className="w-full rounded-lg"
                      poster={selectedPost.thumbnail}
                    >
                      <source src={selectedPost.media} type="video/mp4" />
                    </video>
                  ) : selectedPost.media ? (
                    <img 
                      src={selectedPost.media} 
                      alt={selectedPost.title}
                      className="w-full rounded-lg"
                    />
                  ) : null}
                </div>
                
                <p className="text-slate-700 mb-6">{selectedPost.description}</p>
                
                {/* Engagement */}
                <div className="flex items-center gap-6 mb-6 pb-6 border-b">
                  <Button 
                    variant="ghost" 
                    className={`flex items-center gap-2 ${selectedPost.isLiked ? 'text-red-600' : ''}`}
                  >
                    <Heart className={`w-5 h-5 ${selectedPost.isLiked ? 'fill-current' : ''}`} />
                    {formatNumber(selectedPost.likes)}
                  </Button>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    {selectedPost.comments}
                  </Button>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Share
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={`flex items-center gap-2 ${selectedPost.isBookmarked ? 'text-blue-600' : ''}`}
                  >
                    <Bookmark className={`w-5 h-5 ${selectedPost.isBookmarked ? 'fill-current' : ''}`} />
                    Save
                  </Button>
                </div>
                
                {/* Comments Section */}
                <div>
                  <h3 className="font-semibold mb-4">Comments ({selectedPost.comments})</h3>
                  
                  {/* Add Comment */}
                  <div className="flex gap-3 mb-6">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/src/assets/ancient-manuscript.jpg" alt="You" />
                      <AvatarFallback>Y</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea placeholder="Share your thoughts..." className="mb-2" />
                      <Button size="sm">
                        <Send className="w-4 h-4 mr-2" />
                        Comment
                      </Button>
                    </div>
                  </div>
                  
                  {/* Sample Comments */}
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/src/assets/historical-photos.jpg" alt="Commenter" />
                        <AvatarFallback>C</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">Meditation Master</span>
                          <span className="text-xs text-slate-500">2 hours ago</span>
                        </div>
                        <p className="text-sm text-slate-700">Beautiful capture! The morning light really emphasizes the peaceful atmosphere. Thank you for sharing this moment of tranquility.</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Button variant="ghost" size="sm" className="text-xs">
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            12
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentSharing;