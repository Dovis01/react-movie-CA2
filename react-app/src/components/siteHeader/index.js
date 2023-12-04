import React, {useContext, useEffect, useState} from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {useNavigate} from "react-router-dom";
import {styled, ThemeProvider, useTheme} from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import colorTheme from "../../theme/adjustColor";
import {MoviesContext} from "../../contexts/moviesContext";
import Avatar from "@mui/material/Avatar";
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../../firebase.js';

const Offset = styled('div')(({theme}) => theme.mixins.toolbar);

const SiteHeader = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileSubAnchorEl, setMobileSubAnchorEl] = useState(null);
    const [userAnchorEl, setUserAnchorEl] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const open = Boolean(anchorEl);
    const mobileSubOpen = Boolean(mobileSubAnchorEl);
    const userOpen = Boolean(userAnchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();
    const context = useContext(MoviesContext);
    const user = context.user;

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            context.addUser(user);
            setIsUserLoggedIn(!!user);
        });
    }, []);


    const menuOptions = [
        {label: "Home", path: "/"},
        {label: "Movies"},
        {label: "People"},
    ];
    const movieSubMenuOptions = [
        {label: "Upcoming", path: "/movies/upcoming"},
        {label: "Now Playing", path: "/movies/nowplaying"},
        {label: "Week Trending", path: "/movies/weektrending"},
    ];
    const peopleSubMenuOptions = [
        {label: "Popular people", path: "/people/popular"},
        {label: "Week Trending", path: "/people/weektrending"},
    ];
    const personalSubMenuOptions = [
        {label: "Favorites", path: "/movies/favorites"},
        {label: "ToWatchList", path: "/movies/watchlist"},
    ];

    const handleMenuSelect = (pageURL) => {
        navigate(pageURL);
    };

    const handleMenu = (subMenuLabel, event) => {
        setAnchorEl(event.currentTarget);
        setActiveSubMenu(subMenuLabel);
    };

    const handleUserMenu = (event) => {
        setUserAnchorEl(event.currentTarget);
    };

    const handleMobileMenu = (subMenuLabel, event) => {
        setMobileSubAnchorEl(event.currentTarget);
        setActiveSubMenu(subMenuLabel);
    };

    const handleSubMenuClose = () => {
        setAnchorEl(null);
        setMobileSubAnchorEl(null);
    };

    const handleUserSubMenuClose = () => {
        setAnchorEl(null);
        setUserAnchorEl(null);
        setMobileSubAnchorEl(null);
    };

    const handleUserMenuClose = () => {
        setUserAnchorEl(null);
        setMobileSubAnchorEl(null);
    };

    const handleUserLogOut = async () => {
        try {
            await auth.signOut();
            setUserAnchorEl(null);
            context.clearPersonalData();
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const userAuthButton = () => {
        if (isUserLoggedIn) {
            if (user.displayName === null) {
                user.displayName = user.email;
            }
            return (
                <>
                    <Avatar
                        sx={{
                            bgcolor: colorTheme.palette.secondary.main,
                            width: 32,
                            height: 32,
                            fontSize: '1.1rem',
                        }}
                        onMouseEnter={(event) => handleUserMenu(event)}
                    >
                        {user.displayName.substring(0, 1) || user.email.substring(0, 1)}
                    </Avatar>
                    <Menu
                        id="menu-appuserbar"
                        anchorEl={userAnchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        PaperProps={{
                            style: {
                                marginTop: '8px',
                            },
                        }}
                        open={userOpen}
                        onClose={handleUserMenuClose}
                    >
                        {isMobile ? (
                            <>
                                <MenuItem onClick={(event) => handleMobileMenu('Personal', event)}>Personal</MenuItem>
                                {activeSubMenu === 'Personal' && (
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={mobileSubAnchorEl}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "left",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        open={mobileSubOpen}
                                        onClose={handleUserSubMenuClose}
                                        autoFocus={false}
                                    >
                                        {personalSubMenuOptions.map((subOpt) => (
                                            <MenuItem
                                                key={subOpt.label}
                                                onClick={() => {
                                                    handleMenuSelect(subOpt.path);
                                                    handleUserSubMenuClose();
                                                }}
                                            >
                                                {subOpt.label}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                )}
                            </>
                        ) : (
                            <>
                                <MenuItem onClick={(event) => handleMenu('Personal', event)}>Personal</MenuItem>
                                {activeSubMenu === 'Personal' && (
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "left",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        open={open}
                                        onClose={handleUserSubMenuClose}
                                        autoFocus={false}
                                    >
                                        {personalSubMenuOptions.map((subOpt) => (
                                            <MenuItem
                                                key={subOpt.label}
                                                onClick={() => {
                                                    handleMenuSelect(subOpt.path);
                                                    handleUserSubMenuClose();
                                                }}
                                            >
                                                {subOpt.label}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                )}
                            </>
                        )}
                        <MenuItem onClick={handleUserLogOut}>Log out</MenuItem>
                    </Menu>
                </>
            );
        } else {
            return (
                <Button
                    color="inherit"
                    onClick={() => handleMenuSelect('/signin')}
                >
                    Sign in
                </Button>
            );
        }
    };


    return (
        <>
            <ThemeProvider theme={colorTheme}>
                <AppBar position="fixed" color="primary" elevation={8} sx={{padding: 0.75}}>
                    <Toolbar>
                        <Typography variant="h4" sx={{flexGrow: 1, visibility: isMobile ? 'hidden' : 'visible'}}>
                            TMDB Client
                        </Typography>
                        <Typography variant="h6"
                                    sx={{position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}
                                    align="center">
                            All you ever wanted to know about Movies!
                        </Typography>
                        {isMobile ? (
                            <>
                                <IconButton
                                    aria-label="menu"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={(event) => handleMenu("", event)}
                                    color="inherit"
                                >
                                    <MenuIcon/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "left",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "left",
                                    }}
                                    open={open}
                                    onClose={handleSubMenuClose}
                                >
                                    {menuOptions.map((opt) => {
                                        if (opt.label === "Movies") {
                                            return (
                                                <div
                                                    key={opt.label}
                                                >
                                                    <Button
                                                        color="inherit"
                                                        onClick={(event) => handleMobileMenu('Movies', event)}
                                                    >
                                                        {opt.label}
                                                    </Button>
                                                    {activeSubMenu === 'Movies' && (
                                                        <Menu
                                                            id="menu-appbar"
                                                            anchorEl={mobileSubAnchorEl}
                                                            anchorOrigin={{
                                                                vertical: "top",
                                                                horizontal: "left",
                                                            }}
                                                            keepMounted
                                                            transformOrigin={{
                                                                vertical: "top",
                                                                horizontal: "right",
                                                            }}
                                                            open={mobileSubOpen}
                                                            onClose={handleSubMenuClose}
                                                            autoFocus={false}
                                                        >
                                                            {movieSubMenuOptions.map((subOpt) => (
                                                                <MenuItem
                                                                    key={subOpt.label}
                                                                    onClick={() => {
                                                                        handleMenuSelect(subOpt.path);
                                                                        handleSubMenuClose();
                                                                    }}
                                                                >
                                                                    {subOpt.label}
                                                                </MenuItem>
                                                            ))}
                                                        </Menu>
                                                    )}
                                                </div>
                                            );
                                        } else if (opt.label === "People") {
                                            return (
                                                <div
                                                    key={opt.label}
                                                >
                                                    <Button
                                                        color="inherit"
                                                        onClick={(event) => handleMobileMenu('People', event)}
                                                    >
                                                        {opt.label}
                                                    </Button>
                                                    {activeSubMenu === 'People' && (
                                                        <Menu
                                                            id="menu-appbar"
                                                            anchorEl={mobileSubAnchorEl}
                                                            anchorOrigin={{
                                                                vertical: "top",
                                                                horizontal: "left",
                                                            }}
                                                            keepMounted
                                                            transformOrigin={{
                                                                vertical: "top",
                                                                horizontal: "right",
                                                            }}
                                                            open={mobileSubOpen}
                                                            onClose={handleSubMenuClose}
                                                            autoFocus={false}
                                                        >
                                                            {peopleSubMenuOptions.map((subOpt) => (
                                                                <MenuItem
                                                                    key={subOpt.label}
                                                                    onClick={() => {
                                                                        handleMenuSelect(subOpt.path);
                                                                        handleSubMenuClose();
                                                                    }}
                                                                >
                                                                    {subOpt.label}
                                                                </MenuItem>
                                                            ))}
                                                        </Menu>
                                                    )}
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <Button
                                                    key={opt.label}
                                                    color="inherit"
                                                    onClick={() => {
                                                        handleMenuSelect(opt.path);
                                                        handleSubMenuClose();
                                                    }}
                                                >
                                                    {opt.label}
                                                </Button>
                                            );
                                        }
                                    })}
                                </Menu>
                                {userAuthButton()}
                            </>
                        ) : (
                            <>
                                {menuOptions.map((opt) => {
                                    if (opt.label === "Movies") {
                                        return (
                                            <div
                                                key={opt.label}
                                                onMouseLeave={handleSubMenuClose}
                                                style={{display: 'inline-block'}}
                                            >
                                                <Button
                                                    color="inherit"
                                                    style={{marginRight: '10px'}}
                                                    onMouseEnter={(event) => handleMenu('Movies', event)}
                                                >
                                                    {opt.label}
                                                </Button>
                                                {activeSubMenu === 'Movies' && (
                                                    <Menu
                                                        id="menu-appbar"
                                                        anchorEl={anchorEl}
                                                        anchorOrigin={{
                                                            vertical: "bottom",
                                                            horizontal: "left",
                                                        }}
                                                        keepMounted
                                                        transformOrigin={{
                                                            vertical: "top",
                                                            horizontal: "left",
                                                        }}
                                                        open={open}
                                                        onClose={handleSubMenuClose}
                                                        autoFocus={false}
                                                    >
                                                        {movieSubMenuOptions.map((subOpt) => (
                                                            <MenuItem
                                                                key={subOpt.label}
                                                                onClick={() => {
                                                                    handleMenuSelect(subOpt.path);
                                                                    handleSubMenuClose();
                                                                }}
                                                            >
                                                                {subOpt.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Menu>
                                                )}
                                            </div>
                                        );
                                    } else if (opt.label === "People") {
                                        return (
                                            <div
                                                key={opt.label}
                                                onMouseLeave={handleSubMenuClose}
                                                style={{display: 'inline-block'}}
                                            >
                                                <Button
                                                    color="inherit"
                                                    style={{marginRight: '10px'}}
                                                    onMouseEnter={(event) => handleMenu('People', event)}
                                                >
                                                    {opt.label}
                                                </Button>
                                                {activeSubMenu === 'People' && (
                                                    <Menu
                                                        id="menu-appbar"
                                                        anchorEl={anchorEl}
                                                        anchorOrigin={{
                                                            vertical: "bottom",
                                                            horizontal: "left",
                                                        }}
                                                        keepMounted
                                                        transformOrigin={{
                                                            vertical: "top",
                                                            horizontal: "left",
                                                        }}
                                                        open={open}
                                                        onClose={handleSubMenuClose}
                                                        autoFocus={false}
                                                    >
                                                        {peopleSubMenuOptions.map((subOpt) => (
                                                            <MenuItem
                                                                key={subOpt.label}
                                                                onClick={() => {
                                                                    handleMenuSelect(subOpt.path);
                                                                    handleSubMenuClose();
                                                                }}
                                                            >
                                                                {subOpt.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Menu>
                                                )}
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <>
                                                <Button
                                                    key={opt.label}
                                                    style={{marginRight: '10px'}}
                                                    color="inherit"
                                                    onClick={() => handleMenuSelect(opt.path)}
                                                >
                                                    {opt.label}
                                                </Button>
                                            </>
                                        );
                                    }
                                })}
                                {userAuthButton()}
                            </>
                        )}
                    </Toolbar>
                </AppBar>
                <Offset/>
            </ThemeProvider>
        </>
    );
};
export default SiteHeader;