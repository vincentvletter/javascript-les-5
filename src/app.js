import axios from 'axios';

async function theNewWay() {
    try {
        const getCountryInfo = await axios.get("https://restcountries.com/v2/all");

        getCountryInfo.data.sort((a, b) => {
            return a.population - b.population;
        })

        const formatCountryTile = document.getElementById("country");

        let color;

        function asignColorToRegion(regionName) {
            switch (regionName) {
                case "Africa":
                    color = "blue";
                    break;
                case "Americas":
                    color = "green";
                    break;
                case "Asia":
                    color = "red";
                    break;
                case "Europe":
                    color = "yellow";
                    break;
                case "Oceania":
                    color = "purple";
                    break;
            }
        }

        const createCountryList = getCountryInfo.data.map((getCountry) => {
            asignColorToRegion(getCountry.region);
            return `
                <li>
                    <h4 class=${color}><img src="${getCountry.flag}" />${getCountry.name}</h4>
                    <p>has a population of ${getCountry.population} people</p>
                </li>
        `;
        })

        formatCountryTile.innerHTML = createCountryList.join("");

    } catch (e) {
        console.error(e);
    }
}

theNewWay();
