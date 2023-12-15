import React, {useContext, useEffect, useState} from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import BadgeIcon from '@mui/icons-material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import MenuItem from "@mui/material/MenuItem";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Menu from "@mui/material/Menu";
import {useNavigate} from "react-router-dom";
import {styled, ThemeProvider, useTheme} from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import colorTheme from "../../theme/adjustColor";
import {MoviesContext} from "../../contexts/moviesContext";
import {UsersContext} from "../../contexts/usersContext";
import Avatar from "@mui/material/Avatar";
import {Divider, ListItemIcon, Tooltip} from "@mui/material";
import {Logout, Settings} from "@mui/icons-material";

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
    const moviesContext = useContext(MoviesContext);
    const usersContext = useContext(UsersContext);
    const user = usersContext.user;

    useEffect(() => {
        setIsUserLoggedIn(usersContext.isAuthenticated);
    }, [usersContext.isAuthenticated]);

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

    const personalIconMapping = {
        "Favorites": <FavoriteIcon/>,
        "ToWatchList": <SubscriptionsIcon/>,
    };

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

    const handleUserLogOut = () => {
        usersContext.signout();
        setUserAnchorEl(null);
        moviesContext.clearPersonalData();
        navigate("/");
    };

    const userAuthButton = () => {
        if (isUserLoggedIn) {
            return (
                <>
                    <Tooltip title="Account settings" arrow PopperProps={{
                        sx: {
                            '& .MuiTooltip-tooltip': {
                                fontSize: '0.92em',
                            }
                        }
                    }}>
                        <Avatar
                            sx={{
                                bgcolor: colorTheme.palette.secondary.main,
                                width: 32,
                                height: 32,
                                fontSize: '1.1rem',
                            }}
                            onClick={(event) => handleUserMenu(event)}
                        >
                            {user.username ? user.username.substring(0, 1) : user.displayName.substring(0, 1)}
                        </Avatar>
                    </Tooltip>
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
                            elevation: 4,
                            sx: {
                                ...(isMobile
                                    ? {}
                                    : {
                                        width: '8.5%',
                                        maxWidth: 'none',
                                    }),
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    ...(isMobile
                                        ? {
                                            right: 16,
                                        }
                                        : {
                                            right: 45,
                                        }),
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        open={userOpen}
                        onClose={handleUserMenuClose}
                    >
                        <MenuItem>
                            <Avatar/> My Profile
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <BadgeIcon fontSize="medium"/>
                            </ListItemIcon>
                            {user.username ? user.username : user.displayName}
                        </MenuItem>
                        <Divider/>
                        {isMobile ? (
                            <>
                                <MenuItem onClick={(event) => handleMobileMenu('Personal', event)}>
                                    <ListItemIcon>
                                        <FormatListBulletedIcon fontSize="small"/>
                                    </ListItemIcon>
                                    Personal
                                </MenuItem>
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
                                                key={subOpt.label + "mobile"}
                                                onClick={() => {
                                                    handleMenuSelect(subOpt.path);
                                                    handleUserSubMenuClose();
                                                }}
                                            >
                                                <ListItemIcon>
                                                    {personalIconMapping[subOpt.label]}
                                                </ListItemIcon>
                                                {subOpt.label}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                )}
                            </>
                        ) : (
                            <>
                                <MenuItem onClick={(event) => handleMenu('Personal', event)}>
                                    <ListItemIcon>
                                        <FormatListBulletedIcon fontSize="small"/>
                                    </ListItemIcon>
                                    Personal
                                </MenuItem>
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
                                                <ListItemIcon>
                                                    {personalIconMapping[subOpt.label]}
                                                </ListItemIcon>
                                                {subOpt.label}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                )}
                            </>
                        )}
                        <MenuItem>
                            <ListItemIcon>
                                <Settings fontSize="small"/>
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleUserLogOut}>
                            <ListItemIcon>
                                <Logout fontSize="small"/>
                            </ListItemIcon>
                            Logout
                        </MenuItem>
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
                                                    key={opt.label + "mobile"}
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
                                                                    key={subOpt.label + "subMoviesMobile"}
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
                                                    key={opt.label + "mobile"}
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
                                                                    key={subOpt.label + "subPeopleMobile"}
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
                                                    key={opt.label + "mobile"}
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
                                                                key={subOpt.label + "subMovies"}
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
                                                                key={subOpt.label + "subPeople"}
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