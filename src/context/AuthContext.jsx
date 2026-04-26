import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [userData, setUserData] = useState(null);

    const login = (role, data) => {
        setIsLoggedIn(true);
        setUserRole(role);
        setUserData(data);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserRole(null);
        setUserData(null);
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