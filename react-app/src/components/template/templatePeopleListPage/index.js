import React from "react";
import Header from "../../headerMovieList";
import Grid from "@mui/material/Grid";
import backgroundImageStyles from "../../../theme/background";
import Paper from "@mui/material/Paper";
import {Pagination, Stack} from "@mui/material";
import PeopleList from "../../peopleList";

function PeopleListPageTemplate({people, title, action, avatarCheck, pageChange, currentPage,totalPages}) {

    return (
        <Grid container sx={{padding: '20px'}} style={backgroundImageStyles.backgroundMainContainer}>
            <Grid item xs={12}>
                <Header title={title}/>
            </Grid>
            <Grid item container spacing={5}>
                <PeopleList action={action} people={people} avatarCheck={avatarCheck}></PeopleList>
            </Grid>
            <Paper
                elevation={5}
                component="div"
                sx={{
                    display: "flex",
                    marginTop: 2.0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    position: 'relative',
                    padding: 1.1,
                }}
            >
                <Stack spacing={2}>
                    <Pagination count={totalPages} page={currentPage} onChange={pageChange} variant="outlined"
                                shape="rounded" size="large" boundaryCount={2} showFirstButton showLastButton/>
                </Stack>
            </Paper>
        </Grid>
    );
}

export default PeopleListPageTemplate;