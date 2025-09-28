import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Award, 
  MapPin, 
  Calendar, 
  Star, 
  Heart,
  Camera,
  MessageCircle,
  BookOpen,
  Compass,
  Mountain,
  Clock,
  Trophy,
  Target,
  Flame,
  Users,
  Share2,
  Settings,
  Edit,
  Plus
} from 'lucide-react';

const UserProfiles: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const userProfile = {
    name: 'Sarah Chen',
    username: '@sarahc_seeker',
    avatar: '/src/assets/ancient-manuscript.jpg',
    coverImage: '/src/assets/monastery-hero.jpg',
    location: 'San Francisco, CA',
    joinDate: 'March 2024',
    bio: 'Spiritual seeker exploring Buddhist monasteries and meditation practices. Passionate about photography and sharing meaningful experiences.',
    stats: {
      visitedMonasteries: 12,
      photosShared: 89,
      postsWritten: 34,
      helpfulAnswers: 156,
      followers: 847,
      following: 234,
      totalKarmaPoints: 2456
    },
    achievements: [
      {
        id: 1,
        title: 'First Steps',
        description: 'Visited your first monastery',
        icon: '🏛️',
        dateEarned: '2024-03-15',
        rarity: 'Common'
      },
      {
        id: 2,
        title: 'Spiritual Explorer',
        description: 'Visited 10+ monasteries',
        icon: '🗺️',
        dateEarned: '2024-08-22',
        rarity: 'Rare'
      },
      {
        id: 3,
        title: 'Community Helper',
        description: 'Provided 100+ helpful answers',
        icon: '🤝',
        dateEarned: '2024-09-10',
        rarity: 'Epic'
      },
      {
        id: 4,
        title: 'Storyteller',
        description: 'Shared 25+ meaningful posts',
        icon: '📖',
        dateEarned: '2024-09-01',
        rarity: 'Uncommon'
      },
      {
        id: 5,
        title: 'Photography Master',
        description: 'Shared 50+ photos with 1000+ likes',
        icon: '📸',
        dateEarned: '2024-08-30',
        rarity: 'Rare'
      },
      {
        id: 6,
        title: 'Meditation Practitioner',
        description: 'Completed 30-day meditation challenge',
        icon: '🧘',
        dateEarned: '2024-07-15',
        rarity: 'Epic'
      }
    ],
    spiritualJourney: {
      currentLevel: 'Dedicated Practitioner',
      nextLevel: 'Wisdom Seeker',
      progress: 68,
      totalExperience: 2456,
      nextLevelExp: 3000,
      milestones: [
        {
          id: 1,
          title: 'First Monastery Visit',
          description: 'Visited Rumtek Monastery',
          date: '2024-03-15',
          image: '/src/assets/rumtek-monastery.jpg',
          type: 'Visit'
        },
        {
          id: 2,
          title: 'Meditation Retreat',
          description: '7-day silent retreat at Pemayangtse',
          date: '2024-05-20',
          image: '/src/assets/pemayangtse-monastery.jpg',
          type: 'Retreat'
        },
        {
          id: 3,
          title: 'Cultural Immersion',
          description: 'Participated in Tashiding Festival',
          date: '2024-07-10',
          image: '/src/assets/tashiding-monastery.jpg',
          type: 'Festival'
        },
        {
          id: 4,
          title: 'Teaching Moment',
          description: 'Led photography workshop for community',
          date: '2024-09-01',
          image: '/src/assets/historical-photos.jpg',
          type: 'Teaching'
        }
      ]
    },
    recentActivity: [
      {
        id: 1,
        type: 'post',
        title: 'Shared: "Sunrise meditation at Rumtek"',
        time: '2 hours ago',
        likes: 23,
        comments: 5
      },
      {
        id: 2,
        type: 'answer',
        title: 'Answered: "Best time to visit monasteries?"',
        time: '1 day ago',
        helpful: 12
      },
      {
        id: 3,
        type: 'photo',
        title: 'Uploaded: Prayer wheels collection',
        time: '3 days ago',
        likes: 45,
        comments: 8
      },
      {
        id: 4,
        type: 'achievement',
        title: 'Earned: Community Helper badge',
        time: '1 week ago'
      }
    ],
    goals: [
      {
        id: 1,
        title: 'Visit 20 Monasteries',
        current: 12,
        target: 20,
        progress: 60,
        dueDate: '2024-12-31'
      },
      {
        id: 2,
        title: 'Complete 100-Day Meditation',
        current: 45,
        target: 100,
        progress: 45,
        dueDate: '2024-11-30'
      },
      {
        id: 3,
        title: 'Share 100 Photos',
        current: 89,
        target: 100,
        progress: 89,
        dueDate: '2024-10-31'
      }
    ]
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'bg-gray-100 text-gray-800';
      case 'Uncommon': return 'bg-green-100 text-green-800';
      case 'Rare': return 'bg-blue-100 text-blue-800';
      case 'Epic': return 'bg-purple-100 text-purple-800';
      case 'Legendary': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="py-12 bg-black/60">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Profile Header */}
        <div className="relative mb-8">
          {/* Cover Image */}
          <div className="h-64 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg overflow-hidden">
            <img 
              src={userProfile.coverImage} 
              alt="Cover" 
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          
          {/* Profile Info Overlay */}
          <div className="absolute -bottom-16 left-8 flex items-end gap-6">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              <AvatarFallback className="text-2xl">{userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 mb-4">
              <h1 className="text-2xl font-bold text-slate-800">{userProfile.name}</h1>
              <p className="text-slate-600">{userProfile.username}</p>
              <div className="flex items-center gap-4 text-sm text-slate-600 mt-2">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {userProfile.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {userProfile.joinDate}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button size="sm" variant="outline" className="bg-white/90">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button size="sm" variant="outline" className="bg-white/90">
              <Settings className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8 mt-20">
          <Card className="text-center">
            <CardContent className="pt-4">
              <Mountain className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-xl font-bold">{0}</div>
              <div className="text-xs text-slate-600">Monasteries</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4">
              <Camera className="w-6 h-6 text-pink-600 mx-auto mb-2" />
              <div className="text-xl font-bold">{0}</div>
              <div className="text-xs text-slate-600">Photos</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4">
              <BookOpen className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="text-xl font-bold">{0}</div>
              <div className="text-xs text-slate-600">Posts</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4">
              <Heart className="w-6 h-6 text-red-600 mx-auto mb-2" />
              <div className="text-xl font-bold">{0}</div>
              <div className="text-xs text-slate-600">Helpful</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4">
              <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <div className="text-xl font-bold">{0}</div>
              <div className="text-xs text-slate-600">Followers</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4">
              <Users className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
              <div className="text-xl font-bold">{0}</div>
              <div className="text-xs text-slate-600">Following</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4">
              <Star className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
              <div className="text-xl font-bold">{0}</div>
              <div className="text-xs text-slate-600">Karma</div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Bio */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <p className="text-slate-700">{userProfile.bio}</p>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="border-b mb-8">
          <nav className="flex gap-8">
            {[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'journey', label: 'Spiritual Journey', icon: Compass },
              { id: 'achievements', label: 'Achievements', icon: Award },
              { id: 'goals', label: 'Goals', icon: Target },
              { id: 'activity', label: 'Activity', icon: Clock }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 pb-4 px-1 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-monastery-gold text-monastery-gold'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Spiritual Level Progress */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-600" />
                  Spiritual Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{userProfile.spiritualJourney.currentLevel}</span>
                    <span className="text-sm text-slate-600">
                      {userProfile.spiritualJourney.totalExperience} / {userProfile.spiritualJourney.nextLevelExp} XP
                    </span>
                  </div>
                  <Progress value={userProfile.spiritualJourney.progress} className="h-3" />
                  <div className="text-sm text-slate-600 mt-1">
                    Next: {userProfile.spiritualJourney.nextLevel}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Member since</span>
                  <span className="font-medium">{userProfile.joinDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total contributions</span>
                  <span className="font-medium">{userProfile.stats.postsWritten + userProfile.stats.photosShared}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Community impact</span>
                  <span className="font-medium">{userProfile.stats.helpfulAnswers} helped</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Network size</span>
                  <span className="font-medium">{userProfile.stats.followers + userProfile.stats.following}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'journey' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-blue-600" />
                  Spiritual Journey Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {userProfile.spiritualJourney.milestones.map((milestone, index) => (
                    <div key={milestone.id} className="flex gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <Mountain className="w-6 h-6 text-blue-600" />
                        </div>
                        {index < userProfile.spiritualJourney.milestones.length - 1 && (
                          <div className="absolute top-12 left-6 w-0.5 h-16 bg-blue-200"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <img 
                            src={milestone.image} 
                            alt={milestone.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{milestone.title}</h3>
                            <p className="text-slate-600 text-sm">{milestone.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline">{milestone.type}</Badge>
                              <span className="text-xs text-slate-500">{milestone.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userProfile.achievements.map((achievement) => (
              <Card key={achievement.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <h3 className="font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-sm text-slate-600 mb-3">{achievement.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                      <span className="text-xs text-slate-500">{achievement.dateEarned}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userProfile.goals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">Progress</span>
                      <span className="font-medium">{goal.current} / {goal.target}</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Due Date</span>
                    <span className="font-medium">{goal.dueDate}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Add New Goal */}
            <Card className="border-dashed border-2 hover:border-blue-300 transition-colors">
              <CardContent className="flex items-center justify-center h-full min-h-[200px]">
                <Button variant="ghost" className="flex flex-col items-center gap-2">
                  <Plus className="w-8 h-8 text-slate-400" />
                  <span className="text-slate-600">Add New Goal</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'activity' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userProfile.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      {activity.type === 'post' && <BookOpen className="w-5 h-5 text-blue-600" />}
                      {activity.type === 'answer' && <MessageCircle className="w-5 h-5 text-green-600" />}
                      {activity.type === 'photo' && <Camera className="w-5 h-5 text-pink-600" />}
                      {activity.type === 'achievement' && <Trophy className="w-5 h-5 text-yellow-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-slate-600">{activity.time}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      {activity.likes && (
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {activity.likes}
                        </div>
                      )}
                      {activity.comments && (
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {activity.comments}
                        </div>
                      )}
                      {activity.helpful && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {activity.helpful}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default UserProfiles;