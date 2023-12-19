import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    username: {type: String, required: true},
    movieId: {type: Number, required: true},
    reviews: [{
        review: {
            author: {type: String, required: true},
            rating: {type: Number, required: true},
            content: {type: String, required: true},
        }
    }],
});

ReviewSchema.statics.findByUserNameAndMovieId = function (username,movieId) {
    return this.findOne({ username: username, movieId: movieId });
};

export default mongoose.model('Review', ReviewSchema);