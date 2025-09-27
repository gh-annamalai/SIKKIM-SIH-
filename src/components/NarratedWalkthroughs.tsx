import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, 
  Globe, MapPin, Clock, Users, BookOpen, Mic 
} from 'lucide-react';

interface WalkthroughStep {
  id: string;
  title: string;
  description: string;
  audioFile: string;
  duration: number;
  location: string;
  image: string;
  narrator: string;
  culturalContext: string[];
  interactionPoints: string[];
}

interface NarratedWalkthrough {
  id: string;
  title: string;
  monastery: string;
  description: string;
  totalDuration: number;
  languages: { code: string; name: string; narrator: string }[];
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  steps: WalkthroughStep[];
  coverImage: string;
  expertNarrator: {
    name: string;
    credentials: string;
    bio: string;
    photo: string;
  };
}

const NarratedWalkthroughs: React.FC = () => {
  const [selectedWalkthrough, setSelectedWalkthrough] = useState<NarratedWalkthrough | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const walkthroughs: NarratedWalkthrough[] = [
    {
      id: 'rumtek-heritage',
      title: 'Sacred Heritage of Rumtek',
      monastery: 'Rumtek Monastery',
      description: 'Expert-guided exploration of Sikkim\'s most significant Buddhist monastery',
      totalDuration: 45,
      languages: [
        { code: 'en', name: 'English', narrator: 'Dr. Sarah Chen' },
        { code: 'hi', name: 'Hindi', narrator: 'पंडित राज कुमार' },
        { code: 'fr', name: 'French', narrator: 'Prof. Marie Dubois' },
        { code: 'sp', name: 'Spanish', narrator: 'Dr. Carlos Mendez' }
      ],
      difficulty: 'Moderate',
      coverImage: '/src/assets/rumtek-monastery.jpg',
      expertNarrator: {
        name: 'Dr. Sarah Chen',
        credentials: 'PhD in Buddhist Studies, Harvard University',
        bio: 'Leading expert on Himalayan Buddhism with 20+ years of research experience',
        photo: '/src/assets/narrator-placeholder.jpg'
      },
      steps: [
        {
          id: 'entrance',
          title: 'Monastery Entrance & History',
          description: 'Understanding the significance of Rumtek\'s establishment',
          audioFile: '/src/assets/rumtek-audio-en.mp3',
          duration: 8,
          location: 'Main Entrance Gate',
          image: '/src/assets/rumtek-monastery.jpg',
          narrator: 'Dr. Sarah Chen',
          culturalContext: ['16th Karmapa legacy', 'Tibetan exile history', 'Architectural significance'],
          interactionPoints: ['Prayer wheels', 'Gate inscriptions', 'Guardian statues']
        },
        {
          id: 'main-hall',
          title: 'Golden Stupa & Prayer Hall',
          description: 'Sacred relics and meditation practices',
          audioFile: '/src/assets/rumtek-audio-en.mp3',
          duration: 12,
          location: 'Main Prayer Hall',
          image: '/src/assets/rumtek-monastery.jpg',
          narrator: 'Dr. Sarah Chen',
          culturalContext: ['Stupa symbolism', 'Daily prayers', 'Monastic life'],
          interactionPoints: ['Golden Stupa', 'Prayer cushions', 'Ritual instruments']
        },
        {
          id: 'artifacts',
          title: 'Sacred Artifacts & Treasures',
          description: 'Ancient manuscripts and religious objects',
          audioFile: '/src/assets/rumtek-audio-en.mp3',
          duration: 10,
          location: 'Artifact Hall',
          image: '/src/assets/ritual-artifacts.jpg',
          narrator: 'Dr. Sarah Chen',
          culturalContext: ['Historical preservation', 'Ritual significance', 'Cultural heritage'],
          interactionPoints: ['Ancient texts', 'Ritual vessels', 'Ceremonial items']
        }
      ]
    },
    {
      id: 'pemayangtse-journey',
      title: 'Pemayangtse Spiritual Journey',
      monastery: 'Pemayangtse Monastery',
      description: 'Immersive walk through Sikkim\'s second oldest monastery',
      totalDuration: 35,
      languages: [
        { code: 'en', name: 'English', narrator: 'Lama Tenzin' },
        { code: 'hi', name: 'Hindi', narrator: 'लामा तेनज़िन' },
        { code: 'ne', name: 'Nepali', narrator: 'लामा तेनज़िन' }
      ],
      difficulty: 'Easy',
      coverImage: '/src/assets/pemayangtse-monastery.jpg',
      expertNarrator: {
        name: 'Lama Tenzin',
        credentials: 'Senior Monk, 30 years at Pemayangtse',
        bio: 'Authentic voice of monastic tradition and local cultural practices',
        photo: '/src/assets/narrator-placeholder.jpg'
      },
      steps: [
        {
          id: 'history',
          title: 'Foundation & Legends',
          description: 'The birth of Pemayangtse Monastery',
          audioFile: '/src/assets/rumtek-audio-hi.mp3',
          duration: 15,
          location: 'Monastery Grounds',
          image: '/src/assets/pemayangtse-monastery.jpg',
          narrator: 'Lama Tenzin',
          culturalContext: ['17th century origins', 'Nyingma tradition', 'Royal patronage'],
          interactionPoints: ['Foundation stone', 'Ancient trees', 'Mountain views']
        }
      ]
    }
  ];

  const currentStepData = selectedWalkthrough?.steps[currentStep];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNextStep = () => {
    if (selectedWalkthrough && currentStep < selectedWalkthrough.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Expert Narrated Walkthroughs
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Journey through sacred spaces with expert guides sharing deep cultural insights 
            and authentic stories in multiple languages
          </p>
        </div>

        <Tabs defaultValue="walkthroughs" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="walkthroughs">Available Walkthroughs</TabsTrigger>
            <TabsTrigger value="experience">Current Walkthrough</TabsTrigger>
          </TabsList>

          <TabsContent value="walkthroughs" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {walkthroughs.map((walkthrough) => (
                <Card key={walkthrough.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <img
                      src={walkthrough.coverImage}
                      alt={walkthrough.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className={getDifficultyColor(walkthrough.difficulty)}>
                        {walkthrough.difficulty}
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800">
                        <Clock className="w-3 h-3 mr-1" />
                        {walkthrough.totalDuration} min
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl">{walkthrough.title}</CardTitle>
                    <p className="text-slate-600">{walkthrough.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Expert Narrator */}
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                        <Mic className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{walkthrough.expertNarrator.name}</p>
                        <p className="text-xs text-slate-600">{walkthrough.expertNarrator.credentials}</p>
                      </div>
                    </div>

                    {/* Languages */}
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-2">Available Languages:</p>
                      <div className="flex flex-wrap gap-1">
                        {walkthrough.languages.map((lang) => (
                          <Badge key={lang.code} variant="outline" className="text-xs">
                            <Globe className="w-3 h-3 mr-1" />
                            {lang.name}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Steps Preview */}
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-2">
                        Walkthrough Steps ({walkthrough.steps.length}):
                      </p>
                      <div className="space-y-1">
                        {walkthrough.steps.slice(0, 3).map((step, index) => (
                          <div key={step.id} className="flex items-center gap-2 text-sm">
                            <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-medium">
                              {index + 1}
                            </div>
                            <span className="text-slate-600">{step.title}</span>
                            <span className="text-xs text-slate-500">({step.duration}min)</span>
                          </div>
                        ))}
                        {walkthrough.steps.length > 3 && (
                          <p className="text-xs text-slate-500 ml-7">
                            +{walkthrough.steps.length - 3} more steps
                          </p>
                        )}
                      </div>
                    </div>

                    <Button 
                      onClick={() => {
                        setSelectedWalkthrough(walkthrough);
                        setCurrentStep(0);
                        setCurrentTime(0);
                        setIsPlaying(false);
                      }}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Walkthrough
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="experience">
            {selectedWalkthrough && currentStepData ? (
              <div className="max-w-6xl mx-auto">
                {/* Progress Header */}
                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">{selectedWalkthrough.title}</CardTitle>
                        <p className="text-slate-600 mt-2">{selectedWalkthrough.monastery}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-500">Step {currentStep + 1} of {selectedWalkthrough.steps.length}</p>
                        <p className="text-lg font-medium">{currentStepData.title}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Progress 
                      value={((currentStep + 1) / selectedWalkthrough.steps.length) * 100} 
                      className="w-full"
                    />
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Media Display */}
                    <Card>
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={currentStepData.image}
                            alt={currentStepData.title}
                            className="w-full h-96 object-cover rounded-t-lg"
                          />
                          <div className="absolute bottom-4 left-4 right-4 bg-black/70 rounded-lg p-4">
                            <h3 className="text-white font-medium mb-2">{currentStepData.title}</h3>
                            <p className="text-white/90 text-sm">{currentStepData.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Audio Controls */}
                    <Card>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <Mic className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <p className="font-medium">{currentStepData.narrator}</p>
                                <p className="text-sm text-slate-600">
                                  <MapPin className="w-3 h-3 inline mr-1" />
                                  {currentStepData.location}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-slate-500">Duration</p>
                              <p className="font-medium">{formatTime(currentStepData.duration * 60)}</p>
                            </div>
                          </div>

                          {/* Audio Player */}
                          <div className="bg-slate-50 rounded-lg p-4">
                            <audio
                              ref={audioRef}
                              src={currentStepData.audioFile}
                              onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
                              onEnded={() => setIsPlaying(false)}
                            />
                            
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm text-slate-500">
                                {formatTime(currentTime)}
                              </span>
                              <span className="text-sm text-slate-500">
                                {formatTime(currentStepData.duration * 60)}
                              </span>
                            </div>
                            
                            <Progress 
                              value={(currentTime / (currentStepData.duration * 60)) * 100}
                              className="mb-4"
                            />
                            
                            <div className="flex items-center justify-center gap-4">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handlePrevStep}
                                disabled={currentStep === 0}
                              >
                                <SkipBack className="w-4 h-4" />
                              </Button>
                              
                              <Button
                                size="lg"
                                onClick={handlePlayPause}
                                className="bg-gradient-to-r from-blue-500 to-purple-600"
                              >
                                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                              </Button>
                              
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleNextStep}
                                disabled={currentStep === selectedWalkthrough.steps.length - 1}
                              >
                                <SkipForward className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Cultural Context */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Cultural Context</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {currentStepData.culturalContext.map((context, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <BookOpen className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-slate-600">{context}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Interaction Points */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Points of Interest</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {currentStepData.interactionPoints.map((point, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-slate-600">{point}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Language Selection */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Language & Narrator</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedWalkthrough.languages.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => setSelectedLanguage(lang.code)}
                              className={`w-full p-3 rounded-lg border text-left transition-all ${
                                selectedLanguage === lang.code
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <Globe className="w-4 h-4" />
                                <span className="font-medium">{lang.name}</span>
                              </div>
                              <p className="text-xs text-slate-600">{lang.narrator}</p>
                            </button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Mic className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-xl font-medium text-slate-700 mb-2">Select a Walkthrough</h3>
                <p className="text-slate-500">Choose from our expert-guided experiences to begin your journey</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NarratedWalkthroughs;