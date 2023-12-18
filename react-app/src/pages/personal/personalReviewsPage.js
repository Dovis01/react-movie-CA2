import React, {useContext, useState} from "react";
import PageTemplate from "../../components/template/templateMovieListPage";
import { MoviesContext } from "../../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../../api/tmdb-customized-api";
import Spinner from '../../components/spinner'
import RemoveFromPersonalReviews from "../../components/cardIconAndAvatar/icons/removeFromPersonalReviews";

const PersonalReviewsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const {myReviews} = useContext(MoviesContext);
    const movieIds = Object.keys(myReviews);

    const moviesPerPage = 40;

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMoviesIds = movieIds.slice(indexOfFirstMovie, indexOfLastMovie);
    const totalPages = Math.ceil(movieIds.length / moviesPerPage);

    // Create an array of queries and run in parallel.
    const MovieReviewedQueries = useQueries(
        currentMoviesIds.map((movieId) => {
            return {
                queryKey: ["movie", { id: movieId }],
                queryFn: getMovie,
            };
        })
    );
    // Check if any of the parallel queries is still loading.
    const isLoading = MovieReviewedQueries.find((m) => m.isLoading === true);

    if (isLoading) {
        return <Spinner />;
    }
    //提取了流派ID为Movie一个单独的数组属性
    const movies = MovieReviewedQueries.map((q) => {
        q.data.genre_ids = q.data.genres.map(g => g.id)
        return q.data
    });

    return (
        <PageTemplate
            title="Your Movies Reviews"
            movies={movies}
            currentPage={currentPage}
            totalPages={totalPages}
            pageChange={(event, value) => {
                setCurrentPage(value);
            }}
            action={(movie) => {
                return (
                    <>
                        <RemoveFromPersonalReviews movie={movie} />
                    </>
                );
            }}
            avatarCheck={() => {}}
        />
    );
};

export default PersonalReviewsPage;