import reviewModel from './reviewModel';
import asyncHandler from 'express-async-handler';
import express from 'express';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 5 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using reviewModel
    const [total_results, results] = await Promise.all([
        reviewModel.estimatedDocumentCount(),
        reviewModel.find().limit(limit).skip((page - 1) * limit)
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
router.get('/:username/movies/:movieId', asyncHandler(async (req, res) => {
    const movieId = parseInt(req.params.movieId);
    const username = req.params.username;
    const reviews = await reviewModel.findByUserNameAndMovieId(username,movieId);
    if (reviews) {
        res.status(200).json(reviews);
    } else {
        res.status(404).json({message: 'The reviews you requested could not be found.', status_code: 404});
    }
}));

export default router;