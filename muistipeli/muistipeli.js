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
let fail = 0;
let time = 0;
let h = 0;
let m = 0;
let s = 0;
let retryNappi = '';

let cheat = '<table border="1">';
let cheatOn = 0;

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
  pakka = [];
  valitut = [];
  parit = [];
  klikattu = 0;
  fail = 0;
  time = 0;
  h = 0;
  m = 0;
  s = 0;
  clearInterval(aika);
  document.getElementById('aika').innerHTML = 'Aikaa kulunut:';
  document.getElementById('cheat').innerHTML = '';
  document.getElementById('pisteytys').innerHTML = '';
  cheat = '<table border="1">';
  cheatOn = 0;
  retryNappi = '';
  console.log(pakka);
  console.log('cheat?'+cheatOn);
}


function luoPakka(x) {
  document.getElementById('peli').selectedIndex = 0;
  console.log(x);
  tyhjenna();
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
  //Pakan sekoitus
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
  console.log(y);
  for(let i=0;i<pakka.length;i++) {

    //Etsitään laudan koko
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

    //console.log(lauta);
    //let kortti = document.createElement('div');

    //Korttien luonti laudalle
    let kortti = document.createElement('img');
    kortti.setAttribute('src', 'img/card_back.jpg');
    //kortti.appendChild(img);
    kortti.classList.add('kortti');
    kortti.dataset.pari = pakka[i].pari;
    kortti.id = i;
    kortti.addEventListener('click', kaanna);
    lauta.appendChild(kortti);
  }

}

function kaanna() {
  let valittu = this.id;
  klikattu++;
  if(klikattu===1) {
    //console.log('TÖÖT');
    aika = setInterval(ajastin, 1000);
  }
  //Haetaan kortin tunnistustiedot
  valitut.push(this.dataset.pari);
  valitut.push(this.id);

  if(cheatOn===1) {
    document.getElementById(this.id+'c').classList.add('cheats1');
  }

  //Kortin kääntö
  this.setAttribute('src', pakka[valittu].kuva);

  //Estetään kortin uudelleen valinta
  document.getElementById(valittu).removeEventListener('click', kaanna)

  //Tarkistaa jos on käännetty kaksi korttia
  if (valitut.length === 4) {

      //Jos on pari
      if (valitut[0] === valitut[2]) {

        //Note to self:
        //Katso myöhemmin tarviiko tätä
        parit.push(valitut[1]);
        parit.push(valitut[3]);

        if(cheatOn===1) {
          document.getElementById(valitut[1]+'c').classList.add('cheats2');
          document.getElementById(valitut[3]+'c').classList.add('cheats2');
        }

        //Vaihdetaan korttien ID ettei myöhemmät loopit enää koske niihin
        document.getElementById(valitut[1]).id += 'match';
        document.getElementById(valitut[3]).id += 'match';
        //console.log(parit);
        valitut = [];

        if (parit.length === pakka.length) {
          document.getElementById('pisteytys').innerHTML = 'VOITTO! ' + retryNappi;
          clearInterval(aika);
        }

      } else {
        fail++;
        console.log(fail);



        //Kääntämättömien korttien esto
        for(let i=0;i<pakka.length;i++) {
          if (document.getElementById(i) !== null) {
          document.getElementById(i).removeEventListener('click', kaanna);
          }
        }

        /*Aloittaa ajastimen joka vapauttaa kääntämättömät kortit
        ja kääntää valitut kortit takaisin kuluneen ajan jälkeen*/
        setTimeout(function() {

          //Korttien kääntö takaisin
          document.getElementById(valitut[3]).setAttribute('src', 'img/card_back.jpg');
          document.getElementById(valitut[1]).setAttribute('src', 'img/card_back.jpg');

          if(cheatOn===1) {
            document.getElementById(valitut[1]+'c').classList.remove('cheats1');
            document.getElementById(valitut[3]+'c').classList.remove('cheats1');
          }

          valitut = [];
          //Sallii taas kääntämättömät kortit
          for(let i=0;i<pakka.length;i++) {
            if (document.getElementById(i) !== null) {
            document.getElementById(i).addEventListener('click', kaanna);
            }
          }
      }, 700)
      }
      //console.log(pakka[valittu].kuva)


  }
}

function ajastin() {
  time++;
  s++;
  if(s===60) {
    m++;
    s = 0;
    if(m===60) {
      h++;
      m = 0;
    }
  }
  if (m===0 && h===0){
    document.getElementById('aika').innerHTML = 'Aikaa kulunut: ' + s;
  } else if (h===0) {
    document.getElementById('aika').innerHTML = 'Aikaa kulunut: ' + m + '.' + s;
  } else {
    document.getElementById('aika').innerHTML = 'Aikaa kulunut: ' + h + '???' + m + '.' + s;
  }
}


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
  cheatOn = 1;
  document.getElementById('cheat').innerHTML =  cheat + '</table>';
}


let hhh = 0;
function testi() {
  console.log(pakka);
  hhh += 'string'+(2+2)+'string';
  console.log(hhh);
}

function vapautus() {

}
