import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import {Link} from "react-router-dom";
import backgroundImageStyles from "../../theme/background";
import Box from "@mui/material/Box";
import ManOutlinedIcon from '@mui/icons-material/ManOutlined';
import Woman2OutlinedIcon from '@mui/icons-material/Woman2Outlined';

export default function PeopleCard({people, action, avatarCheck}) {

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength - 3) + "...";
        }
        return text;
    };

    return (
        <Card sx={{maxWidth: 345}} elevation={5} style={backgroundImageStyles.backgroundCardContainer}>
            <CardHeader
                avatar={
                    avatarCheck(people)
                }
                title={
                    <Typography variant="h5" component="p" style={{marginLeft: '-17px'}}>
                        {truncateText(people.name, 20)}
                    </Typography>
                }
            />
            <CardMedia
                sx={{height: 500}}
                image={
                    people.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${people.profile_path}`
                        : img
                }
            />
            <CardContent>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="p" style={{whiteSpace: 'nowrap'}}>
                            <AccountBoxOutlinedIcon fontSize="medium"/>
                            {" "}{people.known_for_department}{" "}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="p" style={{whiteSpace: 'nowrap'}}>
                            <Box component="span" ml={4} >
                                {people.gender === 1 ? (
                                    <>
                                        <Woman2OutlinedIcon fontSize="medium"/>
                                        {"Female"}{" "}
                                    </>
                                ) : (
                                    <>
                                        <ManOutlinedIcon fontSize="medium"/>
                                        {"Male"}{" "}
                                    </>
                                )}
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" component="p" style={{whiteSpace: 'nowrap'}}>
                            <Box component="span" ml={0}>
                                <StackedLineChartIcon fontSize="medium"/>
                                {" "} {people.popularity.toFixed(2)}{" "}
                            </Box>
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions disableSpacing>
                {action(people)}
                <Link to={`/people/popular/${people.id}`}>
                    <Button variant="outlined" size="medium" color="primary" sx={{marginBottom:'25px',padding:'15px',marginLeft:'72px'}}>
                        More Info ...
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}