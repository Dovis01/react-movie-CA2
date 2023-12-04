import React, {useState} from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/template/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AvatarFavoriteCheck from '../components/cardIconAndAvatar/avatar/favoritesCheck'
import AddToFavorites from "../components/cardIconAndAvatar/icons/addToFavorites";
import AddToWatchList from "../components/cardIconAndAvatar/icons/addToWatchList";
import AvatarToWatchListCheck from "../components/cardIconAndAvatar/avatar/toWatchListCheck";

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const {  data, error, isLoading, isError }  = useQuery(
        ['discover',{page:currentPage}],
        getMovies
    )

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    const movies = data.results;
    const totalPages = data.total_pages;

    // Redundant, but necessary to avoid app crashing.
    const favorites = movies.filter(m => m.favorite)
    localStorage.setItem('favorites', JSON.stringify(favorites))

    return (
        <PageTemplate
            title="Discover Movies"
            movies={movies}
            currentPage={currentPage}
            totalPages={totalPages}
            pageChange={(event, value) => {
                setCurrentPage(value);
            }}
            action={(movie) => {
                return (
                    <>
                        <AddToFavorites movie={movie}/>
                        <AddToWatchList movie={movie}/>
                    </>
                );
            }}
            avatarCheck={(movie) => {
                return (
                    <>
                        <AvatarFavoriteCheck movie={movie} />
                        <AvatarToWatchListCheck movie={movie} />
                    </>
                );
            }}
        />
    );
};
export default HomePage;