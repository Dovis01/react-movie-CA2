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


const SignInPage = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const usersContext = useContext(UsersContext);
    const navigate = useNavigate();
    const location = useLocation();
    const title = "Sign In Page";
    const signUpUrl = "/signup";
    const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };
    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    const login = async (event) => {
        event.preventDefault()
        try {
            await usersContext.authenticate(user);
            setSnackMessage(`Welcome back, ${user.username}`);
            setSeverity('success');
            setOpenSnackbar(true);
        } catch (error) {
            const errorMessage = error.message;
            if (errorMessage === 'Authentication failed. User not found.') {
                setSnackMessage('Sorry, This user is not found.');
            } else if (errorMessage === 'Wrong password.') {
                setSnackMessage('Incorrect user password. Please try again.');
            } else if(errorMessage === 'Username and password are required.'){
                setSnackMessage('Both username and password are required, Please try again.');
            } else {
                setSnackMessage('Sorry, Internal server error.');
            }
            setSeverity('error');
            setOpenSnackbar(true);
        }
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
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
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
                             sx={{mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            {/*<TextField margin="normal" required fullWidth id="email" label="Email Address" name="email"*/}
                            {/*           autoComplete="email" autoFocus*/}
                            {/*           value={user.email}*/}
                            {/*           onChange={(e) => {*/}
                            {/*               setUser({*/}
                            {/*                   ...user,*/}
                            {/*                   email: e.target.value*/}
                            {/*               });*/}
                            {/*           }}*/}
                            {/*/>*/}
                            <TextField margin="normal" required fullWidth id="username" label="User Name" name="username"
                                       autoComplete="username" autoFocus
                                       value={user.username}
                                       onChange={(e) => {
                                           setUser({
                                               ...user,
                                               username: e.target.value
                                           });
                                       }}
                            />
                            <TextField margin="normal" required fullWidth name="password" label="Password"
                                       type="password"
                                       id="password" autoComplete="current-password"
                                       value={user.password}
                                       onChange={(e) => {
                                           setUser({
                                               ...user,
                                               password: e.target.value
                                           });
                                       }}
                            />
                            <Paper sx={{margin: '10px', width: '100%', marginBottom: '20px', marginTop: '20px'}}>
                                <Button type="submit" fullWidth variant="contained"
                                        onClick={login}>
                                    Sign In
                                </Button>
                            </Paper>
                            <Paper sx={{margin: '10px', width: '100%', marginBottom: '20px', marginTop: '5px'}}>
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