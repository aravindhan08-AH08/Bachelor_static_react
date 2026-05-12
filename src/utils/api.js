const BASE_URL = "https://bachelor-life.vercel.app";

export const API_CONFIG = {
    BASE_URL: BASE_URL,
    ROOMS: `${BASE_URL}/rooms/`,
    USER_SIGNUP: `${BASE_URL}/user/`,
    USER_LOGIN: `${BASE_URL}/user/login`,
    OWNER_SIGNUP: `${BASE_URL}/owner/`,
    OWNER_LOGIN: `${BASE_URL}/owner/login`,
    OWNER_DASHBOARD: `${BASE_URL}/owner/dashboard`,
    USER_DASHBOARD: `${BASE_URL}/user-dashboard/my-bookings`,
    BOOKING: `${BASE_URL}/booking/`, // Check if it's booking/ or Booking/
};

export const getImageUrl = (url) => {
    if (!url) return 'https://placehold.co/600x400?text=No+Image';
    
    // Extremely robust check for Base64 and absolute URLs
    const trimmed = url.trim();
    if (
        trimmed.toLowerCase().startsWith('http') || 
        trimmed.toLowerCase().startsWith('data:') || 
        trimmed.includes('base64,') ||
        trimmed.length > 1000 // Base64 strings are usually very long
    ) {
        return trimmed;
    }

    const cleanUrl = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
    return `${BASE_URL}${cleanUrl}`;
};

export const parseImages = (imgStr) => {
    if (!imgStr) return [];
    if (Array.isArray(imgStr)) return imgStr;
    try {
        const parsed = JSON.parse(imgStr);
        return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
        return [imgStr];
    }
};
