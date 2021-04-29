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

function tyhjenna() {
  const poistaKortti = document.getElementsByClassName('kortti');
  while(poistaKortti.length>0) {
    poistaKortti[0].parentNode.removeChild(poistaKortti[0]);
  }
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
  console.log(pakka);
}

function luoPakka(x) {
  console.log(x);
  tyhjenna();
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
  /*if(x==16) {
    lautaKoko.id = 'eka';
  } else if (x==24) {
    lautaKoko.id = 'toka';
  } else if (x==36) {
    lautaKoko.id = 'kolmas';
  }*/
  for(let i=0;i<x;i++) {
    pakka.push(kortit[i]);
  }
  let temp;
  for(let i=pakka.length-1;i>0;i--) {
    let rando = Math.floor(Math.random()*(i+1));
    temp = pakka[i];
    pakka[i] = pakka[rando];
    pakka[rando] = temp;
  }
  luoLauta(x);
}



function luoLauta(y) {
  console.log(y);
  for(let i=0;i<pakka.length;i++) {
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
  /*  if (y == 16) {
      var lauta = document.getElementById('eka');
    } else if(y==24) {
      var lauta = document.getElementById('toka');
    } else if(y==36) {
      var lauta = document.getElementById('kolmas');
    }*/
    console.log(lauta);
    //let kortti = document.createElement('div');
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
    console.log('TÖÖT');
  }
  valitut.push(this.dataset.pari);
  valitut.push(this.id);
  this.setAttribute('src', pakka[valittu].kuva);

  document.getElementById(valittu).removeEventListener('click', kaanna)

  //Tarkistaa jos on käännetty kaksi korttia
  if (valitut.length === 4) {
    //Kääntämättömien korttien esto
    for(let i=0;i<pakka.length;i++) {
      if (document.getElementById(i) !== null) {
      document.getElementById(i).removeEventListener('click', kaanna);
      }
    }
    //Aloittaa ajastimen joka katsoo tuliko pari
    setTimeout(function() {
      if (valitut[0] === valitut[2]) {
        alert("voitit töttöröö");
        parit.push(valitut[1]);
        parit.push(valitut[3]);
        document.getElementById(valitut[1]).id += 'match';
        document.getElementById(valitut[3]).id += 'match';
        console.log(parit);
        valitut = [];
      } else {
        alert("hävisit");
        document.getElementById(valitut[3]).setAttribute('src', 'img/card_back.jpg');
        document.getElementById(valitut[1]).setAttribute('src', 'img/card_back.jpg');

        valitut = [];
      }
      console.log(pakka[valittu].kuva)
      //Sallii taas kääntämättömät kortit
      for(let i=0;i<pakka.length;i++) {
        if (document.getElementById(i) !== null) {
        document.getElementById(i).addEventListener('click', kaanna);
        }
      }
    }, 700)
  } else {

  }
}

function testi() {
  console.log(pakka);
  document.getElementById(21).id += 'string';
}

function vapautus() {

}
