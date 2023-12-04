import React from "react";
import Grid from "@mui/material/Grid";
import backgroundImageStyles from "../theme/background";
import Header from "../components/headerMovieList";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ThirdPartyAuthSignUp from "../components/thirdPartyAuthSignUp";


const SignUpPage = () => {
    const title = "Sign Up Page";

    return (
        <Grid container sx={{padding: '20px', height: '92%'}} style={backgroundImageStyles.backgroundMainContainer}>
            <Grid item xs={12}>
                <Header title={title}/>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" sx={{mt: '-130px'}} >
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} lg={5.4} sx={{p: 16}}>
                    <Typography component="h4" variant="h4" sx={{textAlign: 'center',mt: '-70px'}}>
                        {"Sign Up "}
                    </Typography>
                    <Box component="form" noValidate
                         sx={{mt: 1, mb:-5,display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <ThirdPartyAuthSignUp/>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default SignUpPage;