import React, {useState} from "react";
import {getPeopleMovieCredits} from "../../api/tmdb-api";
import MovieListPageTemplate from "../../components/template/templateMovieListPage";
import {useQuery} from "react-query";
import Spinner from "../../components/spinner";
import {useParams} from "react-router-dom";
import AddToFavorites from "../../components/cardIconAndAvatar/icons/addToFavorites";
import AddToWatchList from "../../components/cardIconAndAvatar/icons/addToWatchList";
import AvatarFavoriteCheck from "../../components/cardIconAndAvatar/avatar/favoritesCheck";
import AvatarToWatchListCheck from "../../components/cardIconAndAvatar/avatar/toWatchListCheck";


const ActorRelatedMoviesPage = () => {
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    //have done for using react-query
    const {data, error, isLoading, isError} = useQuery(
        ["relatedMovieCredits", {id: id}],
        getPeopleMovieCredits
    );

    if (isLoading) {
        return <Spinner/>;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const movies = data.cast;

    return (
        <MovieListPageTemplate
            title="Actor Related Movies"
            movies={movies}
            currentPage={currentPage}
            totalPages={1}
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

export default ActorRelatedMoviesPage;