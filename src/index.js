import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import getRefs from './get-refs';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.searchBox.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(event) {
    const searchingCountry = event.target.value;

    fetchCountries(searchingCountry)
        .then(country => {
            if (country.length > 10) {
                return Notify.success("Too many matches found. Please enter a more specific name.");
            };
            if (country.length <= 10 && country.length >= 2) {
                return createMarkupForCountries(country);
            };
            if (country.length = 1) {
                return createCardForCountry(country);
            };
        })
        .catch(error => {
            return Notify.failure("Oops, there is no country with that name");
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

        itemEl.append(flagEl, nameEl);

        return itemEl;
    });
    refs.listCountries.append(...markup);
};

function createCardForCountry(countryArray) {
    const markup = countryArray.map(country => {
        const { flags, name, capital, population, languages } = country;

        const itemEl = document.createElement('div');
        itemEl.classList.add('country-header');
        const flagEl = document.createElement('img');
        flagEl.classList.add('country-flag');
        flagEl.src = flags.svg;
        flagEl.alt = 'flag';
        flagEl.width = '60';
        const nameEl = document.createElement('h1');
        nameEl.textContent = name;
        const capitalEl = document.createElement('p');
        capitalEl.textContent = `Capital: ${capital}`;
        const populationEl = document.createElement('p');
        populationEl.textContent = `Population: ${population}`;
        const languagesEl = document.createElement('p');
        languagesEl.textContent = `Languages: ${(languages.map(language => language.name)).join(', ')}`;

        itemEl.append(flagEl, nameEl);

        return refs.countryInfo.append(itemEl, capitalEl, populationEl, languagesEl);
    });
    refs.countryInfo.append(markup);
};