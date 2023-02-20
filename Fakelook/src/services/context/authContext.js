import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || false);

    const login = (user) => {
        //TODO
        setCurrentUser({ id: 1, name: "John Doe", profilePicture: "https://images.pexels.com/photos/4388168/pexels-photo-4388168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" });
    }
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login }}>
            {children}
        </AuthContext.Provider>
    );
};