import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UsersContext} from "./usersContext";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const [favorites, setFavorites] = useState( [] )
    const [myReviews, setMyReviews] = useState( {} )
    const [toWatchList, setToWatchList] = useState( [] )
    const usersContext = useContext(UsersContext);
    const navigate = useNavigate();

    const clearPersonalData = () => {
        setFavorites([]);
        setMyReviews({});
        setToWatchList([]);
    }
    const addToFavorites = (movie) => {
        if(usersContext.user){
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
        if(usersContext.user){
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


    return (
        <MoviesContext.Provider
            value={{
                favorites,
                toWatchList,
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