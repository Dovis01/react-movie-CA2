import React, {useEffect, useState} from "react";
import Header from "../../headerMovieList";
import FilterCard from "../../filterMoviesCard";
import MovieList from "../../movieList";
import Grid from "@mui/material/Grid";
import backgroundImageStyles from "../../../theme/background";
import Paper from "@mui/material/Paper";
import {Pagination, Stack} from "@mui/material";


function MovieListPageTemplate({movies, title, action, avatarCheck, pageChange, currentPage,totalPages}) {
    const [nameFilter, setNameFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("0");
    const [releaseYearFilter, setReleaseYearFilter] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [displayedMovies, setDisplayedMovies] = useState(movies);
    const genreId = Number(genreFilter);

    const handleChange = (type, value) => {
        if (type === "name") setNameFilter(value);
        else if (type === "year") setReleaseYearFilter(value);
        else if (type === "sort") setSortOption(value);
        else if (type === "sortOrder") setSortOrder(value);
        else setGenreFilter(value);
    };

    useEffect(() => {
        let processedMovies = movies
            .filter(m => m.title.toLowerCase().includes(nameFilter.toLowerCase()))
            .filter(m => m.release_date.substring(0, 4).includes(releaseYearFilter))
            .filter(m => (genreId > 0 ? m.genre_ids.includes(genreId) : true));

        if (sortOption === "popularity" && sortOrder !== "none" && sortOrder) {
            processedMovies = processedMovies.sort((a, b) => {
                return sortOrder === 'desc' ? b.popularity - a.popularity : a.popularity - b.popularity;
            });
        } else if (sortOption === "vote_average" && sortOrder !== "none" && sortOrder) {
            processedMovies = processedMovies.sort((a, b) => {
                return sortOrder === 'desc' ? b.vote_average - a.vote_average : a.vote_average - b.vote_average;
            });
        }
        setDisplayedMovies(processedMovies);
    },  [movies, nameFilter, releaseYearFilter, genreId, sortOption, sortOrder]);


    const selectSortOption = (selectedOption) => {
        if (selectedOption === "none") {
            setSortOption(null);
        }
    };

    const selectSortOrder = (selectedOrder) => {
        if (selectedOrder === "none") {
            setSortOrder(null);
        }
    };

    return (
        <Grid container sx={{padding: '20px'}} style={backgroundImageStyles.backgroundMainContainer}>
            <Grid item xs={12}>
                <Header title={title}/>
            </Grid>
            <Grid item container spacing={5}>
                <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <FilterCard
                        onUserInput={handleChange}
                        titleFilter={nameFilter}
                        genreFilter={genreFilter}
                        sortOption={sortOption}
                        sortOrder={sortOrder}
                        selectSortOption={selectSortOption}
                        selectSortOrder={selectSortOrder}
                        releaseYearFilter={releaseYearFilter}
                    />
                </Grid>
                <MovieList action={action} movies={displayedMovies} avatarCheck={avatarCheck}></MovieList>
            </Grid>
            <Paper
                elevation={5}
                component="div"
                sx={{
                    display: "flex",
                    marginTop: 2.0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    position: 'relative',
                    padding: 1.1,
                }}
            >
                <Stack spacing={2}>
                    <Pagination count={totalPages} page={currentPage} onChange={pageChange} variant="outlined"
                                shape="rounded" size="large" boundaryCount={2} showFirstButton showLastButton/>
                </Stack>
            </Paper>
        </Grid>
    );
}

export default MovieListPageTemplate;