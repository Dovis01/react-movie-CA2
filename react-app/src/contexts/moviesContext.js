import React, { useState } from "react";
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../firebase.js';
import {useNavigate} from "react-router-dom";
export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const [favorites, setFavorites] = useState( [] )
    const [myReviews, setMyReviews] = useState( {} )
    const [toWatchList, setToWatchList] = useState( [] )
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const clearPersonalData = () => {
        setFavorites([]);
        setMyReviews({});
        setToWatchList([]);
    }
    const addToFavorites = (movie) => {
        if(user){
            let newFavorites = [];
            if (!favorites.includes(movie.id)){
                newFavorites = [...favorites, movie.id];
            }
            else{
                newFavorites = [...favorites];
            }
            setFavorites(newFavorites)
        }
        else{
            navigate('/signin');
        }
    };

    const addToWatchList = (movie) => {
        if(user){
            let newWatchList = [];
            if (!toWatchList.includes(movie.id)){
                newWatchList = [...toWatchList, movie.id];
            }
            else{
                newWatchList = [...toWatchList];
            }
            setToWatchList(newWatchList)
        }
        else{
            navigate('/signin');
        }
    };

    // We will use this function in a later section
    const removeFromFavorites = (movie) => {
        setFavorites( favorites.filter(
            (mId) => mId !== movie.id
        ) )
    };

    const removeFromWatchList = (movie) => {
        setToWatchList( toWatchList.filter(
            (mId) => mId !== movie.id
        ) )
    };

    const addReview = (movie, review) => {
        setMyReviews( {...myReviews, [movie.id]: review } )
    };
    //console.log(myReviews);
    const addUser = (user) => {
        setUser(user);
    };
    const removeUser = () => {
        setUser(null);
    };

    return (
        <MoviesContext.Provider
            value={{
                favorites,
                toWatchList,
                user,
                addUser,
                removeUser,
                addToFavorites,
                removeFromFavorites,
                removeFromWatchList,
                addReview,
                addToWatchList,
                clearPersonalData,
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;