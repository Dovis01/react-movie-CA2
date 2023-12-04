import React, {useState} from 'react';
import {auth} from '../../firebase.js';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import Button from "@mui/material/Button";
import EmailIcon from '@mui/icons-material/Email';
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {MoviesContext} from "../../contexts/moviesContext";

const ThirdPartyAuthSignUp = () => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const navigate = useNavigate();
    const context = useContext(MoviesContext);

    const handleSnackClose = (event) => {
        setOpenSnackbar(false);
        navigate("/");
    };
     const handleSignUp = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setSnackMessage('Passwords do not match.');
            setSeverity('error');
            setOpenSnackbar(true);
            return;
        }
        signUpWithEmail();
     };
    const signUpWithEmail = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            user.displayName = userName;
            context.addUser(user);
            setSnackMessage(`Welcome, your email is ${user.email}`);
            setSeverity('success');
            setOpenSnackbar(true);
        } catch (error) {
            // 处理错误
            if (error.code === 'auth/email-already-in-use') {
                setSnackMessage('This email has already been registered.');
                setSeverity('error');
            } else {
                setSnackMessage('An unexpected error occurred. Please try again.');
                setSeverity('error');
            }
            setOpenSnackbar(true);
        }
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
            <TextField
                label="User Name"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Confirm Password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <Paper sx={{ marginTop: '18px'}}>
                <Button variant="contained" onClick={handleSignUp} sx={{ width: '216px' ,marginTop:1}}>
                    <EmailIcon sx={{mr: 1}}/>
                    Sign up with Email
                </Button>
            </Paper>
        </>
    );
};

export default ThirdPartyAuthSignUp;