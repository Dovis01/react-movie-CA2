import React from "react";
import People from "../peopleCard";
import Grid from "@mui/material/Grid";

const PeopleList = ( {people, action ,avatarCheck}) => {
    return people.map((p) => (
        <Grid key={p.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <People key={p.id} people={p} action={action} avatarCheck={avatarCheck}/>
        </Grid>
    ));
};

export default PeopleList;