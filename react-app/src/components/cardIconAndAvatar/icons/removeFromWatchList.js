import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../../contexts/moviesContext";

const RemoveFromWatchListIcon = ({ movie }) => {
    const context = useContext(MoviesContext);

    const handleRemoveFromFavorites = (e) => {
        e.preventDefault();
        context.removeFromWatchList(movie);
    };
    return (
        <IconButton
            aria-label="remove from watch list"
            onClick={handleRemoveFromFavorites}
        >
            <DeleteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};
export default RemoveFromWatchListIcon;