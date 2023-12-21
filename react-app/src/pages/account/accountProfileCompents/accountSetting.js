import React, {useContext, useEffect, useState} from 'react';
import {Container, Grid, TextField, FormControl, Select, MenuItem, Button, Slide} from '@mui/material';
import Typography from "@mui/material/Typography";
import {UsersContext} from "../../../contexts/usersContext";
import {updateUser} from "../../../api/user-api";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {MoviesContext} from "../../../contexts/moviesContext";

function AccountSettings() {
    const usersContext = useContext(UsersContext);
    const moviesContext = useContext(MoviesContext);
    const [country, setCountry] = useState('china');
    const originalUser = moviesContext.currentUserInfoObject;
    const [updatedUser, setUpdatedUser] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    useEffect(() => {
        const initiateOriginalUserData = async () => {
            if(country==='china'){
                setUpdatedUser({...updatedUser, country: country});
            }
        };
        initiateOriginalUserData();
    }, [usersContext.isAuthenticated, usersContext.user?.username]);

    const countryCitiesMap = {
        america: [
            "New York", "California", "Washington", "Texas", "Florida", "Illinois", "Pennsylvania", "Ohio"
        ],
        england: [
            "London", "Manchester", "Liverpool", "Birmingham", "Leeds", "Bristol", "Newcastle", "Sheffield"
        ],
        ireland: [
            "Dublin", "Cork", "Galway", "Limerick", "Waterford", "Drogheda", "Dundalk", "Bray"
        ],
        france: [
            "Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier"
        ],
        germany: [
            "Berlin", "Munich", "Frankfurt", "Hamburg", "Cologne", "Stuttgart", "Düsseldorf", "Dresden"
        ],
        japan: [
            "Tokyo", "Osaka", "Kyoto", "Hokkaido", "Nagoya", "Fukuoka", "Sapporo", "Kobe"
        ],
        australia: [
            "Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Canberra", "Hobart"
        ],
        china: [
            "Beijing", "Shanghai", "Nanjing", "Hangzhou", "Nantong", "Suzhou", "Wuxi", "Xuzhou", "Rugao", "Dongtai"
        ],
    };


    const handleCountryChange = (event) => {
        setCountry(event.target.value);
        setUpdatedUser({...updatedUser, country: event.target.value});
    };

    const handleUpdateUserInfo = async () => {
        const updated = await updateUser(usersContext.user.username, updatedUser);
        if(updated.code === 200) {
            setSnackMessage(updated.msg);
            setSeverity('success');
            setOpenSnackbar(true);
        } else {
            setSnackMessage(updated.msg);
            setSeverity('error');
            setOpenSnackbar(true);
        }
    }
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
            <Container maxWidth="xl">
                <Grid container spacing={5} xl={12} sx={{marginLeft: '-18px'}}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            First Name
                        </Typography>
                        <TextField
                            label="First Name"
                            fullWidth
                            defaultValue={originalUser?.firstName || ''}
                            variant="outlined"
                            onChange={(e) => {
                                setUpdatedUser({
                                    ...updatedUser,
                                    firstName: e.target.value
                                });
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            Last Name
                        </Typography>
                        <TextField
                            label="Last Name"
                            fullWidth
                            defaultValue={originalUser?.lastName || ''}
                            variant="outlined"
                            onChange={(e) => {
                                setUpdatedUser({
                                    ...updatedUser,
                                    lastName: e.target.value
                                });
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{mt: '-21px'}}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            Phone Number
                        </Typography>
                        <TextField
                            label="Phone Number"
                            fullWidth
                            defaultValue={originalUser?.phoneNumber || ''}
                            variant="outlined"
                            onChange={(e) => {
                                setUpdatedUser({
                                    ...updatedUser,
                                    phoneNumber: e.target.value
                                });
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{mt: '-21px'}}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            Email Address
                        </Typography>
                        <TextField
                            label="Email Address"
                            fullWidth
                            defaultValue={originalUser?.email || ''}
                            variant="outlined"
                            onChange={(e) => {
                                setUpdatedUser({
                                    ...updatedUser,
                                    email: e.target.value
                                });
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{mt: '-21px'}}>
                        <FormControl fullWidth>
                            <Typography variant="h6" gutterBottom fontWeight="bold">
                                City
                            </Typography>
                            <Select
                                defaultValue={originalUser?.city || ''}
                                value={originalUser?.city || ''}
                                variant="outlined"
                                onChange={(e) => {
                                    setUpdatedUser({
                                        ...updatedUser,
                                        city: e.target.value
                                    });
                                }}
                            >
                                {countryCitiesMap[country].map((city) => (
                                    <MenuItem key={city} value={city.toLowerCase()}>{city}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{mt: '-21px'}}>
                        <FormControl fullWidth>
                            <Typography variant="h6" gutterBottom fontWeight="bold">
                                Country
                            </Typography>
                            <Select
                                value={originalUser?.country || 'china'}
                                onChange={handleCountryChange}
                                defaultValue={originalUser?.country || ''}
                                variant="outlined"
                            >
                                <MenuItem value="china">China</MenuItem>
                                <MenuItem value="america">America</MenuItem>
                                <MenuItem value="england">England</MenuItem>
                                <MenuItem value="ireland">Ireland</MenuItem>
                                <MenuItem value="australia">Australia</MenuItem>
                                <MenuItem value="japan">Japan</MenuItem>
                                <MenuItem value="france">France</MenuItem>
                                <MenuItem value="germany">Germany</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} xl={12} sx={{mt: '-6px'}}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            Contact Address
                        </Typography>
                        <TextField
                            fullWidth
                            id="outlined-textarea"
                            defaultValue={originalUser?.address || ''}
                            multiline
                            maxRows={3}
                            inputProps={{
                                maxLength: 291
                            }}
                            onChange={(e) => {
                                setUpdatedUser({
                                    ...updatedUser,
                                    address: e.target.value
                                });
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mt: '1px'}}>
                        <Button variant="contained" color="primary" fullWidth sx={{height: '36.5px'}}
                                onClick={handleUpdateUserInfo}>
                            Update Account Information
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default AccountSettings;