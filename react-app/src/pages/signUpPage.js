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
import {InputAdornment, Slide} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";


const SignUpPage = () => {
    const title = "Sign Up Page";
    const navigate = useNavigate();
    const usersContext = useContext(UsersContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });

    const register = async (event) => {
        let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%.*#?&])[A-Za-z\d@$!%.*#?&]{8,15}$/;
        const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const validPassword = passwordRegEx.test(user.password);
        const validEmail = emailRegEx.test(user.email);
        event.preventDefault();
        if (validEmail && validPassword && user.password === confirmPassword) {
            try {
                usersContext.addUser(user);
                await usersContext.register(user);
                setSnackMessage(`Welcome, your username is ${user.username} and your email is ${user.email}`);
                setSeverity('success');
                setOpenSnackbar(true);
                return;
            } catch (error) {
                console.error(error);
                if(error.message === 'Username already exists.'){
                    setSnackMessage('Username already exists.');
                    setSeverity('error');
                }else if(error.message === 'Email already exists.'){
                    setSnackMessage('Email already exists.');
                    setSeverity('error');
                }else{
                    setSnackMessage('The internal authentication server is error. Please try again later.');
                    setSeverity('error');
                }
                setOpenSnackbar(true);
                return;
            }
        }

        if (user.username === '' || user.email === '' || user.password === '' || confirmPassword === '') {
            setSnackMessage('All of the three fields are required.');
            setSeverity('error');
        } else if (!validEmail) {
            setSnackMessage('The email is not valid.');
            setSeverity('error');
        } else if (user.password.length < 8 ) {
            setSnackMessage('Password must be 8-15 characters long, this is too short.');
            setSeverity('error');
        } else if ( user.password.length > 15) {
            setSnackMessage('Password must be 8-15 characters long, this is too long.');
            setSeverity('error');
        } else if (!/(?=.*[A-Za-z])/.test(user.password)) {
            setSnackMessage('Password must contain at least one letter.');
            setSeverity('error');
        } else if (!/(?=.*\d)/.test(user.password)) {
            setSnackMessage('Password must contain at least one number.');
            setSeverity('error');
        } else if (!/(?=.*[@$!%.*#?&])/.test(user.password)) {
            setSnackMessage('Password must contain at least one special character (@$!%.*#?&).');
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

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                open={openSnackbar}
                autoHideDuration={3100}
                sx={{
                    marginTop: '17.2vh',
                    '& .MuiPaper-root': {
                        borderRadius: 3,
                        height: '45px',
                        boxShadow: '0 5px 8px 5px rgba(255, 105, 135, .3)'
                    }
                }}
                onClose={() => {
                    if (severity === 'success') {
                        handleSnackCloseSuccess();
                    } else {
                        handleSnackCloseFailure();
                    }
                }}
            >
                <Slide direction= "down" in={openSnackbar} >
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
                </Slide>
            </Snackbar>
            <Grid container sx={{padding: '20px', height: '92%'}} style={backgroundImageStyles.backgroundMainContainer}>
                <Grid item xs={12}>
                    <Header title={title}/>
                </Grid>
                <Grid container justifyContent="center" alignItems="center" sx={{mt: '-138px'}}>
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} lg={5.4} sx={{p: 16,background: 'linear-gradient(180deg, rgba(237,190,210,1) 8%, rgba(176,207,244,1) 95%)'}}>
                        <Typography component="h4" variant="h4" sx={{textAlign: 'center', mt: '-88px'}}>
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
                                inputProps={{
                                    maxLength: 9
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
                                inputProps={{
                                    minLength: 8
                                }}
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
                                id="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={user.password}
                                onChange={(e) => {
                                    setUser({
                                        ...user,
                                        password: e.target.value
                                    });
                                }}
                                inputProps={{
                                    maxLength: 30
                                }}
                                variant="outlined"
                                fullWidth
                                margin="normal"
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
                            <TextField
                                id="confirmPassword"
                                label="Confirm Password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                inputProps={{
                                    maxLength: 30
                                }}
                            />
                            <Paper sx={{marginTop: '24px', width: "100%", marginBottom:'-26px'}}>
                                <Button variant="contained" onClick={register}
                                        sx={{width: '100%', height: '4em'}}>
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