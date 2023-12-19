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

const TemplateMovieReviewsPage = ({movie, children}) => {
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
                        position: 'relative',
                    }}>
                        <Button
                            onClick={prevImage}
                            sx={{
                                position: 'absolute',
                                left: 36,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 2,
                            }}
                        >
                            <ArrowBackIosIcon color={"action"} sx={{ fontSize: '5rem', color: 'white' }}  />
                        </Button>
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${images[currentImageIndex].file_path}`}
                            alt={images[currentImageIndex].file_path}
                            style={{
                                height: '700px',
                                width: '100%',
                                display: 'block',
                            }}
                        />
                        <Button
                            onClick={nextImage}
                            sx={{
                                position: 'absolute',
                                right: -10,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 2,
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

export default TemplateMovieReviewsPage;