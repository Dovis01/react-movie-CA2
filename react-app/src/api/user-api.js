/**
 * API for user authentication
 * */
export const loginByUsername = async (user) => {
    const response = await fetch('http://localhost:8080/api/users?authMethod=username', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: user.username, password: user.password })
    });
    return response.json();
};

export const loginByEmail = async (user) => {
    const response = await fetch('http://localhost:8080/api/users?authMethod=email', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ email: user.email, password: user.password })
    });
    return response.json();
};

export const signup = async (user) => {
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: user.username, email:user.email, password: user.password })
    });
    return response.json();
};

/**
 * User Reviews API
 * */
export const getUserMovieReviews = async ({queryKey}) => {
    const [,paramsPart] = queryKey;
    const {movieId, username} = paramsPart;
    const response = await fetch(`http://localhost:8080/api/reviews/${username}/movies/${movieId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'get',
    });
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response.json();
};

export const getAllReviewedMoviesByUser = async (username) => {
    const response = await fetch(`http://localhost:8080/api/reviews/${username}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'get',
    });
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response.json();
};

export const getUserMovieSpecificReview = async (username,movieId,reviewId) => {
    const response = await fetch(`http://localhost:8080/api/reviews/${reviewId}/${username}/movies/${movieId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'get',
    });
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response.json();
};

export const addUserMovieSpecificReview = async (username,movieId,review) => {
    const response = await fetch(`http://localhost:8080/api/reviews/${username}/movies/${movieId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'post',
        body: JSON.stringify({ author: review.author, rating:review.rating, content: review.review })
    });
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response.json();
};

export const updateUserMovieSpecificReview = async (username,movieId,review,originalReviewId) => {
    const response = await fetch(`http://localhost:8080/api/reviews/${originalReviewId}/${username}/movies/${movieId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'put',
        body: JSON.stringify({ author: review.author, rating:review.rating, content: review.review })
    });
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response.json();
};

export const deleteUserMovieSpecificReview = async (username,movieId,reviewId) => {
    const response = await fetch(`http://localhost:8080/api/reviews/${reviewId}/${username}/movies/${movieId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'delete',
    });
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response.json();
};
