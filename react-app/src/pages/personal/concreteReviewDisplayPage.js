import React from "react";
import {useLocation} from "react-router-dom";
import TemplateMoviePage from "../../components/template/templateMoviePage";
import MovieReview from "../../components/movieReview";
import Paper from "@mui/material/Paper";
import {useQuery} from "react-query";
import Spinner from "../../components/spinner";
import {getUserMovieReviews} from "../../api/user-api";

const ConcreteReviewDisplayPage = () => {
    let location = useLocation();
    const {user, movie} = location.state;
    const { data, error, isLoading, isError } = useQuery(
        ["userConcreteReviews", { movieId: movie.id , username: user.username}],
        getUserMovieReviews,
        {
            refetchInterval: 120
        }
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const reviews = data.reviews;

    return (
        <TemplateMoviePage movie={movie}>
            {reviews.map((review) => (
                <Paper elevation={5} sx={{padding: 2.5,mb:1}}>
                    <MovieReview review={review} movie={movie}/>
                </Paper>
            ))}
        </TemplateMoviePage>
    );
};

export default ConcreteReviewDisplayPage;