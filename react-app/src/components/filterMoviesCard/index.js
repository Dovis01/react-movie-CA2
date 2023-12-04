import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import colorTheme from "../../theme/adjustColor";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'
import {getGenres} from "../../api/tmdb-api";
import {useQuery} from "react-query";
import Spinner from '../spinner'

const formControl =
    {
        margin: 1,
        minWidth: 220,
        backgroundColor: "rgb(255, 255, 255)"
    };

export default function FilterMoviesCard(props) {

    const {data, error, isLoading, isError} = useQuery("genres", getGenres);
    const sortOptions = [
        {id: "none", name: "None"},
        {id: "popularity", name: "Popularity"},
        {id: "vote_average", name: "Rating"}
    ];
    const sortOrder= [
        {id: "none", name: "None"},
        {id: "asc", name: "Asc"},
        {id: "desc", name: "Desc"}
    ];

    if (isLoading) {
        return <Spinner/>;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    const genres = data.genres;
    if (genres[0].name !== "All") {
        genres.unshift({id: "0", name: "All"});
    }

    const handleChange = (e, type, value) => {
        e.preventDefault();
        props.onUserInput(type, value); // NEW
        if (type === "sort") {
            props.selectSortOption(value);
        }
        if (type === "sortOrder") {
            props.selectSortOrder(value);
        }
    };

    const handleTextChange = (e) => {
        handleChange(e, "name", e.target.value);
    };

    const handleGenreChange = (e) => {
        handleChange(e, "genre", e.target.value);
    };
    const handleReleaseYearChange = (e) => {
        handleChange(e, "year", e.target.value);
    }
    const handleSortChange = (e) => {
        handleChange(e, "sort", e.target.value);
    }
    const handleSortOrderChange = (e) => {
        handleChange(e, "sortOrder", e.target.value);
    }

    return (
        <Card
            sx={{
                maxWidth: 345,
                backgroundColor: colorTheme.palette.primary.dark
            }}
            variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h1">
                    <SearchIcon fontSize="large"/>
                    Filter the movies.
                </Typography>
                <TextField
                    sx={{...formControl}}
                    id="filled-search"
                    label="Search movie name"
                    type="search"
                    variant="filled"
                    value={props.titleFilter}
                    onChange={handleTextChange}
                />
                <FormControl sx={{...formControl}}>
                    <InputLabel id="genre-label">Genre</InputLabel>
                    <Select
                        labelId="genre-label"
                        id="genre-select"
                        defaultValue=""
                        value={props.genreFilter}
                        onChange={handleGenreChange}
                    >
                        {genres.map((genre) => {
                            return (
                                <MenuItem key={genre.id} value={genre.id}>
                                    {genre.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <TextField
                    sx={{...formControl}}
                    id="release-year-search"
                    label="Search release year"
                    type="search"
                    variant="filled"
                    value={props.releaseYearFilter}
                    onChange={handleReleaseYearChange}
                />
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <FormControl sx={{flex: 3, marginRight: '8px', backgroundColor: "rgb(255, 255, 255)", margin: 1}}>
                        <InputLabel id="sort-label">Sort</InputLabel>
                        <Select
                            labelId="sort-label"
                            id="sort-option-select"
                            defaultValue=""
                            value={props.sortOption}
                            onChange={handleSortChange}
                        >
                            {sortOptions.map((option) => {
                                return (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>

                    <FormControl sx={{flex: 2, marginLeft: '8px', backgroundColor: "rgb(255, 255, 255)", margin: 1}}>
                        <InputLabel id="sort-label">SortOrder</InputLabel>
                        <Select
                            labelId="sort-order-label"
                            id="sort-order-select"
                            defaultValue=""
                            value={props.sortOrder}
                            onChange={handleSortOrderChange}
                        >
                            {sortOrder.map((order) => {
                                return (
                                    <MenuItem key={order.id} value={order.id}>
                                        {order.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </div>
            </CardContent>
            <CardMedia
                sx={{height: 300}}
                image={img}
                title="Filter"
            />
            <CardContent>
                <Typography variant="h5" component="h1">
                    <SearchIcon fontSize="large"/>
                    Filter the movies.
                    <br/>
                </Typography>
            </CardContent>
        </Card>
    );
}