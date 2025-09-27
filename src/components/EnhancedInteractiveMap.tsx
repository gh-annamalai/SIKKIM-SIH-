import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Star, 
  Camera, 
  Mountain, 
  Compass,
  Route,
  Info,
  Phone,
  Globe
} from 'lucide-react';

const GOOGLE_MAPS_API_KEY = 'AIzaSyD2raFFnpOWfEuiXkTDDMel9HgssH_QhAo'; // <-- Replace with your API key
const containerStyle = { width: '100%', height: '400px' };
const center = { lat: 27.3011, lng: 88.55 };

const EnhancedInteractiveMap: React.FC = () => {
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: GOOGLE_MAPS_API_KEY });
  const [selectedMonastery, setSelectedMonastery] = useState<string | null>('rumtek');
  const [activeView, setActiveView] = useState('map');
  const [showDirections, setShowDirections] = useState(false);
  // Enchey Monastery coordinates (Gangtok, Sikkim): 27.3456° N, 88.6131° E
  const ENCHEY_MONASTERY = { lat: 27.3456, lng: 88.6131 };
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [directionsLoading, setDirectionsLoading] = useState(false);

  const monasteries = [
    {
      id: 'rumtek',
      name: 'Rumtek Monastery',
      location: 'East Sikkim',
      coordinates: '27.3011° N, 88.5500° E',
      distance: '24 km from Gangtok',
      elevation: '1,550m',
      established: '1966',
      significance: 'Seat of the Karmapa',
      bestTime: 'March to May, October to December',
      visitDuration: '2-3 hours',
      rating: 4.8,
      highlights: ['Golden Stupa', 'Prayer Wheels', 'Monastery Museum', 'Scenic Views'],
      nearbyAttractions: ['Lingdum Monastery', 'Ranka Monastery', 'Kyongnosla Alpine Sanctuary'],
      travelTips: [
        'Photography permitted in courtyard only',
        'Dress modestly and remove shoes before entering',
        'Carry warm clothing due to altitude'
      ],
      transportation: {
        byTaxi: '45 minutes from Gangtok',
        byBus: 'Regular buses available from Gangtok',
        parking: 'Available near monastery entrance'
      },
      facilities: ['Parking', 'Restroom', 'Cafeteria', 'Gift Shop', 'Guided Tours'],
      contact: {
        phone: '+91-3592-251234',
        website: 'www.rumtek.org',
        email: 'info@rumtek.org'
      }
    },
    {
      id: 'pemayangtse',
      name: 'Pemayangtse Monastery',
      location: 'West Sikkim',
      coordinates: '27.2167° N, 88.2500° E',
      distance: '110 km from Gangtok',
      elevation: '2,085m',
      established: '1705',
      significance: 'Oldest monastery in Sikkim',
      bestTime: 'October to March',
      visitDuration: '1-2 hours',
      rating: 4.7,
      highlights: ['Wooden Sculptures', 'Ancient Murals', '7-tier Model', 'Panoramic Views'],
      nearbyAttractions: ['Rabdentse Ruins', 'Khecheopalri Lake', 'Yuksom'],
      travelTips: [
        'Early morning visits recommended',
        'Carry oxygen spray due to high altitude',
        'Photography charges may apply'
      ],
      transportation: {
        byTaxi: '3 hours from Gangtok',
        byBus: 'Shared jeeps available from Pelling',
        parking: 'Limited parking available'
      },
      facilities: ['Basic Parking', 'Restroom', 'Local Guide', 'Small Shop'],
      contact: {
        phone: '+91-3595-250567',
        website: 'www.pemayangtse.org',
        email: 'contact@pemayangtse.org'
      }
    },
    {
      id: 'tashiding',
      name: 'Tashiding Monastery',
      location: 'West Sikkim',
      coordinates: '27.2833° N, 88.2667° E',
      distance: '118 km from Gangtok',
      elevation: '1,465m',
      established: '1717',
      significance: 'Sacred heart of Sikkim',
      bestTime: 'October to April',
      visitDuration: '1.5-2 hours',
      rating: 4.6,
      highlights: ['Sacred Stupa', 'River Confluence', 'Annual Festival', 'Spiritual Atmosphere'],
      nearbyAttractions: ['Yuksom', 'Dubdi Monastery', 'Norbugang Park'],
      travelTips: [
        'Visit during Bumchu festival for unique experience',
        'Steep climb to reach monastery',
        'Respect local customs and traditions'
      ],
      transportation: {
        byTaxi: '3.5 hours from Gangtok',
        byBus: 'Local transport from Yuksom',
        parking: 'Basic parking at base'
      },
      facilities: ['Parking', 'Basic Restroom', 'Local Guides', 'Prayer Flags'],
      contact: {
        phone: '+91-3595-241890',
        website: 'www.tashiding.org',
        email: 'info@tashiding.org'
      }
    }
  ];

  const selectedPlace = monasteries.find(m => m.id === selectedMonastery);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-3">
            <MapPin className="w-10 h-10 text-blue-600" />
            Enhanced Interactive Map
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Discover sacred monasteries with detailed location information, travel guidance, 
            and comprehensive visitor resources for your spiritual journey.
          </p>
        </div>

        <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 max-w-lg mx-auto">
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="routes">Routes</TabsTrigger>
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
          </TabsList>

          <TabsContent value="map">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Real Map Visualization */}
              <div className="lg:col-span-2">
                <Card className="h-[500px]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Compass className="w-5 h-5 text-blue-600" />
                      Rumtek Monastery Location Map
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 rounded-lg relative">
                    <div className="w-full h-full">
                      {/* Google Map Implementation */}
                      {!isLoaded ? (
                        <div>Loading Map...</div>
                      ) : (
                        <GoogleMap
                          mapContainerStyle={containerStyle}
                          center={userLocation && showDirections ? userLocation : center}
                          zoom={14}
                          mapTypeId={window.google && window.google.maps ? window.google.maps.MapTypeId.ROADMAP : 'roadmap'}
                        >
                          {!showDirections && <Marker position={center} />}
                          {showDirections && userLocation && (
                            <>
                              <Marker position={userLocation} />
                              {!directions && directionsLoading && (
                                <div className="absolute top-2 left-2 bg-white p-2 rounded shadow">Loading directions...</div>
                              )}
                              <DirectionsService
                                options={{
                                  origin: userLocation,
                                  destination: center,
                                  travelMode: google.maps.TravelMode.DRIVING,
                                }}
                                callback={result => {
                                  setDirectionsLoading(false);
                                  if (result && result.status === 'OK') {
                                    setDirections(result);
                                  } else {
                                    alert('Could not find a route!');
                                    setShowDirections(false);
                                  }
                                }}
                              />
                              {directions && <DirectionsRenderer directions={directions} />}
                            </>
                          )}
                        </GoogleMap>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Monastery Details */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{selectedPlace?.name}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-normal">{selectedPlace?.rating}</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Basic Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span>{selectedPlace?.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mountain className="w-4 h-4 text-green-600" />
                        <span>Elevation: {selectedPlace?.elevation}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Navigation className="w-4 h-4 text-purple-600" />
                        <span>{selectedPlace?.distance}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-orange-600" />
                        <span>Visit Duration: {selectedPlace?.visitDuration}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Camera className="w-4 h-4" />
                        Highlights
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedPlace?.highlights.map((highlight, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        Contact Information
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          <span>{selectedPlace?.contact.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-3 h-3" />
                          <span className="text-blue-600">{selectedPlace?.contact.website}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2 pt-4 border-t">
                      {!showDirections ? (
                        <Button
                          className="w-full"
                          size="sm"
                          onClick={() => {
                            setDirections(null);
                            setDirectionsLoading(true);
                            setUserLocation(ENCHEY_MONASTERY);
                            setShowDirections(true);
                          }}
                        >
                          <Route className="w-4 h-4 mr-2" />
                          Get Directions from Enchey Monastery
                        </Button>
                      ) : (
                        <Button
                          className="w-full"
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setShowDirections(false);
                            setDirections(null);
                          }}
                        >
                          Cancel Directions
                        </Button>
                      )}
                      <Button variant="outline" className="w-full" size="sm">
                        <Camera className="w-4 h-4 mr-2" />
                        Virtual Tour
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="routes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Route className="w-5 h-5 text-green-600" />
                  Travel Routes & Transportation
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedPlace && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Transportation Options */}
                      <div>
                        <h3 className="font-semibold mb-3">Transportation Options</h3>
                        <div className="space-y-3">
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <div className="font-medium text-blue-900">By Taxi</div>
                            <div className="text-sm text-blue-700">{selectedPlace.transportation.byTaxi}</div>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg">
                            <div className="font-medium text-green-900">By Bus</div>
                            <div className="text-sm text-green-700">{selectedPlace.transportation.byBus}</div>
                          </div>
                          <div className="p-3 bg-purple-50 rounded-lg">
                            <div className="font-medium text-purple-900">Parking</div>
                            <div className="text-sm text-purple-700">{selectedPlace.transportation.parking}</div>
                          </div>
                        </div>
                      </div>

                      {/* Travel Tips */}
                      <div>
                        <h3 className="font-semibold mb-3">Travel Tips</h3>
                        <div className="space-y-2">
                          {selectedPlace.travelTips.map((tip, index) => (
                            <div key={index} className="flex items-start gap-2 p-2 bg-amber-50 rounded">
                              <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-amber-800">{tip}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Facilities */}
                    <div>
                      <h3 className="font-semibold mb-3">Available Facilities</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPlace.facilities.map((facility, index) => (
                          <Badge key={index} className="bg-slate-100 text-slate-700">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nearby">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-purple-600" />
                  Nearby Attractions & Places
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedPlace && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">Near {selectedPlace.name}</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedPlace.nearbyAttractions.map((attraction, index) => (
                        <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">{attraction}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Navigation className="w-3 h-3" />
                            <span>Click to explore route</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Best Visit Time */}
                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-900">Best Time to Visit</span>
                      </div>
                      <p className="text-green-800">{selectedPlace.bestTime}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedInteractiveMap;