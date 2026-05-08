import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { API_CONFIG, getImageUrl, parseImages } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const OwnerDashboard = () => {
    const { isLoggedIn, userRole, userData } = useAuth();
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await fetch(`${API_CONFIG.OWNER_DASHBOARD}?owner_email=${userData.email}`);
            if (res.ok) {
                const data = await res.json();
                setRooms(data.rooms || []);
                setBookings(data.bookings_received || []);
            }
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    useEffect(() => {
        if (!isLoggedIn) { navigate('/login'); return; }
        if (userRole !== 'Owner') { navigate('/bachelor-dashboard'); return; }
        fetchData();
    }, []);

    const handleBookingAction = async (bookingId, action) => {
        const actionPath = action === 'Approved' ? 'approve-booking' : 'reject-booking';
        try {
            const res = await fetch(`${API_CONFIG.OWNER_DASHBOARD}/${actionPath}/${bookingId}?owner_email=${userData.email}`, {
                method: 'PUT',
            });
            if (res.ok) {
                setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: action } : b));
                alert(`Booking ${action} successfully!`);
            } else {
                const data = await res.json();
                alert(data.detail || `Failed to ${action} booking.`);
            }
        } catch { alert('Failed to update booking.'); }
    };

    const handleDeleteRoom = async (roomId) => {
        if (!window.confirm('Delete this room listing?')) return;
        try {
            const res = await fetch(`${API_CONFIG.ROOMS}${roomId}?owner_email=${userData.email}`, { method: 'DELETE' });
            if (res.ok) setRooms(prev => prev.filter(r => r.id !== roomId));
        } catch { alert('Failed to delete room.'); }
    };

    const totalRooms = rooms.length;
    const activeListings = rooms.filter(r => r.is_available !== false).length;
    const totalBookings = bookings.length;

    return (
        <div className="flex flex-col min-h-screen bg-[#f4f7fa]">
            <Navbar />
            <main className="flex-grow max-w-[1200px] mx-auto w-full px-5 py-10 animate-fadeIn">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-[#045aaf] mb-1">
                            Welcome, {userData?.name || 'User'}!
                        </h1>
                        <p className="text-gray-500 font-medium">Manage your listings and booking requests here.</p>
                    </div>
                    <Link to="/post-room" className="mt-4 md:mt-0 bg-[#5cb85c] text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-[#4cae4c] transition-all shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                        Post New Room
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-8 rounded-2xl shadow-sm flex items-center gap-6 border border-gray-50">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-[#007bff]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                        </div>
                        <div>
                            <h3 className="text-4xl font-black text-gray-800 leading-none mb-1">{totalRooms}</h3>
                            <p className="text-gray-400 font-bold text-sm uppercase tracking-tight">Total Rooms Posted</p>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm flex items-center gap-6 border border-gray-50">
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-[#28a745]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                        </div>
                        <div>
                            <h3 className="text-4xl font-black text-gray-800 leading-none mb-1">{activeListings}</h3>
                            <p className="text-gray-400 font-bold text-sm uppercase tracking-tight">Active Listings</p>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm flex items-center gap-6 border border-gray-50">
                        <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-[#fd7e14]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                        </div>
                        <div>
                            <h3 className="text-4xl font-black text-gray-800 leading-none mb-1">{totalBookings}</h3>
                            <p className="text-gray-400 font-bold text-sm uppercase tracking-tight">Booking Requests</p>
                        </div>
                    </div>
                </div>

                {/* My Properties Grid */}
                <h2 className="text-2xl font-black text-gray-800 mb-8">My Properties</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {loading && <p className="col-span-full text-center py-10 text-gray-500 font-bold animate-pulse">Loading properties...</p>}
                    {!loading && rooms.map(room => {
                        const images = parseImages(room.image_url);
                        const img = images.length > 0 ? getImageUrl(images[0]) : 'https://placehold.co/400x300?text=No+Image';
                        return (
                            <div key={room.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 flex flex-col group hover:shadow-xl transition-all duration-300">
                                <div className="h-56 overflow-hidden">
                                    <img src={img} alt={room.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="p-6 flex-grow">
                                    <h4 className="text-xl font-black text-gray-800 mb-2 line-clamp-2 h-14">{room.title}</h4>
                                    <div className="flex justify-between items-center mb-5">
                                        <div className="text-gray-400 font-bold text-sm">
                                            {room.location}
                                        </div>
                                        <div className="text-[#007bff] font-black text-lg whitespace-nowrap">
                                            ₹{room.rent}/mo
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <span className="bg-gray-50 text-gray-500 px-3 py-1 rounded-md text-xs font-bold uppercase">{room.room_type}</span>
                                        <span className="bg-gray-50 text-gray-500 px-3 py-1 rounded-md text-xs font-bold uppercase">Gender: {room.gender || 'Any'}</span>
                                        <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase ${room.is_available ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                            {room.is_available ? 'Active' : 'Full'}
                                        </span>
                                    </div>
                                    <div className="flex gap-3">
                                        <button className="flex-1 bg-[#ffdf91] text-[#856404] py-2.5 rounded-lg font-black text-sm hover:brightness-95 transition-all">Edit</button>
                                        <button className="flex-1 bg-[#ef4444] text-white py-2.5 rounded-lg font-black text-sm hover:bg-[#dc2626] transition-all" onClick={() => handleDeleteRoom(room.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Booking Requests Section */}
                <h2 className="text-2xl font-black text-gray-800 mb-8">Recent Booking Requests</h2>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-10">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 font-bold text-gray-400 text-sm">
                                    <th className="px-8 py-5">Room Title</th>
                                    <th className="px-8 py-5">Tenant Name</th>
                                    <th className="px-8 py-5 text-center">Status</th>
                                    <th className="px-8 py-5 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {!loading && bookings.length === 0 && (
                                    <tr><td colSpan="4" className="px-8 py-10 text-center text-gray-400 italic">No booking requests received yet.</td></tr>
                                )}
                                {bookings.map(b => (
                                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-8 py-6 font-black text-gray-800">{b.room_title || `Room ID: ${b.room_id}`}</td>
                                        <td className="px-8 py-6 font-bold text-gray-600">{b.user_name || 'Example'}</td>
                                        <td className="px-8 py-6 text-center">
                                            <span className={`px-4 py-1.5 rounded-lg text-xs font-black shadow-sm ${b.status === 'Approved' ? 'bg-[#d4edda] text-[#155724]' : 'bg-[#fff3cd] text-[#856404]'
                                                }`}>
                                                {b.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex justify-center gap-2">
                                                {b.status === 'Requested' ? (
                                                    <>
                                                        <button className="bg-[#28a745] text-white px-4 py-2 rounded-lg text-xs font-black hover:bg-[#218838] transition-all" onClick={() => handleBookingAction(b.id, 'Approved')}>Approve</button>
                                                        <button className="bg-[#dc3545] text-white px-4 py-2 rounded-lg text-xs font-black hover:bg-[#c82333] transition-all" onClick={() => handleBookingAction(b.id, 'Rejected')}>Reject</button>
                                                        <button className="bg-[#007bff] text-white px-4 py-2 rounded-lg text-xs font-black hover:bg-[#0069d9] transition-all">Contact</button>
                                                    </>
                                                ) : (
                                                    <button className="bg-[#007bff] text-white px-6 py-2 rounded-lg text-xs font-black hover:bg-[#0069d9] transition-all">Contact</button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default OwnerDashboard;