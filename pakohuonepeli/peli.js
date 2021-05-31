// modal & sulje-näppäin
const modal = document.getElementsByClassName('modal');
const x = document.getElementsByClassName('close');
// erilliset objektit
const lockKey = document.getElementById('lock-key');
const lockCode = document.getElementById('lock-code');
const lockElec = document.getElementById('lock-elec');
const box = document.getElementById('box');
const key = document.getElementById('key');
const note = document.getElementById('note');
const doorOpen = document.getElementById('door-open');
const curtain = document.getElementById('curtain');
const bag = document.getElementById('bag');
const jacket = document.getElementById('jacket');
const pot = document.getElementById('pot');
// taustaelementit
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
const koodi = document.getElementById('lockbutton');

let inventory = [];

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

// koodilukko -K
function codeLock()
{  if (koodi.value == '1234') {
    console.log("Oikein");
    lockCode.remove();
  }
  else {
    console.log("Väärin");
  }
}

// klikkaus siirtää laukun inventoryyn -K
function takeBag(){
  bag.remove();
inventory.push(bag);
console.log(inventory);
}

// klikkaus poistaa verhon -K
function curtainOff(){
  curtain.remove();
}

// klikkaus siirtää takin inventoryyn -K
function takeJacket(){
  jacket.remove();
  inventory.push(jacket);
  console.log(inventory);
}

// klikkaus siirtää ruukkua vasemmalle -K
function movePot(){
  pot.style.left = '450px';
  document.getElementById('hit-pot').style.cursor = 'default';
}
