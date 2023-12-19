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
