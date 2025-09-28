import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar,
  Clock,
  Users,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Download,
  Share2,
  Star,
  Globe,
  User,
  BookOpen,
  Camera,
  Headphones,
  Mountain,
  Eye,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  Bell,
  QrCode,
  Smartphone,
  Printer,
  MessageCircle,
  Award,
  TrendingUp,
  BarChart3,
  DollarSign,
  UserCheck,
  CalendarDays,
  Navigation,
  Settings,
  Shield,
  Lock,
  Unlock
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

const EnhancedBookingSystem: React.FC = () => {
  const { state } = useAppContext();
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedMonastery, setSelectedMonastery] = useState('');
  const [bookingStep, setBookingStep] = useState(1);
  
  // Enhanced booking form state
  const [bookingData, setBookingData] = useState({
    monastery: '',
    date: '',
    timeSlot: '',
    duration: '2',
    tourType: 'guided',
    language: 'english',
    adults: 1,
    children: 0,
    seniors: 0,
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      nationality: '',
      emergencyContact: '',
      specialRequests: '',
      dietaryRequirements: '',
      accessibility: ''
    },
    preferences: {
      photography: true,
      audioGuide: false,
      privateGuide: false,
      transportation: false,
      lunch: false,
      souvenirs: false
    },
    payment: {
      method: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      billingAddress: ''
    }
  });

  // Mock data for enhanced booking system
  const availableMonasteries = [
    {
      id: 'rumtek',
      name: 'Rumtek Monastery',
      location: 'Gangtok, Sikkim',
      basePrice: 500,
      duration: '2-3 hours',
      difficulty: 'Easy',
      highlights: ['Golden Stupa', 'Prayer Wheels', 'Meditation Hall'],
      availableSlots: ['09:00', '11:00', '14:00', '16:00'],
      rating: 4.8,
      reviews: 234,
      image: '/api/placeholder/300/200'
    },
    {
      id: 'pemayangtse',
      name: 'Pemayangtse Monastery',
      location: 'Pelling, Sikkim',
      basePrice: 400,
      duration: '2-4 hours',
      difficulty: 'Moderate',
      highlights: ['Ancient Architecture', 'Sacred Relics', 'Mountain Views'],
      availableSlots: ['09:30', '11:30', '14:30'],
      rating: 4.7,
      reviews: 187,
      image: '/api/placeholder/300/200'
    },
    {
      id: 'tashiding',
      name: 'Tashiding Monastery',
      location: 'Tashiding, Sikkim',
      basePrice: 350,
      duration: '1-2 hours',
      difficulty: 'Easy',
      highlights: ['Sacred Chorten', 'Holy Water', 'Scenic Beauty'],
      availableSlots: ['10:00', '13:00', '15:00'],
      rating: 4.6,
      reviews: 156,
      image: '/api/placeholder/300/200'
    }
  ];

  const tourTypes = [
    {
      id: 'guided',
      name: 'Guided Tour',
      description: 'Professional guide with cultural insights',
      duration: '2-3 hours',
      price: 0,
      features: ['Expert guide', 'Cultural stories', 'Q&A session']
    },
    {
      id: 'audio',
      name: 'Audio Guide Tour',
      description: 'Self-paced tour with audio commentary',
      duration: '1-2 hours',
      price: -100,
      features: ['Audio device', 'Multiple languages', 'Self-paced']
    },
    {
      id: 'private',
      name: 'Private Guide Tour',
      description: 'Exclusive private guide for your group',
      duration: '2-4 hours',
      price: 500,
      features: ['Private guide', 'Customizable', 'Photography assistance']
    },
    {
      id: 'photography',
      name: 'Photography Tour',
      description: 'Specialized tour for photography enthusiasts',
      duration: '3-4 hours',
      price: 300,
      features: ['Photo spots', 'Golden hour timing', 'Photography tips']
    }
  ];

  const addOnServices = [
    { id: 'transportation', name: 'Transportation', price: 200, description: 'Round-trip transport from Gangtok' },
    { id: 'lunch', name: 'Traditional Lunch', price: 150, description: 'Authentic Sikkimese meal' },
    { id: 'audioGuide', name: 'Premium Audio Guide', price: 100, description: 'Multi-language audio commentary' },
    { id: 'souvenirs', name: 'Souvenir Package', price: 250, description: 'Curated monastery artifacts' },
    { id: 'photography', name: 'Professional Photos', price: 300, description: 'Professional photographer service' },
    { id: 'meditation', name: 'Meditation Session', price: 200, description: 'Guided meditation with monks' }
  ];

  const myBookings = [
    {
      id: 'BK001',
      monasteryName: 'Rumtek Monastery',
      date: '2024-04-15',
      time: '09:00',
      status: 'confirmed',
      guests: 3,
      totalAmount: 1500,
      bookingDate: '2024-03-20',
      confirmationCode: 'RM-BK001-2024'
    },
    {
      id: 'BK002',
      monasteryName: 'Pemayangtse Monastery',
      date: '2024-04-22',
      time: '11:30',
      status: 'pending',
      guests: 2,
      totalAmount: 800,
      bookingDate: '2024-03-25',
      confirmationCode: 'PM-BK002-2024'
    }
  ];

  const calculateTotalPrice = () => {
    const selectedMonasteryData = availableMonasteries.find(m => m.id === bookingData.monastery);
    if (!selectedMonasteryData) return 0;

    let basePrice = selectedMonasteryData.basePrice;
    const selectedTourType = tourTypes.find(t => t.id === bookingData.tourType);
    if (selectedTourType) {
      basePrice += selectedTourType.price;
    }

    const totalGuests = bookingData.adults + bookingData.children + bookingData.seniors;
    let totalPrice = basePrice * totalGuests;

    // Add-on services
    Object.entries(bookingData.preferences).forEach(([key, selected]) => {
      if (selected && key !== 'photography') {
        const addon = addOnServices.find(s => s.id === key);
        if (addon) {
          totalPrice += addon.price;
        }
      }
    });

    // Children discount (50%)
    totalPrice -= (basePrice * bookingData.children * 0.5);
    
    // Senior discount (20%)
    totalPrice -= (basePrice * bookingData.seniors * 0.2);

    return Math.max(0, totalPrice);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleBookingSubmit = () => {
    // Handle booking submission
    console.log('Booking submitted:', bookingData);
    setBookingStep(4); // Go to confirmation step
  };

  return (
    <div className="py-12 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-monastery-gold mb-2">Enhanced Booking System</h1>
          <p className="text-white max-w-2xl mx-auto">
            Book your spiritual journey with our comprehensive reservation system featuring secure payments, guide management, and personalized experiences
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList
            className="grid w-full grid-cols-5 mb-8 max-w-4xl mx-auto border border-monastery-gold bg-black/60 rounded-xl overflow-hidden"
          >
            <TabsTrigger
              value="browse"
              className="data-[state=active]:bg-monastery-gold data-[state=active]:text-black data-[state=inactive]:bg-black data-[state=inactive]:text-monastery-gold text-monastery-gold border-none rounded-none px-4 py-3 font-semibold transition-colors"
            >
              <Search className="w-4 h-4 mr-2" />
              Browse
            </TabsTrigger>
            <TabsTrigger
              value="book"
              className="data-[state=active]:bg-monastery-gold data-[state=active]:text-black data-[state=inactive]:bg-black data-[state=inactive]:text-monastery-gold text-monastery-gold border-none rounded-none px-4 py-3 font-semibold transition-colors"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Now
            </TabsTrigger>
            <TabsTrigger
              value="my-bookings"
              className="data-[state=active]:bg-monastery-gold data-[state=active]:text-black data-[state=inactive]:bg-black data-[state=inactive]:text-monastery-gold text-monastery-gold border-none rounded-none px-4 py-3 font-semibold transition-colors"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              My Bookings
            </TabsTrigger>
            <TabsTrigger
              value="guides"
              className="data-[state=active]:bg-monastery-gold data-[state=active]:text-black data-[state=inactive]:bg-black data-[state=inactive]:text-monastery-gold text-monastery-gold border-none rounded-none px-4 py-3 font-semibold transition-colors"
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Guides
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-monastery-gold data-[state=active]:text-black data-[state=inactive]:bg-black data-[state=inactive]:text-monastery-gold text-monastery-gold border-none rounded-none px-4 py-3 font-semibold transition-colors"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Browse Monasteries Tab */}
          <TabsContent value="browse">
            <div className="space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                        <Input
                          placeholder="Search monasteries, locations, or experiences..."
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gangtok">Gangtok</SelectItem>
                        <SelectItem value="pelling">Pelling</SelectItem>
                        <SelectItem value="tashiding">Tashiding</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="challenging">Challenging</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      More Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Monastery Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableMonasteries.map((monastery) => (
                  <Card key={monastery.id} className="hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-slate-200 relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <Badge className="bg-white/20 text-white mb-2">
                          ₹{monastery.basePrice} per person
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white text-slate-800">
                          <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                          {monastery.rating}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-lg">{monastery.name}</h3>
                          <p className="text-slate-600 flex items-center gap-1 text-sm">
                            <MapPin className="w-4 h-4" />
                            {monastery.location}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-slate-500" />
                            <span>{monastery.duration}</span>
                            <span className="text-slate-300">•</span>
                            <span className="capitalize">{monastery.difficulty}</span>
                          </div>
                          <div className="text-sm text-slate-600">
                            {monastery.reviews} reviews
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium">Highlights:</p>
                          <div className="flex flex-wrap gap-1">
                            {monastery.highlights.map((highlight, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {highlight}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button 
                            className="flex-1"
                            onClick={() => {
                              setSelectedMonastery(monastery.id);
                              setBookingData(prev => ({ ...prev, monastery: monastery.id }));
                              setActiveTab('book');
                            }}
                          >
                            Book Now
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Book Now Tab */}
          <TabsContent value="book">
            <div className="max-w-4xl mx-auto">
              {/* Booking Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-center space-x-4">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        bookingStep >= step 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-slate-200 text-slate-600'
                      }`}>
                        {bookingStep > step ? <CheckCircle className="w-5 h-5" /> : step}
                      </div>
                      {step < 4 && (
                        <div className={`w-12 h-0.5 mx-2 ${
                          bookingStep > step ? 'bg-blue-600' : 'bg-slate-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-4 space-x-8">
                  <span className={`text-sm ${bookingStep >= 1 ? 'text-blue-600' : 'text-slate-500'}`}>
                    Select Tour
                  </span>
                  <span className={`text-sm ${bookingStep >= 2 ? 'text-blue-600' : 'text-slate-500'}`}>
                    Personal Details
                  </span>
                  <span className={`text-sm ${bookingStep >= 3 ? 'text-blue-600' : 'text-slate-500'}`}>
                    Payment
                  </span>
                  <span className={`text-sm ${bookingStep >= 4 ? 'text-blue-600' : 'text-slate-500'}`}>
                    Confirmation
                  </span>
                </div>
              </div>

              {/* Step 1: Select Tour */}
              {bookingStep === 1 && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Select Monastery & Tour Type</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Monastery Selection */}
                      <div className="space-y-4">
                        <Label>Choose Monastery</Label>
                        <Select 
                          value={bookingData.monastery} 
                          onValueChange={(value) => setBookingData(prev => ({ ...prev, monastery: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select monastery" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableMonasteries.map((monastery) => (
                              <SelectItem key={monastery.id} value={monastery.id}>
                                {monastery.name} - ₹{monastery.basePrice}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Tour Type Selection */}
                      <div className="space-y-4">
                        <Label>Tour Type</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {tourTypes.map((tour) => (
                            <div
                              key={tour.id}
                              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                                bookingData.tourType === tour.id
                                  ? 'border-blue-600 bg-blue-50'
                                  : 'border-slate-200 hover:border-slate-300'
                              }`}
                              onClick={() => setBookingData(prev => ({ ...prev, tourType: tour.id }))}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{tour.name}</h4>
                                {tour.price !== 0 && (
                                  <Badge variant={tour.price > 0 ? "default" : "secondary"}>
                                    {tour.price > 0 ? `+₹${tour.price}` : `₹${Math.abs(tour.price)} off`}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-slate-600 mb-2">{tour.description}</p>
                              <p className="text-xs text-slate-500 mb-2">Duration: {tour.duration}</p>
                              <div className="space-y-1">
                                {tour.features.map((feature, index) => (
                                  <div key={index} className="flex items-center gap-1 text-xs text-slate-600">
                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                    {feature}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Date and Time Selection */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Date</Label>
                          <Input
                            type="date"
                            value={bookingData.date}
                            onChange={(e) => setBookingData(prev => ({ ...prev, date: e.target.value }))}
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Time Slot</Label>
                          <Select 
                            value={bookingData.timeSlot} 
                            onValueChange={(value) => setBookingData(prev => ({ ...prev, timeSlot: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="09:00">09:00 AM</SelectItem>
                              <SelectItem value="11:00">11:00 AM</SelectItem>
                              <SelectItem value="14:00">02:00 PM</SelectItem>
                              <SelectItem value="16:00">04:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Guest Count */}
                      <div className="space-y-4">
                        <Label>Number of Guests</Label>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Adults (18+)</Label>
                            <Select 
                              value={bookingData.adults.toString()} 
                              onValueChange={(value) => setBookingData(prev => ({ ...prev, adults: parseInt(value) }))}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[1,2,3,4,5,6,7,8].map(num => (
                                  <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Children (5-17)</Label>
                            <Select 
                              value={bookingData.children.toString()} 
                              onValueChange={(value) => setBookingData(prev => ({ ...prev, children: parseInt(value) }))}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[0,1,2,3,4,5].map(num => (
                                  <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Seniors (65+)</Label>
                            <Select 
                              value={bookingData.seniors.toString()} 
                              onValueChange={(value) => setBookingData(prev => ({ ...prev, seniors: parseInt(value) }))}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[0,1,2,3,4,5].map(num => (
                                  <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Add-on Services */}
                      <div className="space-y-4">
                        <Label>Additional Services (Optional)</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {addOnServices.map((service) => (
                            <div key={service.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                              <input
                                type="checkbox"
                                id={service.id}
                                checked={bookingData.preferences[service.id as keyof typeof bookingData.preferences] || false}
                                onChange={(e) => setBookingData(prev => ({
                                  ...prev,
                                  preferences: {
                                    ...prev.preferences,
                                    [service.id]: e.target.checked
                                  }
                                }))}
                                className="rounded"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <label htmlFor={service.id} className="font-medium text-sm cursor-pointer">
                                    {service.name}
                                  </label>
                                  <span className="text-sm font-medium">+₹{service.price}</span>
                                </div>
                                <p className="text-xs text-slate-600">{service.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-6 border-t">
                        <div className="text-lg font-semibold">
                          Total: ₹{calculateTotalPrice()}
                        </div>
                        <Button 
                          onClick={() => setBookingStep(2)}
                          disabled={!bookingData.monastery || !bookingData.date || !bookingData.timeSlot}
                        >
                          Continue to Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Step 2: Personal Details */}
              {bookingStep === 2 && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>First Name *</Label>
                          <Input
                            value={bookingData.personalInfo.firstName}
                            onChange={(e) => setBookingData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, firstName: e.target.value }
                            }))}
                            placeholder="John"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Last Name *</Label>
                          <Input
                            value={bookingData.personalInfo.lastName}
                            onChange={(e) => setBookingData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, lastName: e.target.value }
                            }))}
                            placeholder="Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Email *</Label>
                          <Input
                            type="email"
                            value={bookingData.personalInfo.email}
                            onChange={(e) => setBookingData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, email: e.target.value }
                            }))}
                            placeholder="john@example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone Number *</Label>
                          <Input
                            type="tel"
                            value={bookingData.personalInfo.phone}
                            onChange={(e) => setBookingData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, phone: e.target.value }
                            }))}
                            placeholder="+91 98765 43210"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Nationality</Label>
                          <Input
                            value={bookingData.personalInfo.nationality}
                            onChange={(e) => setBookingData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, nationality: e.target.value }
                            }))}
                            placeholder="Indian"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Emergency Contact</Label>
                          <Input
                            value={bookingData.personalInfo.emergencyContact}
                            onChange={(e) => setBookingData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, emergencyContact: e.target.value }
                            }))}
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Special Requests</Label>
                          <Textarea
                            value={bookingData.personalInfo.specialRequests}
                            onChange={(e) => setBookingData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, specialRequests: e.target.value }
                            }))}
                            placeholder="Any special requirements or questions..."
                            className="min-h-[80px]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Dietary Requirements</Label>
                          <Input
                            value={bookingData.personalInfo.dietaryRequirements}
                            onChange={(e) => setBookingData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, dietaryRequirements: e.target.value }
                            }))}
                            placeholder="Vegetarian, Vegan, Allergies, etc."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Accessibility Needs</Label>
                          <Input
                            value={bookingData.personalInfo.accessibility}
                            onChange={(e) => setBookingData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, accessibility: e.target.value }
                            }))}
                            placeholder="Wheelchair access, mobility assistance, etc."
                          />
                        </div>
                      </div>

                      <div className="flex justify-between pt-6 border-t">
                        <Button variant="outline" onClick={() => setBookingStep(1)}>
                          Back
                        </Button>
                        <Button 
                          onClick={() => setBookingStep(3)}
                          disabled={!bookingData.personalInfo.firstName || !bookingData.personalInfo.email || !bookingData.personalInfo.phone}
                        >
                          Continue to Payment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Step 3: Payment */}
              {bookingStep === 3 && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Payment Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Payment Summary */}
                      <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                        <h4 className="font-medium">Booking Summary</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Monastery Visit</span>
                            <span>₹{calculateTotalPrice()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Processing Fee</span>
                            <span>₹50</span>
                          </div>
                          <div className="flex justify-between font-medium pt-2 border-t">
                            <span>Total Amount</span>
                            <span>₹{calculateTotalPrice() + 50}</span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Methods */}
                      <div className="space-y-4">
                        <Label>Payment Method</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {['card', 'upi', 'netbanking'].map((method) => (
                            <div
                              key={method}
                              className={`p-4 border rounded-lg cursor-pointer text-center ${
                                bookingData.payment.method === method
                                  ? 'border-blue-600 bg-blue-50'
                                  : 'border-slate-200 hover:border-slate-300'
                              }`}
                              onClick={() => setBookingData(prev => ({
                                ...prev,
                                payment: { ...prev.payment, method }
                              }))}
                            >
                              <CreditCard className="w-6 h-6 mx-auto mb-2" />
                              <p className="font-medium capitalize">{method}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Card Details (if card selected) */}
                      {bookingData.payment.method === 'card' && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Card Number</Label>
                            <Input
                              placeholder="1234 5678 9012 3456"
                              value={bookingData.payment.cardNumber}
                              onChange={(e) => setBookingData(prev => ({
                                ...prev,
                                payment: { ...prev.payment, cardNumber: e.target.value }
                              }))}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Expiry Date</Label>
                              <Input
                                placeholder="MM/YY"
                                value={bookingData.payment.expiryDate}
                                onChange={(e) => setBookingData(prev => ({
                                  ...prev,
                                  payment: { ...prev.payment, expiryDate: e.target.value }
                                }))}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>CVV</Label>
                              <Input
                                placeholder="123"
                                value={bookingData.payment.cvv}
                                onChange={(e) => setBookingData(prev => ({
                                  ...prev,
                                  payment: { ...prev.payment, cvv: e.target.value }
                                }))}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between pt-6 border-t">
                        <Button variant="outline" onClick={() => setBookingStep(2)}>
                          Back
                        </Button>
                        <Button 
                          onClick={handleBookingSubmit}
                          disabled={!bookingData.payment.method}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Lock className="w-4 h-4 mr-2" />
                          Complete Booking - ₹{calculateTotalPrice() + 50}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {bookingStep === 4 && (
                <div className="space-y-6">
                  <Card>
                    <CardContent className="pt-8 text-center space-y-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">
                          Booking Confirmed!
                        </h3>
                        <p className="text-slate-600">
                          Your monastery visit has been successfully booked. You will receive a confirmation email shortly.
                        </p>
                      </div>

                      <div className="bg-slate-50 p-6 rounded-lg text-left max-w-md mx-auto">
                        <h4 className="font-medium mb-4">Booking Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Confirmation Code:</span>
                            <span className="font-medium">BK-{Date.now().toString().slice(-6)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Date:</span>
                            <span>{new Date(bookingData.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Time:</span>
                            <span>{bookingData.timeSlot}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Guests:</span>
                            <span>{bookingData.adults + bookingData.children + bookingData.seniors}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Paid:</span>
                            <span className="font-medium">₹{calculateTotalPrice() + 50}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                        <Button variant="outline" className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Download Ticket
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share Details
                        </Button>
                      </div>

                      <Button 
                        className="w-full max-w-md mx-auto"
                        onClick={() => {
                          setActiveTab('my-bookings');
                          setBookingStep(1);
                          setBookingData({
                            monastery: '',
                            date: '',
                            timeSlot: '',
                            duration: '2',
                            tourType: 'guided',
                            language: 'english',
                            adults: 1,
                            children: 0,
                            seniors: 0,
                            personalInfo: {
                              firstName: '',
                              lastName: '',
                              email: '',
                              phone: '',
                              nationality: '',
                              emergencyContact: '',
                              specialRequests: '',
                              dietaryRequirements: '',
                              accessibility: ''
                            },
                            preferences: {
                              photography: true,
                              audioGuide: false,
                              privateGuide: false,
                              transportation: false,
                              lunch: false,
                              souvenirs: false
                            },
                            payment: {
                              method: '',
                              cardNumber: '',
                              expiryDate: '',
                              cvv: '',
                              billingAddress: ''
                            }
                          });
                        }}
                      >
                        View My Bookings
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          {/* My Bookings Tab */}
          <TabsContent value="my-bookings">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">My Bookings</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm" onClick={() => setActiveTab('book')}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Booking
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {myBookings.map((booking) => (
                  <Card key={booking.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Mountain className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{booking.monasteryName}</h3>
                            <p className="text-sm text-slate-600">Booking ID: {booking.id}</p>
                          </div>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-slate-500" />
                          <span>{new Date(booking.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-slate-500" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-slate-500" />
                          <span>{booking.guests} guests</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CreditCard className="w-4 h-4 text-slate-500" />
                          <span>₹{booking.totalAmount}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-sm text-slate-600">
                          Booked on {new Date(booking.bookingDate).toLocaleDateString()}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Ticket
                          </Button>
                          {booking.status === 'confirmed' && (
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-1" />
                              Modify
                            </Button>
                          )}
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <XCircle className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Guides Tab */}
          <TabsContent value="guides">
            <div className="text-center py-12">
              <UserCheck className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Guide Management</h3>
              <p className="text-slate-600 mb-4">Manage tour guides, schedules, and assignments</p>
              <Button variant="outline">Coming Soon</Button>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Booking Analytics</h3>
              <p className="text-slate-600 mb-4">View booking statistics and performance metrics</p>
              <Button variant="outline">Coming Soon</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedBookingSystem;