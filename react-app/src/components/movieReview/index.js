import React, {useContext} from "react";
import Typography from "@mui/material/Typography";
import {Button, Divider} from "@mui/material";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import {UsersContext} from "../../contexts/usersContext";

const MovieReview = ({review,movie}) => {
    const usersContext = useContext(UsersContext);
    const user=usersContext.user;
    const ratings = ["Terrible", "Poor", "Average", "Good", "Excellent"];
    const navigate = useNavigate();
    const handleUpdateReview = () => {
        navigate(`/${user.username}/movies/${movie.id}/reviews/${review._id}/update_form`, {state: {review: review,movie: movie}});
    }

    const handleDeleteReview = () => {
        navigate(`/reviews/delete/${review.id}`, {state: {review: review}});
    }

    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h5" component="h3" fontWeight="bold">
                    Review By: {review.author}
                </Typography>
                {review.rating && (
                    <>
                        <Typography variant="h5" component="h3" fontWeight="bold"
                                    sx={{ml: 92.6, textAlign: 'right'}}>
                            Rating: {ratings[review.rating-1]}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={0.4} ml="auto">
                            <Button variant="contained" color="primary" onClick={handleUpdateReview}>
                                Update
                            </Button>
                            <Button variant="contained" color="error" onClick={handleDeleteReview}>
                                Delete
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
            <Divider sx={{my: 1}}/>
            <Typography variant="h6" component="p" sx={{mt: 1}}>
                {review.content}
            </Typography>
        </>
    );
};
export default MovieReview