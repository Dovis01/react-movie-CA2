import React, {useState} from "react";
import MovieHeader from "../../headerMovie";
import Grid from "@mui/material/Grid";
import {getMovieImages} from "../../../api/tmdb-customized-api";
import {useQuery} from "react-query";
import Spinner from '../../spinner'
import backgroundImageStyles from "../../../theme/background";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const wrapperStyle = {
    position: 'relative',
};

const TemplateMovieReviewFormPage = ({movie, children}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const {data, error, isLoading, isError} = useQuery(
        ["images", {id: movie.id}],
        getMovieImages
    );

    if (isLoading) {
        return <Spinner/>;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    const images = data.posters.slice(0, 8);

    // Function to go to the next image
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Function to go to the previous image
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <>
            <div style={backgroundImageStyles.backgroundDetailContainer}/>
            <div style={wrapperStyle}>
                <MovieHeader movie={movie} sx={{padding: "20px"}}/>
                <Grid container spacing={5} sx={{padding: "20px"}}>
                    <Grid item xs={3} sx={{
                        position: 'relative', // Add a relative position to the container
                    }}>
                        <Button
                            onClick={prevImage}
                            sx={{
                                position: 'absolute', // Position the button absolutely
                                left: 36, // Place it on the left
                                top: '50%', // Center it vertically
                                transform: 'translateY(-50%)', // Adjust the position to center vertically
                                zIndex: 2, // Ensure it's above the image
                            }}
                        >
                            <ArrowBackIosIcon color={"action"} sx={{ fontSize: '5rem', color: 'white' }}  />
                        </Button>
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${images[currentImageIndex].file_path}`}
                            alt={images[currentImageIndex].file_path}
                            style={{
                                height: '700px',
                                width: '100%', // Ensure the image takes the full width of the container
                                display: 'block', // Display block to remove bottom space
                            }}
                        />
                        <Button
                            onClick={nextImage}
                            sx={{
                                position: 'absolute', // Position the button absolutely
                                right: -10, // Place it on the right
                                top: '50%', // Center it vertically
                                transform: 'translateY(-50%)', // Adjust the position to center vertically
                                zIndex: 2, // Ensure it's above the image
                            }}
                        >
                            <ArrowForwardIosIcon color={"action"} sx={{ fontSize: '5rem', color: 'white' }}  />
                        </Button>
                    </Grid>

                    <Grid item xs={9}>
                        {children}
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default TemplateMovieReviewFormPage;