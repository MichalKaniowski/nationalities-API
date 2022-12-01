import { renderCountryDetails, createDetailButton } from "./dom-utils.js";

const goBackToDashboard = () => {
    window.location.href = "/";
}


export const renderDetails = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const countryCode = urlParams.get("country");

    if (!countryCode) {
        goBackToDashboard();
    }

    const API_URL_DETAIL = "https://restcountries.com/v3.1/alpha/" + countryCode;
    fetch(API_URL_DETAIL)
        .then(res => res.json())
        .then(countryInfo => {
            if(!countryInfo) {
                goBackToDashboard();
            } else {
                countryInfo = countryInfo[0];
                // console.log(countryInfo);
                let country = {
                    name: countryInfo.name.common,
                    nativeName: Object.values(countryInfo.name.nativeName)[0].common,
                    code: countryInfo.cioc,
                    population: countryInfo.population.toLocaleString(),
                    region: countryInfo.region,
                    capital: countryInfo.capital && countryInfo.capital[0],
                    subregion: countryInfo.subregion,
                    flag: countryInfo.flags.png,

                    currencies: Object.values(countryInfo.currencies)
                    .map(currency => currency.name)
                    .join(", "),

                    languages: Object.values(countryInfo.languages).join(", "),
                    tld: countryInfo.tld[0],
                    borders: countryInfo.borders,
                }

                renderCountryDetails(country);
            }
        });
     
};