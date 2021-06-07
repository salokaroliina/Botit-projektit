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
const ambient = new Audio('sound/Etirwer.ogg');
      ambient.loop = true;
      ambient.volume = 0.2;
// inventaario on pelissä vain array -K
// fyysiselle inventaariolle ei ollut tarvetta -K
let inventory = [];

let noteRead = false;
let monitorChecked = false;
let eleLockOpen = false;
let keyLockOpen = false;
let codeLockOpen = false;
let codeReset = false;
let musicStarted = false;

// Unna teki nämä -->
function popup(x) {
  modal[x].style.display = 'block';
  if (x===2 && !monitorChecked) {
    setTimeout(function() {
      if(modal[2].style.display === 'block'){
        dialogue.innerHTML = '"Tentacles have the key"...?'
        monitorChecked = true;
      }
    }, 1500);

  }
  if(x===11) {
    dialogue.innerHTML = 'Hmm...';
  }
  if(x===12) {
    if(!noteRead) {
      noteRead = true;
    }
  }
}

window.onclick = function(event) {
  if (!musicStarted) {
    ambient.play();
    musicStarted = true;
  }

  for(let i=0;i<modal.length;i++) {
    if (event.target == modal[i] || event.target == modalVankila[i]) {
      modal[i].style.display = 'none';
      if (codeReset) {
        document.getElementById('locked').innerHTML = "This lock needs a code";
        codeReset = false;
      }
    }
  }
}

function shut(button) {
  button.parentNode.parentNode.parentNode.style.display = 'none';
  if (codeReset) {
    document.getElementById('locked').innerHTML = "This lock needs a code";
    codeReset = false;
  }
}

function dialogi(d) {
  switch (d) {
    case 'doorClosed':
      dialogue.innerHTML = 'The door is locked';
    break;
    case 'picture':
      dialogue.innerHTML =
      'There\'s a picture of my mom on the shelf<br><span class="interact" onclick="popup(0)">Take a closer look</span>';
    break;
    case 'clock':
      dialogue.innerHTML = 'Our old clock<br><span class="interact" onclick="popup(1)">Take a closer look</span>';
    break;
    case 'monitor':
      if (gameState.current === gameState.solved) {
        dialogue.innerHTML =
        'I really should get going<br><span class="interact" onclick="popup(2)">Gaze wistfully</span>';
      } else if (gameState.current === gameState.extraSolved) {
        dialogue.innerHTML =
        '...<br><span class="interact" onclick="popup(2)">Mourn</span>';
      } else {
        if (!monitorChecked) {
          dialogue.innerHTML =
          'I\'m in a hurry...<br><span class="interact" onclick="popup(2)">(But a second can\'t hurt, can it?)</span>';
        } else {
          dialogue.innerHTML =
          'What was that about the tentacles?<br><span class="interact" onclick="popup(2)">Alas, I guess I have no other choice than to mess around on my computer some more</span>';
        }
      }
    break;
    case 'pc':
      dialogue.innerHTML = 'The computer is on';
    break;
    case 'pcSolved':
      dialogue.innerHTML = 'I broke my computer...';
    break;
    case 'window':
      if(!noteRead) {
        dialogue.innerHTML = 'The drop is too high, I can\'t escape through the window';
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
      dialogue.innerHTML =
      'This lock needs a code<br><span class="interact" onclick="popup(11)">Take a closer look</span>';
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
  // laukku poistuu ruudulta
  bag.remove();
  // laukku siirtyy inventoryyn
  inventory.push(bag);
  //console.log(inventory);
  dialogue.innerHTML =
  'Can\'t forget to take this with me!';
}

// klikkaus poistaa verhon -K
function curtainOff(){
  curtain.remove();
}

// klikkaus siirtää takin inventoryyn -K
function takeJacket(){
  // takki poistuu ruudulta
  jacket.remove();
  // takki siirtyy inventoryyn
  inventory.push(jacket);
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
