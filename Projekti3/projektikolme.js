// Työnjako ja osallistujat:
// Html: Karoliina Salo
// Css: Simo Särkiranta
// JS: Karoliina Salo


// luodaan muuttuja "satunnainen" funktion ulkopuolelle
// muuttujan ollessa funktion ulkopuolella, funktio ei vaikuta siihen
// ja satunnainen luku pysyy samana
var satunnainen = Math.floor(Math.random()*10)+1;
// muuttujat voittto, tappio ja kerrat ovat myös funktion ulkopuolella
var voitto = 0;
var tappio = 0;
var kerrat = 0;
// funktio
function pelaa(){
  // logista voi tarkistaa satunnaisluvun
  console.log(satunnainen);
  // aina funktion käynnistyessä (nappia painamalla), kerrat saa yhden lisää
  // kertoja on enintään 3
  kerrat++;
  // for-loop
  for(var i = 0; i < 11; i++) {
    // verrataan i:tä käyttäjän syöttämään lukuun
      if(i == numeroSyotto.value){
        // kun käyttäjä painaa nappia neljännen kerran, ohjelma kertoo pelaajan käyttäneen kaikki kerrat
        // peli voi päättyä myös käyttäjän arvattua oikein ja saatua 1 pisteen
        if(kerrat >= 4 || voitto == 1) {
          if (kerrat >= 4) {
            alert("Käytit kaikki kerrat!");
          }
          else {
            alert("Olet jo voittanut!");
          }
          // jos luku on suurempi kuin satunnainen luku, ohjelma kertoo numeron olevan liian suuri
        } else if(numeroSyotto.value > satunnainen) {
          alert("Valitsit liian SUUREN numeron!");
          // numeron ollessa väärä, tappiot kasvavat yhdellä
          tappio++;
          return document.getElementById("tappiot").innerHTML = "Tappiot: " + tappio;
        } // jos luku on pienempi kuin satunnainen luku, ohjelma kertoo numeron olevan liian pieni
          else if(numeroSyotto.value < satunnainen) {
          alert("Valitsit liian pienen numeron!");
          // numeron ollessa väärä, tappiot kasvavat yhdellä
          tappio++;
          return document.getElementById("tappiot").innerHTML = "Tappiot: " + tappio;
        } // jos numero on sama kuin satunnainen luku, pelaaja voittaa
          else if(numeroSyotto.value == satunnainen) {
          alert("Arvasit oikein! Peli päättyy");
          // pelaajan voittaessa voitto kasvaa yhdellä
          voitto++;
          return document.getElementById("voitot").innerHTML = "VOITTO!";
        }
      }
    }
}
