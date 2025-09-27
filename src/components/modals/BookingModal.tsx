import React from 'react';
import { Calendar, Users, Mail, Phone, User, Globe, MessageSquare, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useAppContext } from '@/context/AppContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type BookingStep = 'auth' | 'form' | 'confirmation';

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const { state, addBooking } = useAppContext();
  const [currentStep, setCurrentStep] = React.useState<BookingStep>('auth');
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);

  // Auth form state
  const [authData, setAuthData] = React.useState({
    email: '',
    password: '',
    isLogin: true
  });

  // Booking form state
  const [bookingData, setBookingData] = React.useState({
    name: '',
    email: '',
    phone: '',
    adults: '1',
    children: '0',
    date: '',
    timeSlot: '',
    language: '',
    specialRequests: ''
  });

  const timeSlots = [
    '09:00 AM - 11:00 AM',
    '11:30 AM - 01:30 PM',
    '02:00 PM - 04:00 PM',
    '04:30 PM - 06:30 PM'
  ];

  const languages = [
    'English',
    'Hindi',
    'Sikkimese',
    'Nepali',
    'Tibetan'
  ];

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in real app, this would validate credentials
    if (authData.email && authData.password) {
      setIsUserLoggedIn(true);
      setCurrentStep('form');
      // Pre-fill email if logging in
      if (authData.isLogin) {
        setBookingData(prev => ({ ...prev, email: authData.email }));
      }
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.selectedMonastery) return;

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'date', 'timeSlot', 'language'];
    const isValid = requiredFields.every(field => bookingData[field as keyof typeof bookingData]);

    if (isValid) {
      addBooking({
        monasteryId: state.selectedMonastery.id,
        ...bookingData,
        adults: parseInt(bookingData.adults),
        children: parseInt(bookingData.children)
      });
      setCurrentStep('confirmation');
    }
  };

  const handleClose = () => {
    onClose();
    // Reset state after closing
    setTimeout(() => {
      setCurrentStep('auth');
      setIsUserLoggedIn(false);
      setAuthData({ email: '', password: '', isLogin: true });
      setBookingData({
        name: '',
        email: '',
        phone: '',
        adults: '1',
        children: '0',
        date: '',
        timeSlot: '',
        language: '',
        specialRequests: ''
      });
    }, 300);
  };

  if (!state.selectedMonastery) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-accent" />
            Book Guided Tour - {state.selectedMonastery.name}
          </DialogTitle>
          <DialogDescription>
            Book your guided tour experience at this sacred monastery. Please log in and fill out the booking details.
          </DialogDescription>
        </DialogHeader>

        {/* Step 1: Authentication */}
        {currentStep === 'auth' && (
          <div className="space-y-6">
            <Card className="bg-accent-soft border-accent/20">
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground text-center">
                  Please log in or sign up to continue with your booking
                </p>
              </CardContent>
            </Card>

            <div className="flex gap-2 mb-4">
              <Button
                variant={authData.isLogin ? "default" : "outline"}
                size="sm"
                onClick={() => setAuthData(prev => ({ ...prev, isLogin: true }))}
                className="flex-1"
              >
                Login
              </Button>
              <Button
                variant={!authData.isLogin ? "default" : "outline"}
                size="sm"
                onClick={() => setAuthData(prev => ({ ...prev, isLogin: false }))}
                className="flex-1"
              >
                Sign Up
              </Button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={authData.email}
                  onChange={(e) => setAuthData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={authData.password}
                  onChange={(e) => setAuthData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-monastery hover:opacity-90">
                {authData.isLogin ? 'Login' : 'Sign Up'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </form>
          </div>
        )}

        {/* Step 2: Booking Form */}
        {currentStep === 'form' && (
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                <User className="h-4 w-4" />
                Contact Information
              </h3>
              
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={bookingData.name}
                    onChange={(e) => setBookingData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+91 12345 67890"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Group Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Group Details
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="adults">Adults</Label>
                  <Select value={bookingData.adults} onValueChange={(value) => setBookingData(prev => ({ ...prev, adults: value }))}>
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
                  <Label htmlFor="children">Children</Label>
                  <Select value={bookingData.children} onValueChange={(value) => setBookingData(prev => ({ ...prev, children: value }))}>
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

            {/* Visit Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Visit Details
              </h3>
              
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="date">Preferred Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData(prev => ({ ...prev, date: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeSlot">Time Slot *</Label>
                  <Select value={bookingData.timeSlot} onValueChange={(value) => setBookingData(prev => ({ ...prev, timeSlot: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(slot => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Guide Language *</Label>
                  <Select value={bookingData.language} onValueChange={(value) => setBookingData(prev => ({ ...prev, language: value }))}>
                    <SelectTrigger>
                      <Globe className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map(lang => (
                        <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-2">
              <Label htmlFor="requests">Special Requests</Label>
              <Textarea
                id="requests"
                value={bookingData.specialRequests}
                onChange={(e) => setBookingData(prev => ({ ...prev, specialRequests: e.target.value }))}
                placeholder="Any special requirements or questions..."
                className="min-h-[80px]"
              />
            </div>

            <Button type="submit" className="w-full bg-gradient-monastery hover:opacity-90">
              <Calendar className="h-4 w-4 mr-2" />
              Submit Booking Request
            </Button>
          </form>
        )}

        {/* Step 3: Confirmation */}
        {currentStep === 'confirmation' && (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-monastery-gold rounded-full flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-monastery-gold-foreground" />
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-card-foreground mb-2">
                Booking Request Submitted!
              </h3>
              <p className="text-muted-foreground">
                Your guided tour request for <strong>{state.selectedMonastery.name}</strong> has been submitted successfully.
              </p>
            </div>

            <Card className="bg-accent-soft text-left">
              <CardContent className="pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Date:</span>
                  <span className="text-sm font-medium">{new Date(bookingData.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Time:</span>
                  <span className="text-sm font-medium">{bookingData.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Group:</span>
                  <span className="text-sm font-medium">
                    {bookingData.adults} adults{bookingData.children !== '0' && `, ${bookingData.children} children`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Language:</span>
                  <span className="text-sm font-medium">{bookingData.language}</span>
                </div>
              </CardContent>
            </Card>

            <div className="text-sm text-muted-foreground">
              <p>We'll review your request and contact you within 24 hours to confirm availability and provide further details.</p>
            </div>

            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;