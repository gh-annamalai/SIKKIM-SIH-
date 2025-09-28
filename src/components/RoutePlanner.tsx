import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Route, 
  MapPin, 
  Clock, 
  DollarSign,
  Car,
  Bus,
  Plane,
  Train,
  Navigation,
  Fuel,
  Calendar,
  Users,
  Mountain,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Star,
  Compass,
  Map,
  Calculator,
  Info
} from 'lucide-react';

const RoutePlanner: React.FC = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('Rumtek Monastery');
  const [travelMode, setTravelMode] = useState('car');
  const [travelers, setTravelers] = useState(2);
  const [activeTab, setActiveTab] = useState('planner');

  const routeOptions = [
    {
      id: 1,
      name: 'Scenic Mountain Route',
      distance: '142 km',
      duration: '4h 30min',
      cost: '₹2,400',
      difficulty: 'Moderate',
      highlights: ['Mountain Views', 'Tea Gardens', 'Local Villages', 'Photo Stops'],
      route: ['Siliguri', 'Kalimpong', 'Gangtok', 'Rumtek Monastery'],
      transportMode: 'car',
      roadCondition: 'Good',
      bestTime: 'Morning (6 AM - 10 AM)',
      fuelCost: '₹1,200',
      tollCost: '₹150',
      parkingCost: '₹100',
      warnings: ['Mountain roads - drive carefully', 'Weather dependent'],
      stops: [
        { name: 'Kalimpong', duration: '30 min', type: 'Scenic Stop' },
        { name: 'Gangtok MG Road', duration: '45 min', type: 'Lunch Break' },
        { name: 'Rumtek Village', duration: '15 min', type: 'Local Market' }
      ]
    },
    {
      id: 2,
      name: 'Direct Highway Route',
      distance: '118 km',
      duration: '3h 15min',
      cost: '₹1,800',
      difficulty: 'Easy',
      highlights: ['Fastest Route', 'Highway Driving', 'Rest Stops', 'Good Roads'],
      route: ['Siliguri', 'Rangpo', 'Gangtok', 'Rumtek Monastery'],
      transportMode: 'car',
      roadCondition: 'Excellent',
      bestTime: 'Anytime',
      fuelCost: '₹900',
      tollCost: '₹200',
      parkingCost: '₹100',
      warnings: ['Heavy traffic during peak hours'],
      stops: [
        { name: 'Rangpo Check Post', duration: '20 min', type: 'Permit Check' },
        { name: 'Singtam', duration: '15 min', type: 'Refreshment' }
      ]
    },
    {
      id: 3,
      name: 'Cultural Heritage Route',
      distance: '165 km',
      duration: '5h 45min',
      cost: '₹3,200',
      difficulty: 'Challenging',
      highlights: ['Multiple Monasteries', 'Cultural Sites', 'Local Experiences', 'Photography'],
      route: ['Siliguri', 'Darjeeling', 'Pelling', 'Gangtok', 'Rumtek Monastery'],
      transportMode: 'car',
      roadCondition: 'Mixed',
      bestTime: 'Early Morning (5 AM start)',
      fuelCost: '₹1,500',
      tollCost: '₹100',
      parkingCost: '₹200',
      warnings: ['Long journey - plan overnight stay', 'Mountain weather conditions'],
      stops: [
        { name: 'Darjeeling Tiger Hill', duration: '1 hour', type: 'Sunrise View' },
        { name: 'Pemayangtse Monastery', duration: '1.5 hours', type: 'Cultural Visit' },
        { name: 'Gangtok Overnight', duration: '12 hours', type: 'Rest Stop' }
      ]
    }
  ];

  const transportOptions = [
    {
      mode: 'car',
      name: 'Private Car',
      icon: Car,
      costPerKm: '₹12-15',
      pros: ['Flexible timing', 'Comfortable', 'Scenic stops', 'Luggage space'],
      cons: ['Driving fatigue', 'Fuel costs', 'Parking challenges'],
      suitableFor: 'Families, Groups, Flexible travelers',
      bookingInfo: 'Self-drive or hire driver'
    },
    {
      mode: 'bus',
      name: 'Public Bus',
      icon: Bus,
      costPerKm: '₹3-5',
      pros: ['Economical', 'No driving stress', 'Local experience', 'Frequent services'],
      cons: ['Fixed schedule', 'Crowded', 'Limited luggage', 'Longer journey'],
      suitableFor: 'Budget travelers, Solo travelers',
      bookingInfo: 'Book at bus stations or online'
    },
    {
      mode: 'taxi',
      name: 'Shared Taxi',
      icon: Car,
      costPerKm: '₹8-10',
      pros: ['Faster than bus', 'Shared cost', 'Door pickup', 'Local insights'],
      cons: ['Shared space', 'Fixed route', 'Wait for passengers'],
      suitableFor: 'Budget-conscious groups, Social travelers',
      bookingInfo: 'Book from taxi stands'
    }
  ];

  const selectedRoute = routeOptions.find(route => route.transportMode === travelMode) || routeOptions[0];

  const calculateTotalCost = () => {
    const baseCost = parseInt(selectedRoute.cost.replace('₹', '').replace(',', ''));
    const additionalCost = (travelers - 1) * 500; // Additional cost per extra traveler
    return baseCost + additionalCost;
  };

  const getWeatherAlert = () => {
    const currentSeason = 'spring'; // This would be dynamic in real implementation
    const alerts = {
      spring: { message: 'Pleasant weather, ideal for travel', type: 'success' },
      summer: { message: 'Monsoon season - check road conditions', type: 'warning' },
      autumn: { message: 'Perfect travel weather', type: 'success' },
      winter: { message: 'Cold weather - carry warm clothes', type: 'info' }
    };
    return alerts[currentSeason] || alerts.spring;
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-monastery-gold mb-4 flex items-center justify-center gap-3">
            <Route className="w-10 h-10 text-green-600" />
            Smart Route Planner
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Plan your perfect journey to the monasteries with optimized routes, 
            cost estimation, travel time calculation, and personalized recommendations.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 max-w-2xl mx-auto bg-black/70 border border-monastery-gold/40 rounded-xl p-1">
            <TabsTrigger value="planner" className="text-monastery-gold font-semibold bg-black/40 rounded-xl data-[state=active]:bg-monastery-gold data-[state=active]:text-black transition-all">
              <Map className="w-4 h-4 mr-1" />
              Plan
            </TabsTrigger>
            <TabsTrigger value="routes" className="text-monastery-gold font-semibold bg-black/40 rounded-xl data-[state=active]:bg-monastery-gold data-[state=active]:text-black transition-all">
              <Route className="w-4 h-4 mr-1" />
              Routes
            </TabsTrigger>
            <TabsTrigger value="transport" className="text-monastery-gold font-semibold bg-black/40 rounded-xl data-[state=active]:bg-monastery-gold data-[state=active]:text-black transition-all">
              <Car className="w-4 h-4 mr-1" />
              Transport
            </TabsTrigger>
            <TabsTrigger value="costs" className="text-monastery-gold font-semibold bg-black/40 rounded-xl data-[state=active]:bg-monastery-gold data-[state=active]:text-black transition-all">
              <Calculator className="w-4 h-4 mr-1" />
              Costs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="planner">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Planning Form */}
              <div className="lg:col-span-1">
                <Card className="bg-black/60 border-transparent rounded-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-monastery-gold">
                      <Compass className="w-5 h-5 text-monastery-gold" />
                      Plan Your Journey
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Start Location */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-monastery-gold">From</label>
                      <Input className ="bg-black/60 border-monastery-gold text-white placeholder-gray-300 focus:ring-2 focus:ring-monastery-gold focus:border-monastery-gold rounded-md"
                        placeholder="Enter starting location"
                        value={startLocation}
                        onChange={(e) => setStartLocation(e.target.value)}
                      />
                    </div>

                    {/* End Location */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-monastery-gold">To</label>
                      <select 
                        value={endLocation}
                        onChange={(e) => setEndLocation(e.target.value)}
                        className="w-full px-3 py-2 bg-black/60 border border-monastery-gold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Rumtek Monastery">Rumtek Monastery</option>
                        <option value="Pemayangtse Monastery">Pemayangtse Monastery</option>
                        <option value="Tashiding Monastery">Tashiding Monastery</option>
                      </select>
                    </div>

                    {/* Transport Mode */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-monastery-gold">Transport Mode</label>
                      <select 
                        value={travelMode}
                        onChange={(e) => setTravelMode(e.target.value)}
                        className="w-full px-3 py-2 bg-black/60 border border-monastery-gold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="car">Private Car</option>
                        <option value="bus">Public Bus</option>
                        <option value="taxi">Shared Taxi</option>
                        <option value="flight">Helicopter</option>
                      </select>
                    </div>

                    {/* Number of Travelers */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-monastery-gold">Number of Travelers</label>
                      <Input className ="bg-black/60 border-monastery-gold text-white placeholder-white focus:ring-2 focus:ring-monastery-gold focus:border-monastery-gold rounded-md"
                        type="number"
                        min="1"
                        max="8"
                        value={travelers}
                        onChange={(e) => setTravelers(parseInt(e.target.value))}
                      />
                    </div>

                    {/* Travel Date */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-monastery-gold">Travel Date</label>
                      <Input type="date" className ="bg-black/60 border-monastery-gold text-white placeholder-white focus:ring-2 focus:ring-monastery-gold focus:border-monastery-gold rounded-md" />
                    </div>

                    <Button className="w-full bg-monastery-gold text-black font-semibold rounded-xl border border-monastery-gold hover:bg-monastery-gold hover:text-black hover:shadow-[0_0_8px_2px_rgba(255,221,51,0.5)] transition-all">
                      <Navigation className="w-4 h-4 mr-2" />
                      Find Best Route
                    </Button>
                  </CardContent>
                </Card>

                {/* Weather Alert */}
                <Card className="mt-4 bg-black/60 border-transparent rounded-xl">
                  <CardContent className="pt-4">
                    <div className={`flex items-center gap-2 p-3 rounded-lg  ${
                      getWeatherAlert().type === 'success' ? 'bg-green-50 text-green-800' :
                      getWeatherAlert().type === 'warning' ? 'bg-yellow-50 text-yellow-800' :
                      'bg-blue-50 text-blue-800'
                    }`}>
                      <Info className="w-4 h-4" />
                      <span className="text-sm">{getWeatherAlert().message}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Route Summary */}
              <div className="lg:col-span-2">
                <Card className ="bg-black/60 border-transparent rounded-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-monastery-gold">
                        <Route className="w-5 h-5 text-green-600" />
                        Recommended Route
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Route Overview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <Navigation className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                        <div className="text-sm text-slate-600">Distance</div>
                        <div className="font-semibold">{selectedRoute.distance}</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <Clock className="w-6 h-6 text-green-600 mx-auto mb-1" />
                        <div className="text-sm text-slate-600">Duration</div>
                        <div className="font-semibold">{selectedRoute.duration}</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <DollarSign className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                        <div className="text-sm text-slate-600">Est. Cost</div>
                        <div className="font-semibold">₹{calculateTotalCost().toLocaleString()}</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <Star className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                        <div className="text-sm text-slate-600">Best Time</div>
                        <div className="font-semibold text-xs">{selectedRoute.bestTime}</div>
                      </div>
                    </div>

                    {/* Route Path */}
                    <div>
                      <h3 className="font-semibold mb-3 text-monastery-gold">Route Path</h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        {selectedRoute.route.map((location, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
                              <MapPin className="w-4 h-4 text-slate-600" />
                              <span className="text-sm">{location}</span>
                            </div>
                            {index < selectedRoute.route.length - 1 && (
                              <ArrowRight className="w-4 h-4 text-slate-400" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h3 className="font-semibold mb-3 text-monastery-gold">Route Highlights</h3>
                      <div className="flex flex-wrap gap-2 bg-transparent border-white text-white">
                        {selectedRoute.highlights.map((highlight, index) => (
                          <Badge key={index} variant="outline" className="text-sm text-white">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Planned Stops */}
                    <div>
                      <h3 className="font-semibold mb-3 text-monastery-gold">Planned Stops</h3>
                      <div className="space-y-2">
                        {selectedRoute.stops.map((stop, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-blue-600" />
                              <span className="font-medium">{stop.name}</span>
                              <Badge variant="secondary" className="text-xs">{stop.type}</Badge>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-slate-600">
                              <Clock className="w-3 h-3" />
                              {stop.duration}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Warnings */}
                    {selectedRoute.warnings.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2 text-monastery-gold">
                          <AlertCircle className="w-4 h-4 text-orange-600" />
                          Important Notes
                        </h3>
                        <div className="space-y-2">
                          {selectedRoute.warnings.map((warning, index) => (
                            <div key={index} className="flex items-start gap-2 p-2 bg-orange-50 rounded">
                              <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5" />
                              <span className="text-sm text-orange-800">{warning}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="routes">
            <div className="space-y-6">
              {routeOptions.map((route) => (
                <Card key={route.id} className= "bg-black/60 border-transparent rounded-xl">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2 text-monastery-gold">
                          <Route className="w-5 h-5 text-green-600" />
                          {route.name}
                        </CardTitle>
                        <div className="flex items-center gap-4 mt-2 text-sm text-white">
                          <span className="flex items-center gap-1 text-white">
                            <Navigation className="w-4 h-4" />
                            {route.distance}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {route.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {route.cost}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2 text-monastery-gold">Highlights</h4>
                        <div className="flex flex-wrap gap-1">
                          {route.highlights.map((highlight, index) => (
                            <Badge key={index} variant="outline" className="text-xs text-white border-white">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 text-white">Road Condition</h4>
                        <div className="flex items-center gap-2">
                          <CheckCircle className={`w-4 h-4 ${
                            route.roadCondition === 'Excellent' ? 'text-green-600' :
                            route.roadCondition === 'Good' ? 'text-blue-600' : 'text-orange-600'
                          }`} />
                          <span className="text-sm text-white">{route.roadCondition}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="mt-4 bg-monastery-gold text-black font-semibold rounded-xl border border-monastery-gold hover:bg-monastery-gold hover:text-black hover:shadow-[0_0_8px_2px_rgba(255,221,51,0.5)] transition-all w-full"
                      size="sm"
                      onClick={() => setTravelMode(route.transportMode)}
                    >
                      Select This Route
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transport">
            <div className="grid md:grid-cols-2 gap-6">
              {transportOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <Card key={option.mode} className= "bg-black/60 border-transparent rounded-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-monastery-gold">
                        <IconComponent className="w-5 h-5 text-blue-600" />
                        {option.name}
                      </CardTitle>
                      <div className="text-sm text-white">
                        Cost: {option.costPerKm} per km
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2 text-monastery-gold">Advantages</h4>
                        <ul className="text-sm space-y-1">
                          {option.pros.map((pro, index) => (
                            <li key={index} className="flex items-start gap-2 text-white">
                              <CheckCircle className="w-3 h-3 text-green-600 mt-1" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 text-monastery-gold">Considerations</h4>
                        <ul className="text-sm space-y-1">
                          {option.cons.map((con, index) => (
                            <li key={index} className="flex items-start gap-2 text-white">
                              <AlertCircle className="w-3 h-3 text-orange-600 mt-1" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="text-sm text-white"><strong>Best for:</strong> {option.suitableFor}</div>
                        <div className="text-sm text-white mt-1">{option.bookingInfo}</div>
                      </div>
                      <Button 
                        className="w-full bg-monastery-gold text-black font-semibold rounded-xl border border-monastery-gold hover:bg-monastery-gold hover:text-black hover:shadow-[0_0_8px_2px_rgba(255,221,51,0.5)] transition-all" 
                        size="sm"
                        onClick={() => setTravelMode(option.mode)}
                      >
                        Choose {option.name}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="costs">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Cost Breakdown */}
              <Card className="bg-black/60 border-transparent rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-monastery-gold">
                    <Calculator className="w-5 h-5 text-green-600" />
                    Cost Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-white">
                      <span>Base Transportation Cost</span> 
                      <span className="font-semibold">{selectedRoute.cost}</span>
                    </div>
                    <div className="flex justify-between items-center text-white">
                      <span>Fuel Cost</span>
                      <span className="font-semibold">{selectedRoute.fuelCost}</span>
                    </div>
                    <div className="flex justify-between items-center text-white">
                      <span>Toll Charges</span>
                      <span className="font-semibold">{selectedRoute.tollCost}</span>
                    </div>
                    <div className="flex justify-between items-center text-white">
                      <span>Parking Fees</span>
                      <span className="font-semibold">{selectedRoute.parkingCost}</span>
                    </div>
                    {travelers > 1 && (
                      <div className="flex justify-between items-center text-white">
                        <span>Additional Travelers ({travelers - 1})</span>
                        <span className="font-semibold">₹{((travelers - 1) * 500).toLocaleString()}</span>
                      </div>
                    )}
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center text-lg font-bold text-monastery-gold">
                        <span>Total Estimated Cost</span>
                        <span className="text-green-600">₹{calculateTotalCost().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-2">Cost-Saving Tips</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Travel in groups to share costs</li>
                      <li>• Book accommodation in advance</li>
                      <li>• Choose shared transportation</li>
                      <li>• Visit during off-peak seasons</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Budget Comparison */}
              <Card className="bg-black/60 border-transparent rounded-xl">
                <CardHeader>
                  <CardTitle className='text-monastery-gold'>Transport Mode Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transportOptions.map((option) => {
                      const estimatedCost = option.mode === 'car' ? 2400 :
                                          option.mode === 'bus' ? 800 :
                                          option.mode === 'taxi' ? 1600 : 8000;
                      return (
                        <div key={option.mode} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <option.icon className="w-4 h-4 text-slate-600" />
                            <span className="font-medium">{option.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">₹{estimatedCost.toLocaleString()}</div>
                            <div className="text-xs text-slate-500">{option.costPerKm}/km</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium mb-2">Budget Planning</h4>
                    <div className="text-sm space-y-1">
                      <div>💰 Budget: ₹800 - ₹1,600</div>
                      <div>💳 Mid-range: ₹1,600 - ₹3,000</div>
                      <div>🏆 Premium: ₹3,000+</div>
                    </div>
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

export default RoutePlanner;