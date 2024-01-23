const jatekTer = document.getElementById("jatekTer");
const idoElem = document.getElementById("ido");
const pontszamElem = document.getElementById("pontszam");
const talalatokElem = document.getElementById("talalatok");
const ujrakezdes=document.getElementById("ujrakezdes");
const joker=document.getElementById("joker");
const cica=document.getElementById("cica");
const tucsok=document.getElementById("tucsok");
const body=document.querySelector("body")
const sotet=document.getElementById("sotet");
let szinekEsSzavak = [`<img src="./img/cat1.jpg">`, '<img src="./img/cat2.jpg">', '<img src="./img/cat3.jpg">', '<img src="./img/cat4.jpg">', '<img src="./img/cat5.webp">', '<img src="./img/cat6.jpg">', '<img src="img/a14b87bfd1d5c37f6b1354f7d3d2a685.jpg">','<img src=" img/f3d61aaf-8fef-42a1-b4e5-784618b3b7cf-1676757488979.webp">', '<img src="img/my-cat-looks-goofy-v0-vreh8zeeym091.webp">' ,'<img src="img/512x512bb.jpg">'];
let kartyak = szinekEsSzavak.concat(szinekEsSzavak); // duplikáljuk a kártyákat
let megnyitottKartyak = [];
let megnyertKartyak = [];
let pontszam = 0;
let talalatok = 0;
let elsoKattintas = true;
let ido = 0;
let idoMero;
let kattintas=0;



kartyak.push("<img src='img/huh-what-dog-huh.gif' id='joker'>");



function keveres(arr) {
  let currentIndex = arr.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    //jelenlegi elem elmentése, majd csere a véletlenszerűen kiválasztott elemmel
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }
  return arr;
}

function jatekInicializalas() {
  // Kártyák véletlenszerű keverése a keveres függvény segítségével
  kartyak = keveres(kartyak);

  // Kártyák létrehozása és hozzáadása a játéktérhez
  for (let i = 0; i < kartyak.length; i++) {
    let kartya = document.createElement("div");
    kartya.dataset.index = i;
    kartya.addEventListener("click", kartyaKattintas);
    jatekTer.appendChild(kartya);
  }
  // Időmérő indítása
  idoMero = setInterval(function() {
    // Időszámláló növelése
    ido++;

    // Idő kiírása a képernyőre
    idoElem.textContent = `Idő: ${ido} másodperc`;

    // Időkorlát ellenőrzése
    if( ido==120){
      clearInterval(idoMero);
      alert("Sajnos lejárt az időd! 😿") // Időmérő leállítása

       // Az összes kártya felfordítása
      let osszes=document.querySelectorAll("#jatekTer div");
      for(let i=0;i<osszes.length; i++){
        osszes[i].innerHTML=kartyak[osszes[i].dataset.index];
      }
    }
  }, 1000);
}

function kartyaKattintas() {
  let kartya = this;
  let index = kartya.dataset.index;
  kattintas ++;

  // Joker kattintások kezelése
  if(kattintas<5){
    joker.innerText=5-kattintas
  }
  else {joker.innerText=0}

  // Joker kártya ellenőrzése
  if(kartyak[index].indexOf("joker")>-1){
    kartya.innerHTML = kartyak[index];
    megnyertKartyak = megnyertKartyak.concat(megnyitottKartyak);
    // Joker pontszám növelése
    if(kattintas<=5){
      pontszam +=5;
      alert("megtaláltad a jokert!🐶");
      pontszamElem.textContent = pontszam;
    }
  return;
  }

  if (elsoKattintas || (megnyitottKartyak.length < 2 && !megnyertKartyak.includes(index))) {
    // Kártya felfordítása
    kartya.innerHTML = kartyak[index];

    if (elsoKattintas) {
      elsoKattintas = false;
    }
    // Megnyitott kártyákhoz adás
    megnyitottKartyak.push(index);

    // Két kártya felnyitása
    if (megnyitottKartyak.length === 2) {
      let elsoIndex = megnyitottKartyak[0];
      let masodikIndex = megnyitottKartyak[1];
      // Két kártya egyezése esetén
      if (kartyak[elsoIndex] === kartyak[masodikIndex]) {
        cica.currentTime=0;
        //hang
        cica.play();
        pontszam++;
        talalatok++;
        pontszamElem.textContent = pontszam;
        talalatokElem.textContent = talalatok;
        megnyertKartyak = megnyertKartyak.concat(megnyitottKartyak);
      } 
      else {
        // Hang + 2 kártya visszafordítása
        tucsok.currentTime=0;
        tucsok.play();

        setTimeout(function() {
          let elsoKartya = document.querySelector(`[data-index='${elsoIndex}']`);
          let masodikKartya = document.querySelector(`[data-index='${masodikIndex}']`);
          elsoKartya.textContent = "";
          masodikKartya.textContent = "";
        }, 1000);
      }
      megnyitottKartyak = [];
      //Összes pár megtalálása esetén
      if (megnyertKartyak.length === kartyak.length) {
        //idomeroleallitasa
        clearInterval(idoMero);
        //üzenet
        alert(`Gratulálok! Nyertél ${ido} másodperc alatt! 😻`);
      }
    }
  }
}

jatekInicializalas();

ujrakezdes.addEventListener("click" , (event)=>{
  //oldal újra töltése=>ujrakezdes
  location.reload();
})

//sotetmod hozzaadasa
sotet.addEventListener("click", (event)=>{
  if(body.className=="sotet"){
  body.className="";
  sotet.textContent="🌛"}
  else{
  body.className="sotet";
  sotet.textContent="🌞"
  }}
)