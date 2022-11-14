import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const listCountries = document.querySelector('.country-list');

// const ukr = fetch('https://restcountries.com/v3.1/name/ukraine?fullText=true');
// const ukr = fetch('https://restcountries.com/v2/all?fields=name.official,capital,population,flags.svg,languages');
const ukr = fetch('https://restcountries.com/v3.1/name/ukraine?fullText=true&fields=name.official,capital,population,flags,languages');

// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов


ukr
    .then(response => {
        return response.json();
    })
    .then(country => {
        console.log(country);
        console.log(country[0].flags.svg);
        console.log(country[0].name);
        console.log(country[0].capital);
        console.log(country[0].population);
        console.log(country[0].languages);
        // const { nameOfficial, capital, population, languages } = country;
        createMarkupForCountries(country);
    })
    .catch(error => {
        console.log(error)
    });

function createMarkupForCountries(countriesArray) {
    const markup = countriesArray.map(({ nameOfficial, capital, population, languages }) => {
        const itemEl = document.createElement('li');
        const flagEl = document.createElement('img');
        flagEl.src = 'https://flagcdn.com/ua.svg';
        flagEl.alt = 'flag';
        // flagEl.setAttribute('width="60"');
        const nameEl = document.createElement('h3');
        nameEl.textContent = nameOfficial;
        const capitalEl = document.createElement('p');
        capitalEl.textContent = capital;
        const populationEl = document.createElement('p');
        capitalEl.textContent = population;
        const languagesEl = document.createElement('p');
        capitalEl.textContent = languages;

        itemEl.append(flagEl);
        itemEl.append(nameEl);
        itemEl.append(capitalEl);
        itemEl.append(populationEl);
        itemEl.append(languagesEl);

        return itemEl;
    });
    listCountries.append(...markup);
};

{/* <img src="https://res.cloudinary.com/goit-academy/image/upload/v1614773221/codepen/ukraine.svg" alt="Ukraine" width="60"></img> */}