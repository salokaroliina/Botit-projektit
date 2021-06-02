// modal & sulje-näppäin -K
const modal = document.getElementsByClassName('modal');
const x = document.getElementsByClassName('close');
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
// inventaario on pelissä vain array -K
// fyysiselle inventaariolle ei ollut tarvetta -K
let inventory = [];

let pcLock = false;

// Unna teki nämä -->
function popup(x) {
  modal[x].style.display = 'block';
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
}

// klikkaus siirtää ruukkua edes takaisin -K
function movePot(){
  // ruukun(pot) sijainnit määritetään css:ssä:
  // lähtötilanne omanaan, sekä uusi, .movePot omanaan.
  // ruukku siirtyy klikkauksesta näiden kahden sijainnin välillä
  pot.classList.toggle('movePot');
}
