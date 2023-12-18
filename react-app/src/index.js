import React from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/moviesDetail/movieDetailsPage";
import PeopleDetailsPage from "./pages/peopleDetail/peopleDetailsPage";
import FavoriteMoviesPage from "./pages/personal/favoriteMoviesPage";
import UpcomingMoviesPage from "./pages/movies/upcomingMoviesPage";
import NowPlayingMoviesPage from "./pages/movies/nowPlayingMoviesPage";
import ToWatchMoviesListPage from "./pages/personal/toWatchMoviesListPage";
import MovieReviewPage from "./pages/moviesDetail/movieReviewPage";
import SiteHeader from './components/siteHeader'
import {QueryClientProvider, QueryClient} from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/moviesDetail/addMovieReviewPage'
import WeekTrendingMoviesPage from "./pages/movies/weekTrendingMoviesPage";
import PopularPeoplePage from "./pages/people/popularPeoplePage";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";
import WeekTrendingPeoplePage from "./pages/people/weekTrendingPeoplePage";
import MovieRecommendationsPage from "./pages/movies/movieRecommendationsPage";
import MovieRelatedPeoplePage from "./pages/people/movieRelatedPeoplePage";
import ActorRelatedMoviesPage from "./pages/movies/actorRelatedMoviesPage";
import SignInPage from "./pages/signInPage";
import SignUpPage from "./pages/signUpPage";
import UsersContextProvider from "./contexts/usersContext";
import ProtectedRoutes from "./protectedRoutes";
import AccountProfilePage from "./pages/account/accountProfilePage";
import PersonalReviewsPage from "./pages/personal/personalReviewsPage";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 360000,
            refetchInterval: 360000,
            refetchOnWindowFocus: false
        },
    },
});

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <UsersContextProvider>
                    <MoviesContextProvider>
                        <SiteHeader/>
                        <Routes>
                            <Route path="/people/popular" element={<PopularPeoplePage/>}/>
                            <Route path="/people/weektrending" element={<WeekTrendingPeoplePage/>}/>
                            <Route path="/people/popular/:actorId" element={<PeopleDetailsPage/>}/>
                            <Route path="/movie/:movieId/people/popular/:actorId" element={<PeopleDetailsPage/>}/>
                            <Route path="/people/popular/:id/related_movies" element={<ActorRelatedMoviesPage/>}/>
                            <Route path="/movies/upcoming" element={<UpcomingMoviesPage/>}/>
                            <Route path="/movies/nowplaying" element={<NowPlayingMoviesPage/>}/>
                            <Route path="/movies/weektrending" element={<WeekTrendingMoviesPage/>}/>
                            <Route path="/reviews/:id" element={<MovieReviewPage/>}/>
                            <Route path="/movies/:movieId" element={<MoviePage/>}/>
                            <Route path="/people/popular/:actorId/movies/:movieId" element={<MoviePage/>}/>
                            <Route path="/movies/:id/recommendations" element={<MovieRecommendationsPage/>}/>
                            <Route path="/movies/:id/related_actors" element={<MovieRelatedPeoplePage/>}/>
                            <Route path="/reviews/form" element={<AddMovieReviewPage/>}/>
                            <Route element={<ProtectedRoutes/>}>
                                <Route path="/:username/favorites" element={<FavoriteMoviesPage/>}/>
                                <Route path="/:username/towatchlist" element={<ToWatchMoviesListPage/>}/>
                                <Route path="/:username/reviews" element={<PersonalReviewsPage/>}/>
                                <Route path="/:username/profile" element={<AccountProfilePage/>}/>
                            </Route>
                            <Route path="/signin" element={<SignInPage/>}/>
                            <Route path="/signup" element={<SignUpPage/>}/>
                            <Route path="*" element={<Navigate to="/"/>}/>
                            <Route path="/" element={<HomePage/>}/>
                        </Routes>
                    </MoviesContextProvider>
                </UsersContextProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
};

const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<DevSupport ComponentPreviews={ComponentPreviews}
                               useInitialHook={useInitial}
>
    <App/>
</DevSupport>);
