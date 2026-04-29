import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const getImageUrl = (url) => url || 'https://placehold.co/600x400?text=No+Image';
const parseImages = (imgStr) => {
  if (!imgStr) return [];
  if (Array.isArray(imgStr)) return imgStr;
  try { return JSON.parse(imgStr); } catch { return [imgStr]; }
};

function FindRoom() {
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
        // Using 127.0.0.1 can sometimes resolve localhost resolution issues in some environments
        const res = await fetch("http://127.0.0.1:8000/rooms/");
        
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }
        
        const data = await res.json();
        setAllRooms(data);
        setFiltered(data);
        setError(''); 
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError('Failed to load rooms. Please check if your backend server is running on port 8000.');
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
    <main className='py-[50px] text-center flex-grow'>
      <div className='max-w-[1200px] mx-auto px-5'>
        <section className='mb-[60px]'>
          <h1 className='text-3xl md:text-[36px] font-bold text-[#1a1a1a] mb-1.5'>Discover Your Perfect Room</h1>
          <div className='w-[150px] h-[3px] bg-[#5cb85c] mx-auto my-[15px]'></div>
          <p className="text-[#666] text-lg">Browse through our curated collection of bachelor-friendly accommodations</p>
        </section>

        <section className='bg-white p-[30px] rounded-xl shadow-[0_6px_15px_rgba(0,0,0,0.08)] max-w-[1000px] mx-auto mb-[60px]'>
          <div className='font-semibold text-[#333] text-[18px] text-left mb-5 flex items-center'>
            <span className='block w-1.5 h-[25px] bg-[#5cb85c] rounded-[3px] mr-2.5'></span>
            Available Rooms ({filtered.length})
          </div>

          <div className='flex flex-col md:flex-row gap-[15px] items-stretch md:items-center flex-wrap'>
            <div className='relative flex-1 min-w-full md:min-w-[200px] h-[50px] bg-[#f7f9fc] border border-[#ddd] rounded flex items-center px-2.5'>
              <i className='fas fa-map-marker-alt text-[#aaa]'></i>
              <input className="w-full h-full border-none outline-none bg-transparent text-[16px] pl-2.5" type="text" placeholder='Search Location' value={locationVal} onChange={e => setLocationVal(e.target.value)} />
            </div>
            <div className='relative flex-1 min-w-full md:min-w-[200px] h-[50px] bg-[#f7f9fc] border border-[#ddd] rounded flex items-center px-2.5 pr-[30px]'>
              <select className="w-full h-full border-none outline-none bg-transparent text-[16px] pl-2.5 appearance-none" value={typeVal} onChange={e => setTypeVal(e.target.value)}>
                <option value="">All Room Type</option>
                <option value="single">Single Room</option>
                <option value="shared">Shared Room</option>
                <option value="1bhk">1 BHK</option>
                <option value="2bhk">2 BHK</option>
              </select>
              <i className='fas fa-chevron-down text-[#aaa] absolute right-2.5 pointer-events-none'></i>
            </div>
            <div className='flex-[1.5] flex flex-col min-w-full md:min-w-[250px]'>
              <input className="w-full h-2 bg-gradient-to-r from-[#2e59a7] to-[#e0e0e0] rounded-[5px] cursor-pointer mb-1 accent-[#2e59a7]" type="range" min='0' max='100000' step='1000' value={budget} onChange={e => setBudget(Number(e.target.value))} />
              <span className='text-center text-[#666] text-[14px] mt-1.5'>Max Budget: ₹{budget.toLocaleString('en-IN')}</span>
            </div>
            <button className='bg-[#5cb85c] text-white border-none py-2.5 px-[25px] text-[18px] font-semibold rounded h-[50px] shrink-0 hover:bg-[#4cae4c] transition-colors w-full md:w-auto' onClick={applyFilters}>Apply Filters</button>
          </div>

          <div className='flex flex-wrap gap-[15px] mt-5 pt-[15px] border-t border-[#eee]'>
            {Object.keys(amenities).map(key => (
              <label key={key} className="flex items-center gap-1.5 text-[0.95rem] text-[#555] cursor-pointer">
                <input type="checkbox" className="accent-[#5cb85c] w-4 h-4 cursor-pointer" checked={amenities[key]} onChange={() => toggleAmenity(key)} />
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
            ))}
          </div>
        </section>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-[30px] py-5 w-full text-left'>
          {loading && <p className="text-center w-full col-span-full">Loading Rooms...</p>}
          {error && <p className="text-center w-full text-red-500 col-span-full">{error}</p>}
          {!loading && !error && filtered.length === 0 && (
            <p className="text-center w-full col-span-full text-lg text-[#666]">No Rooms match your criteria.</p>
          )}
          {!loading && filtered.map(room => <RoomCard key={room.id} room={room} navigate={navigate} />)}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);
};

const RoomCard = ({ room, navigate }) => {
  const images = parseImages(room.image_url);
  const imgSrc = images.length > 0 ? getImageUrl(images[0]) : 'https://placehold.co/340x200?text=No+Image';

  return (
    <div className='bg-white rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300 flex flex-col border border-[#eee] hover:scale-[1.03] hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] relative group'>
      <div className='bg-[#d1d5db] h-[180px] overflow-hidden relative'>
        <img src={imgSrc} alt={room.title} className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' loading='lazy'
          onError={e => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400?text=Image+Not+Found'; }} />
        <div className="absolute top-3 right-3 bg-[#4caf50] text-white text-xs font-bold px-2 py-1 rounded shadow">
          ₹{room.rent}/mo
        </div>
      </div>
      <div className='p-5 flex-grow flex flex-col gap-2.5'>
        <h3 className='text-[20px] text-[#1a1a1a] mb-1 font-bold line-clamp-2 leading-tight'>{room.title}</h3>
        <p className="text-[#666] text-[0.95rem] flex items-center gap-2"><i className='fas fa-home w-4 text-center text-[#2e59a7]'></i><strong className="text-[#333]">{room.room_type}</strong></p>
        <p className="text-[#666] text-[0.95rem] flex items-center gap-2"><i className='fas fa-tag w-4 text-center text-[#2e59a7]'></i><span className="text-[#999] text-[0.8rem] ml-1">Dep: ₹{room.deposit}</span></p>
        <p className="text-[#666] text-[0.95rem] flex items-center gap-2"><i className='fas fa-map-marker-alt w-4 text-center text-[#2e59a7]'></i>{room.location}</p>
        <p className="text-[#666] text-[0.95rem] flex items-center gap-2"><i className='fas fa-users w-4 text-center text-[#2e59a7]'></i>{room.max_persons > 1 ? 'Sharing' : 'Single'} ({room.max_persons} Max)</p>
        <p className="text-[#666] text-[0.95rem] flex items-center gap-2"><i className='fas fa-venus-mars w-4 text-center text-[#2e59a7]'></i>Preferred: {room.gender || 'Any'}</p>
      </div>
      <div className='px-5 pb-5 flex gap-3 mt-auto'>
        <button className='flex-1 h-[44px] bg-[#007bff] text-white border-none rounded-lg font-bold transition-all duration-300 hover:bg-[#045aaf] hover:-translate-y-0.5' onClick={() => navigate(`/room/${room.id}`)}>View Details</button>
      </div>
    </div>
  );
};

export default FindRoom;