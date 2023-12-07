import React, {useState} from "react";
import {login, signup} from "../api/user-api";

export const UsersContext = React.createContext(null);

const UsersContextProvider = (props) => {
    const existingToken = localStorage.getItem("token");
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(existingToken);

    /**
     * Authentication part
     * */
    const setToken = (data) => {
        localStorage.setItem("token", data);
        setAuthToken(data);
    }
    const addUser = (user) => {
        setUser(user);
    };

    const removeUser = () => {
        setUser(null);
    };
    const authenticate = async (user) => {
        const result = await login(user);
        if (result.token) {
            setToken(result.token);
            addUser(user);
            setIsAuthenticated(true);
        } else {
            throw new Error(result.msg);
        }
    };

    const register = async (user) => {
        const result = await signup(user);
        if(result.code !== 201){
            throw new Error("Registration failed. Please try again.");
        }
    };

    const signout = () => {
        setTimeout(() => setIsAuthenticated(false), 100);
    }

    return (
        <UsersContext.Provider
            value={{
                user,
                isAuthenticated,
                addUser,
                removeUser,
                authenticate,
                register,
                signout,
            }}
        >
            {props.children}
        </UsersContext.Provider>
    );
};

export default UsersContextProvider;