import React from "react";
import Typography from "@mui/material/Typography";
import {Divider} from "@mui/material";

const MovieReview =  ({ review }) => {
    return (
        <>
            <Typography variant="h5" component="h3" fontWeight="bold" >
                Review By: {review.author}
            </Typography>
            <Divider />
            <Typography variant="h6" component="p" sx={{mt:1}}>
                {review.content}
            </Typography>
        </>
    );
};
export default MovieReview