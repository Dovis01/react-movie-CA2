import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import React, { useState, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import {Slide} from "@mui/material";
import {UsersContext} from "../../contexts/usersContext";

const ratings = [
    {
        value: 5,
        label: "Excellent",
    },
    {
        value: 4,
        label: "Good",
    },
    {
        value: 3,
        label: "Average",
    },
    {
        value: 2,
        label: "Poor",
    },
    {
        value: 1,
        label: "Terrible",
    },
];

const styles = {
    root: {
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
    },
    form: {
        width: "100%",
        "& > * ": {
            marginTop: 2,
        },
    },
    textField: {
        width: "40ch",
    },
    submit: {
        marginRight: 2,
    },
    reset: {
        marginRight: 2,
        width: "90px",
    },
    snack: {
        width: "50%",
        "& > * ": {
            width: "100%",
        },
    },
};

const ReviewForm = ({ movie,review }) => {
    const moviesContext = useContext(MoviesContext);
    const usersContext = useContext(UsersContext);
    const [rating, setRating] = useState(3);
    const user = usersContext.user;
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const originalReview = review ? review : null;

    const defaultValues = {
        author: "",
        review: "",
        agree: false,
        rating: "3",
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm(defaultValues);

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const onSubmit = async (review) => {
        review.movieId = movie.id;
        review.rating = rating;
        if(originalReview){
            await moviesContext.updateReview(user.username,movie,review,originalReview._id);
        }else{
            await moviesContext.addReview(movie, review);
        }
        setOpen(true); // NEW
    };

    const handleSnackClose = (event) => {
        setOpen(false);
        navigate(`/${user.username}/reviews`);
    };

    return (
        <Box component="div" sx={styles.root}>
            <Typography component="h2" variant="h3">
                Write a review
            </Typography>

            <Snackbar
                sx={{
                    ...styles.snack,
                    marginTop: '18vh',
                    '& .MuiPaper-root': {
                        borderRadius: 3,
                        height: '45px',
                        boxShadow: '0 5px 8px 5px rgba(255, 105, 135, .3)'
                    }
                }}
                TransitionComponent={(props) => <Slide {...props} direction="down" />}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                autoHideDuration={6000}
                open={open}
                onClose={handleSnackClose}
            >
                <MuiAlert
                    severity="success"
                    variant="filled"
                    onClose={handleSnackClose}
                    sx={{
                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                        fontWeight: 'bold',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1rem',
                    }}
                >
                    <Typography variant="h5">
                        Thank you for submitting a review
                    </Typography>
                </MuiAlert>
            </Snackbar>

            <form sx={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                <Controller
                    name="author"
                    control={control}
                    rules={{ required: "Name is required" }}
                    defaultValue={review ? review.author : ""}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            sx={{ width: "40ch" }}
                            variant="outlined"
                            margin="normal"
                            required
                            onChange={onChange}
                            value={value}
                            id="author"
                            label="Author's name"
                            name="author"
                            autoFocus
                        />
                    )}
                />
                {errors.author && (
                    <Typography variant="h6" component="p">
                        {errors.author.message}
                    </Typography>
                )}
                <Controller
                    name="review"
                    control={control}
                    rules={{
                        required: "Review cannot be empty.",
                        minLength: { value: 10, message: "Review is too short" },
                    }}
                    defaultValue={review ? review.content : ""}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="review"
                            value={value}
                            onChange={onChange}
                            label="Review text"
                            id="review"
                            multiline
                            minRows={10}
                        />
                    )}
                />
                {errors.review && (
                    <Typography variant="h6" component="p">
                        {errors.review.message}
                    </Typography>
                )}

                <Controller
                    control={control}
                    name="rating"
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            id="select-rating"
                            select
                            variant="outlined"
                            label="Rating Select"
                            value={review ? review.rating : rating}
                            onChange={handleRatingChange}
                            helperText="Don't forget your rating"
                            sx={{mt:2}}
                        >
                            {ratings.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />

                <Box sx={{...styles.buttons, mt: 2}}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={styles.submit}
                    >
                        Submit
                    </Button>
                    <Button
                        type="reset"
                        variant="contained"
                        color="secondary"
                        sx={styles.reset}
                        onClick={() => {
                            reset({
                                author: "",
                                content: "",
                            });
                        }}
                    >
                        Reset
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default ReviewForm;