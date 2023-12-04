import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import ActorScrollList from "../components/movieDetailActorVideo";
import MoviesContextProvider from "../contexts/moviesContext";
import SignUpPage from "../pages/signUpPage";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/ActorScrollList">
                <ActorScrollList/>
            </ComponentPreview>
            <ComponentPreview
                path="/MoviesContextProvider">
                <MoviesContextProvider/>
            </ComponentPreview>
            <ComponentPreview path="/SignUpPage">
                <SignUpPage/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews