fetch("https://restcountries.com/v2/all?fields=name.official,capital,population,flags.svg,languages").then((l=>l.json())).then((l=>{console.log(l)})).catch((l=>{console.log(l)}));
//# sourceMappingURL=index.5337a75c.js.map
