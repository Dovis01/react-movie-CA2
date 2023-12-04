import React from "react";
import PeopleCard from "../components/peopleCard";
import SamplePeopleData from "./samplePeopleData";

export default {
    title: "Home Page/PeopleCard",
    component: PeopleCard,
};

export const Basic = () => {
    return (
        <PeopleCard
            people={SamplePeopleData.results}
        />
    );
};
Basic.storyName = "Default";

export const Exceptional = () => {
    const sampleNoPoster = { ...SamplePeopleData , profile_path: undefined };
    return (
        <PeopleCard
            people={sampleNoPoster}
        />
    );
};
Exceptional.storyName = "Exception";