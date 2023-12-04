import React from "react";
import PeopleHeader from "../../headerPeople";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {getPeopleImages} from "../../../api/tmdb-api";
import {useQuery} from "react-query";
import Spinner from '../../spinner'
import backgroundImageStyles from "../../../theme/background";

const wrapperStyle = {
    position: 'relative', // 父容器相对定位
};

const TemplatePeoplePage = ({actor, children}) => {
    const {data, error, isLoading, isError} = useQuery(
        ["images", {id: actor.id}],
        getPeopleImages
    );

    if (isLoading) {
        return <Spinner/>;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    const images = data.profiles.slice(0, 3);

    return (
        <>
            <div style={backgroundImageStyles.backgroundDetailContainer}/>
            <div style={wrapperStyle}>
                <PeopleHeader actor={actor} sx={{padding: "20px"}}/>
                <Grid container spacing={5} sx={{padding: "20px"}}>
                    <Grid item xs={3}>
                        <div sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-around",
                        }}>
                            <ImageList
                                cols={1}>
                                {images.map((image) => (
                                    <ImageListItem key={image.file_path} cols={1}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                            alt={image.file_path}
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </div>
                    </Grid>

                    <Grid item xs={9}>
                        {children}
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default TemplatePeoplePage;