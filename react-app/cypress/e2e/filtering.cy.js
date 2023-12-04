import { filterByGenre, filterByTitle } from "../support/e2e";

let movies; // List of Discover movies from TMDB

describe("Filtering", () => {
    before(() => {
        // Get movies from TMDB and store them locally.
        cy.request(
            `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
                "TMDB_KEY"
            )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
            .its("body")
            .then((response) => {
                movies = response.results;
            });
    });
    beforeEach(() => {
        cy.visit("/");
    });

    describe("By movie title", () => {
        it("only display movies with 'm' in the title", () => {
            const searchString = "m";
            const matchingMovies = filterByTitle(movies, searchString);
            cy.get("#filled-search").clear().type(searchString); // Enter m in text box
            cy.get(".MuiCardHeader-content").should(
                "have.length",
                matchingMovies.length
            );
            cy.get(".MuiCardHeader-content").each(($card, index) => {
                cy.wrap($card).find("p").contains(matchingMovies[index].title);
            });
        });
        it("handles case when there are no matches", () => {
            const searchString = "xyxxzyyzz";
            cy.get("#filled-search").clear().type(searchString); // Enter m in text box
            cy.get(".MuiCardHeader-content").should("have.length", 0);
        });
    });
    describe("By movie genre", () => {
        it("show movies with the selected genre", () => {
            const selectedGenreId = 18;
            const selectedGenreText = "Drama";
            const matchingMovies = filterByGenre(movies, selectedGenreId);
            cy.get("#genre-select").click();
            cy.get("li").contains(selectedGenreText).click();
            cy.get(".MuiCardHeader-content").should(
                "have.length",
                matchingMovies.length
            );
            cy.get(".MuiCardHeader-content").each(($card, index) => {
                cy.wrap($card).find("p").contains(matchingMovies[index].title);
            });
        });
    });
    describe("Combined genre and title", () => {
        it("show movies with the selected genre and 't' in the title", () => {
            const selectedGenreId = 53;
            const selectedGenreText = "Thriller";
            const searchString = "t";
            const matchingMoviesByGenre = filterByGenre(movies, selectedGenreId);
            const matchingMoviesByGenreAndTitle = filterByTitle(matchingMoviesByGenre, searchString);
            cy.get("#filled-search").clear().type(searchString); // Enter m in text box
            cy.get("#genre-select").click();
            cy.get("li").contains(selectedGenreText).click();
            cy.get(".MuiCardHeader-content").should(
                "have.length",
                matchingMoviesByGenreAndTitle.length
            );
            cy.get(".MuiCardHeader-content").each(($card, index) => {
                cy.wrap($card).find("p").contains(matchingMoviesByGenreAndTitle[index].title);
            });
        });
        it("handles case when movies with the selected genre are no matches on titles", () => {
            const searchString = "xyxxzyyzz";
            const selectedGenreText = "Action";
            cy.get("#filled-search").clear().type(searchString); // Enter m in text box
            cy.get("#genre-select").click();
            cy.get("li").contains(selectedGenreText).click();
            cy.get(".MuiCardHeader-content").should("have.length", 0);
        });
    });
});