# Assignment 2 - Web API.

Name: Shijin Zhang

WebAPI CA2 Recorded Video in YouTuBe: [https://youtu.be/wkSaZKaa3jA](https://youtu.be/wkSaZKaa3jA)

## Features.

###### **Feature 1 - Add related APIs on users’  personal reviews** 

+ Related calling functions：
  1. View all the movies that users have reviewed, as well as all the specific reviews related to that movie.
  2. Added a new page for displaying individual reviews, similar to the favorite page, which displays a movie card that has been reviewed, and by clicking a button, you can see all the specific reviews that the user has made for that movie.
  3. Delete a review of a movie. When the last review is deleted, the movie becomes unreviewed by the user. Delete the movie card from the reviewed movie page above.
  4. The new update comment content page is implemented. When the existing comment is updated, the form will automatically supplement the existing comment content, and users can modify and update the comment on this basis.

###### **Feature 2 - Add related APIs on users’  personal favorites** 

+ The user logs in with access to the user's favorite movie information stored in the database for initialization.
+ Each user addition or deletion is recorded in the database.

###### **Feature 3 - Add related APIs on users’  personal toWatchList**

+ The user logs in and accesses the user's To Watch List movie information stored in the database for initialization.
+ Each user addition or deletion is recorded in the database.

###### **Feature 4 - Add related APIs on users’  personal information**

+ Added a user profile page to view all relevant data storage information for the current user:
  1. Avatar, number of favorite movies, number of movies taken, number of movies reviewed, all relevant personal information.
  2. For uploading the user avatar, I read the uploaded image file and converted it into DataUrl, and then expanded the size of the http request received by the Express server to 2MB for database storage.
  3. Added the ability to change the user's password and upload the user's avatar.
  4. Added a small menu bar (Tabs) , a scroll wheel to display some of the user's favorites, a tape to watch, and a card display of reviewed movies.

###### **Feature 5 - Add related APIs on all people related display pages from frontend calling**

+ The front and back ends are fully integrated, and all previous front-end tmdb api calls are placed into the back-end api server.

###### **Feature 6 - Add related APIs on all moives related display pages from frontend calling**

+ The front and back ends are fully integrated, and all previous front-end tmdb api calls are placed into the back-end api server.

###### **Feature 7 - Add SignIn and Out layout style and more comprehensive related prompt messages**

+ A gradient style color style was used.

###### **Feature 8 - Change the sub menu compent of user avatar button**

- Levitate the user's avatar in site header, and there will be a levitating prompt. Click to enter the user menu.

###### **Feature 9 - Change all personal related data router path name**

+ Include the dynamic user name in the routing path.

###### **Feature 10 - Add new submitting reviews way**

+ Add a new Fab compent in the movie details page to jump to the review form page. It is a more fast way for users to submit their reviews for some movies.

###### **Feature 11 - Add multiple protected routers**

+ Add all page access paths related to user personal data access to the protected route.

  ```react
  <Route path="/:username/movies/:id/reviews"/>
  <Route path="/:username/movies/:id/reviews/:id/update_form"/> 
  <Route path="/reviews/form"/>
  <Route path="/:username/favorites"/>
  <Route path="/:username/towatchlist"/>
  <Route path="/:username/reviews"/>
  <Route path="/:username/profile"/>
  ```


## Setup requirements.

I used `npm` to manage packages in this project, and uploaded the `package.json` file. Enter `npm install` to install all the dependencies needed.

Note that in root directory, there are two folders `react-app` for client and `movies-api` for server. `npm install` should be executed in both folders.

After installing all packages, use `npm start` to run client and server, and if you want to initiate the MoogoDB storage data, you can use `npm run dev` in server package.json.

To start the swagger API editor, you just do not do anything if you have started `movie-api` server. Just to access the url.

- Client URL: [http://localhost:3000](http://localhost:3000/)
- Server URL: [http://localhost:8080](http://localhost:8080/)
- Swagger API Docs: [http://localhost:8080/api-docs](http://localhost:8080/api-docs)

## API Configuration

Notice: API Key is necessary to run successfully. File `.env` in `react-app` and `movies-api` folders should be created. And `react-app` and `movies-api` folders are as the root folders of `.env` file.  Here are the examples:

In `react-app`:

```asp
REACT_APP_TMDB_KEY= <<your_tmdb_key>>
FAST_REFRESH=false
```

In `movies-api`:

```asp
NODE_ENV=development
REACT_APP_TMDB_KEY= <<your_tmdb_key>>
SECRET= <<your_secret>>
PORT=8080
HOST=localhost
MONGO_DB= <<mongo_driver_address>> 

Eg:LOCAL: MONGO_DB=mongodb://localhost:27017/tmdb_movies 
Eg:REMOTE: <<your remote mongo_driver_address>>
```

## API Design

**Movies:**

- `/api/movies/tmdb/discover?page={pagenumber}` | GET | Gets a list of discover movies
- `/api/movies/tmdb/nowplaying?page={pagenumber}` | GET | Gets a list of nowplaying movies
- `/api/movies/tmdb/{movieid}` | GET | Gets details of a single movie
- `/api/movies/tmdb/{movieid}/images` | GET | Gets images of a single movie
- `/api/movies/tmdb/{movieid}/videos` | GET | Gets videos of a single movie
- `/api/movies/tmdb/{movieid}/recommendations?page={pagenumber}` | GET | Gets recommendations for a single movie
- `/api/movies/tmdb/{movieid}/reviews` | GET | Gets reviews of a single movie
- `/api/movies/tmdb/week_trending?page={pagenumber}` | GET | Gets a list of weekly trending movies

**Users:**

- `/api/users/{userid}` | GET | Retrieves details of a specific user
- `/api/users` | GET | Retrieves a list of all users
- `/api/users?action=register` | POST | Registers a new user
- `/api/users?authMethod=email` | POST | Authenticates a user via email
- `/api/users?authMethod=username` | POST | Authenticates a user via username
- `/api/user/delete/{userid}` | DELETE | Deletes a specific user
- `/api/user/update/{userid}` | PUT | Updates details of a specific user

**People:**

- `/api/people/{personid}` | GET | Retrieves details of a specific person
- `/api/people` | GET | Retrieves a list of all people
- `/api/people/tmdb/{personid}` | GET | Gets TMDB details of a specific person
- `/api/people/tmdb/{personid}/images` | GET | Gets images of a specific person from TMDB
- `/api/people/tmdb/{personid}/tv_credits` | GET | Gets TV credits of a specific person from TMDB
- `/api/people/tmdb/{personid}/movie_credits` | GET | Gets movie credits of a specific person from TMDB
- `/api/people/tmdb/popular_people?page={pagenumber}` | GET | Gets a list of popular people from TMDB
- `/api/people/tmdb/week_trending?page={pagenumber}` | GET | Gets a list of weekly trending people from TMDB

**Favorites:**

- `/api/favorites` | GET | Retrieves a list of all favorites
- `/api/favorites/{userid}` | GET | Retrieves favorites for a specific user
- `/api/favorites/{userid}/movies/{movieid}` | POST | Adds a movie to a user's favorites
- `/api/favorites/{userid}/movies/{movieid}` | DELETE | Removes a movie from a user's favorites

**ToWatchList:**

- `/api/toWatchList` | GET | Retrieves a user's watchlist
- `/api/toWatchList/{userid}` | GET | Retrieves a specific user's watchlist
- `/api/toWatchList/{userid}/movies/{movieid}` | POST | Adds a movie to a user's watchlist
- `/api/toWatchList/{userid}/movies/{movieid}` | DELETE | Removes a movie from a user's watchlist

**Reviews:**

- `/api/reviews` | GET | Retrieves all reviews data
- `/api/reviews/{movieid}` | GET | Retrieves reviews for a specific movie
- `/api/reviews/{userid}` | GET | Retrieves all movie ids reviewed by a specific user
- `/api/reviews/{userid}/movies/{movieid}`  | GET | Retrieves reviews of a movie submitted by a specific user
- `/api/reviews/{reviewid}/{userid}/movies/{movieid}` | GET | Retrieves a specific review of a specific movie of a user
- `/api/reviews/{userid}/movies/{movieid}` | POST | Submits a new review for a specific movie
- `/api/reviews/{reviewid}/{userid}/movies/{movieid}`  | PUT | Updates a new review for a specific movie of a sepcific user
- `/api/reviews/{reviewid}/{userid}/movies/{movieid}` | DELETE | Deletes a specific review



I use Swagger to record the API Design. The original yml file is here: [swaggerDoc.yml](https://github.com/Dovis01/react-movie-CA2/blob/main/movies-api/swaggerDoc.yml)

You can run the `movies-api` server and then access the swagger API Docs URL below:

Swagger API Docs: [http://localhost:8080/api-docs](http://localhost:8080/api-docs)

The browser will show APIs like the picture below:

![](/react-app/src/images/SwaggerAPI.png)

## Security and Authentication

### Client

In the client, I use `protected-router` and `isAuthenticated` to manage the global routers. And on the client side, for some movie cards displayed on the home page, click add favorites, add to watch, or visit the movie details for movie reviews, these personal user data are added a logic to judge whether the user is logged in, if the user is not logged in, all jump to the login page. 

Moreover, the buttons for Access favorites,toWatchList, Account Profile, Review are all placed in the submenu under the user avatar button which will not be saw if not sign in, and these function buttons are hidden for the user who is not logged in. Even if the user wants to log in directly through the url, it is not possible, because it is set up to protect the route. After the user logs in successfully, the user is redirected to the inaccessible function page that was previously protected.

**Represent sample - Add favorites button:**

```react
const addToFavorites = async (movie) => {
      if (usersContext.user) {
          let newFavorites = [];
          if (!favorites.includes(movie.id)) {
              newFavorites = [...favorites, movie.id];
          } else {
              newFavorites = [...favorites];
          }
          setFavorites(newFavorites)
          await addUserFavorite(usersContext.user.username, movie.id);
      } else {
          navigate('/signin');
      }
};
```

`isAuthenticated` is a `boolean` value, and it is decided by whether the user has logged in. 

```
const [isAuthenticated, setIsAuthenticated] = useState(false);
```

**Protected Routers:**

```react
<Route path="/:username/movies/:id/reviews"/>
<Route path="/:username/movies/:id/reviews/:id/update_form"/> 
<Route path="/reviews/form"/>
<Route path="/:username/favorites"/>
<Route path="/:username/towatchlist"/>
<Route path="/:username/reviews"/>
<Route path="/:username/profile"/>
```

### Server

In the server, JWT authentication is applied for protected routes. The approximate logic is to verify whether there is authorization item in the http request header, obtain the token value, decode to find the user name or mailbox, and query whether the user exists in the database. The detailed rules are defined in [`movies-api/authenticate/index.js`](https://github.com/Dovis01/react-movie-CA2/blob/main/movies-api/authenticate/index.js).

In `app.js` or `index.js`, you can see all protected routers.

```js
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
```

## Integrating with React App

#### How you integrated your React app with the API:

In `react-app` there is a [`tmdb-customized-api.js`](https://github.com/Dovis01/react-movie-CA2/blob/main/react-app/src/api/tmdb-customized-api.js). All API functions are used in the client side. The views (routes) using my own API are as follows:

###### Movies

- `getMovies`: `http://localhost:8080/api/movies/tmdb/discover`
- `getUpcomingMovies`: `http://localhost:8080/api/movies/tmdb/upcoming`
- `getNowPlayingMovies`: `http://localhost:8080/api/movies/tmdb/nowplaying`
- `getWeekTrendingMovies`: `http://localhost:8080/api/movies/tmdb/week_trending`
- `getMovieRecommendations`: `http://localhost:8080/api/movies/tmdb/{id}/recommendations`
- `getMovie`: `http://localhost:8080/api/movies/tmdb/{id}`
- `getMovieInSignIn`: `http://localhost:8080/api/movies/tmdb/{id}`
- `getGenres`: `http://localhost:8080/api/movies/tmdb/genres`
- `getMovieImages`: `http://localhost:8080/api/movies/tmdb/{id}/images`
- `getMovieVideos`: `http://localhost:8080/api/movies/tmdb/{id}/videos`
- `getMovieCredits`: `http://localhost:8080/api/movies/tmdb/{id}/credits`
- `getMovieReviews`: `http://localhost:8080/api/movies/tmdb/{id}/reviews`

###### People

- `getPopularPeople`: `http://localhost:8080/api/people/tmdb/popular_people`
- `getWeekTrendingPeople`: `http://localhost:8080/api/people/tmdb/week_trending`
- `getPopularPeopleDetail`: `http://localhost:8080/api/people/tmdb/{id}`
- `getPeopleImages`: `http://localhost:8080/api/people/tmdb/{id}/images`
- `getPeopleMovieCredits`: `http://localhost:8080/api/people/tmdb/{id}/movie_credits`
- `getPeopleTVCredits`: `http://localhost:8080/api/people/tmdb/{id}/tv_credits`

#### Other updates to the React app from Assignment One:

###### **Feature 1 - Add new related pages on users’  personal reviews** 

Review Form：

- The component style of Review Form and the corresponding page style were changed. The picture poster was displayed moving left and right instead of vertically. When users wanted to update specific comments, they would jump to the same form page, but all fields of the original comments would be filled together. Easy to change.

Reviews Display:

- The detailed comment display page has been changed, and the Rating status has been displayed in addition. It will make a judgment on whether to check the user's own comments or not, and then display the update and delete buttons.

Additional Pages Created:

- Adds a list page of all the movies that the user has reviewed, and jumps to the detailed review page by clicking the View Details button in the card.

###### **Feature 2 - Add related pages on users’  personal information**

+ Added a user profile page to view all relevant data storage information for the current user:
  1. Avatar, number of favorite movies, number of movies taken, number of movies reviewed, all relevant personal information.
  2. For uploading the user avatar, I read the uploaded image file and converted it into DataUrl, and then expanded the size of the http request received by the Express server to 2MB for database storage.
  3. Added the ability to change the user's password and upload the user's avatar.
  4. Added a small menu bar (Tabs) , a scroll wheel to display some of the user's favorites, a tape to watch, and a card display of reviewed movies.

###### **Feature 3 - Add SignIn and Out layout style and more comprehensive related prompt messages**

+ A gradient style color style was used.
+ Check the detail prompt messgaes -[`signUpPage.js`](https://github.com/Dovis01/react-movie-CA2/blob/main/react-app/src/pages/signUpPage.js) [`signInPage.js`](https://github.com/Dovis01/react-movie-CA2/blob/main/react-app/src/pages/signInPage.js)

###### **Feature 4 - Change the sub menu compent style of user avatar button**

- Levitate the user's avatar in site header, and there will be a levitating prompt. Click to enter the user menu.

###### **Feature 5 - Change all personal related data router path name**

+ Include the dynamic user name in the routing path.

```react
<Route path="/:username/movies/:id/reviews"/>
<Route path="/:username/movies/:id/reviews/:id/update_form"/> 
<Route path="/reviews/form"/>
<Route path="/:username/favorites"/>
<Route path="/:username/towatchlist"/>
<Route path="/:username/reviews"/>
<Route path="/:username/profile"/>
```

###### **Feature 6 - Add new submitting reviews way**

+ Add a new Fab compent in the movie details page to jump to the review form page. It is a more fast way for users to submit their reviews for some movies.

###### **Feature 7 - Add multiple protected routers**

+ Add all page access paths related to user personal data access to the protected route.

###### **Feature 8 - Add multiple user SignIn ways**

+ The user can log in using an email address or a user name. Either way, the user can be uniquely found。

## Independent learning (if relevant)

The upload storage and binding initialization data for user avatars are realized, and the size of the accepted http request header of Express is expanded to 2mb.

For more details you can check this file - [`accountProfilePage.js`](https://github.com/Dovis01/react-movie-CA2/blob/main/react-app/src/pages/account/accountProfilePage.js)

```js
const handleAvatarChange = (event) => {
        event.persist();
        event.preventDefault();
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = async () => {
            try {
                moviesContext.addUserAvatar(reader.result.toString());
                event.target.value = '';
                await updateUser(originalUser.username, {avatar: reader.result.toString()});
                setSnackMessage('User Avatar update successfully.');
                setSeverity('success');
                setOpenSnackbar(true)
            } catch (error) {
                ......
            }
        };
        reader.readAsDataURL(file);
    };
```

```js
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb', extended: true }));
```

