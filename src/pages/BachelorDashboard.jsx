import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { API_CONFIG } from '../utils/api';

function BachelorDashboard() {
    const { isLoggedIn, userRole, userData } = useAuth();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoggedIn) { navigate('/login'); return; }
        if (userRole !== 'Bachelor') { navigate('/owner-dashboard'); return; }
        
        const fetchBookings = async () => {
            try {
                const res = await fetch(`${API_CONFIG.USER_DASHBOARD}?user_id=${userData.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setBookings(data);
                }
            } catch (err) {
                console.error("Fetch Bookings Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [isLoggedIn, userRole, navigate, userData?.id]);

    const handleCancelBooking = async (id) => {
        if (!window.confirm("Are you sure you want to cancel this request?")) return;
        try {
            const res = await fetch(`${API_CONFIG.BOOKING}${id}?user_id=${userData.id}`, { method: 'DELETE' });
            if (res.ok) {
                setBookings(prev => prev.filter(b => b.id !== id));
                alert("Request cancelled successfully!");
            } else {
                const data = await res.json();
                alert(data.detail || "Failed to cancel request.");
            }
        } catch (err) {
            alert("Failed to cancel request.");
        }
    };

    const total = bookings.length;
    const requested = bookings.filter(b => b.status === 'Requested').length;
    const approved = bookings.filter(b => b.status === 'Approved').length;
    const rejected = bookings.filter(b => b.status === 'Rejected').length;

    const stats = [
        { label: 'Total Requests', value: total, icon: 'fa-list-ul', iconBg: 'bg-blue-100', iconColor: 'text-blue-500' },
        { label: 'Requested', value: requested, icon: 'fa-clock', iconBg: 'bg-yellow-100', iconColor: 'text-yellow-500' },
        { label: 'Approved', value: approved, icon: 'fa-check-circle', iconBg: 'bg-green-100', iconColor: 'text-green-500' },
        { label: 'Rejected', value: rejected, icon: 'fa-times-circle', iconBg: 'bg-red-100', iconColor: 'text-red-500' },
    ];

    const statusBadge = (status) => {
        const styles = {
            'Requested': 'bg-yellow-100 text-yellow-700',
            'Approved': 'bg-green-100 text-green-700',
            'Rejected': 'bg-red-100 text-red-700',
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            
            <main className="flex-grow max-w-[1200px] mx-auto w-full px-6 py-10">
                <header className="mb-10">
                    <h1 className="text-4xl font-bold text-[#045aaf] mb-2">
                        Welcome, {userData?.name || 'Example'}!
                    </h1>
                    <p className="text-gray-500 text-lg font-medium">Track the status of your room requests here.</p>
                </header>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((s, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex items-center gap-5 transition-transform hover:scale-[1.02]">
                            <div className={`${s.iconBg} ${s.iconColor} w-14 h-14 rounded-full flex items-center justify-center text-2xl`}>
                                <i className={`fas ${s.icon}`}></i>
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-gray-800 leading-none mb-1">{s.value}</h3>
                                <p className="text-sm text-gray-500 font-semibold">{s.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Request History</h2>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.05)] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-5 text-sm font-bold text-gray-700 uppercase tracking-wider">Room Title</th>
                                    <th className="px-8 py-5 text-sm font-bold text-gray-700 uppercase tracking-wider">Location</th>
                                    <th className="px-8 py-5 text-sm font-bold text-gray-700 uppercase tracking-wider text-center">Status</th>
                                    <th className="px-8 py-5 text-sm font-bold text-gray-700 uppercase tracking-wider text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {bookings.map((b) => (
                                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-8 py-6">
                                            <p className="text-[15px] font-bold text-gray-800">{b.room_title}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-[14px] text-gray-600 font-medium">{b.room_location}</p>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            {statusBadge(b.status)}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex justify-center gap-3">
                                                <button 
                                                    onClick={() => navigate(`/room/${b.id}`)}
                                                    className="bg-[#007bff] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#045aaf] transition-all"
                                                >
                                                    View Room
                                                </button>
                                                <button 
                                                    onClick={() => handleCancelBooking(b.id)}
                                                    className="bg-[#dc3545] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#c82333] transition-all"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {loading && (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-10 text-center text-gray-500 font-medium">
                                            Loading your requests...
                                        </td>
                                    </tr>
                                )}
                                {!loading && bookings.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-10 text-center text-gray-500 font-medium italic">
                                            No requests found. <button onClick={() => navigate('/find-room')} className="text-[#007bff] hover:underline">Find a room now!</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}

export default BachelorDashboard;
