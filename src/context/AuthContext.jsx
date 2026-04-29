import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });
    const [userRole, setUserRole] = useState(() => {
        return localStorage.getItem('userRole') || null;
    });
    const [userData, setUserData] = useState(() => {
        const storedData = localStorage.getItem('userData');
        return storedData ? JSON.parse(storedData) : null;
    });

    const login = (role, data) => {
        setIsLoggedIn(true);
        setUserRole(role);
        setUserData(data);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', role);
        localStorage.setItem('userData', JSON.stringify(data));
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserRole(null);
        setUserData(null);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userData');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userRole, userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
};

const AuthContextProvider = () => {
    return (
        <div>AuthContext</div>
    )
}

export default AuthContextProvider