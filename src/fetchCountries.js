export default function fetchCountries(name) {
    return fetch(`'https://restcountries.com/v2/name/${name}?fields=name.official,capital,population,flags,languages'`);
}