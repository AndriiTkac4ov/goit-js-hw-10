import './css/styles.css';

const DEBOUNCE_DELAY = 300;

// const ukr = fetch('https://restcountries.com/v3.1/name/ukraine?fullText=true');
const ukr = fetch('https://restcountries.com/v2/all?fields=name.official,capital,population,flags.svg,languages');

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
        console.log(country)
    })
    .catch(error => {
        console.log(error)
    });