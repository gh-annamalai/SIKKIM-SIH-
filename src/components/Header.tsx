import React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';

const Header: React.FC = () => {
  const { state, setCurrentView, adminLogout } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'Home', view: 'landing' as const },
    { label: 'Experiences', view: 'experiences' as const },
    { label: 'Tourism', view: 'tourism' as const },
    { label: 'Community', view: 'community' as const },
    { label: 'Digital Archive', view: 'archive' as const },
    { label: 'Bookings', view: 'bookings' as const },
  ];

  const handleAdminAction = () => {
    if (state.isAdminLoggedIn) {
      if (state.currentView === 'admin-dashboard') {
        adminLogout();
      } else {
        setCurrentView('admin-dashboard');
      }
    } else {
      setCurrentView('admin-login');
    }
  };

  const getAdminButtonText = () => {
    if (state.isAdminLoggedIn) {
      return state.currentView === 'admin-dashboard' ? 'Logout' : 'Admin Dashboard';
    }
    return 'Admin Login';
  };

    return (
  <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-lg border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between relative">
            {/* Logo Left */}
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setCurrentView('landing')}
            >
              <div className="relative">
                <img 
                  src="/Logo.png" 
                  alt="Monastery360 Logo"
                  className="h-10 w-10 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white tracking-widest drop-shadow">MONASTERY360</h1>
                <p className="text-xs text-monastery-gold/80">Government of Sikkim</p>
              </div>
            </div>

            {/* Centered Navigation */}
            <nav className="hidden md:flex items-center space-x-8 mx-auto">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => setCurrentView(item.view)}
                  className={`px-4 py-1 text-base font-semibold rounded-full transition-all duration-200 focus:outline-none
                    ${state.currentView === item.view
                      ? 'bg-gradient-to-r from-monastery-gold/70 via-monastery-gold/40 to-monastery-gold/70 text-monastery-gold shadow-lg scale-105'
                      : 'text-white/80 hover:shadow-[0_0_12px_2px_rgba(212,175,55,0.3)] hover:bg-monastery-gold/10 hover:text-monastery-gold'}
                  `}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right Action Button */}
            <div className="flex items-center gap-2">
              <Button
                onClick={handleAdminAction}
                variant={state.isAdminLoggedIn ? "outline" : "default"}
                size="sm"
                className="ml-4 bg-monastery-gold text-monastery-gold-foreground font-semibold shadow hover:opacity-90"
              >
                {getAdminButtonText()}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 absolute right-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4">
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.view}
                    onClick={() => {
                      setCurrentView(item.view);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left text-base font-medium transition-colors py-2 ${
                      state.currentView === item.view
                        ? 'text-monastery-gold'
                        : 'text-muted-foreground hover:text-monastery-gold'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <Button
                  onClick={() => {
                    handleAdminAction();
                    setIsMobileMenuOpen(false);
                  }}
                  variant={state.isAdminLoggedIn ? "outline" : "default"}
                  size="sm"
                  className="mt-3 self-start"
                >
                  {getAdminButtonText()}
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>
  );
};

export default Header;