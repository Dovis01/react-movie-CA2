import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../../contexts/moviesContext";

const RemoveFromPersonalReviews = ({ movie }) => {
    const context = useContext(MoviesContext);

    const handleRemoveFromPersonalReviews = (e) => {
        e.preventDefault();
        context.removeReview(movie);
    };
    return (
        <IconButton
            aria-label="remove from watch list"
            onClick={handleRemoveFromPersonalReviews }
        >
            <DeleteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};
export default RemoveFromPersonalReviews ;