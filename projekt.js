let jatekTer = document.getElementById("jatekTer");
let idoElem = document.getElementById("ido");
let pontszamElem = document.getElementById("pontszam");
let talalatokElem = document.getElementById("talalatok");

let szinekEsSzavak = ['piros', 'zold', 'kek', 'alma', 'korte', 'eper', 'barack'];
let kartyak = szinekEsSzavak.concat(szinekEsSzavak); // duplikáljuk a kártyákat
let megnyitottKartyak = [];
let megnyertKartyak = [];
let pontszam = 0;
let talalatok = 0;
let elsoKattintas = true;
let ido = 0;
let idoMero;

function keveres(arr) {
  let currentIndex = arr.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
}

function jatekInicializalas() {
  kartyak = keveres(kartyak);

  for (let i = 0; i < kartyak.length; i++) {
    let kartya = document.createElement("div");
    kartya.dataset.index = i;
    kartya.addEventListener("click", kartyaKattintas);
    jatekTer.appendChild(kartya);
  }

  idoMero = setInterval(function() {
    ido++;
    idoElem.textContent = `Idő: ${ido} másodperc`;
  }, 1000);
}

function kartyaKattintas() {
  let kartya = this;
  let index = kartya.dataset.index;

  if (elsoKattintas || (megnyitottKartyak.length < 2 && !megnyertKartyak.includes(index))) {
    kartya.textContent = kartyak[index];

    if (elsoKattintas) {
      elsoKattintas = false;
    }

    megnyitottKartyak.push(index);

    if (megnyitottKartyak.length === 2) {
      let elsoIndex = megnyitottKartyak[0];
      let masodikIndex = megnyitottKartyak[1];

      if (kartyak[elsoIndex] === kartyak[masodikIndex]) {
        pontszam++;
        talalatok++;
        pontszamElem.textContent = pontszam;
        talalatokElem.textContent = talalatok;
        megnyertKartyak = megnyertKartyak.concat(megnyitottKartyak);
      } else {
        setTimeout(function() {
          let elsoKartya = document.querySelector(`[data-index='${elsoIndex}']`);
          let masodikKartya = document.querySelector(`[data-index='${masodikIndex}']`);
          elsoKartya.textContent = "";
          masodikKartya.textContent = "";
        }, 1000);
      }

      megnyitottKartyak = [];

      if (megnyertKartyak.length === kartyak.length) {
        clearInterval(idoMero);
        alert(`Gratulálok! Nyertél ${ido} másodperc alatt!`);
      }
    }
  }
}

jatekInicializalas();
