import React from "react";
import { useLocation } from "react-router-dom";
import TemplateMovieReviewsPage from "../../components/template/templateMovieReviewsPage";
import MovieReview from "../../components/movieReview";

const MovieReviewPage = () => {
    let location = useLocation();
    const {movie, review} = location.state;

    return (
        <TemplateMovieReviewsPage movie={movie}>
            <MovieReview review={review} />
        </TemplateMovieReviewsPage>
    );
};

export default MovieReviewPage;