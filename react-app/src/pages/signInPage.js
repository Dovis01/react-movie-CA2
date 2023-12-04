import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import backgroundImageStyles from "../theme/background";
import Header from "../components/headerMovieList";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import {useNavigate} from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import ThirdPartyAuthSignIn from "../components/thirdPartyAuthSignIn";
import {auth} from '../firebase.js';
import {signInWithEmailAndPassword} from 'firebase/auth';


const SignInPage = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const title = "Sign In Page";
    const navigate = useNavigate();
    const signUpUrl = "/signup";

    const handleSignInSelect = (pageURL) => {
        navigate(pageURL);
    };
    const handleLogInSelect = async () => {
        try {
            event.preventDefault()
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // 登录成功，您可以获取用户信息，并做后续处理
            const user = userCredential.user;
            setSnackMessage(`Welcome back, ${user.email}`);
            setSeverity('success');
            setOpenSnackbar(true);
        } catch (error) {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-email') {
                setSnackMessage('This email is invalid.');
            } else if (errorCode === 'auth/invalid-login-credentials') {
                setSnackMessage('Incorrect user email or password. Please try again.');
            } else {
                setSnackMessage('Failed to log in. Please try again later.');
            }
            setSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleSnackClose = (event) => {
        setOpenSnackbar(false);
        navigate("/");
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
                            <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email"
                                       autoComplete="email" autoFocus
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField margin="normal" required fullWidth name="password" label="Password"
                                       type="password"
                                       id="password" autoComplete="current-password"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                            />
                            <Paper sx={{margin: '10px', width: '100%', marginBottom: '20px', marginTop: '20px'}}>
                                <Button type="submit" fullWidth variant="contained"
                                        onClick={handleLogInSelect}>
                                    Sign In
                                </Button>
                            </Paper>
                            <Paper sx={{margin: '10px', width: '100%', marginBottom: '20px', marginTop: '5px'}}>
                                <Button type="submit" fullWidth variant="contained"
                                        onClick={() => handleSignInSelect(signUpUrl)}>
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