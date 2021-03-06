const kortit = [
              {pari: 'A', kuva: 'grafiikka/mp/k01.jpg'},
              {pari: 'A', kuva: 'grafiikka/mp/k01.jpg'},
              {pari: 'B', kuva: 'grafiikka/mp/k02.jpg'},
              {pari: 'B', kuva: 'grafiikka/mp/k02.jpg'},
              {pari: 'C', kuva: 'grafiikka/mp/k03.jpg'},
              {pari: 'C', kuva: 'grafiikka/mp/k03.jpg'},
              {pari: 'D', kuva: 'grafiikka/mp/k04.jpg'},
              {pari: 'D', kuva: 'grafiikka/mp/k04.jpg'},
              {pari: 'E', kuva: 'grafiikka/mp/k05.jpg'},
              {pari: 'E', kuva: 'grafiikka/mp/k05.jpg'},
              {pari: 'F', kuva: 'grafiikka/mp/k06.jpg'},
              {pari: 'F', kuva: 'grafiikka/mp/k06.jpg'},
              {pari: 'G', kuva: 'grafiikka/mp/k07.jpg'},
              {pari: 'G', kuva: 'grafiikka/mp/k07.jpg'},
              {pari: 'H', kuva: 'grafiikka/mp/k08.jpg'},
              {pari: 'H', kuva: 'grafiikka/mp/k08.jpg'},
              {pari: 'I', kuva: 'grafiikka/mp/k09.jpg'},
              {pari: 'I', kuva: 'grafiikka/mp/k09.jpg'},
              {pari: 'J', kuva: 'grafiikka/mp/k10.jpg'},
              {pari: 'J', kuva: 'grafiikka/mp/k10.jpg'},
              {pari: 'K', kuva: 'grafiikka/mp/k11.jpg'},
              {pari: 'K', kuva: 'grafiikka/mp/k11.jpg'},
              {pari: 'L', kuva: 'grafiikka/mp/k12.jpg'},
              {pari: 'L', kuva: 'grafiikka/mp/k12.jpg'}
                                              ];
const lauta = document.getElementById('muistipeli');
const korttiFade = document.getElementsByClassName('kortti');
const boxDiag = document.getElementById('boxDiag');

const cardClick = new Audio('sound/SFX_Powerup_47.wav');
      cardClick.volume = 0.3;
      cardClick.playbackRate = 0.7;
const notPair = new Audio('sound/SFX_Powerup_44.wav');
      notPair.volume = 0.4
      notPair.playbackRate = 0.7;
const boxUnlock = new Audio('sound/DoorLock.wav');

let pakka = [];
let valitut = [];
let parit = [];
let tulos = '';


luoPakka();
function luoPakka() {

  //Tehd????n pakka kortti arraysta
  for(let i=0;i<24;i++) {
    pakka.push(kortit[i]);
  }

  //Pakan sekoitus k??ytt??en Fisher-Yates shufflea
  let temp;
  for(let i=pakka.length-1;i>0;i--) {
    let rando = Math.floor(Math.random()*(i+1));
    temp = pakka[i];
    pakka[i] = pakka[rando];
    pakka[rando] = temp;
  }

  //Kutsutaan kortit n??yt??lle
  luoLauta();
}


function luoLauta() {

  //Korttien luonti laudalle
  for(let i=0;i<pakka.length;i++) {
    let kortti = document.createElement('img'); //Kortti-elementin luonti
    kortti.setAttribute('src', 'grafiikka/mp/card_back.jpg'); //Asetetaan kuvaksi kortin selk??
    kortti.classList.add('kortti'); //Lis??t????n kortille classi
    kortti.dataset.pari = pakka[i].pari; //Lis??t????n kortin dataan pari-tieto
    kortti.id = i; //Kortin uniikki id
    kortti.addEventListener('click', kaanna); //Lis??t????n korttiin k????nt?? funktio
    lauta.appendChild(kortti); //Viimeiseksi ly??d????n kortti laudalle
  }
}


function kaanna() {
  let valittu = this.id;

  cardClick.play();

  //Haetaan kortin tunnistustiedot ja ty??nnet????n valitut-listaan
  valitut.push(this.dataset.pari);
  valitut.push(this.id);

  //Kortin k????nt??
  this.setAttribute('src', pakka[valittu].kuva);

  //Estet????n kortin uudelleen valinta
  document.getElementById(valittu).removeEventListener('click', kaanna)

  //Tarkistaa jos on k????nnetty kaksi korttia
  if (valitut.length === 4) {

      //Jos on pari
      if (valitut[0] === valitut[2]) {

        //Siirret????n parit listaan
        parit.push(valitut[1]);
        parit.push(valitut[3]);
        document.getElementById(valitut[1]).classList.add('fadeCard');
        document.getElementById(valitut[3]).classList.add('fadeCard');
        //Vaihdetaan parin ID:t ettei my??hemm??t loopit en???? koske niihin
        document.getElementById(valitut[1]).id += 'match';
        document.getElementById(valitut[3]).id += 'match';

        //Tyhjennet????n valitut kortit pois
        valitut = [];

        //Jos kaikille on l??ytynyt pari
        if (parit.length === pakka.length) {

          //Tulostetaan voitto-viesti ja tulos n??kyviin
          boxUnlock.play();
          boxDiag.innerHTML = 'Hey, I think I can take the lid off now!';
          lidOffDiag = true;

          //Ajastimen pys??ytys
          //clearInterval(aika);
        }
      } else { //Jos EI ollut pari
        notPair.play();

        //K????nt??m??tt??mien korttien esto
        //Olisi varmaan ollut helpompi tapa tehd?? t??m??
        //Mutta t??h??n p????dyin sen aikaisilla taidoilla
        for(let i=0;i<pakka.length;i++) {
          if (document.getElementById(i) !== null) { //tarkastaa ett?? kyseinen ID on olemassa
          document.getElementById(i).removeEventListener('click', kaanna);  //K????nt??-funktion poisto
          }
        }

        /*Aloittaa ajastimen joka vapauttaa k????nt??m??tt??m??t kortit
        ja k????nt???? valitut kortit nurin kuluneen ajan j??lkeen*/
        setTimeout(function() {

          //Korttien k????nt?? nurin
          document.getElementById(valitut[3]).setAttribute('src', 'grafiikka/mp/card_back.jpg');
          document.getElementById(valitut[1]).setAttribute('src', 'grafiikka/mp/card_back.jpg');

          //Poistetaan kortit valitut-listalta
          valitut = [];

          //Sallii taas k????nt??m??tt??m??t kortit
          for(let i=0;i<pakka.length;i++) {
            if (document.getElementById(i) !== null) { //ID:n olemassaolon tarkastus
            document.getElementById(i).addEventListener('click', kaanna); //Lis??t????n k????nt??-funktio takaisin
            }
          }
        }, 700); //Aika mink?? j??lkeen tuo kaikki tapahtuu
      }
  }
}

function openBoxLid() {
  takeItem.play();
  box.style.display = 'none';
  boxOpen.style.display = 'block';
  boxLid.style.display = 'block';
  dialogue.innerHTML = 'Would you look at that';
  key.style.display = 'block';
  ambient.pause();
  keyFanfare.play();
  lidOffDiag = false;
  keyOnSceen = true;
  boxDiag.innerHTML = 'Where does mom GET all this stuff?'
  //Seuraavassa loopissa poistetaan animaatio class ja lis??t????n class jossa
  //korttien l??pin??kyvyys on sama kuin animaation lopussa
  //Koska jos modalin avaa uudelleen, animaatiot alkaa uudelleen
  for(let f=0; f<pakka.length; f++) {
    korttiFade[f].classList.remove('fadeCard');
    korttiFade[f].classList.add('fadedCard');
  }
}
