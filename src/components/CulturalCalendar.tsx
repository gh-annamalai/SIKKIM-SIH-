import { FC } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface Festival {
  id: string;
  name: string;
  date: string;
  description: string;
  type: 'festival' | 'ceremony' | 'cultural';
  location: string;
}

const festivals: Festival[] = [
  {
    id: '1',
    name: 'Losar Festival',
    date: '2026-02-10',
    description: 'Tibetan New Year celebration with traditional dances and ceremonies',
    type: 'festival',
    location: 'Various Monasteries'
  },
  {
    id: '2',
    name: 'Saga Dawa',
    date: '2026-05-23',
    description: 'Buddha Purnima celebration marking the birth, enlightenment, and death of Buddha',
    type: 'ceremony',
    location: 'Rumtek Monastery'
  },
  {
    id: '3',
    name: 'Pang Lhabsol',
    date: '2025-10-15',
    description: 'Traditional festival worshipping Mount Khangchendzonga',
    type: 'cultural',
    location: 'Pemayangtse Monastery'
  },
  {
    id: '4',
    name: 'Drukpa Tsheshi',
    date: '2025-12-25',
    description: 'Celebration of Buddha\'s first sermon',
    type: 'ceremony',
    location: 'Tashiding Monastery'
  }
];

const CulturalCalendar: FC = () => {
  const getEventTypeBadgeColor = (type: Festival['type']) => {
    switch (type) {
      case 'festival':
        return 'bg-pink-500/10 text-pink-500 border-pink-500/20';
      case 'ceremony':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'cultural':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const isUpcoming = (date: string) => {
    const eventDate = new Date(date);
    const now = new Date();
    return eventDate > now;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Sort festivals by date
  const sortedFestivals = [...festivals].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <Card className="bg-black/60 backdrop-blur-lg border-none shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-monastery-gold flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          Cultural Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedFestivals.map((festival) => (
            <div 
              key={festival.id}
              className="flex flex-col gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{festival.name}</h3>
                  <p className="text-sm text-gray-400">{festival.location}</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={`${getEventTypeBadgeColor(festival.type)} capitalize`}
                >
                  {festival.type}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Clock className="h-4 w-4" />
                <span>{formatDate(festival.date)}</span>
                {isUpcoming(festival.date) && (
                  <Badge variant="outline" className="bg-monastery-gold/10 text-monastery-gold border-monastery-gold/20 ml-2">
                    Upcoming
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-400">{festival.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CulturalCalendar;