import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useQuery} from "react-query";
import {getPeopleTVCredits} from "../../api/tmdb-api";
import Spinner from "../spinner";
import React from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import RecentActorsIcon from '@mui/icons-material/RecentActors';


const TVCreditsCard = ({tv}) => {
    return (
        <Card sx={{width: 326, m: 2, height: '100%'}}>
            <CardMedia
                component="img"
                height="460"
                image={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
                alt={tv.title}
            />
            <CardContent sx={{height: 125}}>
                <Typography gutterBottom variant="h6" component="div">
                    {tv.name}
                </Typography>
                <Box sx={{display: "flex", alignItems: "center"}} component="span" ml={0.3}>
                    <RecentActorsIcon fontSize="medium" sx={{marginRight: '8px'}}/>
                    <Typography variant="h7" component="span">
                        {tv.character}
                    </Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center"}} component="span" ml={0.3}>
                    <CalendarIcon fontSize="small" sx={{marginRight: '11px'}}/>
                    <Typography variant="h7" component="span">
                        {tv.first_air_date}
                    </Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center"}} component="span" ml={0.3}>
                    <StarRateIcon fontSize="small" sx={{marginRight: '13px'}}/>
                    <Typography variant="h7" component="span">
                        {" "}{tv.vote_average.toFixed(1)}{" "}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default function PeopleDetailTVCredits({actor}) {
    const {data, error, isLoading, isError} = useQuery(
        ["tvCredits", {id: actor.id}],
        getPeopleTVCredits
    );

    if (isLoading) {
        return <Spinner/>;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const tvCreditsCast = data.cast;
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
            {tvCreditsCast.map((tv, index) => (
                <Box
                    key={tv.id} //使用 tv 的唯一标识作为 key
                    sx={{display: 'inline-flex', height: '100%'}} // 设置为内联Flex以保持对齐
                >
                    <TVCreditsCard tv={tv}/>
                </Box>
            ))}
        </Box>
    );
}