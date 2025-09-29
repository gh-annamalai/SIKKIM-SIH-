import { FC, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Radio, Video, Users } from 'lucide-react';

interface LiveStream {
  id: string;
  title: string;
  description: string;
  monastery: string;
  viewerCount: number;
  thumbnailUrl: string;
  isLive: boolean;
}

const streams: LiveStream[] = [
  {
    id: '1',
    title: 'Morning Prayer Ceremony',
    description: 'Live streaming of the morning prayer ceremony from Rumtek Monastery',
    monastery: 'Rumtek Monastery',
    viewerCount: 245,
    thumbnailUrl: '/src/assets/rumtek-monastery.jpg',
    isLive: true
  },
  {
    id: '2',
    title: 'Evening Meditation Session',
    description: 'Join us for the evening meditation session at Pemayangtse Monastery',
    monastery: 'Pemayangtse Monastery',
    viewerCount: 189,
    thumbnailUrl: '/src/assets/pemayangtse-monastery.jpg',
    isLive: false
  }
];

const LiveStreaming: FC = () => {
  const [selectedStream, setSelectedStream] = useState<LiveStream | null>(null);

  return (
    <Card className="bg-black/60 backdrop-blur-lg border-none shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-monastery-gold flex items-center gap-2">
          <Radio className="h-6 w-6" />
          Live Streaming
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {streams.map((stream) => (
            <div 
              key={stream.id}
              className="relative rounded-lg overflow-hidden group cursor-pointer"
              onClick={() => setSelectedStream(stream)}
            >
              <div className="relative aspect-video">
                <img 
                  src={stream.thumbnailUrl} 
                  alt={stream.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Stream Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-monastery-gold transition-colors">
                        {stream.title}
                      </h3>
                      <p className="text-sm text-gray-300">{stream.monastery}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {stream.isLive ? (
                        <Badge className="bg-red-500/80 text-white border-none animate-pulse">
                          LIVE
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-500/20 text-gray-300 border-gray-500/30">
                          Upcoming
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1 text-sm text-gray-300">
                      <Users className="h-4 w-4" />
                      <span>{stream.viewerCount}</span>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-monastery-gold text-black hover:bg-monastery-gold/90"
                    >
                      <Video className="h-4 w-4 mr-1" />
                      Watch Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveStreaming;