import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import users from './users';
import movies from './movies';
import people from './people';
import User from '../api/users/userModel';
import Movie from '../api/movies/movieModel';
import People from '../api/people/peopleModel';

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
    await User.create(users);
    await Movie.create(movies);
    await People.create(people);
    console.log('Database initialised');
    await mongoose.disconnect();
}

main();