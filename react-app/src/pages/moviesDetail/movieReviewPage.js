import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../../components/template/templateMoviePage";
import MovieReview from "../../components/movieReview";

const MovieReviewPage = () => {
    let location = useLocation();
    const {movie, review} = location.state;

    return (
        <PageTemplate movie={movie}>
            <MovieReview review={review} />
        </PageTemplate>
    );
};

export default MovieReviewPage;