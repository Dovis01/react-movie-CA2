import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import {Link} from "react-router-dom";
import backgroundImageStyles from "../../theme/background";
import Box from "@mui/material/Box";

export default function MovieCard({movie, action, avatarCheck}) {
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength - 3) + "...";
        }
        return text;
    };

    return (
        <Card sx={{maxWidth: 345}} elevation={5} style={backgroundImageStyles.backgroundCardContainer}>
            <CardHeader
                avatar={
                    avatarCheck(movie)
                }
                title={
                    <Typography variant="h5" component="p" style={{marginLeft: '-7.3px'}}>
                        {truncateText(movie.title, 20)}
                    </Typography>
                }
            />
            <CardMedia
                sx={{height: 500}}
                image={
                    movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : img
                }
            />
            <CardContent>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="p" style={{whiteSpace: 'nowrap'}}>
                            <CalendarIcon fontSize="small"/>
                            {movie.release_date}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="p" style={{whiteSpace: 'nowrap'}}>
                            <Box component="span" ml={3}>
                                <StackedLineChartIcon fontSize="medium"/>
                                {" "} {movie.popularity.toFixed(2)}{" "}
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="p">
                            <Box component="span" ml={1}>
                                <StarRateIcon fontSize="small"/>
                                {" "} {movie.vote_average.toFixed(1)}{" "}
                            </Box>
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions disableSpacing sx={{mb:2}}>
                {action(movie)}
                <Link to={`/movies/${movie.id}`}>
                    <Button variant="outlined" size="medium" color="primary">
                        More Info ...
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}