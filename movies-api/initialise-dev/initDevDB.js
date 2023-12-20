import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import users from './users';
import movies from './movies';
import reviews from './reviews';
import people from './people';
import favorites from "./favorites";
import toWatchList from "./toWatchList";
import User from '../api/users/userModel';
import Movie from '../api/movies/movieModel';
import People from '../api/people/peopleModel';
import Review from '../api/reviews/reviewModel';
import Favorite from '../api/favorites/favoriteModel';
import ToWatchList from '../api/toWatchList/toWatchListModel';

async function main() {
    if (process.env.NODE_ENV !== 'development') {
        console.log('This script is only for the development environment.');
        return;
    }
    await mongoose.connect(process.env.MONGO_DB);
    // Drop collections
    await User.collection.drop().catch(err => console.log('User collection not found'));
    await Movie.collection.drop().catch(err => console.log('Movie collection not found'));
    await People.collection.drop().catch(err => console.log('People collection not found'));
    await Review.collection.drop().catch(err => console.log('Review collection not found'));
    await Favorite.collection.drop().catch(err => console.log('Favorite collection not found'));
    await ToWatchList.collection.drop().catch(err => console.log('ToWatchList collection not found'));
    await User.create(users);
    await Movie.create(movies);
    await People.create(people);
    await Review.create(reviews);
    await Favorite.create(favorites);
    await ToWatchList.create(toWatchList);
    console.log('Database initialised');
    await mongoose.disconnect();
}

main();