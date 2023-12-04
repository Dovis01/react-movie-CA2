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
import {MoviesContext} from "../../contexts/moviesContext";


const ThirdPartyAuthByGoogle = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();
    const context = useContext(MoviesContext);
    const user =context.user;
    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            // Google 登录成功后，可以获取用户信息
            const user = result.user;
            // 处理登录成功逻辑，例如设置用户状态或导航到其他页面
            context.addUser(user);
            setOpenSnackbar(true);
        } catch (error) {
            // 处理错误
            console.error(error);
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
                    severity="success"
                    variant="filled"
                    onClose={handleSnackClose}
                >
                    <Typography variant="h6">
                        {user === null ? 'Welcome, your email is null' : `Welcome ${user.displayName}, your email is ${user.email}`}
                    </Typography>
                </MuiAlert>
            </Snackbar>
            <Button variant="contained" onClick={signInWithGoogle} sx={{ width: '246px' }}>
                <GoogleIcon sx={{mr: 1}}/>
                Sign in with Google
            </Button>
        </>
    );
};

const ThirdPartyAuthByGitHub = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();
    const context = useContext(MoviesContext);
    const [snackMessage, setSnackMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const githubProvider = new GithubAuthProvider();
    const signInWithGitHub = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            // 这里可以获取用户信息和 token
            //const credential = GithubAuthProvider.credentialFromResult(result);
            //const token = credential.accessToken;
            const user = result.user;
            // 处理登录成功逻辑，例如设置用户状态或导航到其他页面
            context.addUser(user);
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
            <Button variant="contained" onClick={signInWithGitHub} sx={{ width: '246px' }}>
                <GitHubIcon sx={{mr: 1}}/>
                Sign in with GitHub
            </Button>
        </>
    );
};
const ThirdPartyAuthSignIn = () => {


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                    <ThirdPartyAuthByGoogle />
                </div>
                <div style={{ flex: 1 ,marginLeft:35}}>
                    <ThirdPartyAuthByGitHub />
                </div>
            </div>
        </>
    );
}
export default ThirdPartyAuthSignIn;