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
import {InputAdornment} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";



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
        event.preventDefault()
        if (signInMethod === "Username") {
            try {
                await usersContext.authenticateByUsername(user);
                setSnackMessage(`Welcome back, ${user.username}`);
                setSeverity('success');
                setOpenSnackbar(true);
            } catch (error) {
                const errorMessage = error.message;
                if (errorMessage === 'Authentication failed. User not found.') {
                    setSnackMessage('Sorry, This user is not found.');
                } else if (errorMessage === 'Wrong password.') {
                    setSnackMessage('Incorrect user password. Please try again.');
                } else if (errorMessage === 'Username and password are required.') {
                    setSnackMessage('Both username and password are required, Please try again.');
                } else {
                    setSnackMessage('Sorry, Internal server error.');
                }
                setSeverity('error');
                setOpenSnackbar(true);
            }
        } else {
            try {
                await usersContext.authenticateByEmail(user);
                setSnackMessage(`Welcome back, ${usersContext.user.username}`);
                setSeverity('success');
                setOpenSnackbar(true);
            } catch (error) {
                const errorMessage = error.message;
                if (errorMessage === 'Authentication failed. User not found.') {
                    setSnackMessage('Sorry, This user is not found.');
                } else if (errorMessage === 'Wrong password.') {
                    setSnackMessage('Incorrect user password. Please try again.');
                } else if (errorMessage === 'Email and password are required.') {
                    setSnackMessage('Both email and password are required, Please try again.');
                } else {
                    setSnackMessage('Sorry, Internal server error.');
                }
                setSeverity('error');
                setOpenSnackbar(true);
            }
        }
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

    const handleSnackClose = (event) => {
        if (usersContext.isAuthenticated === true) {
            navigate(from);
        }
        setOpenSnackbar(false);
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                open={openSnackbar}
                autoHideDuration={6000} // 6 seconds before auto close
                sx={{marginTop: '76px'}}
                onClose={handleSnackClose}
            >
                <MuiAlert
                    severity={severity}
                    variant="filled"
                    onClose={handleSnackClose}
                >
                    <Typography variant="h6">
                        {snackMessage}
                    </Typography>
                </MuiAlert>
            </Snackbar>
            <Grid container sx={{padding: '20px', height: '92%'}} style={backgroundImageStyles.backgroundMainContainer}>
                <Grid item xs={12}>
                    <Header title={title}/>
                </Grid>
                <Grid container justifyContent="center" alignItems="center" sx={{mt: '-110px'}}>
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} lg={5} sx={{p: 16}}>
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