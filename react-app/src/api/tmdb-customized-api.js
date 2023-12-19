export const getMovies = async (args) => {
    const [, pagePart] = args.queryKey;
    const {page} = pagePart;

    const response = await fetch(`http://localhost:8080/api/movies/tmdb/discover?page=${page}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'get',
    });
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response.json();
};

export const getUpcomingMovies = async (args) => {
    const [, pagePart] = args.queryKey;
    const {page} = pagePart;

    const response = await fetch(`http://localhost:8080/api/movies/tmdb/upcoming?page=${page}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'get',
    });
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response.json();
};


export const getNowPlayingMovies = async (args) => {
    const [, pagePart] = args.queryKey;
    const {page} = pagePart;

    const response = await fetch(`http://localhost:8080/api/movies/tmdb/nowplaying?page=${page}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'get',
    });
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response.json();
};

export const getWeekTrendingMovies = async (args) => {
    const [, pagePart] = args.queryKey;
    const {page} = pagePart;

    const response = await fetch(`http://localhost:8080/api/movies/tmdb/week_trending?page=${page}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'get',
    });
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response.json();
};

export const getMovieRecommendations =async (args) => {
    const [, pageIdPart] = args.queryKey;
    const {page,id} = pageIdPart;

    const response = await fetch(`http://localhost:8080/api/movies/tmdb/${id}/recommendations?page=${page}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'get',
    });
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response.json();
};

export const getMovie = async (args) => {
    const [, idPart] = args.queryKey;
    const {id} = idPart;

    const response = await fetch(`http://localhost:8080/api/movies/tmdb/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'get',
    });
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response.json();
};

export const getMovieInSignIn = async (id) => {
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'get',
    });
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response.json();
};

export const getGenres = async () => {
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/genres`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'get',
    });
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response.json();
};

export const getMovieImages = async ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;

    const response = await fetch(`http://localhost:8080/api/movies/tmdb/${id}/images`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'get',
    });
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response.json();
};


export const getMovieVideos =async ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;

    const response = await fetch(`http://localhost:8080/api/movies/tmdb/${id}/videos`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'get',
    });
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response.json();
};

export const getMovieCredits = async ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;

    const response = await fetch(`http://localhost:8080/api/movies/tmdb/${id}/credits`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'get',
    });
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response.json();
};

export const getMovieReviews = async ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;

    const response = await fetch(`http://localhost:8080/api/movies/tmdb/${id}/reviews`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'get',
    });
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response.json();
};

export const getPopularPeople = async (args) => {
    const [, pagePart] = args.queryKey;
    const {page} = pagePart;

    const response = await fetch(`http://localhost:8080/api/people/tmdb/popular_people?page=${page}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'get',
    });
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response.json();
};

export const getWeekTrendingPeople = async (args) => {
    const [, pagePart] = args.queryKey;
    const {page} = pagePart;

    const response = await fetch(`http://localhost:8080/api/people/tmdb/week_trending?page=${page}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'get',
    });
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response.json();
};

export const getPopularPeopleDetail = async (args) => {
    const [, idPart] = args.queryKey;
    const {id} = idPart;

    const response = await fetch(`http://localhost:8080/api/people/tmdb/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'get',
    });
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response.json();
};

export const getPeopleImages = async ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;

    const response = await fetch(`http://localhost:8080/api/people/tmdb/${id}/images`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'get',
    });
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response.json();
};

export const getPeopleMovieCredits =async ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;

    const response = await fetch(`http://localhost:8080/api/people/tmdb/${id}/movie_credits`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'get',
    });
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response.json();
};

export const getPeopleTVCredits = async ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;

    const response = await fetch(`http://localhost:8080/api/people/tmdb/${id}/tv_credits`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'get',
    });
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return response.json();
};