
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

    const response = await fetch(`http://localhost:8080/api/movies/tmdb/weektrending?page=${page}`, {
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

export const getPopularPeople = (args) => {
    const [, pagePart] = args.queryKey;
    const {page} = pagePart;

    const pageLast = page * 2;
    const pageFirst = pageLast - 1;

    return Promise.all([
        fetch(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${pageFirst}`),
        fetch(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${pageLast}`)
    ])
        .then(responses => {
            for (const response of responses) {
                if (!response.ok) {
                    throw new Error('Problem fetching movies');
                }
            }
            return Promise.all(responses.map(response => response.json()));
        })
        .then(data => {
            const peoplePage1 = data[0].results || [];
            const peoplePage2 = data[1].results || [];
            const combinedPeople = [...peoplePage1, ...peoplePage2];

            return {
                page: pageFirst,
                results: combinedPeople,
                total_results: 10000,
                total_pages: 250
            };
        })
        .catch((error) => {
            throw error;
        });
};

export const getWeekTrendingPeople = (args) => {
    const [, pagePart] = args.queryKey;
    const {page} = pagePart;

    const pageLast = page * 2;
    const pageFirst = pageLast - 1;

    return Promise.all([
        fetch(`https://api.themoviedb.org/3/trending/person/week?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${pageFirst}`),
        fetch(`https://api.themoviedb.org/3/trending/person/week?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${pageLast}`)
    ])
        .then(responses => {
            for (const response of responses) {
                if (!response.ok) {
                    throw new Error('Problem fetching movies');
                }
            }
            return Promise.all(responses.map(response => response.json()));
        })
        .then(data => {
            const peoplePage1 = data[0].results || [];
            const peoplePage2 = data[1].results || [];
            const combinedPeople = [...peoplePage1, ...peoplePage2];

            return {
                page: pageFirst,
                results: combinedPeople,
                total_results: 10000,
                total_pages: 250
            };
        })
        .catch((error) => {
            throw error;
        });
};

export const getPopularPeopleDetail = (args) => {
    const [, idPart] = args.queryKey;
    const {id} = idPart;
    return fetch(
        `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getPeopleImages = ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;
    return fetch(
        `https://api.themoviedb.org/3/person/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();

    })
        .catch((error) => {
            throw error
        });
};

export const getPeopleMovieCredits = ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;
    return fetch(
        `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();

    })
        .catch((error) => {
            throw error
        });
};

export const getPeopleTVCredits = ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;
    return fetch(
        `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();

    })
        .catch((error) => {
            throw error
        });
};