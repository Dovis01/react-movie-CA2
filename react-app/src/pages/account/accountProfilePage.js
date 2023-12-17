import React, {useState} from "react";
import backgroundImageStyles from "../../theme/background";
import Grid from "@mui/material/Grid";
import Header from "../../components/headerMovieList";
import {useLocation} from "react-router-dom";
import PropTypes from 'prop-types';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button, InputAdornment, Stack, Tab, Tabs} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import AccountSetting from "./accountProfileCompents/accountSetting";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import colorTheme from "../../theme/adjustColor";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const AccountProfilePage = () => {
    const location = useLocation();
    const OriginalUser = location.state.user;
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const userStorageName = OriginalUser.username ? OriginalUser.username : OriginalUser.displayName;
    const [value, setValue] = useState(0);
    const [updatedUser, setUpdatedUser] = useState(OriginalUser);

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
        setShowResetPassword(!showResetPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <div style={{...backgroundImageStyles.backgroundMainContainer, height: '91.77vh'}}></div>
            <Grid container sx={{padding: '20px'}} >
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
                                    {userStorageName} Profile
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
                                <Avatar
                                    alt="Tim Cook"
                                    src="/path/to/tim-cook.jpg"
                                    sx={{width: 128, height: 128}}
                                />
                                <Typography variant="h5" component="h2" sx={{mt: '9px !important'}}>
                                    {userStorageName}
                                </Typography>
                                <Stack direction="row" justifyContent="space-between" sx={{width: '100%',mt:'9px !important'}}>
                                    <Typography variant="body1" fontWeight="bold">Number of favorites</Typography>
                                    <Typography variant="body1" fontWeight="bold">
                                        32
                                    </Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" sx={{width: '100%'}}>
                                    <Typography variant="body1" fontWeight="bold">Number of watch list</Typography>
                                    <Typography variant="body1" fontWeight="bold">
                                        26
                                    </Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" sx={{width: '100%'}}>
                                    <Typography variant="body1" fontWeight="bold">Number of movies reviews</Typography>
                                    <Typography variant="body1" fontWeight="bold">
                                        6
                                    </Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" sx={{width: '100%'}}>
                                    <Typography variant="h6" gutterBottom fontWeight="bold"
                                                sx={{mt: 0, lineHeight: '30px'}}>
                                        New Password
                                    </Typography>
                                    <TextField
                                        id="resetPassword"
                                        label="Reset Password"
                                        sx={{width: '80.6%', mt: 0.4, mb: 1}}
                                        type={showResetPassword ? 'text' : 'password'}
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
                                                        {showResetPassword ? <Visibility/> : <VisibilityOff/>}
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
                                    <Button variant="contained" color="primary" fullWidth>
                                        Change Password
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sx={{width: '100%'}}>
                                    <Button variant="contained" color="error" fullWidth>
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
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default AccountProfilePage;