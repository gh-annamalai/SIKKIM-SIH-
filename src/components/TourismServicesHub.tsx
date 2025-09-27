import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Hotel, 
  MapPin, 
  Star, 
  Users, 
  Calendar, 
  DollarSign,
  Phone,
  Mail,
  Car,
  Utensils,
  Wifi,
  Coffee,
  ShieldCheck,
  Clock,
  Camera,
  Mountain,
  Search,
  Filter,
  Heart,
  Share
} from 'lucide-react';

const TourismServicesHub: React.FC = () => {
  const [selectedService, setSelectedService] = useState('accommodation');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const accommodations = [
    {
      id: 1,
      name: 'Hotel Tibet Gangtok',
      type: 'Hotel',
      location: 'MG Road, Gangtok',
      rating: 4.5,
      price: '₹3,500',
      priceRange: 'Mid-Range',
      distance: '2 km from Rumtek Monastery',
      amenities: ['WiFi', 'Restaurant', 'Room Service', 'Parking', 'Spa'],
      image: '/src/assets/monastery-hero.jpg',
      description: 'Comfortable hotel with traditional Tibetan hospitality and modern amenities.',
      contact: {
        phone: '+91-3592-202523',
        email: 'info@hoteltibet.com',
        website: 'www.hoteltibet.com'
      },
      features: ['Mountain Views', '24/7 Service', 'Traditional Decor', 'Cultural Programs'],
      cancellation: 'Free cancellation up to 24 hours'
    },
    {
      id: 2,
      name: 'Monastery Guest House',
      type: 'Guest House',
      location: 'Near Rumtek Monastery',
      rating: 4.2,
      price: '₹1,800',
      priceRange: 'Budget',
      distance: '500m from Rumtek Monastery',
      amenities: ['Simple Rooms', 'Shared Bath', 'Meditation Hall', 'Garden'],
      image: '/src/assets/pemayangtse-monastery.jpg',
      description: 'Peaceful accommodation within monastery grounds for spiritual retreat.',
      contact: {
        phone: '+91-3592-251345',
        email: 'stay@rumtekguesthouse.org'
      },
      features: ['Spiritual Atmosphere', 'Early Morning Prayers', 'Vegetarian Meals', 'Quiet Environment'],
      cancellation: 'Flexible cancellation policy'
    },
    {
      id: 3,
      name: 'Sikkim Heritage Resort',
      type: 'Resort',
      location: 'Ranipool, East Sikkim',
      rating: 4.7,
      price: '₹5,200',
      priceRange: 'Luxury',
      distance: '15 km from Rumtek Monastery',
      amenities: ['Pool', 'Spa', 'Multi-cuisine Restaurant', 'Adventure Sports', 'Cultural Shows'],
      image: '/src/assets/tashiding-monastery.jpg',
      description: 'Luxury resort offering panoramic mountain views and cultural experiences.',
      contact: {
        phone: '+91-3592-283456',
        email: 'reservations@sikkimheritage.com',
        website: 'www.sikkimheritageresort.com'
      },
      features: ['Luxury Suites', 'Adventure Activities', 'Cultural Tours', 'Fine Dining'],
      cancellation: 'Free cancellation up to 48 hours'
    }
  ];

  const travelPackages = [
    {
      id: 1,
      title: 'Sacred Monasteries of Sikkim',
      duration: '5 Days / 4 Nights',
      price: '₹18,500',
      groupSize: '2-15 people',
      difficulty: 'Easy',
      highlights: ['Rumtek Monastery', 'Pemayangtse Monastery', 'Tashiding Monastery', 'Local Culture'],
      inclusions: ['Accommodation', 'Transportation', 'Guide', 'Entrance Fees', 'Meals'],
      itinerary: [
        'Day 1: Arrival in Gangtok, Visit Rumtek Monastery',
        'Day 2: Gangtok to Pelling, Pemayangtse Monastery',
        'Day 3: Explore Tashiding Monastery, Local village visit',
        'Day 4: Cultural activities and meditation sessions',
        'Day 5: Departure with monastery blessings'
      ],
      bestTime: 'October to May',
      rating: 4.8
    },
    {
      id: 2,
      title: 'Spiritual Retreat Package',
      duration: '7 Days / 6 Nights',
      price: '₹25,000',
      groupSize: '1-8 people',
      difficulty: 'Moderate',
      highlights: ['Meditation Retreats', 'Spiritual Guidance', 'Monastery Living', 'Cultural Immersion'],
      inclusions: ['Monastery Stay', 'Vegetarian Meals', 'Spiritual Guide', 'Meditation Sessions'],
      itinerary: [
        'Day 1-2: Arrival and monastery orientation',
        'Day 3-4: Intensive meditation and spiritual practices',
        'Day 5-6: Cultural learning and monastery life experience',
        'Day 7: Departure with spiritual certificates'
      ],
      bestTime: 'March to June, September to November',
      rating: 4.9
    },
    {
      id: 3,
      title: 'Heritage and Nature Explorer',
      duration: '10 Days / 9 Nights',
      price: '₹35,500',
      groupSize: '4-20 people',
      difficulty: 'Moderate to Challenging',
      highlights: ['All Major Monasteries', 'Himalayan Views', 'Wildlife Sanctuaries', 'Adventure Activities'],
      inclusions: ['Luxury Accommodation', 'All Transportation', 'Expert Guide', 'Adventure Equipment'],
      itinerary: [
        'Day 1-3: Gangtok and Eastern monasteries',
        'Day 4-6: Western Sikkim and Pelling region',
        'Day 7-8: Adventure activities and nature exploration',
        'Day 9-10: Cultural workshops and departure'
      ],
      bestTime: 'April to June, October to December',
      rating: 4.7
    }
  ];

  const localGuides = [
    {
      id: 1,
      name: 'Tenzin Norbu',
      specialization: 'Buddhist Culture & History',
      experience: '12 years',
      languages: ['English', 'Hindi', 'Tibetan', 'Nepali'],
      rating: 4.9,
      reviews: 156,
      rate: '₹1,500/day',
      expertise: ['Monastery History', 'Buddhist Philosophy', 'Local Customs', 'Spiritual Guidance'],
      photo: '/src/assets/ancient-manuscript.jpg',
      description: 'Expert in Buddhist culture with deep knowledge of monastery traditions.',
      contact: {
        phone: '+91-9832567890',
        email: 'tenzin.guide@email.com'
      },
      availability: 'Available most days',
      certifications: ['Government Licensed Guide', 'Cultural Heritage Specialist']
    },
    {
      id: 2,
      name: 'Pemba Sherpa',
      specialization: 'Adventure & Trekking',
      experience: '8 years',
      languages: ['English', 'Hindi', 'Sherpa'],
      rating: 4.7,
      reviews: 89,
      rate: '₹1,200/day',
      expertise: ['Mountain Trekking', 'Wildlife', 'Photography', 'Local Flora/Fauna'],
      photo: '/src/assets/historical-photos.jpg',
      description: 'Adventure guide specializing in monastery trekking routes and nature tours.',
      contact: {
        phone: '+91-9876543210',
        email: 'pemba.adventure@email.com'
      },
      availability: 'Seasonal (March-November)',
      certifications: ['Mountaineering Certificate', 'First Aid Trained']
    },
    {
      id: 3,
      name: 'Dolma Bhutia',
      specialization: 'Cultural Immersion',
      experience: '10 years',
      languages: ['English', 'Hindi', 'Bhutia', 'Lepcha'],
      rating: 4.8,
      reviews: 124,
      rate: '₹1,800/day',
      expertise: ['Local Traditions', 'Handicrafts', 'Cooking Classes', 'Family Homestays'],
      photo: '/src/assets/ritual-artifacts.jpg',
      description: 'Cultural guide offering authentic local experiences and family connections.',
      contact: {
        phone: '+91-9123456789',
        email: 'dolma.culture@email.com'
      },
      availability: 'Available year-round',
      certifications: ['Cultural Ambassador', 'Tourism Board Certified']
    }
  ];

  const filteredAccommodations = accommodations.filter(acc => 
    (selectedCategory === 'all' || acc.priceRange.toLowerCase() === selectedCategory) &&
    (acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     acc.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-3">
            <Hotel className="w-10 h-10 text-blue-600" />
            Tourism Services Hub
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Complete travel solutions for your monastery visit including accommodation, 
            guided tours, travel packages, and local expert guides.
          </p>
        </div>

        <Tabs value={selectedService} onValueChange={setSelectedService} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 max-w-2xl mx-auto">
            <TabsTrigger value="accommodation">
              <Hotel className="w-4 h-4 mr-1" />
              Stay
            </TabsTrigger>
            <TabsTrigger value="packages">
              <Calendar className="w-4 h-4 mr-1" />
              Packages
            </TabsTrigger>
            <TabsTrigger value="guides">
              <Users className="w-4 h-4 mr-1" />
              Guides
            </TabsTrigger>
            <TabsTrigger value="services">
              <Car className="w-4 h-4 mr-1" />
              Services
            </TabsTrigger>
          </TabsList>

          <TabsContent value="accommodation">
            {/* Search and Filter */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search accommodations by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="budget">Budget</option>
                <option value="mid-range">Mid-Range</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAccommodations.map((accommodation) => (
                <Card key={accommodation.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={accommodation.image} 
                      alt={accommodation.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 right-2 bg-white text-slate-700">
                      {accommodation.type}
                    </Badge>
                    <Button size="sm" className="absolute top-2 left-2 bg-white/80 hover:bg-white text-slate-700">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{accommodation.name}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                          <MapPin className="w-4 h-4" />
                          {accommodation.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">{accommodation.rating}</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">{accommodation.price}</div>
                        <div className="text-xs text-slate-500">per night</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-600">{accommodation.description}</p>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <span>{accommodation.distance}</span>
                    </div>

                    {/* Amenities */}
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Amenities</h4>
                      <div className="flex flex-wrap gap-1">
                        {accommodation.amenities.slice(0, 4).map((amenity, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {accommodation.amenities.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{accommodation.amenities.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Special Features</h4>
                      <div className="flex flex-wrap gap-1">
                        {accommodation.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} className="bg-blue-50 text-blue-700 text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Contact & Booking */}
                    <div className="flex gap-2 pt-2 border-t">
                      <Button className="flex-1" size="sm">
                        <Phone className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                      <Button variant="outline" className="flex-1" size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Now
                      </Button>
                    </div>

                    <div className="text-xs text-green-600 text-center">
                      {accommodation.cancellation}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="packages">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {travelPackages.map((pkg) => (
                <Card key={pkg.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{pkg.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                          <Clock className="w-4 h-4" />
                          {pkg.duration}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">{pkg.rating}</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">{pkg.price}</div>
                        <div className="text-xs text-slate-500">per person</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span>{pkg.groupSize}</span>
                      </div>
                      <Badge variant={pkg.difficulty === 'Easy' ? 'default' : pkg.difficulty === 'Moderate' ? 'secondary' : 'destructive'}>
                        {pkg.difficulty}
                      </Badge>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Highlights</h4>
                      <div className="flex flex-wrap gap-1">
                        {pkg.highlights.map((highlight, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Inclusions */}
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Package Includes</h4>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        {pkg.inclusions.map((inclusion, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-green-600" />
                            <span>{inclusion}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-slate-600">
                      <strong>Best Time:</strong> {pkg.bestTime}
                    </div>

                    <div className="flex gap-2 pt-2 border-t">
                      <Button className="flex-1" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guides">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {localGuides.map((guide) => (
                <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <img 
                        src={guide.photo} 
                        alt={guide.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <CardTitle className="text-lg">{guide.name}</CardTitle>
                        <p className="text-sm text-slate-600">{guide.specialization}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-medium">{guide.rating}</span>
                            <span className="text-xs text-slate-500">({guide.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600">{guide.rate}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-600">{guide.description}</p>
                    
                    <div className="text-sm">
                      <strong>Experience:</strong> {guide.experience}
                    </div>

                    {/* Languages */}
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Languages</h4>
                      <div className="flex flex-wrap gap-1">
                        {guide.languages.map((language, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Expertise */}
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Expertise</h4>
                      <div className="flex flex-wrap gap-1">
                        {guide.expertise.slice(0, 3).map((skill, index) => (
                          <Badge key={index} className="bg-blue-50 text-blue-700 text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div>
                      <h4 className="font-medium mb-2 text-sm">Certifications</h4>
                      <div className="space-y-1">
                        {guide.certifications.map((cert, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs">
                            <ShieldCheck className="w-3 h-3 text-green-600" />
                            <span>{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-slate-600">
                      <strong>Availability:</strong> {guide.availability}
                    </div>

                    <div className="flex gap-2 pt-2 border-t">
                      <Button className="flex-1" size="sm">
                        <Phone className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                      <Button variant="outline" className="flex-1" size="sm">
                        <Mail className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Transportation Services */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-blue-600" />
                    Transportation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium">Airport Pickup</div>
                      <div className="text-sm text-slate-600">₹1,500 - ₹2,500</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium">Monastery Tours</div>
                      <div className="text-sm text-slate-600">₹2,000 - ₹4,000/day</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-medium">Car Rental</div>
                      <div className="text-sm text-slate-600">₹3,500 - ₹6,000/day</div>
                    </div>
                  </div>
                  <Button className="w-full mt-4" size="sm">Book Transport</Button>
                </CardContent>
              </Card>

              {/* Food Services */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-green-600" />
                    Food Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium">Traditional Meals</div>
                      <div className="text-sm text-slate-600">Authentic Tibetan cuisine</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="font-medium">Monastery Dining</div>
                      <div className="text-sm text-slate-600">Vegetarian monastery meals</div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="font-medium">Cooking Classes</div>
                      <div className="text-sm text-slate-600">Learn traditional recipes</div>
                    </div>
                  </div>
                  <Button className="w-full mt-4" size="sm">Explore Dining</Button>
                </CardContent>
              </Card>

              {/* Special Services */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mountain className="w-5 h-5 text-purple-600" />
                    Special Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-medium">Photography Tours</div>
                      <div className="text-sm text-slate-600">Professional photo guidance</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium">Spiritual Retreats</div>
                      <div className="text-sm text-slate-600">Meditation and wellness</div>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="font-medium">Cultural Workshops</div>
                      <div className="text-sm text-slate-600">Art, craft, and traditions</div>
                    </div>
                  </div>
                  <Button className="w-full mt-4" size="sm">Book Experience</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TourismServicesHub;