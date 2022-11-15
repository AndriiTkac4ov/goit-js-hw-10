import './css/styles.css';
// import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const listCountries = document.querySelector('.country-list');

// const ukr = fetch('https://restcountries.com/v3.1/name/ukraine?fullText=true');
// const ukr = fetch('https://restcountries.com/v2/all?fields=name.official,capital,population,flags.svg,languages');
const ukr = fetch('https://restcountries.com/v2/name/austria?fields=name,capital,population,flags,languages');

// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов


function createMarkupForCountries(countriesArray) {
    const markup = countriesArray.map(country => {
        const { flags, name, capital, population, languages } = country;
        const itemEl = document.createElement('li');
        const flagEl = document.createElement('img');
        flagEl.src = flags.svg;
        flagEl.alt = 'flag';
        flagEl.width = '60';
        const nameEl = document.createElement('h3');
        nameEl.textContent = name;
        const capitalEl = document.createElement('p');
        capitalEl.textContent = capital;
        const populationEl = document.createElement('p');
        populationEl.textContent = population;
        const languagesEl = document.createElement('p');
        languagesEl.textContent = languages;

        itemEl.append(flagEl);
        itemEl.append(nameEl);
        itemEl.append(capitalEl);
        itemEl.append(populationEl);
        itemEl.append(languagesEl);

        return itemEl;
    });
    listCountries.append(...markup);
};


ukr
    .then(response => {
        return response.json();
    })
    .then(country => {
        console.log(country);
        console.log(country[0]);
        console.log(country[0].flags.svg);
        console.log(country[0].name);
        console.log(country[0].capital);
        console.log(country[0].population);
        console.log(country[0].languages);
        // const { flags, name, capital, population, languages } = country;
        createMarkupForCountries(country);
    })
    .catch(error => {
        console.log(error)
    });