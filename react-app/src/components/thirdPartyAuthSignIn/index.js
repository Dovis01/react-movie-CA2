import React, {useState} from 'react';
import {auth, GoogleAuthProvider} from '../../firebase.js';
import {signInWithPopup, GithubAuthProvider} from 'firebase/auth';
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from '@mui/icons-material/GitHub';
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {UsersContext} from "../../contexts/usersContext";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Slide} from "@mui/material";


const ThirdPartyAuthByGoogle = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [snackMessage, setSnackMessage] = useState('');
    const navigate = useNavigate();
    const usersContext = useContext(UsersContext);
    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            // Google 登录成功后，可以获取用户信息
            const user = result.user;
            const userEntity = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                token:user.accessToken,
            };
            usersContext.addUser(userEntity);
            usersContext.setIsAuthenticated(true);
            setSnackMessage('Welcome ' + user.displayName + ', your email is ' + user.email);
            setSeverity('success');
            setOpenSnackbar(true);
        } catch (error) {
            // 处理错误
            console.error(error);
            setSnackMessage('An unexpected error occurred. Please try again.');
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
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                open={openSnackbar}
                autoHideDuration={6500}
                sx={{
                    marginTop: '17.2vh',
                    '& .MuiPaper-root': {
                        borderRadius: 3,
                        height: '45px',
                        boxShadow: '0 5px 8px 5px rgba(255, 105, 135, .3)'
                    }
                }}
                onClose={handleSnackClose}
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
                    <Typography variant="h6">
                        {snackMessage}
                    </Typography>
                </MuiAlert>
            </Snackbar>
            <Paper sx={{width: "100%"}}>
                <Button variant="contained" onClick={signInWithGoogle} sx={{width: '100%'}}>
                    <GoogleIcon sx={{mr: 1}}/>
                    Sign in with Google
                </Button>
            </Paper>
        </>
    );
};

const ThirdPartyAuthByGitHub = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();
    const usersContext = useContext(UsersContext);
    const [snackMessage, setSnackMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const githubProvider = new GithubAuthProvider();
    const signInWithGitHub = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            const user = result.user;
            const userEntity = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                token:user.accessToken,
            };
            usersContext.addUser(userEntity);
            usersContext.setIsAuthenticated(true);
            setSnackMessage(`Welcome ${user.displayName}, your email is ${user.email}`);
            setSeverity('success');
            setOpenSnackbar(true);
        } catch (error) {
            // 处理错误
            if (error.code === 'auth/account-exists-with-different-credential') {
                setSnackMessage('This email has already been registered with another way.');
                setSeverity('error');
            } else {
                setSnackMessage('An unexpected error occurred. Please try again.');
                setSeverity('error');
            }
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
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                TransitionComponent={(props) => <Slide {...props} direction="down" />}
                open={openSnackbar}
                autoHideDuration={6500}
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
                    <Typography variant="h6">
                        {snackMessage}
                    </Typography>
                </MuiAlert>
            </Snackbar>
            <Paper sx={{width: "100%"}}>
                <Button variant="contained" onClick={signInWithGitHub} sx={{width: '100%'}}>
                    <GitHubIcon sx={{mr: 1}}/>
                    Sign in with GitHub
                </Button>
            </Paper>
        </>
    );
};
const ThirdPartyAuthSignIn = () => {
    return (
        <Grid container spacing={2.9} justifyContent="center">
            <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                <ThirdPartyAuthByGoogle/>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                <ThirdPartyAuthByGitHub/>
            </Grid>
        </Grid>
    );
}
export default ThirdPartyAuthSignIn;