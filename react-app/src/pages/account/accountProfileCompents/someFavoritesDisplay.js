import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useQueries} from "react-query";
import {getMovie} from "../../../api/tmdb-customized-api";
import Spinner from "../../../components/spinner";
import React, {useContext, useEffect, useState} from "react";
import {CardActionArea} from "@mui/material";
import {useNavigate} from "react-router-dom";
import StarRateIcon from "@mui/icons-material/StarRate";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import {UsersContext} from "../../../contexts/usersContext";
import {getUserFavorites} from "../../../api/user-api";


const FavoritesDisplayCard = ({movie,user}) => {
    const navigate = useNavigate();
    const favoriteMovieUrl = `/${user.username}/favorites`;
    const handleClick = (pageURL) => {
        navigate(pageURL);
    };
    return (
        <Card sx={{width: 196, m: 2, height: '100%'}}>
            <CardActionArea onClick={()=>handleClick(favoriteMovieUrl)}>
                <CardMedia
                    component="img"
                    height="260"
                    image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                />
                <CardContent sx={{height: 125}}>
                    <Typography gutterBottom variant="h6" component="div">
                        {movie.title}
                    </Typography>
                    <Box sx={{display: "flex", alignItems: "center"}} component="span" ml={0.3}>
                        <RecentActorsIcon fontSize="medium" sx={{marginRight: '8px'}}/>
                        <Typography variant="body2" component="span">
                            {movie.character}
                        </Typography>
                    </Box>
                    <Box sx={{display: "flex", alignItems: "center"}} component="span" ml={0.3}>
                        <CalendarIcon fontSize="small" sx={{marginRight: '11px'}}/>
                        <Typography variant="body2" component="span">
                            {movie.release_date}
                        </Typography>
                    </Box>
                    <Box sx={{display: "flex", alignItems: "center"}} component="span" ml={0.3}>
                        <StarRateIcon fontSize="small" sx={{marginRight: '11px'}}/>
                        <Typography variant="body2" component="span">
                            {" "}{movie.vote_average.toFixed(1)}{" "}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

const someFavoritesDisplay= () => {
    const usersContext = useContext(UsersContext);
    const [favoritesMovieIds, setFavoritesMovieIds] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const favorites = await getUserFavorites(usersContext.user.username);
            setFavoritesMovieIds(favorites.favorites);
        };

        fetchFavorites();
    }, [usersContext.user.username]);

    const favoriteMoviesQueries = useQueries(
        favoritesMovieIds.map((movieId) => {
            return {
                queryKey: ["movie", { id: movieId }],
                queryFn: getMovie,
            };
        })
    );
    // Check if any of the parallel queries is still loading.
    const isLoading = favoriteMoviesQueries.find((m) => m.isLoading === true);

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            '&::-webkit-scrollbar': {
                height: '8px',
            },
            '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 5px grey',
                borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
                background: 'darkgrey',
                borderRadius: '10px',
                '&:hover': {
                    background: 'rgba(150,229,239,0.62)',
                },
            },
            scrollbarWidth: 'thin',
            scrollbarColor: 'darkgrey grey',
        }}>
            {favoriteMoviesQueries.map((query) => (

                <Box
                    key={query.data.id}
                    sx={{display: 'inline-flex', height: '100%'}}
                >
                    <FavoritesDisplayCard movie={query.data} user={usersContext.user}/>
                </Box>
            ))}
        </Box>
    );
}

export default someFavoritesDisplay;