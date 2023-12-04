import React, {useState} from "react";
import {getPopularPeople} from "../../api/tmdb-api";
import PeoplePageTemplate from "../../components/template/templatePeopleListPage";
import {useQuery} from "react-query";
import Spinner from "../../components/spinner";


const PopularPeoplePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    //have done for using react-query
    const {data, error, isLoading, isError} = useQuery(
        ["popularPeople",{page:currentPage}],
        getPopularPeople
    );

    if (isLoading) {
        return <Spinner/>;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const people = data.results;
    const totalPages = data.total_pages;

    return (
        <PeoplePageTemplate
            title="Popular People"
            people={people}
            currentPage={currentPage}
            totalPages={totalPages}
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

export default PopularPeoplePage;