import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Database,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  Globe,
  MessageCircle,
  Star,
  MapPin,
  Phone,
  Mail,
  UserPlus,
  UserMinus,
  Ban,
  Award,
  Zap,
  Server,
  HardDrive,
  Cpu,
  Monitor,
  Wifi,
  Lock,
  Unlock,
  Key,
  BookOpen,
  Image as ImageIcon,
  Video,
  Music,
  Archive,
  Tag
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

const EnhancedAdminDashboard: React.FC = () => {
  const { state, adminLogout } = useAppContext();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('7days');

  // Mock data for enhanced admin features
  const adminStats = {
    totalUsers: 2847,
    activeUsers: 456,
    newUsersToday: 23,
    totalContent: 5632,
    pendingReviews: 47,
    systemHealth: 98.5,
    serverUptime: '99.9%',
    storageUsed: 78.3,
    bandwidthUsed: 234.5,
    totalBookings: 1245,
    revenue: 89750,
    avgRating: 4.8
  };

  const recentActivities = [
    {
      id: 1,
      type: 'user',
      action: 'New user registration',
      user: 'Tenzin Norbu',
      timestamp: '2 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'content',
      action: 'Manuscript uploaded for review',
      user: 'Dr. Sarah Chen',
      timestamp: '15 minutes ago',
      status: 'pending'
    },
    {
      id: 3,
      type: 'booking',
      action: 'Monastery visit booking confirmed',
      user: 'James Wilson',
      timestamp: '32 minutes ago',
      status: 'success'
    },
    {
      id: 4,
      type: 'system',
      action: 'Database backup completed',
      user: 'System',
      timestamp: '1 hour ago',
      status: 'success'
    },
    {
      id: 5,
      type: 'security',
      action: 'Failed login attempt detected',
      user: 'Unknown',
      timestamp: '2 hours ago',
      status: 'warning'
    }
  ];

  const userManagementData = [
    {
      id: 1,
      name: 'Tenzin Norbu',
      email: 'tenzin@email.com',
      role: 'Member',
      joinDate: '2024-01-15',
      lastActive: '2 hours ago',
      status: 'Active',
      contributions: 45,
      rating: 4.9
    },
    {
      id: 2,
      name: 'Dr. Sarah Chen',
      email: 'sarah.chen@university.edu',
      role: 'Researcher',
      joinDate: '2023-08-22',
      lastActive: '15 minutes ago',
      status: 'Active',
      contributions: 127,
      rating: 4.8
    },
    {
      id: 3,
      name: 'James Wilson',
      email: 'james.w@email.com',
      role: 'Tourist',
      joinDate: '2024-03-10',
      lastActive: '1 day ago',
      status: 'Active',
      contributions: 8,
      rating: 4.6
    },
    {
      id: 4,
      name: 'Pemba Sherpa',
      email: 'pemba@monastery.org',
      role: 'Guide',
      joinDate: '2023-05-18',
      lastActive: '30 minutes ago',
      status: 'Active',
      contributions: 89,
      rating: 4.9
    }
  ];

  const contentManagementData = [
    {
      id: 1,
      title: 'Ancient Tibetan Medical Manuscript',
      type: 'Manuscript',
      author: 'Dr. Sarah Chen',
      uploadDate: '2024-03-20',
      status: 'Pending Review',
      views: 234,
      downloads: 45,
      category: 'Historical Documents'
    },
    {
      id: 2,
      title: 'Rumtek Monastery Virtual Tour',
      type: 'Video',
      author: 'Tourism Board',
      uploadDate: '2024-03-18',
      status: 'Published',
      views: 1523,
      downloads: 89,
      category: 'Virtual Tours'
    },
    {
      id: 3,
      title: 'Buddhist Meditation Guide',
      type: 'Audio',
      author: 'Lama Tenzin',
      uploadDate: '2024-03-15',
      status: 'Published',
      views: 876,
      downloads: 234,
      category: 'Spiritual Guidance'
    },
    {
      id: 4,
      title: 'Monastery Architecture Photos',
      type: 'Image Collection',
      author: 'Photography Team',
      uploadDate: '2024-03-12',
      status: 'Published',
      views: 2145,
      downloads: 167,
      category: 'Photography'
    }
  ];

  const systemMetrics = {
    server: {
      cpu: 34,
      memory: 67,
      disk: 78,
      network: 23
    },
    database: {
      queries: 1234,
      connections: 45,
      size: '2.3 GB',
      backups: 'OK'
    },
    performance: {
      avgResponseTime: '245ms',
      errorRate: '0.02%',
      throughput: '1.2K req/min',
      uptime: '99.98%'
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'published':
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'pending review':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
      case 'suspended':
      case 'warning':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return Users;
      case 'content': return FileText;
      case 'booking': return Calendar;
      case 'system': return Server;
      case 'security': return Shield;
      default: return Activity;
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'manuscript': return BookOpen;
      case 'video': return Video;
      case 'audio': return Music;
      case 'image collection': return ImageIcon;
      default: return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3 drop-shadow">
              <Shield className="w-10 h-10 text-monastery-gold" />
              Enhanced Admin Dashboard
            </h1>
            <p className="text-lg text-gray-300">Comprehensive system management and analytics</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 bg-black/40 text-white border-monastery-gold rounded-lg focus:ring-2 focus:ring-monastery-gold"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="1year">Last year</option>
            </select>
            <Button onClick={adminLogout} variant="outline" size="lg" className="bg-monastery-gold text-black font-semibold rounded-full shadow-lg hover:bg-yellow-400 border-2 border-monastery-gold">
              Logout
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8 max-w-5xl mx-auto bg-black/60 backdrop-blur-lg border-none shadow-2xl rounded-2xl">
            <TabsTrigger value="overview" className="text-monastery-gold font-bold data-[state=active]:bg-monastery-gold/80 data-[state=active]:text-black data-[state=active]:shadow-lg">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="text-monastery-gold font-bold data-[state=active]:bg-monastery-gold/80 data-[state=active]:text-black data-[state=active]:shadow-lg">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="content" className="text-monastery-gold font-bold data-[state=active]:bg-monastery-gold/80 data-[state=active]:text-black data-[state=active]:shadow-lg">
              <FileText className="w-4 h-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-monastery-gold font-bold data-[state=active]:bg-monastery-gold/80 data-[state=active]:text-black data-[state=active]:shadow-lg">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="system" className="text-monastery-gold font-bold data-[state=active]:bg-monastery-gold/80 data-[state=active]:text-black data-[state=active]:shadow-lg">
              <Server className="w-4 h-4 mr-2" />
              System
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-monastery-gold font-bold data-[state=active]:bg-monastery-gold/80 data-[state=active]:text-black data-[state=active]:shadow-lg">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="space-y-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white text-black border-none shadow-2xl rounded-2xl">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Total Users</p>
                        <p className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</p>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +{adminStats.newUsersToday} today
                        </p>
                      </div>
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white text-black border-none shadow-2xl rounded-2xl">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Active Users</p>
                        <p className="text-2xl font-bold">{adminStats.activeUsers}</p>
                        <p className="text-xs text-slate-500 mt-1">Online now</p>
                      </div>
                      <Activity className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white text-black border-none shadow-2xl rounded-2xl">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Total Content</p>
                        <p className="text-2xl font-bold">{adminStats.totalContent.toLocaleString()}</p>
                        <p className="text-xs text-yellow-600 flex items-center mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {adminStats.pendingReviews} pending
                        </p>
                      </div>
                      <FileText className="w-8 h-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white text-black border-none shadow-2xl rounded-2xl">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">System Health</p>
                        <p className="text-2xl font-bold">{adminStats.systemHealth}%</p>
                        <p className="text-xs text-green-600 mt-1">Excellent</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      Recent Activities
                    </CardTitle>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => {
                      const IconComponent = getActivityIcon(activity.type);
                      return (
                        <div key={activity.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                          <div className="p-2 bg-white rounded-lg">
                            <IconComponent className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.action}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <p className="text-sm text-slate-600">by {activity.user}</p>
                              <p className="text-xs text-slate-500">{activity.timestamp}</p>
                              <Badge className={getStatusBadge(activity.status)}>
                                {activity.status}
                              </Badge>
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
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <UserPlus className="w-6 h-6" />
                      <span className="text-sm">Add User</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <Plus className="w-6 h-6" />
                      <span className="text-sm">Add Content</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <Download className="w-6 h-6" />
                      <span className="text-sm">Export Data</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <Settings className="w-6 h-6" />
                      <span className="text-sm">System Config</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      User Management
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search users..."
                          className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <Button size="sm">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add User
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">User</th>
                          <th className="text-left py-3 px-4">Role</th>
                          <th className="text-left py-3 px-4">Join Date</th>
                          <th className="text-left py-3 px-4">Last Active</th>
                          <th className="text-left py-3 px-4">Contributions</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userManagementData.map((user) => (
                          <tr key={user.id} className="border-b hover:bg-slate-50">
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-slate-600">{user.email}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge variant="outline">{user.role}</Badge>
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {new Date(user.joinDate).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4 text-sm">{user.lastActive}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{user.contributions}</span>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                  <span className="text-sm">{user.rating}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Badge className={getStatusBadge(user.status)}>
                                {user.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Ban className="w-3 h-3" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-purple-600" />
                      Content Management
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <select className="px-3 py-2 border rounded-lg">
                        <option>All Types</option>
                        <option>Manuscripts</option>
                        <option>Videos</option>
                        <option>Audio</option>
                        <option>Images</option>
                      </select>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Content
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Content</th>
                          <th className="text-left py-3 px-4">Type</th>
                          <th className="text-left py-3 px-4">Author</th>
                          <th className="text-left py-3 px-4">Upload Date</th>
                          <th className="text-left py-3 px-4">Performance</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contentManagementData.map((content) => {
                          const IconComponent = getContentTypeIcon(content.type);
                          return (
                            <tr key={content.id} className="border-b hover:bg-slate-50">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <IconComponent className="w-5 h-5 text-blue-600" />
                                  <div>
                                    <p className="font-medium">{content.title}</p>
                                    <p className="text-sm text-slate-600">{content.category}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <Badge variant="outline">{content.type}</Badge>
                              </td>
                              <td className="py-3 px-4 text-sm">{content.author}</td>
                              <td className="py-3 px-4 text-sm">
                                {new Date(content.uploadDate).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-4">
                                <div className="text-sm">
                                  <p>{content.views.toLocaleString()} views</p>
                                  <p className="text-slate-600">{content.downloads} downloads</p>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <Badge className={getStatusBadge(content.status)}>
                                  {content.status}
                                </Badge>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <Button size="sm" variant="outline">
                                    <Eye className="w-3 h-3" />
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-slate-600">Total Bookings</p>
                      <p className="text-3xl font-bold text-blue-600">{adminStats.totalBookings}</p>
                      <p className="text-sm text-green-600 mt-2">+12% this month</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-slate-600">Revenue</p>
                      <p className="text-3xl font-bold text-green-600">₹{adminStats.revenue.toLocaleString()}</p>
                      <p className="text-sm text-green-600 mt-2">+8% this month</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-slate-600">Avg Rating</p>
                      <p className="text-3xl font-bold text-yellow-600">{adminStats.avgRating}</p>
                      <p className="text-sm text-green-600 mt-2">+0.2 this month</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-slate-600">Server Uptime</p>
                      <p className="text-3xl font-bold text-green-600">{adminStats.serverUptime}</p>
                      <p className="text-sm text-green-600 mt-2">Excellent</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Performance Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600">Analytics charts would be displayed here</p>
                    <p className="text-sm text-slate-500 mt-2">Integration with chart library needed</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Monitoring Tab */}
          <TabsContent value="system">
            <div className="space-y-6">
              {/* Server Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">CPU Usage</p>
                        <p className="text-2xl font-bold">{systemMetrics.server.cpu}%</p>
                      </div>
                      <Cpu className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="mt-3 bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${systemMetrics.server.cpu}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">Memory Usage</p>
                        <p className="text-2xl font-bold">{systemMetrics.server.memory}%</p>
                      </div>
                      <Monitor className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="mt-3 bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${systemMetrics.server.memory}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">Disk Usage</p>
                        <p className="text-2xl font-bold">{systemMetrics.server.disk}%</p>
                      </div>
                      <HardDrive className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="mt-3 bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${systemMetrics.server.disk}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">Network</p>
                        <p className="text-2xl font-bold">{systemMetrics.server.network}%</p>
                      </div>
                      <Wifi className="w-8 h-8 text-orange-600" />
                    </div>
                    <div className="mt-3 bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-orange-600 h-2 rounded-full" 
                        style={{ width: `${systemMetrics.server.network}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Database & Performance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-blue-600" />
                      Database Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Active Queries</span>
                        <span className="font-medium">{systemMetrics.database.queries}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Connections</span>
                        <span className="font-medium">{systemMetrics.database.connections}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Database Size</span>
                        <span className="font-medium">{systemMetrics.database.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Backup Status</span>
                        <Badge className="bg-green-100 text-green-800">
                          {systemMetrics.database.backups}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-green-600" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Response Time</span>
                        <span className="font-medium">{systemMetrics.performance.avgResponseTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Error Rate</span>
                        <span className="font-medium">{systemMetrics.performance.errorRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Throughput</span>
                        <span className="font-medium">{systemMetrics.performance.throughput}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Uptime</span>
                        <Badge className="bg-green-100 text-green-800">
                          {systemMetrics.performance.uptime}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-slate-600" />
                      General Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Site Name</label>
                        <input 
                          type="text" 
                          defaultValue="Monastery360"
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Site Description</label>
                        <textarea 
                          defaultValue="Discover the spiritual heritage of Himalayan monasteries"
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Contact Email</label>
                        <input 
                          type="email" 
                          defaultValue="admin@monastery360.gov.sk"
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-red-600" />
                      Security Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-slate-600">Enhanced security for admin accounts</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Session Timeout</p>
                          <p className="text-sm text-slate-600">Auto logout after inactivity</p>
                        </div>
                        <span className="text-sm font-medium">30 minutes</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Login Attempts</p>
                          <p className="text-sm text-slate-600">Max failed attempts before lockout</p>
                        </div>
                        <span className="text-sm font-medium">5 attempts</span>
                      </div>
                      <Button className="w-full mt-4">
                        <Key className="w-4 h-4 mr-2" />
                        Change Admin Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-blue-600" />
                    System Maintenance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-16 flex flex-col gap-2">
                      <Download className="w-6 h-6" />
                      <span className="text-sm">Backup Database</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex flex-col gap-2">
                      <Upload className="w-6 h-6" />
                      <span className="text-sm">Restore Database</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex flex-col gap-2">
                      <RefreshCw className="w-6 h-6" />
                      <span className="text-sm">Clear Cache</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedAdminDashboard;