import React from "react";
import {useLocation} from "react-router-dom";
import TemplateMoviePage from "../../components/template/templateMoviePage";
import MovieReview from "../../components/movieReview";
import Paper from "@mui/material/Paper";
import {useQuery} from "react-query";
import Spinner from "../../components/spinner";

const ConcreteReviewDisplayPage = () => {
    let location = useLocation();
    const {user, movie} = location.state;
    const { data:reviews, error, isLoading, isError } = useQuery(
        ["userConcreteReviews", { movieId: movie.id , username: user.username}],
        getUserMovieReviews
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
        <TemplateMoviePage movie={movie}>
            {reviews.map((review) => (
                <Paper elevation={5} sx={{padding: 2.5,mb:1}}>
                    <MovieReview review={review}/>
                </Paper>
            ))}
        </TemplateMoviePage>
    );
};

export default ConcreteReviewDisplayPage;