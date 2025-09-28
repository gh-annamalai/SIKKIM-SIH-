import React from 'react';
import Header from '@/components/Header';
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
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Header />
      <main className="container mx-auto px-4 py-12">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-white flex items-center gap-3 drop-shadow">
              <Shield className="h-10 w-10 text-monastery-gold" />
              Admin Dashboard
            </h1>
            <p className="text-lg text-gray-300 mt-2">
              Manage monastery bookings and visitor requests
            </p>
          </div>
          <Button
            onClick={adminLogout}
            variant="outline"
            size="lg"
            className="ml-4 bg-monastery-gold text-black font-semibold rounded-full shadow-lg hover:bg-yellow-400 border-2 border-monastery-gold"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <Card className="monastery-card bg-black/60 backdrop-blur-lg border-none shadow-2xl rounded-2xl">
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

          <Card className="monastery-card bg-black/60 backdrop-blur-lg border-none shadow-2xl rounded-2xl">
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

          <Card className="monastery-card bg-black/60 backdrop-blur-lg border-none shadow-2xl rounded-2xl">
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

          <Card className="monastery-card bg-black/60 backdrop-blur-lg border-none shadow-2xl rounded-2xl">
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
  <Card className="monastery-card bg-black/60 backdrop-blur-lg border-none shadow-2xl rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Booking Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {state.bookings.length === 0 ? (
              <Alert>
                <AlertDescription className="text-center py-8 text-white">
                  No booking requests yet. Bookings will appear here when visitors submit tour requests.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-white">Visitor</TableHead>
                      <TableHead className="text-white">Monastery</TableHead>
                      <TableHead className="text-white">Date & Time</TableHead>
                      <TableHead className="text-white">Group</TableHead>
                      <TableHead className="text-white">Status</TableHead>
                      <TableHead className="text-white">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {state.bookings.map((booking) => (
                      <TableRow key={booking.id} className="hover:bg-black/30">
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium text-white">{booking.name}</div>
                            <div className="text-xs text-gray-300 flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {booking.email}
                            </div>
                            <div className="text-xs text-gray-300 flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {booking.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium text-white">{getMonasteryName(booking.monasteryId)}</div>
                            <div className="text-xs text-gray-300 flex items-center gap-1">
                              <Globe className="h-3 w-3" />
                              {booking.language}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-white">{new Date(booking.date).toLocaleDateString()}</div>
                            <div className="text-xs text-gray-300">{booking.timeSlot}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-white">
                            {booking.adults} adult{booking.adults !== 1 ? 's' : ''}
                            {booking.children > 0 && (
                              <>, {booking.children} child{booking.children !== 1 ? 'ren' : ''}</>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(booking.status) + ' text-white'}>
                            {getStatusIcon(booking.status)}
                            <span className="ml-1 capitalize">{booking.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-monastery-gold text-monastery-gold"
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
                                  className="bg-monastery-gold text-black font-semibold rounded-full shadow-lg hover:bg-yellow-400 border-2 border-monastery-gold"
                                  onClick={() => handleStatusUpdate(booking.id, 'approved')}
                                >
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-red-700 text-white font-semibold rounded-full shadow-lg hover:bg-red-800 border-2 border-red-700"
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
              <div className="mt-8 p-6 bg-black/80 rounded-2xl border border-monastery-gold/30">
                {(() => {
                  const booking = state.bookings.find(b => b.id === selectedBooking);
                  if (!booking) return null;
                  
                  return (
                    <div>
                      <h4 className="font-semibold text-white mb-4 text-xl">
                        Booking Details - {booking.name}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base text-white">
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
                          <Badge className={`ml-2 ${getStatusColor(booking.status)} text-white`}>
                            {booking.status}
                          </Badge>
                        </div>
                        {booking.specialRequests && (
                          <div className="md:col-span-2">
                            <strong>Special Requests:</strong>
                            <p className="mt-1 text-gray-300">{booking.specialRequests}</p>
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
      </main>
    </div>
  );
};

export default AdminDashboard;