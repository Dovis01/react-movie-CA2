import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useQuery} from "react-query";
import {getPeopleMovieCredits} from "../../api/tmdb-api";
import Spinner from "../spinner";
import React from "react";
import {CardActionArea} from "@mui/material";
import {useNavigate} from "react-router-dom";
import StarRateIcon from "@mui/icons-material/StarRate";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import RecentActorsIcon from '@mui/icons-material/RecentActors';


const MovieCreditsCard = ({movie,actor}) => {
    const navigate = useNavigate();
    const movieDetailUrl = `/people/popular/${actor.id}/movies/${movie.id}`;
    const handleMovieCreditsClick = (pageURL) => {
        navigate(pageURL);
    };
    return (
        <Card sx={{width: 196, m: 2, height: '100%'}}>
            <CardActionArea onClick={() => handleMovieCreditsClick(movieDetailUrl)}>
                <CardMedia
                    component="img"
                    height="260"
                    image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                />
                <CardContent sx={{ height: 125 }}>
                    <Typography gutterBottom variant="h6" component="div">
                        {movie.title}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }} component="span" ml={0.3}>
                        <RecentActorsIcon fontSize="medium" sx={{ marginRight: '8px' }}/>
                        <Typography variant="body2" component="span" >
                            {movie.character}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }} component="span" ml={0.3}>
                        <CalendarIcon fontSize="small" sx={{ marginRight: '11px' }}/>
                        <Typography variant="body2" component="span">
                            {movie.release_date}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }} component="span" ml={0.3}>
                        <StarRateIcon fontSize="small" sx={{ marginRight: '11px' }}/>
                        <Typography variant="body2" component="span">
                            {" "}{movie.vote_average.toFixed(1)}{" "}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default function PeopleDetailMovieCredits ({actor}) {
    const {data, error, isLoading, isError} = useQuery(
        ["movieCredits", {id: actor.id}],
        getPeopleMovieCredits
    );

    if (isLoading) {
        return <Spinner/>;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const movieCreditsCast = data.cast;
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            // 添加这些样式来定制滚动条
            '&::-webkit-scrollbar': {
                height: '8px',  // 水平滚动条的高度
            },
            '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 5px grey',  // 滑道颜色
                borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
                background: 'darkgrey',  // 滑块颜色
                borderRadius: '10px',
                '&:hover': {
                    background: 'rgba(150,229,239,0.62)',  // 滑块悬停时的颜色
                },
            },
            // 对于Firefox浏览器
            scrollbarWidth: 'thin',
            scrollbarColor: 'darkgrey grey',
        }}>
            {movieCreditsCast.map((movie, index) => (
                <Box
                    key={movie.id} //使用 movie 的唯一标识作为 key
                    sx={{display: 'inline-flex', height: '100%'}} // 设置为内联Flex以保持对齐
                >
                    <MovieCreditsCard movie={movie} actor={actor}/>
                </Box>
            ))}
        </Box>
    );
}