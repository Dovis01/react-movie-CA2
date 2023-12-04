import React, {useState} from "react";
import {getUpcomingMovies} from "../../api/tmdb-api";
import PageTemplate from "../../components/template/templateMovieListPage";
import AddToFavorites from "../../components/cardIconAndAvatar/icons/addToFavorites";
import AddToWatchList from "../../components/cardIconAndAvatar/icons/addToWatchList";
import {useQuery} from "react-query";
import Spinner from "../../components/spinner";
import AvatarFavoriteCheck from "../../components/cardIconAndAvatar/avatar/favoritesCheck";
import AvatarToWatchListCheck from "../../components/cardIconAndAvatar/avatar/toWatchListCheck";

const UpcomingMoviesPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    //have done for using react-query
    const {data, error, isLoading, isError} = useQuery(
        ["upcoming",{page:currentPage}],
        getUpcomingMovies
    );

    if (isLoading) {
        return <Spinner/>;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const movies = data.results;
    const totalPages = data.total_pages;

    return (
        <PageTemplate
            title="Upcoming Movies"
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

export default UpcomingMoviesPage;