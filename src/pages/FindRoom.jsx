import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { API_CONFIG, getImageUrl, parseImages } from '../utils/api';

const FindRoom = () => {
  const { isLoggedIn, userRole } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [allRooms, setAllRooms] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [locationVal, setLocationVal] = useState(searchParams.get('location') || '');
  const [typeVal, setTypeVal] = useState(searchParams.get('type') || '');
  const [budget, setBudget] = useState(Number(searchParams.get('budget')) || 50000);
  const [amenities, setAmenities] = useState({ wifi: false, ac: false, parking: false, gym: false, kitchen: false, security: false });

  useEffect(() => {
    if (!isLoggedIn) { alert('Please Login to browse rooms!'); navigate('/login'); return; }
    if (userRole === 'Owner') { alert('Owner cannot browse rooms. Redirecting to your Dashboard.'); navigate('/owner-dashboard'); return; }
    
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_CONFIG.ROOMS);
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        const data = await res.json();
        setAllRooms(data);
        setFiltered(data);
        setError(''); 
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError('Failed to load rooms. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [isLoggedIn, userRole, navigate]);

  const applyFilters = () => {
    const result = allRooms.filter(room => {
      const matchLoc = !locationVal || room.location.toLowerCase().includes(locationVal.toLowerCase()) || room.title.toLowerCase().includes(locationVal.toLowerCase());
      const matchType = !typeVal || room.room_type.toLowerCase() === typeVal.toLowerCase();
      const matchBudget = room.rent <= budget;
      const matchAmenities =
        (!amenities.wifi || room.wifi) &&
        (!amenities.ac || room.ac) &&
        (!amenities.parking || room.parking) &&
        (!amenities.gym || room.gym) &&
        (!amenities.kitchen || room.kitchen) &&
        (!amenities.security || room.security);
      return matchLoc && matchType && matchBudget && matchAmenities;
    });
    setFiltered(result);
  };

  const toggleAmenity = (key) => setAmenities(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fa]">
      <Navbar />
      <main className="flex-grow py-12 px-4 animate-fadeIn">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-gray-800 mb-4">Discover Your Perfect Room</h1>
            <p className="text-gray-500 font-medium text-lg">Browse through our curated collection of bachelor-friendly accommodations</p>
          </div>

          {/* Filter Card */}
          <section className="bg-white p-6 rounded-xl shadow-sm mb-12 border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 bg-[#007bff] rounded-full"></div>
              <h2 className="text-base font-medium text-black">Available Rooms ({filtered.length})</h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div className="relative flex items-center">
                  <svg className="absolute left-4 text-black" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <input type="text" placeholder="Search location" value={locationVal} onChange={e => setLocationVal(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg outline-none focus:border-[#007bff] transition-all text-sm font-normal text-black placeholder:text-gray-400" />
                </div>
                <div>
                  <select value={typeVal} onChange={e => setTypeVal(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg outline-none focus:border-[#007bff] transition-all text-sm font-normal text-black appearance-none bg-[url('https://cdn-icons-png.flaticon.com/512/271/271237.png')] bg-[length:10px] bg-[right_15px_center] bg-no-repeat">
                    <option value="">All Room Types</option>
                    <option value="single">Single Room</option>
                    <option value="shared">Shared Room</option>
                    <option value="1bhk">1 BHK</option>
                    <option value="studio">2 BHK</option>
                  </select>
                </div>
                <div className="pt-1">
                  <input type="range" min="0" max="100000" step="1000" value={budget} onChange={e => setBudget(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#007bff]" />
                  <div className="text-[11px] font-medium text-[#007bff] uppercase text-center tracking-wide mt-1">Max Budget: ₹{budget.toLocaleString('en-IN')}</div>
                </div>
              </div>
              <button onClick={applyFilters} className="w-full lg:w-auto bg-[#007bff] text-white px-8 py-2.5 rounded-lg font-medium text-sm hover:bg-[#045aaf] transition-all shadow-sm active:scale-95 whitespace-nowrap">
                Apply Filters
              </button>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6 pt-6 border-t border-gray-100">
              {Object.keys(amenities).map(key => (
                <label key={key} className="flex items-center gap-2 text-sm font-normal text-black cursor-pointer hover:text-[#007bff] transition-colors">
                  <input type="checkbox" checked={amenities[key]} onChange={() => toggleAmenity(key)}
                    className="peer appearance-none w-4 h-4 border border-gray-300 rounded checked:bg-[#007bff] checked:border-[#007bff] transition-all" />
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
              ))}
            </div>
          </section>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading && <p className="col-span-full text-center py-20 text-gray-400 font-bold animate-pulse">Searching for rooms...</p>}
            {error && <p className="col-span-full text-center py-20 text-red-500 font-bold">{error}</p>}
            {!loading && !error && filtered.length === 0 && (
              <p className="col-span-full text-center py-20 text-gray-400 font-bold italic">No rooms match your criteria.</p>
            )}
            {!loading && filtered.map(room => (
              <RoomCard key={room.id} room={room} navigate={navigate} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const RoomCard = ({ room, navigate }) => {
  const images = parseImages(room.image_url);
  const imgSrc = images.length > 0 ? getImageUrl(images[0]) : 'https://placehold.co/400x250?text=No+Image';

  return (
    <div className="bg-white rounded-[25px] shadow-sm border border-gray-200 overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-500 animate-slideUp">
      <div className="h-52 overflow-hidden relative">
        <img src={imgSrc} alt={room.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      </div>
      <div className="p-8 flex-grow">
        <h3 className="text-xl font-medium text-black mb-6 h-14 line-clamp-2 leading-tight">{room.title}</h3>
        
        <div className="space-y-3.5 mb-8">
          <div className="flex items-center gap-3 text-black font-normal text-sm">
            <svg className="text-black" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span>{room.room_type}</span>
          </div>
          <div className="flex items-center gap-3 text-black font-normal text-sm">
            <svg className="text-black" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
            <span className="text-[#007bff] font-semibold">₹{room.rent}/mo</span>
            <span className="text-gray-500 text-xs ml-1 font-medium">Dep: ₹{room.deposit}</span>
          </div>
          <div className="flex items-center gap-3 text-black font-normal text-sm">
            <svg className="text-black" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {room.location}
          </div>
          <div className="flex items-center gap-3 text-black font-normal text-sm">
            <svg className="text-black" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Sharing ({room.max_persons} Max)
          </div>
          <div className="flex items-center gap-3 text-black font-normal text-sm">
            <svg className="text-black" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Preferred: {room.gender || 'Any'}
          </div>
        </div>

        <button onClick={() => navigate(`/room/${room.id}`)} className="w-full py-4 bg-[#007bff] text-white rounded-xl font-medium text-lg hover:bg-[#045aaf] transition-all shadow-lg shadow-blue-100 active:scale-95 mb-4">
          View Details
        </button>
        <div className="text-center italic text-gray-500 text-xs font-medium">Posted recently</div>
      </div>
    </div>
  );
};

export default FindRoom;