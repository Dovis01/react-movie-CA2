import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useQuery} from "react-query";
import {getMovieCredits, getMovieVideos} from "../../api/tmdb-api";
import Spinner from "../spinner";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import React, {useState} from "react";
import {CardActionArea, Dialog} from "@mui/material";
import {useNavigate} from "react-router-dom";



const ActorCard = ({actor,movie}) => {
    const navigate = useNavigate();
    const actorDetailUrl = `/movie/${movie.id}/people/popular/${actor.id}`;
    const handleActorClick = (pageURL) => {
        navigate(pageURL);
    };
    return (
        <Card sx={{width: 196, m: 2, height: '100%'}}>
            <CardActionArea onClick={() => handleActorClick(actorDetailUrl)}>
                <CardMedia
                    component="img"
                    height="260"
                    image={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                    alt={actor.name}
                />
                <CardContent sx={{height: 90}}>
                    <Typography gutterBottom variant="h6" component="div">
                        {actor.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {actor.character}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {actor.known_for_department}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

const ActorScrollList = ({actors,movie}) => {
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
            {actors.map((actor, index) => (
                <Box
                    key={actor.id} //使用 actor 的唯一标识作为 key
                    sx={{display: 'inline-flex', height: '100%'}} // 设置为内联Flex以保持对齐
                >
                    <ActorCard actor={actor} movie={movie}/>
                </Box>
            ))}
        </Box>
    );
};

const MovieVideos = ({movie}) => {
    const {data, error, isLoading, isError} = useQuery(
        ["movieVideo", {id: movie.id}],
        getMovieVideos
    );
    const [open, setOpen] = useState(null);
    if (isLoading) {
        return <Spinner/>;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const videos = [...data.results.slice(0, 2)];
    return (
        <div>
            {videos.map((video, index) => (
                <div key={video.id} style={{marginBottom: '20px'}}>
                    <Card sx={{
                        maxWidth: 1340,
                        marginLeft: '16px',
                    }}>
                        <CardActionArea onClick={() => setOpen(video.id)}>
                            <CardMedia
                                component="img"
                                sx={{
                                    height: 885, // 自定义高度，根据需要调整
                                    width: '100%', // 使图片宽度占满卡片宽度
                                }}
                                image={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                                alt="Video Thumbnail"
                            />
                            <PlayCircleOutlineIcon
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    fontSize: '3rem',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                                    },
                                }}
                            />
                        </CardActionArea>
                    </Card>
                    <Dialog
                        open={open === video.id}
                        onClose={() => setOpen(null)}
                        aria-labelledby="video-dialog-title"
                        maxWidth="xl"
                        fullWidth={true}
                    >
                        <iframe
                            width="100%"
                            height="900"
                            src={`https://www.youtube.com/embed/${video.key}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </Dialog>
                </div>
            ))}
        </div>
    );
}

export default function MovieDetailActorVideo({movie}) {
    const {data, error, isLoading, isError} = useQuery(
        ["movieCredits", {id: movie.id}],
        getMovieCredits
    );

    if (isLoading) {
        return <Spinner/>;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    const actors = [...data.cast];

    return (
        <>
            <ActorScrollList actors={actors} movie={movie}/>
            <br/>
            <MovieVideos movie={movie}/>
        </>
    );

}