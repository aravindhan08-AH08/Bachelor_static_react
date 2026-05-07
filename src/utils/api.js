const BASE_URL = "http://127.0.0.1:8000";

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
    if (url.startsWith('http')) return url;
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
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
