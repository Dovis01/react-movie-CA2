import peopleModel from './peopleModel';
import {
    getPeopleImages, getPeopleMovieCredits, getPeopleTVCredits,
    getPopularPeople, getPopularPeopleDetail, getWeekTrendingPeople,
} from '../tmdb-api';
import asyncHandler from 'express-async-handler';
import express from 'express';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 2 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using peopleModel
    const [total_results, results] = await Promise.all([
        peopleModel.estimatedDocumentCount(),
        peopleModel.find().limit(limit).skip((page - 1) * limit)
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

// Get people details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const person = await peopleModel.findByPeopleId(id);
    if (person) {
        res.status(200).json(person);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));


/**
 * From TMDB API
 * */

router.get('/tmdb/popular_people', asyncHandler(async (req, res) => {
    const { page } = req.query;
    const popularPeople = await getPopularPeople(page);
    res.status(200).json(popularPeople);
}));

router.get('/tmdb/week_trending', asyncHandler(async (req, res) => {
    const { page } = req.query;
    const weekTrendingPeople = await getWeekTrendingPeople(page);
    res.status(200).json(weekTrendingPeople);
}));

router.get('/tmdb/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const person = await getPopularPeopleDetail (id);
    res.status(200).json(person);
}));

router.get('/tmdb/:id/images', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const imagesList = await getPeopleImages(id);
    res.status(200).json(imagesList);
}));

router.get('/tmdb/:id/movie_credits', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const movieCreditsList = await getPeopleMovieCredits(id);
    res.status(200).json(movieCreditsList);
}));

router.get('/tmdb/:id/tv_credits', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const tvCreditsList = await getPeopleTVCredits(id);
    res.status(200).json(tvCreditsList);
}));

export default router;