import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UsersContext} from "./usersContext";
import {
    addUserFavorite,
    addUserMovieSpecificReview, addUserToWatchList, deleteUserFavorite,
    deleteUserMovieSpecificReview, deleteUserToWatchList,
    getAllReviewedMoviesByUser, getUserFavorites,
    getUserMovieReviews, getUserToWatchList, updateUserMovieSpecificReview
} from "../api/user-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const usersContext = useContext(UsersContext);
    const [favorites, setFavorites] = useState([])
    const [myReviewedMovieIds, setMyReviewedMovieIds] = useState([])
    const [toWatchList, setToWatchList] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const initiateAllPersonalData = async () => {
            if (usersContext.isAuthenticated && usersContext.user?.username) {
                const favoritesDoc = await getUserFavorites(usersContext.user.username);
                const movieIds = await getAllReviewedMoviesByUser(usersContext.user.username);
                const toWatchListDoc = await getUserToWatchList(usersContext.user.username);
                setFavorites(favoritesDoc.favorites);
                setMyReviewedMovieIds(movieIds);
                setToWatchList(toWatchListDoc.toWatchList);
            }
        };
        initiateAllPersonalData();
    }, [usersContext.isAuthenticated, usersContext.user?.username]);

    const clearPersonalData = () => {
        setFavorites([]);
        setMyReviewedMovieIds([]);
        setToWatchList([]);
    }
    const addToFavorites = async (movie) => {
        if (usersContext.user) {
            let newFavorites = [];
            if (!favorites.includes(movie.id)) {
                newFavorites = [...favorites, movie.id];
            } else {
                newFavorites = [...favorites];
            }
            setFavorites(newFavorites)
            await addUserFavorite(usersContext.user.username, movie.id);
        } else {
            navigate('/signin');
        }
    };

    const addToWatchList = async (movie) => {
        if (usersContext.user) {
            let newWatchList = [];
            if (!toWatchList.includes(movie.id)) {
                newWatchList = [...toWatchList, movie.id];
            } else {
                newWatchList = [...toWatchList];
            }
            setToWatchList(newWatchList)
            await addUserToWatchList(usersContext.user.username, movie.id);
        } else {
            navigate('/signin');
        }
    };

    // We will use this function in a later section
    const removeFromFavorites = async (movie) => {
        setFavorites(favorites.filter(
            (mId) => mId !== movie.id
        ))
        await deleteUserFavorite(usersContext.user.username, movie.id);
    };

    const removeFromWatchList = async (movie) => {
        setToWatchList(toWatchList.filter(
            (mId) => mId !== movie.id
        ))
        await deleteUserToWatchList(usersContext.user.username, movie.id);
    };

    const addReview = async (movie, review) => {
        const username = usersContext.user.username;
        if (!myReviewedMovieIds.includes(movie.id)) {
            setMyReviewedMovieIds([...myReviewedMovieIds, movie.id]);
        }
        await addUserMovieSpecificReview(username, movie.id, review);
    };

    const updateReview = async (username, movie, review, originalReviewId) => {
        await updateUserMovieSpecificReview(username, movie.id, review, originalReviewId);
    };

    const removeReview = async (username, movie, review) => {
        const reviews = await getUserMovieReviews({
            queryKey: [
                "userConcreteReviews",
                {movieId: movie.id, username: usersContext.user.username}]
        });
        const reviewsNum = reviews.reviews.length;
        if (reviewsNum === 1) {
            const newReviewedMovieIds = myReviewedMovieIds.filter(movieId => movieId !== movie.id);
            setMyReviewedMovieIds(newReviewedMovieIds);
            navigate(`/${usersContext.user.username}/reviews`);
        }
        await deleteUserMovieSpecificReview(username, movie.id, review._id);
    };


    return (
        <MoviesContext.Provider
            value={{
                myReviewedMovieIds,
                favorites,
                toWatchList,
                addToFavorites,
                removeFromFavorites,
                removeFromWatchList,
                addReview,
                updateReview,
                removeReview,
                addToWatchList,
                clearPersonalData,
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;