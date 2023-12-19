import React from "react";
import Typography from "@mui/material/Typography";
import {Divider} from "@mui/material";
import Box from "@mui/material/Box";

const MovieReview =  ({ review }) => {
    const ratings = ["Terrible", "Poor", "Average", "Good", "Excellent"];
    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" component="h3" fontWeight="bold">
                    Review By: {review.author}
                </Typography>
                {review.rating && (
                    <Typography variant="h5" component="h3" fontWeight="bold" sx={{ textAlign: 'right' }}>
                        Rating: {ratings[review.rating]}
                    </Typography>
                )}
            </Box>
            <Divider sx={{ my: 1 }} />
            <Typography variant="h6" component="p" sx={{mt:1}}>
                {review.content}
            </Typography>
        </>
    );
};
export default MovieReview