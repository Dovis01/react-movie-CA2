import React from 'react';
import LinearProgress from "@mui/material/LinearProgress";

export default function CircularIndeterminate() {
    return (
        <div sx={{
            display: 'flex',
            width: '110%',
            justifyContent: "center",
            '& > * + *': {
                marginLeft: '2em',
            }
        }}>
            <LinearProgress />
            <LinearProgress />
            <LinearProgress />
            <LinearProgress />
        </div>
    );
}