import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VirtualTours from './VirtualTours';
import NarratedWalkthroughs from './NarratedWalkthroughs';
import SmartAudioGuides from './SmartAudioGuides';
import { 
  RotateCcw, Play, Headphones, Zap, Globe, Users, 
  Star, ArrowRight, Brain, Mic, Camera
} from 'lucide-react';

interface ExperienceCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  component: React.ComponentType;
  stats: {
    experiences: number;
    languages: number;
    avgDuration: string;
    rating: number;
  };
}

const ExperiencesHub: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<string>('overview');

  const experiences: ExperienceCategory[] = [
    {
      id: 'virtual-tours',
      title: '360° Virtual Tours',
      description: 'Immersive virtual reality experiences of sacred monastery spaces',
      icon: <RotateCcw className="w-8 h-8" />,
      color: 'from-purple-500 to-blue-600',
      features: [
        'Full 360° immersive experience',
        'Interactive hotspots',
        'Zoom and pan controls',
        'Multi-angle perspectives',
        'Sacred space exploration'
      ],
      component: VirtualTours,
      stats: {
        experiences: 6,
        languages: 6,
        avgDuration: '15 min',
        rating: 4.8
      }
    },
    {
      id: 'narrated-walkthroughs',
      title: 'Expert Narrated Walkthroughs',
      description: 'Guided tours by cultural experts and monastery monks',
      icon: <Play className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-600',
      features: [
        'Expert cultural guides',
        'Step-by-step exploration',
        'Cultural context insights',
        'Interactive storytelling',
        'Multi-language support'
      ],
      component: NarratedWalkthroughs,
      stats: {
        experiences: 8,
        languages: 4,
        avgDuration: '25 min',
        rating: 4.9
      }
    },
    {
      id: 'smart-audio',
      title: 'AI Smart Audio Guides',
      description: 'Intelligent, adaptive audio guidance with contextual insights',
      icon: <Headphones className="w-8 h-8" />,
      color: 'from-green-500 to-teal-600',
      features: [
        'AI-powered personalization',
        'Context-aware content',
        'Adaptive difficulty levels',
        'Real-time recommendations',
        'Interactive Q&A system'
      ],
      component: SmartAudioGuides,
      stats: {
        experiences: 12,
        languages: 5,
        avgDuration: '12 min',
        rating: 4.7
      }
    }
  ];

  const getSelectedExperienceData = () => {
    return experiences.find(exp => exp.id === selectedExperience);
  };

  const renderSelectedComponent = () => {
    const selectedData = getSelectedExperienceData();
    if (selectedData) {
      const Component = selectedData.component;
      return <Component />;
    }
    return null;
  };

  if (selectedExperience !== 'overview') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
        {/* Navigation Header - dark glassy style */}
        <div className="bg-black/70 border-b border-monastery-gold/20 sticky top-0 z-10 backdrop-blur-lg shadow-lg rounded-b-2xl">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedExperience('overview')}
                  className="flex items-center gap-2 text-monastery-gold hover:text-yellow-400"
                >
                  ← Back to Experiences
                </Button>
                <div className="h-6 w-px bg-monastery-gold/30" />
                <div className="flex items-center gap-2">
                  {getSelectedExperienceData()?.icon}
                  <h1 className="text-xl font-bold text-monastery-gold drop-shadow">{getSelectedExperienceData()?.title}</h1>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        {/* Selected Experience Component */}
        {renderSelectedComponent()}
      </div>
    );
  }

  return (
  <div className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-monastery-gold mb-6">
            Immersive Cultural Experiences
          </h1>
          <p className="text-xl text-white max-w-4xl mx-auto mb-8">
            Step into the sacred world of Himalayan monasteries through cutting-edge technology 
            and authentic cultural storytelling. Choose your preferred way to explore these timeless treasures.
          </p> 
        </div>

        {/* Experience Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {experiences.map((experience) => (
            <Card
              key={experience.id}
              className="monastery-card flex flex-col h-full overflow-hidden group bg-black/60 backdrop-blur-lg border-none shadow-2xl rounded-2xl transition-all duration-700 hover:scale-[1.025] cursor-pointer"
              onClick={() => setSelectedExperience(experience.id)}
            >
              <div className="relative overflow-hidden">
                {/* Icon and badge row */}
                <div className="flex items-center justify-between px-6 pt-6">
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${experience.color} text-white shadow-lg`}>
                    {experience.icon}
                  </div>
                </div>
              </div>
              <CardHeader className="pb-3">
                <h3 className="text-xl font-bold text-monastery-gold mb-2 drop-shadow">
                  {experience.title}
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  {experience.description}
                </p>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white border-white/20">
                      {experience.stats.experiences} Experiences
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white border-white/20">
                      {experience.stats.languages} Languages
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white border-white/20">
                      {experience.stats.avgDuration} Avg Duration
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {experience.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-white/10 text-white border-white/20">
                        {feature}
                      </Badge>
                    ))}
                    {experience.features.length > 3 && (
                      <span className="text-xs text-gray-400 ml-2">+{experience.features.length - 3} more features</span>
                    )}
                  </div>
                </div>
                <div className="flex items-end w-full">
                  <Button
                    className="mt-6 w-full bg-monastery-gold/80 text-monastery-gold-foreground font-semibold rounded-full shadow-lg hover:bg-monastery-gold focus:ring-2 focus:ring-monastery-gold/60 focus:outline-none transition-all duration-200"
                    size="lg"
                    onClick={() => setSelectedExperience(experience.id)}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Explore Now
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technology Showcase */}
        <Card className="mb-16 overflow-hidden monastery-card bg-black/60 backdrop-blur-lg border-none shadow-2xl rounded-2xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl mb-4 text-monastery-gold">Powered by Innovation</CardTitle>
            <p className="text-white max-w-2xl mx-auto">
              Our experiences combine cutting-edge technology with authentic cultural knowledge 
              to create unprecedented access to Himalayan heritage
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Camera className="w-8 h-8 text-purple-400" />
                </div>
                <h4 className="font-semibold text-lg mb-2 text-monastery-gold">360° Technology</h4>
                <p className="text-white text-sm">
                  State-of-the-art virtual reality captures every detail of sacred spaces
                </p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mic className="w-8 h-8 text-blue-400" />
                </div>
                <h4 className="font-semibold text-lg mb-2 text-monastery-gold">Expert Narration</h4>
                <p className="text-white text-sm">
                  Authentic voices of monks, scholars, and cultural experts bring timeless wisdom and lived traditions to life.
                </p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Brain className="w-8 h-8 text-green-400" />
                </div>
                <h4 className="font-semibold text-lg mb-2 text-monastery-gold">AI Intelligence</h4>
                <p className="text-white text-sm">
                  Smart algorithms adapt content to your interests and knowledge level
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto monastery-card bg-black/60 backdrop-blur-lg border-none shadow-2xl rounded-2xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-monastery-gold mb-4">
                Begin Your Spiritual Journey
              </h3>
              <p className="text-white mb-6">
                Choose your preferred experience type above and start exploring the sacred 
                monasteries of Sikkim with unprecedented depth and authenticity.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button
                  onClick={() => setSelectedExperience('virtual-tours')}
                  className="w-full bg-monastery-gold text-black font-semibold rounded-full shadow-lg hover:bg-yellow-400 focus:ring-2 focus:ring-yellow-300 focus:outline-none transition-all duration-200 border-2 border-monastery-gold"
                >
                  Start with 360° Tours
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedExperience('narrated-walkthroughs')}
                  className="w-full bg-transparent border-2 border-monastery-gold text-monastery-gold font-semibold rounded-full shadow-lg hover:bg-monastery-gold/10 focus:ring-2 focus:ring-yellow-300 focus:outline-none transition-all duration-200"
                >
                  Try Guided Tours
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExperiencesHub;