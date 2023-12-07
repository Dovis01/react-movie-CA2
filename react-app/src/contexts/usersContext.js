import React, {useState} from "react";
import {loginByEmail, loginByUsername, signup} from "../api/user-api";

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
    const authenticateByUsername = async (user) => {
        const result = await loginByUsername(user);
        let userEntity = {
            ...user,
        }
        if (result.token) {
            userEntity.email = result.email;
            setToken(result.token);
            addUser(userEntity);
            setIsAuthenticated(true);
        } else {
            throw new Error(result.msg);
        }
    };

    const authenticateByEmail = async (user) => {
        const result = await loginByEmail(user);
        let userEntity = {
            ...user,
        }
        if (result.token) {
            userEntity.username = result.username;
            setToken(result.token);
            addUser(userEntity);
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
                authenticateByUsername,
                authenticateByEmail,
                register,
                signout,
            }}
        >
            {props.children}
        </UsersContext.Provider>
    );
};

export default UsersContextProvider;