import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const PeopleDetailsHeader = ({actor}) => {
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
                marginBottom: 0.5,
            }}
        >
            <IconButton aria-label="go back" onClick={() => navigate(-1)} >
                <ArrowBackIcon color="primary" fontSize="large" />
            </IconButton>
            <Typography variant="h4" component="h3">
                {actor.name}
                <a href={actor.homepage}>
                    <HomeIcon color="primary" />
                </a>
                <br />
                <Typography variant="h5" component="p">
                    <span sx={{ fontSize: "1.5rem" }}>{`   "${actor.known_for_department}"`} </span>
                </Typography>
            </Typography>
            <IconButton aria-label="go forward" onClick={() => navigate(+1) } >
                <ArrowForwardIcon color="primary" fontSize="large" />
            </IconButton>
        </Paper>
    );
};

export default PeopleDetailsHeader;