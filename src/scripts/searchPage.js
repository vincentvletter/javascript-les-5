import axios from "axios";


async function getCountries(name) {

    try {
        const result = await axios.get(`https://restcountries.com/v2/name/${name}`);
        const getCountryInfo = result.data[0];
        console.log(getCountryInfo);
        createCountryTile(getCountryInfo);
    } catch (e) {
        console.error(e);
        testError(name);
    }
}


function testError(name) {
    const formatCountryTile = document.getElementById("container");
    formatCountryTile.innerHTML =
        `
    <div id="country-info-tile">
    <p class="warning">"${name}" is not a country</p>
    </div>
    `;
}


function createCountryTile(country) {

    const formatCountryTile = document.getElementById("container");
    formatCountryTile.innerHTML =
        `
     <div id="country-info-tile">    
     <h4><img src="${country.flag}"/>${country.name}</h4>
     <span></span>
     <p>${country.name} is situated in ${country.subregion}.</p>
     <p>The capital is ${country.capital}.</p>
     <p>It has a population of ${country.population} people.</p>
     <p>They speak ${getSpokenLanguages(country.languages)}.</p>
     <p>And you can pay with ${getCountryCurrencies(country.currencies)}.</p>
     </div>
`;

}

function getSpokenLanguages(languages) {
    // return languages.map(language => `${language.name}`).join(" ,  ");
    let spokenLanguages = "";
    console.log(languages.length + " dit wordt meegegeven");

    if (languages.length - 1 !== 0) {
        for (let i = 0; i < languages.length; i++) {
            if (i < languages.length - 1) {
                spokenLanguages = spokenLanguages + `${languages[i].name}, `;
            } else {
                spokenLanguages = spokenLanguages + `and ${languages[i].name}`;
            }
        }
    } else {
        spokenLanguages = `${languages[0].name}`;
    }

    return spokenLanguages;
}

function getCountryCurrencies(currencies) {
    return (currencies.map(currency => `${currency.name}'s`).join(" and "));
}

const searchForm = document.getElementById("form");
searchForm.addEventListener("submit", searchingCountries);

function searchingCountries(e) {
    e.preventDefault()

    const inputField = document.getElementById("search-country");
    getCountries(inputField.value);
}



