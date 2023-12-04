import React, {useState} from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";


const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = {margin: 0.5};

const MovieDetails = ({movie}) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="p">
                {movie.overview}
            </Typography>

            <Paper
                elevation={2}
                component="ul"
                sx={{
                    ...root,
                    marginTop: "1em",
                }}
            >
                <li>
                    <Chip label="Genres" sx={{...chip}} color="primary"/>
                </li>
                {movie.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} sx={{...chip}}/>
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={{...root}}>
                <Chip icon={<AccessTimeIcon/>} label={`${movie.runtime} min.`}/>
                <Chip
                    icon={<MonetizationIcon/>}
                    label={`${movie.revenue.toLocaleString()}`}
                />
                <Chip
                    icon={<StarRate/>}
                    label={`${movie.vote_average} (${movie.vote_count}`}
                />
                <Chip label={`Released: ${movie.release_date}`}/>
            </Paper>
            <Paper component="ul" sx={{...root}}>
                <li>
                    <Chip label="Production Companies" sx={{...chip}} color="primary"/>
                </li>
                {movie.production_companies.map((company) => (
                    <li key={company.name}>
                        <Button
                            variant="outlined"
                            sx={{
                                ...chip,
                                borderRadius: '16px', // 保持椭圆形状
                                color: 'grey',
                                borderColor: 'grey',
                                textTransform: 'none', // 防止字母大写
                                '&:hover': {
                                    borderColor: 'grey', // 鼠标悬停时边框颜色
                                    backgroundColor: 'rgba(0, 0, 0, 0.08)' // 鼠标悬停时的背景颜色，根据需要调整
                                }
                            }}
                        >
                            {company.name}
                        </Button>
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={{...root}}>
                <li>
                    <Chip label="Production Countries" sx={{...chip}} color="primary"/>
                </li>
                {movie.production_countries.map((country) => (
                    <li key={country.name}>
                        <Chip label={country.name} sx={{...chip}}/>
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={{...root}}>
                <Link to={`/movies/${movie.id}/recommendations`}>
                    <Button variant="contained" size="small" color="primary" sx={{
                        borderRadius: '20px', // 增加borderRadius以获得椭圆形的按钮
                        marginBottom: '1em',  // 增加marginBottom以增加下间距
                    }}>
                        More Movie Recommendations ...
                    </Button>
                </Link>
                <Link to={`/movies/${movie.id}/related_actors`}>
                    <Button variant="contained" size="small" color="primary" sx={{
                        borderRadius: '20px', // 增加borderRadius以获得椭圆形的按钮
                        marginBottom: '1em',  // 增加marginBottom以增加下间距
                        marginLeft: '1em',
                    }}>
                        Show All Movie Related Credits ...
                    </Button>
                </Link>
            </Paper>

            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={{
                    position: 'fixed',
                    bottom: '1em',
                    right: '1em'
                }}
            >
                <NavigationIcon/>
                Reviews
            </Fab>
            <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <MovieReviews movie={movie}/>
            </Drawer>
        </>
    );
};
export default MovieDetails;