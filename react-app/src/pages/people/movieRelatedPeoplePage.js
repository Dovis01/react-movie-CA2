import React, {useState} from "react";
import {getMovieCredits} from "../../api/tmdb-api";
import PeoplePageTemplate from "../../components/template/templatePeopleListPage";
import {useQuery} from "react-query";
import Spinner from "../../components/spinner";
import {useParams} from "react-router-dom";


const MovieRelatedPeoplePage = () => {
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    //have done for using react-query
    const {data, error, isLoading, isError} = useQuery(
        ["movieCredits", {id: id}],
        getMovieCredits
    );

    if (isLoading) {
        return <Spinner/>;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const people = data.cast;

    return (
        <PeoplePageTemplate
            title="Movie Related Actors"
            people={people}
            currentPage={currentPage}
            totalPages={1}
            pageChange={(event, value) => {
                setCurrentPage(value);
            }}
            action={() => {
                return (
                    <>
                    </>
                );
            }}
            avatarCheck={() => {
                return (
                    <>
                    </>
                );
            }}
        />
    );
};

export default MovieRelatedPeoplePage;