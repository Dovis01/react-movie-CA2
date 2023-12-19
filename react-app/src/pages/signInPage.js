import React, {useContext, useState} from "react";
import Grid from "@mui/material/Grid";
import backgroundImageStyles from "../theme/background";
import Header from "../components/headerMovieList";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import {useLocation, useNavigate} from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import ThirdPartyAuthSignIn from "../components/thirdPartyAuthSignIn";
import {UsersContext} from "../contexts/usersContext";
import {InputAdornment, Slide} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {getMovieInSignIn} from "../api/tmdb-customized-api";


const SignInPage = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const [signInMethod, setSignInMethod] = useState("Username");
    const [showPassword, setShowPassword] = useState(false);
    const usersContext = useContext(UsersContext);
    const navigate = useNavigate();
    const location = useLocation();
    const title = "Sign In Page";
    const signUpUrl = "/signup";
    const {from} = location.state ? {from: location.state.from.pathname} : {from: "/"};
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });

    const login = async (event) => {
        event.preventDefault();
        const authenticationMethod = signInMethod === "Username"
            ? usersContext.authenticateByUsername
            : usersContext.authenticateByEmail;

        try {
            await authenticationMethod(user);
            setSnackMessage(`Welcome back, ${user.username}`);
            setSeverity('success');
        } catch (error) {
            handleAuthenticationError(error.message);
        } finally {
            setOpenSnackbar(true);
        }
    };

    const handleAuthenticationError = (errorMessage) => {
        const errorMessages = {
            'Authentication failed. User not found. Please check your username.': 'Sorry, This user is not found. Please check your username.',
            'Authentication failed. User not found. Please check your email.': 'Sorry, This user is not found. Please check your email.',
            'Wrong password.': 'Sorry, Incorrect user password. Please try again.',
            'Username and password are required.': 'Both username and password are required, Please try again.',
            'Email and password are required.': 'Both email and password are required, Please try again.'
        };

        setSnackMessage(errorMessages[errorMessage] || 'Sorry, Internal server error.');
        setSeverity('error');
        setOpenSnackbar(true);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSignUpSelect = (pageURL) => {
        navigate(pageURL);
    };

    const handleSnackClose = async (event) => {
        if (usersContext.isAuthenticated === true) {
            const match = from.match(/\/(\w+)\/movies\/(\d+)\/reviews/);
            if(from ==="/reviews/form" && !location.state?.from.state?.movieId){
                navigate(`/${usersContext.user.username}/favorites`);
                setOpenSnackbar(false);
                return;
            }
            if(from ==="/reviews/form" && location.state.from.state.movieId){
                navigate(from,{state: {movieId: location.state.from.state.movieId}});
                setOpenSnackbar(false);
                return;
            }
            if(match){
                const user={username:match[1]};
                const movieId=match[2];
                const movie = await getMovieInSignIn(movieId);
                navigate(from,{state: {user:user,movie:movie}});
                setOpenSnackbar(false);
                return;
            }
            navigate(from,{state: {user:usersContext.user}});
        }
        setOpenSnackbar(false);
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                open={openSnackbar}
                TransitionComponent={(props) => <Slide {...props} direction="down" />}
                autoHideDuration={3100}
                onClose={handleSnackClose}
                sx={{
                    marginTop: '17.2vh',
                    '& .MuiPaper-root': {
                        borderRadius: 3,
                        height: '45px',
                        boxShadow: '0 5px 8px 5px rgba(255, 105, 135, .3)'
                    }
                }}
            >
                <MuiAlert
                    severity={severity}
                    variant="filled"
                    onClose={handleSnackClose}
                    sx={{
                        ...(severity === 'error' && {
                            background: 'linear-gradient(45deg, #FF5353 35%, #FF1919 95%)',
                        }),
                        ...(severity === 'success' && {
                            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                        }),
                        fontWeight: 'bold',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1rem',
                    }}
                >
                    <Typography variant="h6" component="div">
                        {snackMessage}
                    </Typography>
                </MuiAlert>
            </Snackbar>
            <Grid container sx={{padding: '20px', height: '92%'}} style={backgroundImageStyles.backgroundMainContainer}>
                <Grid item xs={12}>
                    <Header title={title}/>
                </Grid>
                <Grid container justifyContent="center" alignItems="center" sx={{mt: '-119px'}}>
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} lg={5} sx={{p: 16,background: 'linear-gradient(180deg, rgba(237,190,210,1) 8%, rgba(176,207,244,1) 95%)'}}>
                        <Typography component="h4" variant="h4" sx={{textAlign: 'center', mt: '-70px'}}>
                            {"Sign In "}
                        </Typography>
                        <Box component="form" noValidate
                             sx={{mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', mb: '-40px'}}>
                            {signInMethod === "Email" && (
                                <TextField margin="normal" required fullWidth id="email" label="Email Address"
                                           name="email"
                                           autoComplete="email" autoFocus
                                           value={user.email}
                                           onChange={(e) => {
                                               setUser({
                                                   ...user,
                                                   email: e.target.value
                                               });
                                           }}
                                           inputProps={{
                                               minLength: 8
                                           }}
                                />
                            )}
                            {signInMethod === "Username" && (
                                <TextField margin="normal" required fullWidth id="username" label="User Name"
                                           name="username"
                                           autoComplete="username" autoFocus
                                           value={user.username}
                                           onChange={(e) => {
                                               setUser({
                                                   ...user,
                                                   username: e.target.value
                                               });
                                           }}
                                           inputProps={{
                                               maxLength: 9
                                           }}
                                />
                            )}
                            <TextField margin="normal" required fullWidth name="password" label="Password"
                                       type={showPassword ? 'text' : 'password'}
                                       id="password" autoComplete="current-password"
                                       value={user.password}
                                       onChange={(e) => {
                                           setUser({
                                               ...user,
                                               password: e.target.value
                                           });
                                       }}
                                       InputProps={{
                                           endAdornment: (
                                               <InputAdornment position="end">
                                                   <IconButton
                                                       aria-label="toggle password visibility"
                                                       onClick={handleClickShowPassword}
                                                       onMouseDown={handleMouseDownPassword}
                                                   >
                                                       {showPassword ? <Visibility /> : <VisibilityOff />}
                                                   </IconButton>
                                               </InputAdornment>
                                           ),
                                       }}
                                       inputProps={{
                                           maxLength: 30
                                       }}
                            />
                            <Paper sx={{margin: '10px', width: '100%', marginTop: '20px',marginBottom: '13px'}}>
                                <Button type="submit" fullWidth variant="contained"
                                        onClick={login}>
                                    Sign In
                                </Button>
                            </Paper>
                            <Grid container spacing={2.9} justifyContent="center">
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                                    <Paper sx={{width: "100%"}}>
                                        <Button variant="contained" onClick={() => setSignInMethod('Username')}
                                                sx={{width: '100%'}}>
                                            By Username
                                        </Button>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                                    <Paper sx={{width: "100%"}}>
                                        <Button variant="contained" onClick={() => setSignInMethod('Email')}
                                                sx={{width: '100%'}}>
                                            By Email
                                        </Button>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Paper sx={{margin: '10px', width: '100%', marginBottom: '13px', marginTop: '13px'}}>
                                <Button type="submit" fullWidth variant="contained"
                                        onClick={() => handleSignUpSelect(signUpUrl)}>
                                    Sign up
                                </Button>
                            </Paper>
                            <ThirdPartyAuthSignIn/>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
export default SignInPage;