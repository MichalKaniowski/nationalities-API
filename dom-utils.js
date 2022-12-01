const createInfoElement = (labelName, value) => {
    const infoElement = document.createElement("div");

    const labelElement = document.createElement("strong");
    labelElement.innerText = labelName;
    const valueElement = document.createElement("span");
    valueElement.innerText = value;

    infoElement.appendChild(labelElement);
    infoElement.appendChild(valueElement);

    return infoElement;
}


const createImgElement = (country) => {
    const imageElement = document.createElement("img");
    imageElement.src = country.flag;
    return imageElement;
}

const createCountryItemElement = (country) => {
    const listItem = document.createElement("li");

    const anchorElement = document.createElement("a");
    anchorElement.href = "?country=" + country.code;

    const listItemContainer = document.createElement("div");
    listItemContainer.classList.add("info-container");

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("short-info-container");

    const imageElement = createImgElement(country);

    const nameElement = document.createElement("strong");
    nameElement.classList.add("country-name")
    nameElement.innerText = country.name;

    listItemContainer.appendChild(imageElement);

    infoContainer.appendChild(nameElement);
    infoContainer.appendChild(createInfoElement("Population: ", country.population));
    infoContainer.appendChild(createInfoElement("Region: ", country.region));
    infoContainer.appendChild(createInfoElement("Capital: ", country.capital));
    listItemContainer.appendChild(infoContainer)

    anchorElement.appendChild(listItemContainer);
    listItem.appendChild(anchorElement)
    return listItem;
}

const createListElement = (countries) => {
    const listElement = document.createElement("ul");
    countries.forEach((country) => {
        listElement.appendChild(createCountryItemElement(country));
    })

    return listElement;
}

const createDetailElement = (country) => {
    const detailContainerElement = document.createElement("div");
    detailContainerElement.classList.add("detail-container");

    const detailContentElement = document.createElement("div");
    detailContentElement.classList.add("info-container");
    detailContainerElement.appendChild(detailContentElement);

    const flagImgElement = createImgElement(country);

    const detailNameElement = document.createElement("strong");
    detailNameElement.classList.add("country-name");
    detailNameElement.innerText = country.name;

    detailContainerElement.appendChild(flagImgElement);

    detailContentElement.appendChild(detailNameElement)
    detailContentElement.appendChild(createInfoElement("Native name: ", country.nativeName));
    detailContentElement.appendChild(createInfoElement("Population: ", country.population));
    detailContentElement.appendChild(createInfoElement("Region: ", country.region));
    detailContentElement.appendChild(createInfoElement("Sub region: ", country.subregion));
    detailContentElement.appendChild(createInfoElement("Capital: ", country.capital));
    detailContentElement.appendChild(createInfoElement("Top Level Domain: ", country.tld));
    detailContentElement.appendChild(createInfoElement("Currencies: ", country.currencies));
    detailContentElement.appendChild(createInfoElement("Languages: ", country.languages));
    detailContentElement.appendChild(createBorderCountriesElement(country)); //add validation so check later if countries have borders and borders.length > 0
    
    detailContainerElement.appendChild(detailContentElement);

    return detailContainerElement;
}


export const createDetailButton = (text, link) => {
    const anchorElement = document.createElement("a");
    anchorElement.innerText = text;
    anchorElement.classList.add("detail-button");
    anchorElement.href = link;

    return anchorElement;
}


const createBorderCountriesElement = (country) => {
    if (!country.borders) {
        return;
    }
    
    const borderCountriesContainer = document.createElement("div");
    const labelElement = document.createElement("strong");
    labelElement.innerText = "Border Countries: ";
    borderCountriesContainer.appendChild(labelElement);

    country.borders.forEach(border => {
        borderCountriesContainer.appendChild(createDetailButton(border, "/nationalities-API/?country=" + border));
    });

    return borderCountriesContainer;
}

export const renderCountriesList = (countries) => {
    const rootElement = document.querySelector("#root");
    rootElement.innerHTML = "";
    rootElement.appendChild(createListElement(countries));
}


export const renderCountryDetails = (country) => {
    const rootElement = document.querySelector("#root");
    rootElement.appendChild(createDetailButton("Go back", "/nationalities-API/"));
    rootElement.appendChild(createDetailElement(country));
}
