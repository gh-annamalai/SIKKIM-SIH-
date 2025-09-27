import React from 'react';
import { 
  Shield, 
  Calendar, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  LogOut, 
  Eye,
  Mail,
  Phone,
  MapPin,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { useAppContext } from '@/context/AppContext';
import { MOCK_MONASTERIES } from '@/context/AppContext';

const AdminDashboard: React.FC = () => {
  const { state, updateBookingStatus, adminLogout } = useAppContext();
  const [selectedBooking, setSelectedBooking] = React.useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-prayer-green text-prayer-white';
      case 'declined': return 'bg-prayer-red text-prayer-white';
      default: return 'bg-monastery-gold text-monastery-gold-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'declined': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleStatusUpdate = (bookingId: string, status: 'approved' | 'declined') => {
    updateBookingStatus(bookingId, status);
  };

  const getMonasteryName = (monasteryId: string) => {
    const monastery = MOCK_MONASTERIES.find(m => m.id === monasteryId);
    return monastery?.name || 'Unknown Monastery';
  };

  const stats = {
    totalBookings: state.bookings.length,
    pendingBookings: state.bookings.filter(b => b.status === 'pending').length,
    approvedBookings: state.bookings.filter(b => b.status === 'approved').length,
    declinedBookings: state.bookings.filter(b => b.status === 'declined').length
  };

  return (
    <div className="min-h-screen bg-gradient-sky py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
              <Shield className="h-8 w-8" />
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage monastery bookings and visitor requests
            </p>
          </div>
          
          <Button
            onClick={adminLogout}
            variant="outline"
            className="hover:bg-destructive hover:text-destructive-foreground"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="monastery-card bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-mountain rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">{stats.totalBookings}</p>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="monastery-card bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-monastery-gold rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-monastery-gold-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">{stats.pendingBookings}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="monastery-card bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-prayer-green rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-prayer-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">{stats.approvedBookings}</p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="monastery-card bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-prayer-red rounded-lg flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-prayer-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">{stats.declinedBookings}</p>
                  <p className="text-sm text-muted-foreground">Declined</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Table */}
        <Card className="monastery-card bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Booking Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {state.bookings.length === 0 ? (
              <Alert>
                <AlertDescription className="text-center py-8">
                  No booking requests yet. Bookings will appear here when visitors submit tour requests.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Visitor</TableHead>
                      <TableHead>Monastery</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Group</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {state.bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{booking.name}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {booking.email}
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {booking.phone}
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{getMonasteryName(booking.monasteryId)}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <Globe className="h-3 w-3" />
                              {booking.language}
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="space-y-1">
                            <div>{new Date(booking.date).toLocaleDateString()}</div>
                            <div className="text-xs text-muted-foreground">{booking.timeSlot}</div>
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="text-sm">
                            {booking.adults} adult{booking.adults !== 1 ? 's' : ''}
                            {booking.children > 0 && (
                              <>, {booking.children} child{booking.children !== 1 ? 'ren' : ''}</>
                            )}
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <Badge className={getStatusColor(booking.status)}>
                            {getStatusIcon(booking.status)}
                            <span className="ml-1 capitalize">{booking.status}</span>
                          </Badge>
                        </TableCell>
                        
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedBooking(
                                selectedBooking === booking.id ? null : booking.id
                              )}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            
                            {booking.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  className="bg-prayer-green hover:bg-prayer-green/90 text-prayer-white"
                                  onClick={() => handleStatusUpdate(booking.id, 'approved')}
                                >
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Approve
                                </Button>
                                
                                <Button
                                  size="sm"
                                  className="bg-prayer-red hover:bg-prayer-red/90 text-prayer-white"
                                  onClick={() => handleStatusUpdate(booking.id, 'declined')}
                                >
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Decline
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Booking Details */}
            {selectedBooking && (
              <div className="mt-6 p-4 bg-accent-soft rounded-lg">
                {(() => {
                  const booking = state.bookings.find(b => b.id === selectedBooking);
                  if (!booking) return null;
                  
                  return (
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-3">
                        Booking Details - {booking.name}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Monastery:</strong> {getMonasteryName(booking.monasteryId)}
                        </div>
                        <div>
                          <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}
                        </div>
                        <div>
                          <strong>Time Slot:</strong> {booking.timeSlot}
                        </div>
                        <div>
                          <strong>Guide Language:</strong> {booking.language}
                        </div>
                        <div>
                          <strong>Group Size:</strong> {booking.adults} adults, {booking.children} children
                        </div>
                        <div>
                          <strong>Status:</strong> 
                          <Badge className={`ml-2 ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </Badge>
                        </div>
                        {booking.specialRequests && (
                          <div className="md:col-span-2">
                            <strong>Special Requests:</strong>
                            <p className="mt-1 text-muted-foreground">{booking.specialRequests}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;