import React, {useContext, useState} from "react";
import backgroundImageStyles from "../../theme/background";
import Grid from "@mui/material/Grid";
import Header from "../../components/headerMovieList";
import {useLocation} from "react-router-dom";
import PropTypes from 'prop-types';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button, InputAdornment, Slide, Stack, Tab, Tabs} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import AccountSetting from "./accountProfileCompents/accountSetting";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import colorTheme from "../../theme/adjustColor";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {MoviesContext} from "../../contexts/moviesContext";
import {deleteUser, updateUser} from "../../api/user-api";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const AccountProfilePage = () => {
    const location = useLocation();
    const moviesContext = useContext(MoviesContext);
    const originalUser = location.state.user;
    const [showNewPassword, setShowNewPassword] = useState(false);
    const userAvatar= moviesContext.userAvatar;
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [value, setValue] = useState(0);
    const [updatedUser, setUpdatedUser] = useState(originalUser);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    function TabPanel(props) {
        const {children, value, index, ...other} = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{p: 3}}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    const handleChange = (event, value) => {
        setValue(value);
    };

    const handleClickShowPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleDeleteUser = async () => {
        try {
            await deleteUser(originalUser.username)
            setSnackMessage('User deleted successfully.');
            setSeverity('success');
            setOpenSnackbar(true)
        } catch (error) {
            if (error.message.includes("Fail to delete user")) {
                setSnackMessage('Fail to delete user. Please try again later.');
                setSeverity('error');
            } else {
                setSnackMessage('An unexpected error has happened. Please try again later.');
                setSeverity('error');
            }
            setOpenSnackbar(true)
        }
    }

    const handleUpdateUserPassword = async () => {
        try {
            let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%.*#?&])[A-Za-z\d@$!%.*#?&]{8,15}$/;
            const validPassword = passwordRegEx.test(updatedUser.password);
            if (validPassword) {
                if (updatedUser.password === originalUser.password) {
                    setSnackMessage('Please input your new password.');
                    setSeverity('error');
                    setOpenSnackbar(true)
                    return;
                }
                if (updatedUser.password === confirmPassword) {
                    await updateUser(originalUser.username, {password: updatedUser.password})
                    setSnackMessage('Update new password of user successfully.');
                    setSeverity('success');
                } else {
                    setSnackMessage('Passwords do not match. Please try again.');
                    setSeverity('error');
                }
                setOpenSnackbar(true)
            } else {
                setSnackMessage('Password must be 8 to 15 characters long and contain at least one letter, one number, and one special character.');
                setSeverity('error');
                setOpenSnackbar(true)
            }
        } catch (error) {
            if (error.message.includes("User Password update failed")) {
                setSnackMessage('User Password update failed. Please try again later.');
                setSeverity('error');
            } else {
                setSnackMessage('An unexpected error has happened. Please try again later.');
                setSeverity('error');
            }
            setOpenSnackbar(true)
        }
    }

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
                moviesContext.addUserAvatar("");
                if (error.message.includes("User Avatar update failed")) {
                    console.log(error);
                    setSnackMessage('User Avatar update failed. Please try again later.');
                    setSeverity('error');
                } else {
                    setSnackMessage('An unexpected error has happened. Please try again later.');
                    setSeverity('error');
                }
                setOpenSnackbar(true)
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSnackClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                open={openSnackbar}
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
                <Slide direction="down" in={openSnackbar}>
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
                </Slide>
            </Snackbar>
            <div style={{...backgroundImageStyles.backgroundMainContainer, height: '91.77vh'}}></div>
            <Grid container sx={{padding: '20px'}}>
                <Grid item xs={12} sx={{mt: '-7px'}}>
                    <Header title={`My Account Profile`}/>
                </Grid>
                <Grid container spacing={2.2} justifyContent="center">
                    <Grid item xl={3.2} sx={{mt: '-7px'}}>
                        <AppBar position="static" color="default" elevation={5} sx={{
                            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                            position: 'fixed',
                            zIndex: 1000,
                            width: '25.26%',
                            height: '64px',
                            borderRadius: '3px',
                        }}>
                            <Toolbar sx={{alignItems: 'center', justifyContent: 'center'}}>
                                <Typography variant="h6" color="inherit" noWrap
                                            sx={{fontSize: "1.5rem", color: 'white'}}>
                                    {originalUser.username} Profile
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <Paper elevation={5}
                               sx={{
                                   p: 2,
                                   mt: 8,
                                   display: 'flex',
                                   flexDirection: 'column',
                                   alignItems: 'center',
                                   height: '93.3%'
                               }}>
                            <Stack spacing={2} alignItems="center" sx={{width: '92%'}}>
                                <input
                                    accept="image/*"
                                    style={{display: 'none'}}
                                    id="avatar-upload"
                                    type="file"
                                    onChange={handleAvatarChange}
                                />
                                <label htmlFor="avatar-upload">
                                    <Avatar
                                        alt={originalUser.username}
                                        src={userAvatar}
                                        sx={{width: 120, height: 120, cursor: 'pointer', mt: '-8px !important'}}
                                    />
                                </label>
                                <Typography variant="h5" component="h2" sx={{mt: '9px !important'}}>
                                    {originalUser.username}
                                </Typography>
                                <Stack direction="row" justifyContent="space-between"
                                       sx={{width: '100%', mt: '9px !important'}}>
                                    <Typography variant="body1" fontWeight="bold">Number of favorites</Typography>
                                    <Typography variant="body1" fontWeight="bold">
                                        {moviesContext.favorites.length}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" sx={{width: '100%'}}>
                                    <Typography variant="body1" fontWeight="bold">Number of watch list</Typography>
                                    <Typography variant="body1" fontWeight="bold">
                                        {moviesContext.toWatchList.length}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" sx={{width: '100%'}}>
                                    <Typography variant="body1" fontWeight="bold">Number of movies reviews</Typography>
                                    <Typography variant="body1" fontWeight="bold">
                                        {moviesContext.myReviewedMovieIds.length}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" sx={{width: '100%'}}>
                                    <Typography variant="h6" gutterBottom fontWeight="bold"
                                                sx={{mt: 0, lineHeight: '30px'}}>
                                        New Password
                                    </Typography>
                                    <TextField
                                        id="newPassword"
                                        label="New Password"
                                        sx={{width: '80.6%', mt: 0.4, mb: 1}}
                                        type={showNewPassword ? 'text' : 'password'}
                                        required
                                        onChange={(e) => {
                                            setUpdatedUser({
                                                ...updatedUser,
                                                password: e.target.value
                                            });
                                        }}
                                        inputProps={{
                                            maxLength: 30
                                        }}
                                        variant="outlined"
                                        fullWidth
                                        margin="none"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showNewPassword ? <Visibility/> : <VisibilityOff/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" sx={{width: '100%'}}>
                                    <Typography variant="h6" gutterBottom fontWeight="bold"
                                                sx={{mt: -1.9, lineHeight: '30px'}}>
                                        Confirm Password
                                    </Typography>
                                    <TextField
                                        id="confirmPassword"
                                        label="Confirm Password"
                                        sx={{mt: -1.5, mb: 0}}
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        variant="outlined"
                                        fullWidth
                                        margin="none"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowConfirmPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        inputProps={{
                                            maxLength: 30
                                        }}
                                    />
                                </Stack>
                                <Grid item xs={12} sx={{width: '100%'}}>
                                    <Button variant="contained" color="primary" fullWidth
                                            onClick={handleUpdateUserPassword}>
                                        Change Password
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sx={{width: '100%'}}>
                                    <Button variant="contained" color="error" fullWidth onClick={handleDeleteUser}>
                                        Delete Account User
                                    </Button>
                                </Grid>
                            </Stack>
                        </Paper>
                    </Grid>
                    <Grid item xl={8.8} sx={{mt: '-7px'}}>
                        <Paper elevation={5} sx={{background: 'background.paper', height: '108.3%'}}>
                            <AppBar position="static"
                                    sx={{
                                        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                                        height: '64px',
                                        borderRadius: '3px',
                                    }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    sx={{
                                        height: '64px',
                                        '.MuiTabs-indicator': {
                                            backgroundColor: colorTheme.palette.primary.dark,
                                            height: '3.5px',
                                        },
                                        '.MuiTab-root': {
                                            height: '64px',
                                            alignItems: 'center',
                                        }
                                    }}
                                    textColor="inherit"
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                >
                                    <Tab label="Account Setting" {...a11yProps(0)} sx={{
                                        fontSize: '1.1rem',
                                    }}/>
                                    <Tab label="Some Favorite Movies" {...a11yProps(1)} sx={{
                                        fontSize: '1.1rem',
                                    }}/>
                                    <Tab label="Some Movies to watch" {...a11yProps(2)} sx={{
                                        fontSize: '1.1rem',
                                    }}/>
                                    <Tab label="Some Reviewed Movies" {...a11yProps(3)} sx={{
                                        fontSize: '1.1rem',
                                    }}/>
                                </Tabs>
                            </AppBar>
                            <TabPanel value={value} index={0}>
                                <AccountSetting/>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                Some Favorite Movies
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                Some Movies to watch
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                Some Reviewed Movies
                            </TabPanel>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default AccountProfilePage;