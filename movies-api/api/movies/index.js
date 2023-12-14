import movieModel from './movieModel';
import {
    getDiscoverMovies,
    getGenres, getMovie,
    getMovieImages,
    getNowPlayingMovies,
    getUpcomingMovies,
    getWeekTrendingMovies
} from '../tmdb-api';
import asyncHandler from 'express-async-handler';
import express from 'express';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page)

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

router.get('/tmdb/discover', asyncHandler(async (req, res) => {
    const { page } = req.query;
    const discoverMovies = await getDiscoverMovies(page);
    res.status(200).json(discoverMovies);
}));

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const { page } = req.query;
    const upcomingMovies = await getUpcomingMovies(page);
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/nowplaying', asyncHandler(async (req, res) => {
    const { page } = req.query;
    const nowPlayingMovies = await getNowPlayingMovies (page);
    res.status(200).json(nowPlayingMovies);
}));

router.get('/tmdb/weektrending', asyncHandler(async (req, res) => {
    const { page } = req.query;
    const weekTrendingMovies = await getWeekTrendingMovies(page);
    res.status(200).json(weekTrendingMovies);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genresList = await getGenres();
    res.status(200).json(genresList);
}));

router.get('/tmdb/movies/:id/images', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const imageList = await getMovieImages(id);
    res.status(200).json(imageList);
}));

router.get('/tmdb/movie/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const movie = await getMovie(id);
    res.status(200).json(movie);
}));

export default router;