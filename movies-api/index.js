import express from 'express';
import dotenv from 'dotenv';
import authenticate from './authenticate';
import moviesRouter from './api/movies';
import peopleRouter from './api/people';
import reviewsRouter from './api/reviews';
import favoritesRouter from './api/favorites';
import toWatchListRouter from './api/toWatchList';
import usersRouter from './api/users';
import userUpdateRouter from './api/users/updateUser';
import userDeleteRouter from './api/users/deleteUser';
import cors from 'cors';
import './db';
import defaultErrHandler from './errHandler';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb', extended: true }));

app.use('/api/users', usersRouter);
app.use('/api/user/update', authenticate, userUpdateRouter);
app.use('/api/user/delete', authenticate, userDeleteRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/people', peopleRouter);
app.use('/api/reviews', authenticate, reviewsRouter);
app.use('/api/favorites', authenticate, favoritesRouter);
app.use('/api/toWatchList', authenticate, toWatchListRouter);
app.use(defaultErrHandler);

app.listen(port, () => {
    console.info(`Server running at ${port}`);
});