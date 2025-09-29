import { FC, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from './ui/badge';

interface CalendarEvent {
  date: Date;
  title: string;
  type: 'festival' | 'ceremony' | 'cultural';
}

const events: CalendarEvent[] = [
  {
    date: new Date(2025, 9, 15), // October 15, 2025
    title: 'Pang Lhabsol',
    type: 'cultural'
  },
  {
    date: new Date(2025, 11, 25), // December 25, 2025
    title: 'Drukpa Tsheshi',
    type: 'ceremony'
  },
  {
    date: new Date(2026, 1, 10), // February 10, 2026
    title: 'Losar Festival',
    type: 'festival'
  },
  {
    date: new Date(2026, 4, 23), // May 23, 2026
    title: 'Saga Dawa',
    type: 'ceremony'
  }
];

const CalendarView: FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Function to check if a date has events
  const hasEvent = (date: Date) => {
    return events.some(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  // Function to get events for a selected date
  const getEventsForDate = (date: Date) => {
    return events.filter(event =>
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  // Get event type color
  const getEventTypeColor = (type: CalendarEvent['type']) => {
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

  return (
    <Card className="bg-black/60 backdrop-blur-lg border-none shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-monastery-gold flex items-center gap-2">
          <CalendarIcon className="h-6 w-6" />
          Event Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border border-monastery-gold/20 bg-black/40"
            modifiers={{
              event: (date) => hasEvent(date)
            }}
            modifiersStyles={{
              event: {
                fontWeight: 'bold',
                color: 'var(--monastery-gold)',
                textDecoration: 'underline'
              }
            }}
          />

          {/* Selected Date Events */}
          {selectedDate && getEventsForDate(selectedDate).length > 0 && (
            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-semibold text-white">
                Events on {selectedDate.toLocaleDateString('en-US', { 
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </h3>
              <div className="space-y-2">
                {getEventsForDate(selectedDate).map((event, index) => (
                  <div 
                    key={index}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white">{event.title}</span>
                      <Badge 
                        variant="outline" 
                        className={`${getEventTypeColor(event.type)} capitalize`}
                      >
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarView;