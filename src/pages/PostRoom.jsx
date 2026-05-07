import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { API_CONFIG } from '../utils/api';

const AMENITY_LIST = [
  { key: 'wifi', label: 'Wifi' },
  { key: 'ac', label: 'AC' },
  { key: 'attached_bath', label: 'Attached Bath' },
  { key: 'kitchen_access', label: 'Kitchen Access' },
  { key: 'parking', label: 'Parking' },
  { key: 'laundry', label: 'Laundry' },
  { key: 'security', label: 'Security' },
  { key: 'gym', label: 'Gym' },
  { key: 'cctv', label: 'CCTV' },
  { key: 'semi_furnished', label: 'Semi Furnished' },
];

const PostRoom = () => {
  const { isLoggedIn, userRole, userData } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const [form, setForm] = useState({
    title: '', room_type: '', rent: '', deposit: '', max_persons: 1,
    gender: 'Any', location: '', description: '', bachelor_allowed: true,
    wifi: false, ac: false, attached_bath: false, kitchen_access: false,
    parking: false, laundry: false, security: false, gym: false, cctv: false, semi_furnished: false,
  });

  useEffect(() => {
    if (!isLoggedIn) { alert('Please login to post a room!'); navigate('/login'); return; }
    if (userRole !== 'Owner') { alert('Only Room Owner can post rooms!'); navigate('/'); }
  }, [isLoggedIn, userRole, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const selectedFiles = files ? Array.from(files) : [];
      setImageFiles(selectedFiles);
      setImagePreviews(selectedFiles.map(file => URL.createObjectURL(file)));
      return;
    }
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData?.email) { alert('Please login again.'); return; }
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'max_persons') {
          formData.append('sharing_capacity', v);
        } else if (typeof v === 'boolean') {
          formData.append(k, v ? 'true' : 'false');
        } else {
          formData.append(k, v);
        }
      });
      formData.append('owner_email', userData.email);
      
      if (imageFiles.length > 0) {
        imageFiles.forEach(f => formData.append('files', f));
      } else {
        alert('Please select at least one image.');
        setLoading(false);
        return;
      }

      const res = await fetch(API_CONFIG.ROOMS, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) { alert('Room listed Successfully!'); navigate('/owner-dashboard'); }
      else alert(data.detail || 'Failed to post room.');
    } catch (err) { 
      console.error("Post Room Error:", err);
      alert('Network Error. Failed to connect to backend.'); 
    }
    finally { setLoading(false); }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fa]">
      <Navbar />
      <main className="flex-grow py-12 px-4 flex justify-center animate-fadeIn">
        <div className="w-full max-w-[850px] bg-white rounded-[25px] shadow-[0_15px_50px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100">
          
          {/* Green Gradient Header */}
          <div className="bg-gradient-to-r from-[#00b09b] to-[#40c060] px-10 py-12 text-white">
            <h1 className="text-4xl font-black mb-3">List Your Room</h1>
            <p className="text-green-50 font-medium text-lg opacity-90">Help bachelors find their perfect accommodation</p>
          </div>

          <form className="p-10 space-y-10" onSubmit={handleSubmit}>
            
            {/* Room Details Section */}
            <div>
              <h2 className="text-[#007bff] text-xl font-black mb-1 flex items-center gap-2">
                Room Details
              </h2>
              <div className="w-full h-[1.5px] bg-gray-100 mb-8"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2">
                  <label className="text-[15px] font-bold text-gray-700">Room Title *</label>
                  <input type="text" name="title" placeholder="e.g. Cozy Single Room in City Center"
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#007bff] focus:bg-white transition-all text-gray-700 font-medium"
                    value={form.title} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <label className="text-[15px] font-bold text-gray-700">Room Type *</label>
                  <select name="room_type" value={form.room_type} onChange={handleChange} required
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#007bff] focus:bg-white transition-all text-gray-700 font-medium appearance-none bg-[url('https://cdn-icons-png.flaticon.com/512/271/271237.png')] bg-[length:12px] bg-[right_15px_center] bg-no-repeat">
                    <option value="" disabled>Select room type</option>
                    <option value="single">Single Room</option>
                    <option value="shared">Shared Room</option>
                    <option value="1bhk">1 BHK</option>
                    <option value="studio">2 BHK</option>
                    <option value="3bhk">3 BHK</option>
                    <option value="pg">PG / Hostel</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[15px] font-bold text-gray-700">Monthly Rent (₹) *</label>
                  <input type="number" name="rent" placeholder="15000"
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#007bff] focus:bg-white transition-all text-gray-700 font-medium"
                    value={form.rent} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <label className="text-[15px] font-bold text-gray-700">Deposit (₹) *</label>
                  <input type="number" name="deposit" placeholder="50000"
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#007bff] focus:bg-white transition-all text-gray-700 font-medium"
                    value={form.deposit} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <label className="text-[15px] font-bold text-gray-700">Occupancy Capacity (Max Persons) *</label>
                  <input type="number" name="max_persons" placeholder="1"
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#007bff] focus:bg-white transition-all text-gray-700 font-medium"
                    value={form.max_persons} onChange={handleChange} min="1" required />
                </div>

                <div className="space-y-2">
                  <label className="text-[15px] font-bold text-gray-700">Gender Preference *</label>
                  <select name="gender" value={form.gender} onChange={handleChange} required
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#007bff] focus:bg-white transition-all text-gray-700 font-medium appearance-none bg-[url('https://cdn-icons-png.flaticon.com/512/271/271237.png')] bg-[length:12px] bg-[right_15px_center] bg-no-repeat">
                    <option value="Any">Any</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-[15px] font-bold text-gray-700">Location *</label>
                  <input type="text" name="location" placeholder="Area, City"
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#007bff] focus:bg-white transition-all text-gray-700 font-medium"
                    value={form.location} onChange={handleChange} required />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-[15px] font-bold text-gray-700">Description *</label>
                  <textarea name="description" rows="4" placeholder="Describe your room, nearby amenities, transportation, etc."
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#007bff] focus:bg-white transition-all text-gray-700 font-medium resize-none"
                    value={form.description} onChange={handleChange} required></textarea>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div>
              <h2 className="text-[#007bff] text-xl font-black mb-1">Amenities</h2>
              <div className="w-full h-[1.5px] bg-gray-100 mb-8"></div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4">
                {AMENITY_LIST.map((item) => (
                  <label key={item.key} className="flex items-center gap-3 text-gray-600 font-bold text-sm cursor-pointer hover:text-[#007bff] transition-colors group">
                    <div className="relative flex items-center justify-center">
                      <input type="checkbox" name={item.key} checked={form[item.key]} onChange={handleChange}
                        className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-[#007bff] checked:border-[#007bff] transition-all" />
                      <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    {item.label}
                  </label>
                ))}
              </div>

              {/* Bachelor Friendly Card */}
              <div className="mt-8 bg-[#e8f6ed] border border-[#c3e6cb] p-4 rounded-xl flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" name="bachelor_allowed" checked={form.bachelor_allowed} onChange={handleChange}
                    className="peer appearance-none w-5 h-5 border-2 border-[#58b273] rounded-md checked:bg-[#28a745] checked:border-[#28a745] transition-all" />
                  <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="text-[#155724] font-bold text-[15px]">This property is bachelor-friendly</span>
              </div>
            </div>

            {/* File Upload Section */}
            <div>
              <label className="text-[15px] font-bold text-gray-700 block mb-4">Upload Room Photos & Videos (Multiple allowed):</label>
              <div className="flex flex-col gap-4">
                <input type="file" multiple accept="image/*,video/*" onChange={handleChange}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 transition-all cursor-pointer" />
                
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {imagePreviews.map((src, i) => (
                      <img key={i} src={src} alt="preview" className="w-full aspect-square object-cover rounded-xl border border-gray-100 shadow-sm" />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              <button type="button" onClick={() => navigate(-1)}
                className="px-8 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all active:scale-95">
                Cancel
              </button>
              <button type="submit" disabled={loading}
                className="px-10 py-3 bg-[#007bff] text-white rounded-xl font-bold hover:bg-[#045aaf] transition-all shadow-lg shadow-blue-100 active:scale-95 disabled:opacity-70">
                {loading ? 'Posting...' : 'List Room'}
              </button>
            </div>

          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostRoom;