import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import colorTheme from "../../theme/adjustColor";
import {useNavigate} from "react-router-dom";

const Header = (props) => {
    const title = props.title;
    const navigate = useNavigate();
    return (
        <Paper
            elevation={5}
            component="div"
            sx={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
                padding: 1.5,
                marginBottom: 2.5,
                bgcolor:colorTheme.palette.primary.light,
            }}
        >
            <IconButton aria-label="go back" onClick={() => navigate(-1)}>
                <ArrowBackIcon color="primary" fontSize="large"/>
            </IconButton>
            <Typography variant="h4" component="h3">
                {title}
            </Typography>
            <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
                <ArrowForwardIcon color="primary" fontSize="large"/>
            </IconButton>
        </Paper>
    );
};

export default Header;