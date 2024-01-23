let jatekTer = document.getElementById("jatekTer");
let idoElem = document.getElementById("ido");
let pontszamElem = document.getElementById("pontszam");
let talalatokElem = document.getElementById("talalatok");
let ujrakezdes=document.getElementById("ujrakezdes");

let joker=document.getElementById("joker");

let cica=document.getElementById("cica");
let tucsok=document.getElementById("tucsok");

let body=document.querySelector("body")
let sotet=document.getElementById("sotet");
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

    if( ido==120){
      clearInterval(idoMero);
      alert("Sajnos lejárt az időd! 😿")
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

  if(kattintas<5){
    joker.innerText=5-kattintas
  }
  else {joker.innerText=0}

  if(kartyak[index].indexOf("joker")>-1){
    kartya.innerHTML = kartyak[index];
    megnyertKartyak = megnyertKartyak.concat(megnyitottKartyak);

    if(kattintas<=5){
      pontszam +=5;
      alert("megtaláltad a jokert!🐶");
      pontszamElem.textContent = pontszam;
    }
  return;
  }

  if (elsoKattintas || (megnyitottKartyak.length < 2 && !megnyertKartyak.includes(index))) {

    kartya.innerHTML = kartyak[index];

    if (elsoKattintas) {
      elsoKattintas = false;
    }
    megnyitottKartyak.push(index);

    if (megnyitottKartyak.length === 2) {
      let elsoIndex = megnyitottKartyak[0];
      let masodikIndex = megnyitottKartyak[1];

      if (kartyak[elsoIndex] === kartyak[masodikIndex]) {
        cica.currentTime=0;
        cica.play();

        pontszam++;
        talalatok++;
        pontszamElem.textContent = pontszam;
        talalatokElem.textContent = talalatok;
        megnyertKartyak = megnyertKartyak.concat(megnyitottKartyak);
      } 
      else {
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
      if (megnyertKartyak.length === kartyak.length) {
        clearInterval(idoMero);
        alert(`Gratulálok! Nyertél ${ido} másodperc alatt! 😻`);
      }
    }
  }
}

jatekInicializalas();

ujrakezdes.addEventListener("click" , (event)=>{
  location.reload();
})


sotet.addEventListener("click", (event)=>{
  if(body.className=="sotet"){
  body.className="";
  sotet.textContent="🌛"}
  else{
  body.className="sotet";
  sotet.textContent="🌞"
  }}
)