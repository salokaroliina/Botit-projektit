// modal & sulje-näppäin -K
const modal = document.getElementsByClassName('modal');
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
// inventaario on pelissä vain array -K
// fyysiselle inventaariolle ei ollut tarvetta -K
let inventory = [];

let noteRead = false;
let monitorChecked = false;
let pcLock = false;

// Unna teki nämä -->
function popup(x) {
  modal[x].style.display = 'block';
  if (x===3 && !monitorChecked) {
    dialogue.innerHTML = '"Tentacles have the key"...?'
    monitorChecked = true;
  }
  if(x===17) {
    dialogue.innerHTML = 'Hmm...';
  }
  if(x===19) {
    if(!noteRead) {
      noteRead = true;
    }
  }
}

window.onclick = function(event) {
  for(let i=0;i<modal.length;i++) {
    if (event.target == modal[i]) {
      modal[i].style.display = 'none';
    }
  }
}

function shut(button) {
  button.parentNode.parentNode.style.display = 'none';
}

function dialogi(d) {
  switch (d) {
    case 'doorClosed':
      dialogue.innerHTML = 'The door is locked';
    break;
    case 'picture':
      dialogue.innerHTML =
      'There\'s a picture of my mom on the shelf<br><span class="interact" onclick="popup(1)">Take a closer look</span>';
    break;
    case 'clock':
      dialogue.innerHTML = 'Our old clock<br><span class="interact" onclick="popup(2)">Take a closer look</span>';
    break;
    case 'monitor':
      if (gameState.current === gameState.solved) {
        dialogue.innerHTML =
        'I really spent too much time on that<br><span class="interact" onclick="popup(3)">Gaze wistfully</span>';
      } else if (gameState.current === gameState.extraSolved) {
        dialogue.innerHTML =
        '...<br><span class="interact" onclick="popup(3)">Mourn</span>';
      } else {
        if (!monitorChecked) {
          dialogue.innerHTML =
          'I\'m in a hurry...<br><span class="interact" onclick="popup(3)">(Maybe just one round)</span>';
        } else {
          dialogue.innerHTML =
          'I think I have to beat the game to open a lock?<br><span class="interact" onclick="popup(3)">Play the game (guilt-free)</span>';
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
      'Mom\'s true crime book<br><span class="interact" onclick="popup(6)">Take a closer look</span>';
    break;
    case 'book2':
      dialogue.innerHTML =
      'Ratty old book<br><span class="interact" onclick="popup(7)">Take a closer look</span>';
    break;
    case 'book3':
      dialogue.innerHTML =
      'My school book<br><span class="interact" onclick="popup(8)">Take a closer look</span>';
    break;
    case 'book4':
      dialogue.innerHTML =
      'One of my creepy humanology books<br><span class="interact" onclick="popup(9)">Take a closer look</span>';
    break;
    case 'book5':
      dialogue.innerHTML =
      'Code credits<br><span class="interact" onclick="popup(11)">Take a closer look</span>';
    break;
    case 'book6':
      dialogue.innerHTML =
      'Graphic credits<br><span class="interact" onclick="popup(12)">Take a closer look</span>';
    break;
    case 'book7':
      dialogue.innerHTML =
      'Sound credits<br><span class="interact" onclick="popup(10)">Take a closer look</span>';
    break;
    case 'book8':
      dialogue.innerHTML =
      'The gamedev team<br><span class="interact" onclick="popup(13)">Take a closer look</span>';
    break;

    case 'key':
      dialogue.innerHTML =
      'It\'s a key';
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
      'This lock needs a code<br><span class="interact" onclick="popup(17)">Take a closer look</span>';
    break;
    case 'eleLock':
      dialogue.innerHTML =
      'This lock is electrical';
    break;
    case 'note':
      dialogue.innerHTML =
      'Theres a note on the door<br><span class="interact" onclick="popup(19)">Take a closer look</span>';
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
  }
    // 'klick' -näppäimen painalluksen jälkeen input-alue tyhjenee
    document.getElementById('codeinput').reset();
  }
  // koodilukon teksti muuttuu takaisin alkuperäiseksi x:n painalluksen jälkeen -K
  function reset(button) {
    button.parentNode.parentNode.style.display = 'none';
    document.getElementById('locked').innerHTML = "This lock needs a code";
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
