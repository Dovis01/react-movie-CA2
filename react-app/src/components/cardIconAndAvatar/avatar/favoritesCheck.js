import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import React, {useContext} from "react";
import {MoviesContext} from "../../../contexts/moviesContext";

const AvatarFavorite = ({movie}) => {

    const {favorites} = useContext(MoviesContext);

    if (favorites.find((id) => id === movie.id)) {
        movie.favorite = true;
    } else {
        movie.favorite = false
    }

    return movie.favorite ? (
        <Avatar sx={{backgroundColor: 'red',mr:0.5}}>
            <FavoriteIcon/>
        </Avatar>
    ) : null
};

export default AvatarFavorite;