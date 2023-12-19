import React, {useContext} from "react";
import { Link } from "react-router-dom";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import {UsersContext} from "../../../contexts/usersContext";

const LookConcreteReview = ({ movie }) => {
    const usersContext = useContext(UsersContext);
    const user=usersContext.user;
    return (
        <Link
            to={`/${user.username}/movies/${movie.id}/reviews`}
            state={{
                user,
                movie,
            }}
        >
            <ManageSearchIcon color="primary" sx={{mr:1.4,fontSize:"2.7rem"}}/>
        </Link>
    );
};

export default LookConcreteReview;