import React, { createContext, useContext, useState } from 'react';

interface AppState {
  currentView: 'landing' | 'community' | 'archive' | 'admin-login' | 'admin-dashboard' | 'experiences' | 'tourism' | 'bookings' | 'about-sikkim' | 'foods' | 'dance';
  isAdminLoggedIn: boolean;
  searchQuery: string;
  selectedMonastery: Monastery | null;
  bookings: Booking[];
  events: Event[];
  isWalkthroughActive: boolean;
  walkthroughLanguage: string | null;
}

interface Monastery {
  id: string;
  name: string;
  description: string;
  location: string;
  image: string;
  features: string[];
  coordinates: [number, number];
}

interface Booking {
  id: string;
  monasteryId: string;
  name: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  date: string;
  timeSlot: string;
  language: string;
  specialRequests: string;
  status: 'pending' | 'approved' | 'declined';
}

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  type: 'festival' | 'ceremony' | 'tour';
}

interface AppContextType {
  state: AppState;
  setCurrentView: (view: AppState['currentView']) => void;
  setAdminLoggedIn: (status: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedMonastery: (monastery: Monastery | null) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'status'>) => void;
  updateBookingStatus: (id: string, status: 'approved' | 'declined') => void;
  adminLogin: (email: string, password: string) => boolean;
  adminLogout: () => void;

  // new methods
  startWalkthrough: (language: string) => void;
  stopWalkthrough: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const MOCK_MONASTERIES: Monastery[] = [
  {
    id: '1',
    name: 'Rumtek Monastery',
    description:
      'One of the largest monasteries in Sikkim, known for its stunning architecture and spiritual significance.',
    location: 'Gangtok',
    image: '/src/assets/rumtek-monastery.jpg',
    features: ['360° Virtual Tour', 'Audio Guide', 'Historical Artifacts', 'Narrated Walkthrough'],
    coordinates: [27.3314, 88.5605],
  },
  {
    id: '2',
    name: 'Pemayangtse Monastery',
    description: 'A significant monastery of the Nyingma school, offering breathtaking views of the Himalayas.',
    location: 'Pelling',
    image: '/src/assets/pemayangtse-monastery.jpg',
    features: ['Mountain Views', 'Ancient Scriptures', 'Meditation Hall'],
    coordinates: [27.2982, 88.2129],
  },
  {
    id: '3',
    name: 'Tashiding Monastery',
    description: 'Perched on a hilltop, this monastery is considered one of the most sacred in Sikkim.',
    location: 'Tashiding',
    image: '/src/assets/tashiding-monastery.jpg',
    features: ['Sacred Site', 'Festival Celebrations', 'Pilgrimage Route'],
    coordinates: [27.3433, 88.2756],
  },
];

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Losar Festival',
    date: '2024-02-10',
    description: 'Tibetan New Year celebration with traditional dances and ceremonies.',
    type: 'festival',
  },
  {
    id: '2',
    title: 'Saga Dawa',
    date: '2024-05-23',
    description: 'Buddha Purnima celebration marking the birth, enlightenment, and death of Buddha.',
    type: 'ceremony',
  },
  {
    id: '3',
    title: 'Guided Heritage Walk',
    date: '2024-03-15',
    description: 'Special guided tour covering multiple monasteries in one day.',
    type: 'tour',
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const savedAdminState = localStorage.getItem('monastery360_admin_logged_in');
    return {
      currentView: 'landing',
      isAdminLoggedIn: savedAdminState === 'true',
      searchQuery: '',
      selectedMonastery: null,
      bookings: [],
      events: MOCK_EVENTS,
      isWalkthroughActive: false,
      walkthroughLanguage: null,
    };
  });

  const setCurrentView = (view: AppState['currentView']) => {
    setState(prev => ({ ...prev, currentView: view }));
  };

  const setAdminLoggedIn = (status: boolean) => {
    localStorage.setItem('monastery360_admin_logged_in', status.toString());
    setState(prev => ({ ...prev, isAdminLoggedIn: status }));
  };

  const setSearchQuery = (query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  };

  const setSelectedMonastery = (monastery: Monastery | null) => {
    setState(prev => ({ ...prev, selectedMonastery: monastery }));
  };

  const addBooking = (booking: Omit<Booking, 'id' | 'status'>) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      status: 'pending',
    };
    setState(prev => ({
      ...prev,
      bookings: [...prev.bookings, newBooking],
    }));
  };

  const updateBookingStatus = (id: string, status: 'approved' | 'declined') => {
    setState(prev => ({
      ...prev,
      bookings: prev.bookings.map(booking =>
        booking.id === id ? { ...booking, status } : booking
      ),
    }));
  };

  const adminLogin = (email: string, password: string): boolean => {
    if (email === 'admin@sikkim.gov.in' && password === 'monastery360') {
      setAdminLoggedIn(true);
      setCurrentView('admin-dashboard');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    localStorage.removeItem('monastery360_admin_logged_in');
    setAdminLoggedIn(false);
    setCurrentView('landing');
  };

  // Walkthrough methods
  const startWalkthrough = (language: string) => {
    setState(prev => ({
      ...prev,
      isWalkthroughActive: true,
      walkthroughLanguage: language,
    }));
  };

  const stopWalkthrough = () => {
    setState(prev => ({
      ...prev,
      isWalkthroughActive: false,
      walkthroughLanguage: null,
    }));
  };

  const contextValue: AppContextType = {
    state,
    setCurrentView,
    setAdminLoggedIn,
    setSearchQuery,
    setSelectedMonastery,
    addBooking,
    updateBookingStatus,
    adminLogin,
    adminLogout,
    startWalkthrough,
    stopWalkthrough,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export { MOCK_MONASTERIES };
export type { Monastery, Booking, Event };
