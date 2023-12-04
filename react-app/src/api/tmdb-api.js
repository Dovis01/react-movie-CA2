export const getMovies = (args) => {
    const [, pagePart] = args.queryKey;
    const {page} = pagePart;

    const pageLast = page * 2;
    const pageFirst = pageLast - 1;

    return Promise.all([
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${pageFirst}`),
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${pageLast}`)
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
            const moviesPage1 = data[0].results || [];
            const moviesPage2 = data[1].results || [];
            const combinedMovies = [...moviesPage1, ...moviesPage2];

            return {
                page: pageFirst,
                results: combinedMovies,
                total_results: 10000,
                total_pages: 250
            };
        })
        .catch((error) => {
            throw error;
        });
};

export const getMovie = (args) => {
    //console.log(args) -> queryKey JSON
    const [, idPart] = args.queryKey;
    const {id} = idPart;
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
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

export const getGenres = async () => {
    return fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        process.env.REACT_APP_TMDB_KEY +
        "&language=en-US"
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

export const getMovieImages = ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
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

export const getMovieVideos = ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_TMDB_KEY}`
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

export const getMovieCredits = ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
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


export const getMovieReviews = ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();

    }).catch((error) => {
        throw error
    });
};

export const getUpcomingMovies = (args) => {
    const [, pagePart] = args.queryKey;
    const {page} = pagePart;

    const pageLast = page * 2;
    const pageFirst = pageLast - 1;

    return Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${pageFirst}`),
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${pageLast}`)
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
            const moviesPage1 = data[0].results || [];
            const moviesPage2 = data[1].results || [];
            const combinedMovies = [...moviesPage1, ...moviesPage2];

            return {
                page: pageFirst,
                results: combinedMovies,
                total_results: 537,
                total_pages: 14
            };
        })
        .catch((error) => {
            throw error;
        });
};


export const getNowPlayingMovies = (args) => {
    const [, pagePart] = args.queryKey;
    const {page} = pagePart;

    const pageLast = page * 2;
    const pageFirst = pageLast - 1;

    return Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${pageFirst}`),
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${pageLast}`)
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
            const moviesPage1 = data[0].results || [];
            const moviesPage2 = data[1].results || [];
            const combinedMovies = [...moviesPage1, ...moviesPage2];

            return {
                page: pageFirst,
                results: combinedMovies,
                total_results: 2003,
                total_pages: 51
            };
        })
        .catch((error) => {
            throw error;
        });
};

export const getWeekTrendingMovies = (args) => {
    const [, pagePart] = args.queryKey;
    const {page} = pagePart;

    const pageLast = page * 2;
    const pageFirst = pageLast - 1;

    return Promise.all([
        fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${pageFirst}`),
        fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${pageLast}`)
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
            const moviesPage1 = data[0].results || [];
            const moviesPage2 = data[1].results || [];
            const combinedMovies = [...moviesPage1, ...moviesPage2];

            return {
                page: pageFirst,
                results: combinedMovies,
                total_results: 4000,
                total_pages: 100
            };
        })
        .catch((error) => {
            throw error;
        });
};

export const getMovieRecommendations = (args) => {
    const [, pageIdPart] = args.queryKey;
    const {page,id} = pageIdPart;

    const pageLast = page * 2;
    const pageFirst = pageLast - 1;

    return Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${pageFirst}`),
        fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${pageLast}`)
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
            const moviesPage1 = data[0].results || [];
            const moviesPage2 = data[1].results || [];
            const combinedMovies = [...moviesPage1, ...moviesPage2];

            return {
                page: pageFirst,
                results: combinedMovies,
                total_results: combinedMovies.length,
                total_pages: Math.floor(combinedMovies.length/40)+1
            };
        })
        .catch((error) => {
            throw error;
        });
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