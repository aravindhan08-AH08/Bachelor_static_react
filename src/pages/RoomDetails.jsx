import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { API_CONFIG, getImageUrl, parseImages } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const TYPE_MAP = { '1bhk': '1 BHK', studio: '2 BHK', single: 'Single Room', shared: 'Shared Room', '3bhk': '3 BHK', pg: 'PG / Hostel' };
const AMENITIES = [
  { key: 'wifi', label: 'Wifi', icon: 'fa-wifi' },
  { key: 'ac', label: 'AC', icon: 'fa-snowflake' },
  { key: 'attached_bath', label: 'Attached Bath', icon: 'fa-bath' },
  { key: 'kitchen_access', label: 'Kitchen', icon: 'fa-utensils' },
  { key: 'parking', label: 'Parking', icon: 'fa-parking' },
  { key: 'laundry', label: 'Laundry', icon: 'fa-tshirt' },
  { key: 'security', label: 'Security', icon: 'fa-shield-alt' },
  { key: 'gym', label: 'Gym', icon: 'fa-dumbbell' },
  { key: 'cctv', label: 'CCTV', icon: 'fa-video' },
  { key: 'semi_furnished', label: 'Semi Furnished', icon: 'fa-couch' },
];

const RoomDetails = () => {
  const { id } = useParams();
  const { isLoggedIn, userRole, userData } = useAuth();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImg, setMainImg] = useState('');
  const [bookingStatus, setBookingStatus] = useState(null);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) { alert('You must be logged in to view room details.'); navigate('/login'); return; }
    fetchRoom();
  }, [id, isLoggedIn]);

  const fetchRoom = async () => {
    try {
      const res = await fetch(`${API_CONFIG.BASE_URL}/rooms/${id}`);
      if (!res.ok) throw new Error('Not Found');
      const data = await res.json();
      setRoom(data);
      const images = parseImages(data.image_url);
      setMainImg(images.length > 0 ? getImageUrl(images[0]) : 'https://placehold.co/600x400?text=No+Image');

      if (userRole === 'Bachelor' && userData?.id) {
        const statusRes = await fetch(`${API_CONFIG.BASE_URL}/booking/check-status/${id}?user_id=${userData.id}`);
        if (statusRes.ok) {
          const statusData = await statusRes.json();
          if (statusData.status && statusData.status !== 'none') setBookingStatus(statusData.status);
        }
      }
    } catch { alert('Room not found!!'); navigate('/find-room'); }
    finally { setLoading(false); }
  };

  const handleBooking = async () => {
    if (!isLoggedIn || !userData) { alert('Please login to book a room!'); navigate('/login'); return; }
    if (userRole === 'Owner') { alert('Owners cannot book rooms! Login as Bachelor.'); return }
    if (!window.confirm('Do you want to send a booking request to the owner?')) return;
    setBooking(true);
    try {
      const res = await fetch(`${API_CONFIG.BASE_URL}/booking/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room_id: parseInt(id), user_id: userData.id }),
      });
      const data = await res.json();
      if (res.ok) { alert('Booking request sent!'); setBookingStatus('Requested'); }
      else alert('Error: ' + (data.detail || 'Failed to book room'));
    } catch { alert('Network error while booking room.'); }
    finally { setBooking(false); }
  };

  if (loading) return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fa]">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-20 text-gray-500 font-bold animate-pulse">Loading room details...</div>
      <Footer />
    </div>
  );

  const images = parseImages(room?.image_url);

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fa]">
      <Navbar />
      <main className="flex-grow py-10 px-4 flex justify-center animate-fadeIn">
        <div className="w-full max-w-[850px] bg-white rounded-[20px] shadow-[0_15px_50px_rgba(0,0,0,0.05)] overflow-hidden p-8 md:p-12">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h1 className="text-3xl font-black text-gray-800 mb-2">{room.title}</h1>
              <p className="text-gray-400 font-bold flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {room.location}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-[#28a745]">₹{room.rent} / month</div>
              <div className="text-[#28a745] font-bold text-sm">Deposit: ₹{room.deposit}</div>
            </div>
          </div>

          {/* Main Image */}
          <div className="w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden mb-6 shadow-md border border-gray-100 relative group">
            <img src={mainImg} alt={room.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm p-2 rounded-lg cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 0 && (
            <div className="flex gap-4 mb-12 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <div 
                  key={i} 
                  className={`w-24 h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all flex-shrink-0 ${mainImg === getImageUrl(img) ? 'border-[#007bff]' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  onClick={() => setMainImg(getImageUrl(img))}
                >
                  <img src={getImageUrl(img)} className="w-full h-full object-cover" alt="thumbnail" />
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Content Column */}
            <div className="lg:col-span-2 space-y-12">
              
              <section>
                <h3 className="text-xl font-black text-gray-800 mb-4">Description</h3>
                <p className="text-gray-500 font-medium leading-relaxed whitespace-pre-line text-[15px]">
                  {room.description || 'No description available for this property.'}
                </p>
              </section>

              <section>
                <h3 className="text-xl font-black text-gray-800 mb-6">Amenities</h3>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  {AMENITIES.filter(a => room[a.key]).map(a => (
                    <div key={a.key} className="flex items-center gap-4 text-gray-600 font-bold text-sm">
                      <div className="w-5 flex justify-center">
                        <i className={`fas ${a.icon} text-gray-800 text-lg`}></i>
                      </div>
                      {a.label}
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xl font-black text-gray-800 mb-6">Details</h3>
                <div className="space-y-3">
                  <p className="text-gray-700 font-bold text-[15px]">Room Type: <span className="font-medium text-gray-500 ml-1">{TYPE_MAP[room.room_type?.toLowerCase()] || room.room_type}</span></p>
                  <p className="text-gray-700 font-bold text-[15px]">Capacity: <span className="font-medium text-gray-500 ml-1">{room.max_persons || 1} Person(s)</span></p>
                  <p className="text-gray-700 font-bold text-[15px]">Bachelor Friendly: <span className="font-medium text-gray-500 ml-1">{room.bachelor_allowed ? 'Yes' : 'No'}</span></p>
                  <p className="text-gray-700 font-bold text-[15px]">Preferred Gender: <span className="font-medium text-gray-500 ml-1">{room.gender || 'Any'}</span></p>
                </div>
              </section>
            </div>

            {/* Right Action Column */}
            <div className="lg:col-span-1">
              <div className="bg-[#f8f9fb] p-8 rounded-[25px] space-y-6">
                <h3 className="text-xl font-black text-gray-800">Interested?</h3>
                <p className="text-gray-400 font-medium text-sm leading-relaxed">
                  Book this room now to send a request to the owner. You'll be notified once approved.
                </p>
                
                <button 
                  className={`w-full py-4 rounded-xl font-black text-lg shadow-lg transition-all active:scale-95 disabled:opacity-70 ${
                    bookingStatus === 'Approved' ? 'bg-[#ff9f00] text-white' :
                    bookingStatus === 'Requested' ? 'bg-[#ff9f00] text-white' :
                    'bg-[#ff9f00] text-white hover:brightness-95'
                  }`}
                  disabled={booking || bookingStatus}
                  onClick={handleBooking}
                >
                  {booking ? 'Sending...' : (bookingStatus === 'Approved' ? 'Confirmed' : (bookingStatus || 'Book Now'))}
                </button>

                <div className="pt-6 space-y-4">
                  <div className="text-[15px] font-black text-gray-800 uppercase tracking-tight">Posted by: {room.owner_name || 'Test'}</div>
                  {room.owner_phone && (
                    <div className="flex items-center gap-3 text-gray-500 font-bold text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      {room.owner_phone}
                    </div>
                  )}
                  {room.owner_email && (
                    <div className="flex items-center gap-3 text-gray-500 font-bold text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      {room.owner_email}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RoomDetails;
