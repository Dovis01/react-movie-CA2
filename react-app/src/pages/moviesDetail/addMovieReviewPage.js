import React from "react";
import TemplateMovieReviewFormPage from "../../components/template/templateMovieReviewFormPage";
import ReviewForm from "../../components/reviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovie } from "../../api/tmdb-customized-api";
import Spinner from "../../components/spinner";

const WriteReviewPage = () => {
    const location = useLocation();
    const movieId = location.state.movieId;

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
        <TemplateMovieReviewFormPage movie={movie}>
            <ReviewForm movie={movie} />
        </TemplateMovieReviewFormPage>
    );
};

export default WriteReviewPage;