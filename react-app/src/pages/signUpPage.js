import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import backgroundImageStyles from "../theme/background";
import Header from "../components/headerMovieList";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import {UsersContext} from "../contexts/usersContext";


const SignUpPage = () => {
    const title = "Sign Up Page";
    const navigate = useNavigate();
    const usersContext = useContext(UsersContext);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });

    const register = (event) => {
        let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const validPassword = passwordRegEx.test(user.password);
        const validEmail= emailRegEx.test(user.email);
        event.preventDefault();
        if (validEmail && validPassword && user.password === confirmPassword) {
            try {
                usersContext.addUser(user);
                usersContext.register(user);
                setSnackMessage(`Welcome, your username is ${user.username} and your email is ${user.email}`);
                setSeverity('success');
                setOpenSnackbar(true);
                return;
            } catch (error) {
                console.error(error);
                setSnackMessage('The internal authentication server is error. Please try again later.');
                setSeverity('error');
                setOpenSnackbar(true);
            }
        }
        if(user.username === '' || user.email === '' || user.password === '' || confirmPassword === ''){
            setSnackMessage('All of the three fields are required.');
            setSeverity('error');
        } else if (!validEmail) {
            setSnackMessage('The email is not valid.');
            setSeverity('error');
        } else if (!validPassword) {
            setSnackMessage('The password is not valid.');
            setSeverity('error');
        } else if (user.password !== confirmPassword) {
            setSnackMessage('Passwords do not match.');
            setSeverity('error');
        } else {
            setSnackMessage('An unexpected error occurred. Please try again.');
            setSeverity('error');
        }
        setOpenSnackbar(true);
    }

    const handleSnackCloseSuccess = () => {
        setOpenSnackbar(false);
        navigate("/signin");
    };
    const handleSnackCloseFailure = () => {
        setOpenSnackbar(false);
        navigate("/signup");
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                open={openSnackbar}
                autoHideDuration={6000} // 6 seconds before auto close
                sx={{marginTop: '76px'}}
                onClose={() => {
                    if (severity === 'success') {
                        handleSnackCloseSuccess();
                    } else {
                        handleSnackCloseFailure();
                    }
                }}
            >
                <MuiAlert
                    severity={severity}
                    variant="filled"
                    onClose={() => {
                        if (severity === 'success') {
                            handleSnackCloseSuccess();
                        } else {
                            handleSnackCloseFailure();
                        }
                    }}
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
                <Grid container justifyContent="center" alignItems="center" sx={{mt: '-130px'}}>
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} lg={5.4} sx={{p: 16}}>
                        <Typography component="h4" variant="h4" sx={{textAlign: 'center', mt: '-70px'}}>
                            {"Sign Up "}
                        </Typography>
                        <Box component="form" noValidate
                             sx={{mt: 1, mb: -5, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <TextField
                                label="User Name"
                                required
                                value={user.username}
                                onChange={(e) => {
                                    setUser({
                                        ...user,
                                        username: e.target.value
                                    });
                                }}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Email Address"
                                required
                                type={"email"}
                                value={user.email}
                                onChange={(e) => {
                                    setUser({
                                        ...user,
                                        email: e.target.value
                                    });
                                }}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Password"
                                type="password"
                                required
                                value={user.password}
                                onChange={(e) => {
                                    setUser({
                                        ...user,
                                        password: e.target.value
                                    });
                                }}
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
                            <Paper sx={{marginTop: '18px', width: "100%"}}>
                                <Button variant="contained" onClick={register}
                                        sx={{width: '100%', marginTop: 1, height: '4em'}}>
                                    <EmailIcon sx={{mr: 1}}/>
                                    Sign up with UserName and Email
                                </Button>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
export default SignUpPage;