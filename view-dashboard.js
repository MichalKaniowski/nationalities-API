import { renderCountriesList } from "./dom-utils.js";

export const renderDashboard = () => {
    const API_URL_ALL = "https://restcountries.com/v3.1/all";
    let countries;
    let region = "";
    let query = "";


    fetch(API_URL_ALL)
        .then((res) => res.json())
        .then((countriesRaw) => {
            countries = countriesRaw.map(country => {
                return {
                    flag: country.flags.png,
                    name: country.name.common,
                    code: country.cioc,
                    population: country.population.toLocaleString(),
                    region: country.region,
                    capital: country.capital && country.capital[0],
                }
            })
            renderCountriesList(countries);
        });


    const filterDataAndRenderCountriesList = (countries) => {
        const filteredCountries = countries.filter((country) => {
            return (
                country.name.toLowerCase().includes(query) &&
                (!region || country.region === region)
            );
        })

        renderCountriesList(filteredCountries);
    }

    document.querySelector("#query").addEventListener("input", (event) => {
        query = event.target.value.toLowerCase().trim();
        
        filterDataAndRenderCountriesList(countries);
    });


    document.querySelector("#region").addEventListener("change", (event) => {
        region = event.target.value;
        
        filterDataAndRenderCountriesList(countries);
    });
}