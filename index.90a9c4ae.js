const e=document.querySelector(".country-list");fetch("https://restcountries.com/v2/name/austria?fields=name,capital,population,flags,languages").then((e=>e.json())).then((t=>{console.log(t),console.log(t[0]),console.log(t[0].flags.svg),console.log(t[0].name),console.log(t[0].capital),console.log(t[0].population),console.log(t[0].languages),function(t){const n=t.map((e=>{const{flags:t,name:n,capital:o,population:a,languages:c}=e,l=document.createElement("li"),s=document.createElement("img");s.src=t.svg,s.alt="flag",s.width="60";const p=document.createElement("h3");p.textContent=n;const g=document.createElement("p");g.textContent=o;const m=document.createElement("p");m.textContent=a;const u=document.createElement("p");return u.textContent=c,l.append(s),l.append(p),l.append(g),l.append(m),l.append(u),l}));e.append(...n)}(t)})).catch((e=>{console.log(e)}));
//# sourceMappingURL=index.90a9c4ae.js.map
