import React from "react";
import { useLocation } from "react-router-dom";
import TemplateMovieReviewsPage from "../../components/template/templateMovieReviewsPage";
import ReviewForm from "../../components/reviewForm";

const UpdateUserReviewPage = () => {
    let location = useLocation();
    const {movie, review} = location.state;

    return (
        <TemplateMovieReviewsPage movie={movie}>
            <ReviewForm movie={movie} review={review} />
        </TemplateMovieReviewsPage>
    );
};

export default UpdateUserReviewPage;