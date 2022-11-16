import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import getRefs from './get-refs';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.searchBox.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(event) {
    console.log(event.target.value);
    const searchingCountry = event.target.value;

    fetchCountries(searchingCountry)
        .then(country => {
            // if (condition) {
                createMarkupForCountries(country);
            // };
            // if (condition) {
                createCardForCountry(country);
            // };
            Notify.success("Too many matches found. Please enter a more specific name.");
            Notify.failure("Oops, there is no country with that name");
        })
        .catch(error => {
            console.log(error);
        });
};

function createMarkupForCountries(countriesArray) {
    const markup = countriesArray.map(({ flags, name }) => {
        const itemEl = document.createElement('li');
        itemEl.classList.add('country-item');
        const flagEl = document.createElement('img');
        flagEl.classList.add('country-flag');
        flagEl.src = flags.svg;
        flagEl.alt = 'flag';
        flagEl.width = '60';
        const nameEl = document.createElement('h3');
        nameEl.textContent = name;

        itemEl.append(flagEl);
        itemEl.append(nameEl);

        return itemEl;
    });
    refs.listCountries.append(...markup);
};

function createCardForCountry(countryArray) {
    const markup = countryArray.map(country => {
        const { flags, name, capital, population, languages } = country;

        const itemEl = document.createElement('li');
        const flagEl = document.createElement('img');
        flagEl.src = flags.svg;
        flagEl.alt = 'flag';
        flagEl.width = '60';
        const nameEl = document.createElement('h3');
        nameEl.textContent = name;
        const capitalEl = document.createElement('p');
        capitalEl.textContent = `Capital: ${capital}`;
        const populationEl = document.createElement('p');
        populationEl.textContent = `Population: ${population}`;
        const languagesEl = document.createElement('p');
        languagesEl.textContent = `Languages: ${(languages.map(language => language.name)).join(', ')}`;

        itemEl.append(flagEl);
        itemEl.append(nameEl);
        itemEl.append(capitalEl);
        itemEl.append(populationEl);
        itemEl.append(languagesEl);

        return itemEl;
    });
    refs.countryInfo.append(...markup);
};

// const ukr = fetch(`https://restcountries.com/v2/name/ukraine?fields=name,capital,population,flags,languages`);

// ukr
//     .then(response => {
//         return response.json();
//     })
//     .then(country => {
//         createMarkupForCountries(country);
//         Notify.success("Too many matches found. Please enter a more specific name.");
//         Notify.failure("Oops, there is no country with that name");
//     })
//     .catch(error => {
//         console.log(error);
//     });