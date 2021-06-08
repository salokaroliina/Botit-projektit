// modal & sulje-näppäin -K
const modal = document.getElementsByClassName('modal');
const modalVankila = document.getElementsByClassName('modal-content_vankila');
//const x = document.getElementsByClassName('close');
// erilliset objektit -K
const lockKey = document.getElementById('lock-key');
const lockCode = document.getElementById('lock-code');
const lockElec = document.getElementById('lock-elec');
const code = document.getElementById('lockbutton');
const box = document.getElementById('box');
const key = document.getElementById('key');
const note = document.getElementById('note');
const doorOpen = document.getElementById('door-open');
const curtain = document.getElementById('curtain');
const bag = document.getElementById('bag');
const jacket = document.getElementById('jacket');
const pot = document.getElementsByClassName('pot')[0];
const pcSolutions = document.getElementById('pc-broken');
// taustaelementit -K
const door = document.getElementById('hit-door');
const frame = document.getElementById('hit-frame');
const clock = document.getElementById('hit-clock');
const monitor = document.getElementById('hit-monitor');
const pc = document.getElementById('hit-pc');
const wind = document.getElementById('hit-window');
const bookOne = document.getElementById('hit-book1');
const bookTwo = document.getElementById('hit-book2');
const bookThree = document.getElementById('hit-book3');
const bookFour = document.getElementById('hit-book4');
//dialogiboxi -u
const dialogue = document.getElementById('dialogiBoxi');
const monitorDesktop = document.getElementById('monitor-desktop');
const monitorGame = document.getElementById('monitor-game');
const monitorWin = document.getElementById('monitor-win');
const monitorBroken = document.getElementById('monitor-broken');
const unlockSound = new Audio('sound/UnlockDoor.wav');
const lockedSound = new Audio('sound/LockedDoorHandleJiggle.ogg');
const ambient = new Audio('sound/Etirwer.ogg');
      ambient.loop = true;
      ambient.volume = 0.2;
const opening = new Audio('sound/Chest Creak.wav');
const curtainSound = new Audio('sound/492619__khanyi-190188__curtain-on-rail.wav');
      curtainSound.playbackRate = 3;
const takeItem = new Audio('sound/jump.wav');
// inventaario on pelissä vain array -K
// fyysiselle inventaariolle ei ollut tarvetta -K
let inventory = [];

let noteRead = false; //Muistilappu luettu?
let codeLockChecked = false; //Koodilukko avattu?
let monitorChecked = false; //Desktop-näkymän lonkerodialogi aktivoitu?
let eleLockOpen = false;
let keyLockOpen = false;
let codeLockOpen = false;
let codeReset = false;
let musicStarted = false;
let gamePlaying = false; //Onko Flappy UFO 2 aktiivinen

// Unna teki nämä -->
//Modal-kutsu funktio
function popup(x) {
  //Hakee classlistiltä määritellyn modalin
  modal[x].style.display = 'block';
  //Jos monitorin modal on päällä, ja tätä funktiota ei ole aiemmin aktivoitu
  if (x===2 && !monitorChecked) {
    //Ajastin simuloimaan aikaa mikä pelaaja-hahmolla kestää lukea
    //On ehkä pitkä aika koska koodari käytti vertailukohtana omaa lukunopeutta
    setTimeout(function() {
      //Jos modal on näkyvissa, JA gameState desktop-tilassa
      if(modal[2].style.display === 'block' &&
        gameState.current === gameState.desktop){
        //Dialogi
        dialogue.innerHTML = '"Tentacles have the key"...?'
        monitorChecked = true; //Merkitään tämä funktio aktivoituneeksi
      }
    }, 1500);

  }
  //Jos on koodilukko modal
  if(x===11) {
    if (!codeLockChecked) {
      codeLockChecked = true;
    }
    dialogue.innerHTML = 'Hmm...';
  }
  //Jos on muistilappu modal
  if(x===12) {
    //Lappu merkataan luetuksi
    if(!noteRead) {
      noteRead = true;
    }
  }
}

//Ikkunalle onclickki
window.onclick = function(event) {
  //Karoliina lisäsi musiikin tähän
  //Jos musiikkia ei ole aloitettu
  if (!musicStarted) {
    ambient.play(); //Soitetaan tausta ambient
    musicStarted = true; //Merkataan musiikki aloitetuksi
  }

  //Looppi joka käy modalit läpi
  for(let i=0;i<modal.length;i++) {
    //Jos klikkauksen kohde on modal tai modal-contentin käärijä
    if (event.target == modal[i] || event.target == modalVankila[i]) {
      modal[i].style.display = 'none'; //Piiloitetaan klikattu modal
      //Jos koodilukon numero on arvattu väärin
      if (codeReset) {
        //Resetoidaan koodilukkomodalin dialogi
        document.getElementById('locked').innerHTML = "This lock needs a code";
        codeReset = false; //Otetaan resetti pois päältä
      }
    }
  }
}
//Modalin sulku-nappi
function shut(button) {
  //Piiloitetaan tämän isovanhemman vanhempi
  button.parentNode.parentNode.parentNode.style.display = 'none';
  //Jos koodilukon numero on arvattu väärin
  if (codeReset) {
    //Resetoidaan koodilukkomodalin dialogi
    document.getElementById('locked').innerHTML = "This lock needs a code";
    codeReset = false; //Otetaan resetti pois päältä
  }
}
//Dialogi
function dialogi(d) {
  //Kirjoittaa dialogia pelin dialogilaatikkoon riippuen siitä mitä tutkitaan
  switch (d) {
    case 'doorClosed':
      dialogue.innerHTML = 'The door is locked';
      lockedSound.play();
    break;
    case 'picture':
      dialogue.innerHTML =
      'There\'s a picture of my mom on the shelf<br><span class="interact" onclick="popup(0)">Take a closer look</span>';
    break;
    case 'clock':
      dialogue.innerHTML = 'Our old clock<br><span class="interact" onclick="popup(1)">Take a closer look</span>';
    break;
    case 'monitor':
      //Jos FU2-peli ei ole tällä hetkellä päällä
      if (!gamePlaying) {
        //Jos ollaan saavutettu FU2 hyvä loppu
        if (gameState.current === gameState.solved) {
          dialogue.innerHTML =
          'I really should get going<br><span class="interact" onclick="popup(2)">Gaze wistfully</span>';
        //Jos ollaan saavutettu FU2 huono loppu
        } else if (gameState.current === gameState.extraSolved) {
          dialogue.innerHTML =
          '...<br><span class="interact" onclick="popup(2)">Mourn</span>';
        } else {
          //Muuten
          //Jos peli ei ole aktivoinut desktop lonkero-dialogia
          if (!monitorChecked) {
            dialogue.innerHTML =
            'I\'m in a hurry...<br><span class="interact" onclick="popup(2)">(But a second can\'t hurt, can it?)</span>';
          //Jos lonkerodialogi on aktivoitu
          } else {
            dialogue.innerHTML =
            'What was that about the tentacles?<br><span class="interact" onclick="popup(2)">Alas, I guess I have no other choice than to mess around on my computer some more</span>';
          }
        }
      //Jos peli on päällä, avataan suoraan monitor modal ilman dialogia
      } else {
        popup(2);
      }
    break;
    case 'pc':
      dialogue.innerHTML = 'The computer is on';
    break;
    case 'pcSolved':
      dialogue.innerHTML = 'I broke my computer...';
    break;
    case 'window':
      //Jos muistilappua ei ole vielä luettu
      if(!noteRead) {
        dialogue.innerHTML = 'The drop is too high, I can\'t escape through the window';
      //Jos muistilappu on luettu
      } else {
        dialogue.innerHTML =
        'How did she do it??';
      }
    break;
    case 'book1':
      dialogue.innerHTML =
      'Mom\'s true crime book<br><span class="interact" onclick="popup(3)">Take a closer look</span>';
    break;
    case 'book2':
      dialogue.innerHTML =
      'Ratty old book<br><span class="interact" onclick="popup(4)">Take a closer look</span>';
    break;
    case 'book3':
      dialogue.innerHTML =
      'My school book<br><span class="interact" onclick="popup(5)">Take a closer look</span>';
    break;
    case 'book4':
      dialogue.innerHTML =
      'One of my creepy humanology books<br><span class="interact" onclick="popup(6)">Take a closer look</span>';
    break;
    case 'book5':
      dialogue.innerHTML =
      'Code credits<br><span class="interact" onclick="popup(7)">Take a closer look</span>';
    break;
    case 'book6':
      dialogue.innerHTML =
      'Graphics credits<br><span class="interact" onclick="popup(8)">Take a closer look</span>';
    break;
    case 'book7':
      dialogue.innerHTML =
      'Sound credits<br><span class="interact" onclick="popup(9)">Take a closer look</span>';
    break;
    case 'book8':
      dialogue.innerHTML =
      'The gamedev team<br><span class="interact" onclick="popup(10)">Take a closer look</span>';
    break;
    case 'key':
      dialogue.innerHTML =
      'It\'s a key<br>I can\'t pick it up. It\'s breaking the fourth wall, thus out of my reach<br>AAAGH!';
    break;
    case 'box':
      dialogue.innerHTML =
      'The box is locked';
    break;
    case 'keyLock':
      dialogue.innerHTML =
      'This lock needs a key';
    break;
    case 'codLock':
      //Jos koodilukko-modalia ei ole vielä avattu kertaakaan
      if (!codeLockChecked) {
        dialogue.innerHTML =
        'This lock needs a code<br><span class="interact" onclick="popup(11)">Take a closer look</span>';
      } else {
        popup(11);
      }
    break;
    case 'eleLock':
      dialogue.innerHTML =
      'This lock is electrical';
    break;
    case 'note':
      dialogue.innerHTML =
      'Theres a note on the door<br><span class="interact" onclick="popup(12)">Take a closer look</span>';
    break;
    case 'openDoor':
      dialogue.innerHTML =
      'I did it!'
    break;
  }
}
// <--

// koodilukko -K
function codeLock(){
  let button = document.getElementById('codebutton');
  let input = document.getElementById('code');
  // jos koodi on 6174, lukko poistuu ja modaaliin tulee teksti joka kertoo
  // lukon olevan auki
  if (code.value == '6174') {
    //console.log("Oikein");
    lockCode.remove();
    unlockSound.play();
    document.getElementById('locked').innerHTML = "The lock opened!";
    // jos koodi on oikein, nappia ei voi enää käyttää
    // eikä uutta tekstiä syöttää
    button.disabled = true;
    code.disabled = true;
    //vvv Unna lisäsi dialogin tähän
    dialogue.innerHTML = 'I did it!';
  }
  else {
    // jos koodi on väärin, modaaliin tulee teksti joka kertoo koodin olevan väärä
    //console.log("Väärin");
    document.getElementById('locked').innerHTML = "The code is wrong!";
    button.disabled = false;
    code.disabled = false;
    if (!codeReset) {
      codeReset = true;
    }
  }
    // 'klick' -näppäimen painalluksen jälkeen input-alue tyhjenee
    document.getElementById('codeinput').reset();
  }


// klikkaus siirtää laukun inventoryyn -K
function takeBag(){
  takeItem.play();
  // laukku poistuu ruudulta
  bag.remove();
  // laukku siirtyy inventoryyn
  inventory.push('bag');
  //console.log(inventory);
  dialogue.innerHTML =
  'Can\'t forget to take this with me!';
}

// klikkaus poistaa verhon -K
function curtainOff(){
  curtainSound.play();
  curtain.remove();
}

// klikkaus siirtää takin inventoryyn -K
function takeJacket(){
  takeItem.play();
  // takki poistuu ruudulta
  jacket.remove();
  // takki siirtyy inventoryyn
  inventory.push('jacket');
  //console.log(inventory);
  dialogue.innerHTML =
  'My favourite jacket';
}

// klikkaus siirtää ruukkua edes takaisin -K
function movePot(){
  // ruukun(pot) sijainnit määritetään css:ssä:
  // lähtötilanne omanaan, sekä uusi, .movePot omanaan.
  // ruukku siirtyy klikkauksesta näiden kahden sijainnin välillä
  pot.classList.toggle('movePot');
}
