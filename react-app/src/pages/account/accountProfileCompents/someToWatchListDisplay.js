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
import { getUserToWatchList} from "../../../api/user-api";


const ToWatchlistDisplayCard = ({movie,user}) => {
    const navigate = useNavigate();
    const toWatchListMoviesUrl = `/${user.username}/towatchlist`;
    const handleClick = (pageURL) => {
        navigate(pageURL);
    };
    return (
        <Card sx={{width: 196, m: 2, height: '100%'}}>
            <CardActionArea onClick={()=>handleClick(toWatchListMoviesUrl)}>
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

const someToWatchlistDisplay= () => {
    const usersContext = useContext(UsersContext);
    const [toWatchlistMovieIds, setToWatchlistMovieIds] = useState([]);

    useEffect(() => {
        const fetchToWatchList = async () => {
            const toWatchList = await getUserToWatchList(usersContext.user.username);
            setToWatchlistMovieIds(toWatchList.toWatchList);
        };

        fetchToWatchList();
    }, [usersContext.user.username]);

    const toWatchlistMoviesQueries = useQueries(
        toWatchlistMovieIds.map((movieId) => {
            return {
                queryKey: ["movie", { id: movieId }],
                queryFn: getMovie,
            };
        })
    );
    // Check if any of the parallel queries is still loading.
    const isLoading = toWatchlistMoviesQueries.find((m) => m.isLoading === true);

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
            {toWatchlistMoviesQueries.map((query) => (

                <Box
                    key={query.data.id}
                    sx={{display: 'inline-flex', height: '100%'}}
                >
                    <ToWatchlistDisplayCard movie={query.data} user={usersContext.user}/>
                </Box>
            ))}
        </Box>
    );
}

export default someToWatchlistDisplay;