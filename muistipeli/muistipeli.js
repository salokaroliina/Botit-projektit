//Olen jättänyt tiimin pyynnöstä kommentteihin scrapatun pisteytys kokeilun
//Se oli söpö
//Mutta sen saaminen järkeväksi olisi ollut liian hankalaa tämän hetkisillä taidoilla
//Kaikki vanhaan pisteytykseen liittyvä on sisennetty luettavuuden takia

//Listataan kaikki käytettävät kortit
const kortit = [
              {pari: 'A', kuva: 'img/ph1.jpg'},
              {pari: 'A', kuva: 'img/ph1.jpg'},
              {pari: 'B', kuva: 'img/ph2.jpg'},
              {pari: 'B', kuva: 'img/ph2.jpg'},
              {pari: 'C', kuva: 'img/ph3.jpg'},
              {pari: 'C', kuva: 'img/ph3.jpg'},
              {pari: 'D', kuva: 'img/ph4.jpg'},
              {pari: 'D', kuva: 'img/ph4.jpg'},
              {pari: 'E', kuva: 'img/ph5.jpg'},
              {pari: 'E', kuva: 'img/ph5.jpg'},
              {pari: 'F', kuva: 'img/ph6.jpg'},
              {pari: 'F', kuva: 'img/ph6.jpg'},
              {pari: 'G', kuva: 'img/ph7.jpg'},
              {pari: 'G', kuva: 'img/ph7.jpg'},
              {pari: 'H', kuva: 'img/ph8.jpg'},
              {pari: 'H', kuva: 'img/ph8.jpg'},
              {pari: 'I', kuva: 'img/ph9.jpg'},
              {pari: 'I', kuva: 'img/ph9.jpg'},
              {pari: 'J', kuva: 'img/ph10.jpg'},
              {pari: 'J', kuva: 'img/ph10.jpg'},
              {pari: 'K', kuva: 'img/ph11.jpg'},
              {pari: 'K', kuva: 'img/ph11.jpg'},
              {pari: 'L', kuva: 'img/ph12.jpg'},
              {pari: 'L', kuva: 'img/ph12.jpg'},
              {pari: 'M', kuva: 'img/ph13.jpg'},
              {pari: 'M', kuva: 'img/ph13.jpg'},
              {pari: 'N', kuva: 'img/ph14.jpg'},
              {pari: 'N', kuva: 'img/ph14.jpg'},
              {pari: 'O', kuva: 'img/ph15.jpg'},
              {pari: 'O', kuva: 'img/ph15.jpg'},
              {pari: 'P', kuva: 'img/ph16.jpg'},
              {pari: 'P', kuva: 'img/ph16.jpg'},
              {pari: 'Q', kuva: 'img/ph17.jpg'},
              {pari: 'Q', kuva: 'img/ph17.jpg'},
              {pari: 'R', kuva: 'img/ph18.jpg'},
              {pari: 'R', kuva: 'img/ph18.jpg'}
                                              ];
let pakka = [];
let valitut = [];
let parit = [];
let klikattu = 0;
let tulos = '';
let yritykset = 0;
    //let pisteet = 0;
    //let time = 0;
let h = 0;
let m = 0;
let s = 0;
let retryNappi = '';
let cheat = '';


function tyhjenna() {
  //Poistetaan kortit laudalta
  const poistaKortti = document.getElementsByClassName('kortti');
  while(poistaKortti.length>0) {
    poistaKortti[0].parentNode.removeChild(poistaKortti[0]);
  }

  //Vaihdetaan laudan id takaisin defaultiksi
  if (document.getElementById('eka') !== null) {
    document.getElementById('eka').id = 'lauta';
  }
  if (document.getElementById('toka') !== null) {
    document.getElementById('toka').id = 'lauta';
  }
  if (document.getElementById('kolmas') !== null) {
    document.getElementById('kolmas').id = 'lauta';
  }

  //Arvojen resettaus
  pakka = [];
  valitut = [];
  parit = [];
  klikattu = 0;
  tulos = '';
  yritykset = 0;
      //pisteet = 0;
      //time = 0;
  h = 0;
  m = 0;
  s = 0;

  clearInterval(aika);

      //document.getElementById('pisteytys').innerHTML = pisteet;
  document.getElementById('aika').innerHTML = '';
  document.getElementById('cheat').innerHTML = '';
  document.getElementById('voitto').innerHTML = '';
  cheat = '<table border="1" id="cheatTable" class="hideTable">';
  retryNappi = '';
}


function luoPakka(x) {
  //Pakotetaan valikko default arvoon
  document.getElementById('peli').selectedIndex = 0;

  tyhjenna();

  //Luodaan yritä uudelleen-nappi joka käyttää valitun pakan kokoa
  retryNappi = '<button type="button" id="uudestaan" onClick="luoPakka(\'' + x + '\')">Yritä uudelleen?</button>';

  //Määritellään laudan koko
  let lautaKoko = document.getElementById('lauta');
  switch(x) {
    case '16':
      lautaKoko.id = 'eka';
      break;
    case '24':
      lautaKoko.id = 'toka';
      break;
    case '36':
      lautaKoko.id = 'kolmas';
      break;
  }

  //Tehdään pakka kortti arraysta
  for(let i=0;i<x;i++) {
    pakka.push(kortit[i]);
  }

  //Pakan sekoitus käyttäen Fisher-Yates shufflea
  let temp;
  for(let i=pakka.length-1;i>0;i--) {
    let rando = Math.floor(Math.random()*(i+1));
    temp = pakka[i];
    pakka[i] = pakka[rando];
    pakka[rando] = temp;
  }

  //Kutsutaan kortit näytölle
  luoLauta(x);
}


function luoLauta(y) {
  //Määritellään laudan koko
  switch(y) {
    case '16':
      var lauta = document.getElementById('eka');
      break;
    case '24':
      var lauta = document.getElementById('toka');
      break;
    case '36':
      var lauta = document.getElementById('kolmas');
      break;
  }

  //Korttien luonti laudalle
  for(let i=0;i<pakka.length;i++) {
    let kortti = document.createElement('img'); //Kortti-elementin luonti
    kortti.setAttribute('src', 'img/card_back.jpg'); //Asetetaan kuvaksi kortin selkä
    kortti.classList.add('kortti'); //Lisätään kortille classi
    kortti.dataset.pari = pakka[i].pari; //Lisätään kortin dataan pari-tieto
    kortti.id = i; //Kortin uniikki id
    kortti.addEventListener('click', kaanna); //Lisätään korttiin kääntö funktio
    lauta.appendChild(kortti); //Viimeiseksi lyödään kortti laudalle
  }

  //Luodaan cheatti taulukko
  cheats();
}


function kaanna() {
        //const pisteetShow = document.getElementById('pisteytys');
  let valittu = this.id;
  klikattu++;

  //Ajastimen aloitus ensimmäisestä klikkauksesta
  if(klikattu===1) {
    aika = setInterval(ajastin, 1000);
  }

  //Haetaan kortin tunnistustiedot ja työnnetään valitut-listaan
  valitut.push(this.dataset.pari);
  valitut.push(this.id);

    //Valitun kortin cheattisolun highlightaus
    document.getElementById(this.id+'c').classList.add('cheatValittu');

  //Kortin kääntö
  this.setAttribute('src', pakka[valittu].kuva);

  //Estetään kortin uudelleen valinta
  document.getElementById(valittu).removeEventListener('click', kaanna)

  //Tarkistaa jos on käännetty kaksi korttia
  if (valitut.length === 4) {

      //Jos on pari
      if (valitut[0] === valitut[2]) {

        //Siirretään parit listaan
        parit.push(valitut[1]);
        parit.push(valitut[3]);

              /*if (klikattu===2) {
                pisteet+=50;
                //console.log(pisteet);
                pisteetShow.classList.toggle('pistePlus');
                pisteetShow.innerHTML = '<b>' + '+' + pisteet + '</b>';
                setTimeout(function() {
                  pisteetShow.classList.toggle('pistePlus');
                  pisteetShow.innerHTML = pisteet;
                }, 400);

              } else {
                pisteet+=10;
                pisteetShow.classList.toggle('pistePlus');
                pisteetShow.innerHTML = '+' + pisteet;
                setTimeout(function() {
                  pisteetShow.classList.toggle('pistePlus');
                  pisteetShow.innerHTML = pisteet;
                }, 400);
              }*/

          //Muutetaan valitun parin cheattisolut mustiksi
          document.getElementById(valitut[1]+'c').classList.add('cheatPari');
          document.getElementById(valitut[3]+'c').classList.add('cheatPari');

        //Vaihdetaan parin ID:t ettei myöhemmät loopit enää koske niihin
        document.getElementById(valitut[1]).id += 'match';
        document.getElementById(valitut[3]).id += 'match';

        //Tyhjennetään valitut kortit pois
        valitut = [];

        //Jos kaikille on löytynyt pari
        if (parit.length === pakka.length) {

          //Tarkastetaan pakan koko sekä yritysten määrä ja annetaan tuomio niiden mukaan
          //Tuomio voi olla ehkä liian ankara?
          if(pakka.length===16) {
            if(yritykset===0) {
              tulos = '<b>HUIJARI!!!</b>';
            } else if(yritykset<8) {
              tulos = '&#9733;&#9733;&#9733;&#9733;&#9733;';
            } else if(yritykset<10) {
              tulos = '&#9733;&#9733;&#9733;&#9733;&#9734;';
            } else if(yritykset<12) {
              tulos = '&#9733;&#9733;&#9733;&#9734;&#9734;';
            } else if(yritykset<14) {
              tulos = '&#9733;&#9733;&#9734;&#9734;&#9734;';
            } else if(yritykset<16){
              tulos = '&#9733;&#9734;&#9734;&#9734;&#9734;';
            } else {
              tulos = '&#9734;&#9734;&#9734;&#9734;&#9734;';
            }
          } else if(pakka.length===24) {
            if(yritykset===0) {
              tulos = '<b>HUIJARI!!!</b>';
            } else if(yritykset<18) {
              tulos = '&#9733;&#9733;&#9733;&#9733;&#9733;';
            } else if(yritykset<21) {
              tulos = '&#9733;&#9733;&#9733;&#9733;&#9734;';
            } else if(yritykset<24) {
              tulos = '&#9733;&#9733;&#9733;&#9734;&#9734;';
            } else if(yritykset<27) {
              tulos = '&#9733;&#9733;&#9734;&#9734;&#9734;';
            } else if(yritykset<30) {
              tulos = '&#9733;&#9734;&#9734;&#9734;&#9734;';
            } else {
              tulos = '&#9734;&#9734;&#9734;&#9734;&#9734;';
            }
          } else if(pakka.length===36) {
            if(yritykset===0) {
              tulos = '<b>HUIJARI!!!</b>';
            } else if(yritykset<31) {
              tulos = '&#9733;&#9733;&#9733;&#9733;&#9733;';
            } else if(yritykset<36) {
              tulos = '&#9733;&#9733;&#9733;&#9733;&#9734;';
            } else if(yritykset<41) {
              tulos = '&#9733;&#9733;&#9733;&#9734;&#9734;';
            } else if(yritykset<46) {
              tulos = '&#9733;&#9733;&#9734;&#9734;&#9734;';
            } else if(yritykset<51) {
              tulos = '&#9733;&#9734;&#9734;&#9734;&#9734;';
            } else {
              tulos = '&#9734;&#9734;&#9734;&#9734;&#9734;';
            }
          }

          //Laudan himmennys
          let korttiFade = document.getElementsByClassName('kortti');

          for(let f=0; f<pakka.length; f++) {
            korttiFade[f].style.opacity = 0.7;
          }

          //Tulostetaan voitto-viesti ja tulos näkyviin
          document.getElementById('voitto').innerHTML = '<b>VOITTO!</b>' + '<br>' + 'Tuloksesi: ' + tulos + '<br>' + retryNappi;

          //Ajastimen pysäytys
          clearInterval(aika);
        }
      } else { //Jos EI ollut pari

        //Yritys laskuri
        yritykset++;
        //Tämä console.log on edelleen hyödyllinen testausta varten
        //Joten se saa jäädä
        console.log(yritykset);

              //En ollut ehtinyt määritellä vanhaan pisteytykseen että se katsoisin pakan koon
              /*if (pisteet>0 && yritykset%3===0) {
                pisteet-=2;
                pisteetShow.innerHTML = '-' + pisteet;
                pisteetShow.classList.toggle('pisteMiinus');

                setTimeout(function() {
                  pisteetShow.innerHTML = pisteet;
                  pisteetShow.classList.toggle('pisteMiinus');
                }, 400);
              }*/

        //Kääntämättömien korttien esto
        //Olisi varmaan ollut helpompi tapa tehdä tämä
        //Mutta tähän päädyin sen aikaisilla taidoilla
        for(let i=0;i<pakka.length;i++) {
          if (document.getElementById(i) !== null) { //tarkastaa että kyseinen ID on olemassa
          document.getElementById(i).removeEventListener('click', kaanna);  //Kääntö-funktion poisto
          }
        }

        /*Aloittaa ajastimen joka vapauttaa kääntämättömät kortit
        ja kääntää valitut kortit nurin kuluneen ajan jälkeen*/
        setTimeout(function() {

          //Korttien kääntö nurin
          document.getElementById(valitut[3]).setAttribute('src', 'img/card_back.jpg');
          document.getElementById(valitut[1]).setAttribute('src', 'img/card_back.jpg');

            //Poistetaan highlightaus korttien cheattisoluista
            document.getElementById(valitut[1]+'c').classList.remove('cheatValittu');
            document.getElementById(valitut[3]+'c').classList.remove('cheatValittu');

          //Poistetaan kortit valitut-listalta
          valitut = [];

          //Sallii taas kääntämättömät kortit
          for(let i=0;i<pakka.length;i++) {
            if (document.getElementById(i) !== null) { //ID:n olemassaolon tarkastus
            document.getElementById(i).addEventListener('click', kaanna); //Lisätään kääntö-funktio takaisin
            }
          }
        }, 700); //Aika minkä jälkeen tuo kaikki tapahtuu
      }
  }
}


//Funktio joka tulee setIntervalin sisään
function ajastin() {
      //const pisteetShow = document.getElementById('pisteytys');
      //time++;
  s++;

  //Nostetaan minuutti-muuttujaa yhdellä jos sekunti-muuttujan arvo on 60
  //ja nollataan sekunit
  if(s===60) {
    m++;
    s = 0;
    //Jos minuutteja on 60 nostetaan tunteja yhdellä ja nollataan minuutit
    //Tämä on turhake tähän tehtävään, mutta tein huvin ja harjoituksen vuoksi
    if(m===60) {
      h++;
      m = 0;
    }
  }

          /*if (pisteet>0){
            if (time%10===0) {
              if(pisteet<5) {
                switch(pisteet) {
                  case 4:
                    pisteet-=4;
                    break;
                  case 3:
                    pisteet-=3;
                    break;
                  case 2:
                    pisteet-=2;
                    break;
                  case 1:
                    pisteet-=1;
                    break;
                }
              } else {
                pisteet-=5;
              }
              pisteetShow.innerHTML = '-' + pisteet;
              document.getElementById('aika').classList.toggle('pisteMiinus');
              pisteetShow.classList.toggle('pisteMiinus');

              setTimeout(function() {
                document.getElementById('aika').classList.toggle('pisteMiinus');
                }, 300);

                setTimeout(function() {
                  pisteetShow.classList.toggle('pisteMiinus');
                  pisteetShow.innerHTML = pisteet;
                }, 400);
            }
        }*/

  //Kirjoitetaan aika näytölle
  if (m===0 && h===0){
    document.getElementById('aika').innerHTML = s;
  } else if (h===0) {
    document.getElementById('aika').innerHTML = m + '.' + s;
  } else {
    document.getElementById('aika').innerHTML = h + '???' + m + '.' + s;
  }
}


//Cheattitaulun luonti
function cheats() {
    if (pakka.length==16) {
      for(let i=0;i<pakka.length;i+=4) {
        cheat += '<tr><td id="' +i+ 'c">' + pakka[i].pari + '</td><td id="' +(i+1)+ 'c">' + pakka[i+1].pari + '</td><td id="' +(i+2)+ 'c">' + pakka[i+2].pari + '</td><td id="' +(i+3)+ 'c">' + pakka[i+3].pari + '</td></tr>';
      }
    } else {
      for(let i=0;i<pakka.length;i+=6) {
        cheat += '<tr><td id="' +i+ 'c">' + pakka[i].pari + '</td><td id="' +(i+1)+ 'c">' + pakka[i+1].pari + '</td><td id="' +(i+2)+ 'c">' + pakka[i+2].pari + '</td><td id="' +(i+3)+ 'c">' + pakka[i+3].pari + '</td><td id="' +(i+4)+ 'c">' + pakka[i+4].pari + '</td><td id="' +(i+5)+ 'c">' + pakka[i+5].pari + '</td></tr>';
      }
    }
    document.getElementById('cheat').innerHTML =  cheat + '</table>';
}


//Cheattitaulun näkyvyyden muutos
function cheatToggle() {
  //Tarkistetaan onko cheattiTaulua olemassa
  if(pakka.length>0) {
    document.getElementById('cheatTable').classList.toggle('hideTable');
  }
}
