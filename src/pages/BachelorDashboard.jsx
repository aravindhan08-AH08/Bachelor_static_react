import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

function BachelorDashboard() {
    const { isLoggedIn, userRole, userData } = useAuth();
    const navigate = useNavigate();
    
    // Static data for Bachelor Dashboard
    const [bookings, setBookings] = useState([
        { id: 1, room_title: "Modern Single Room in T-Nagar", room_location: "T-Nagar, Chennai", status: "Approved" },
        { id: 2, room_title: "Luxury 1BHK near OMR", room_location: "Thoraipakkam, OMR", status: "Requested" },
        { id: 3, room_title: "Budget Shared Room for Students", room_location: "Guindy, Chennai", status: "Rejected" }
    ]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) { navigate('/login'); return; }
        if (userRole !== 'Bachelor') { navigate('/owner-dashboard'); return; }
    }, [isLoggedIn, userRole, navigate]);

    const handleCancelBooking = (id) => {
        if (!window.confirm("Are you sure you want to cancel this request?")) return;
        setBookings(prev => prev.filter(b => b.id !== id));
        alert("Request cancelled successfully!");
    };

    const total = bookings.length;
    const pending = bookings.filter(b => b.status === 'Requested' || b.status === 'Request').length;
    const confirmed = bookings.filter(b => b.status === 'Approved').length;
    const rejected = bookings.filter(b => b.status === 'Rejected').length;

    const stats = [
        { label: 'Total requested', value: total, color: 'text-blue-600' },
        { label: 'Requested', value: pending, color: 'text-yellow-600' },
        { label: 'Approved', value: confirmed, color: 'text-green-700' },
        { label: 'Rejected', value: rejected, color: 'text-red-700' },
    ];

    const statusBadge = (status) => {
        const styles = {
            'Requested': 'bg-yellow-100 text-yellow-800',
            'Request': 'bg-yellow-100 text-yellow-800',
            'Approved': 'bg-green-100 text-green-800',
            'Rejected': 'bg-red-100 text-red-800',
        };
        return <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
    };

    return (
        <>
            <Navbar />
            <main className='min-h-screen bg-gray-50 px-4 py-8 max-w-5xl mx-auto'>
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Welcome, <span className="text-blue-600">{userData?.name || 'Bachelor'}</span>!
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Track the status of your room requests here.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {stats.map((s) => (
                        <div key={s.label} className="bg-white border border-gray-100 rounded-lg p-4">
                            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                            <p className={`text-2xl font-semibold ${s.color}`}>{s.value}</p>
                        </div>
                    ))}
                </div>

                {/* Table */}
                <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
                    <div className="px-5 py-3 border-b border-gray-100">
                        <h2 className="text-base font-medium text-gray-800">Request History</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-500 font-medium">
                                <tr>
                                    <th className="text-left px-5 py-3">Room Title</th>
                                    <th className="text-left px-5 py-3">Location</th>
                                    <th className="text-left px-5 py-3">Status</th>
                                    <th className="text-left px-5 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading && (
                                    <tr><td colSpan="4" className="text-center py-6 text-gray-400">Loading your requests...</td></tr>
                                )}
                                {!loading && bookings.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-center py-6 text-gray-400">
                                            No booking requests found.{' '}
                                            <a href="/find-rooms" className="text-blue-500 hover:underline">Find a room!</a>
                                        </td>
                                    </tr>
                                )}
                                {bookings.map((b) => (
                                    <tr key={b.id} className="border-t border-gray-50">
                                        <td className="px-5 py-3 text-gray-800">{b.room_title || b.room_id}</td>
                                        <td className="px-5 py-3 text-gray-500">{b.room_location || '—'}</td>
                                        <td className="px-5 py-3">{statusBadge(b.status)}</td>
                                        <td className="px-5 py-3">
                                            {b.status === 'Requested' || b.status === 'Request' ? (
                                                <button
                                                    onClick={() => handleCancelBooking(b.id)}
                                                    className="bg-red-50 text-red-700 px-3 py-1 rounded text-xs hover:bg-red-100 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            ) : (
                                                <span className="text-gray-300 text-xs">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default BachelorDashboard;
