import React from "react";
import { useParams } from 'react-router-dom';
import MovieDetails from "../../components/movieDetails";
import PageTemplate from "../../components/template/templateMoviePage";
import {getMovie} from '../../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../../components/spinner'
import MovieDetailActorVideo from "../../components/movieDetailActorVideo";


const MoviePage = () => {
    const { movieId } = useParams();
    const { data: movie, error, isLoading, isError } = useQuery(
        ["movie", { id: movieId }],
        getMovie
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
        <>
            {movie ? (
                <>
                    <PageTemplate movie={movie}>
                        <MovieDetails movie={movie} />
                        <MovieDetailActorVideo movie={movie} />
                    </PageTemplate>
                </>
            ) : (
                <p>Waiting for movie details</p>
            )}
        </>
    );
};

export default MoviePage;