import express from 'express';
import dotenv from 'dotenv';
import authenticate from './authenticate';
import moviesRouter from './api/movies';
import peopleRouter from './api/people';
import reviewsRouter from './api/reviews';
import favoritesRouter from './api/favorites';
import usersRouter from './api/users';
import cors from 'cors';
import './db';
import defaultErrHandler from './errHandler';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/movies',  moviesRouter);
app.use('/api/people',  peopleRouter);
app.use('/api/reviews', authenticate,  reviewsRouter);
app.use('/api/favorites', authenticate,  favoritesRouter);
app.use(defaultErrHandler);

app.listen(port, () => {
    console.info(`Server running at ${port}`);
});