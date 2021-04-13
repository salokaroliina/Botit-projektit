var tappiot = 0;
var voitot = 0;

var kerrat3 = 0;
function pelaa() {
  let rantom = Math.floor(Math.random()*10)+1;
  console.log(rantom)
  kerrat3++
  for(let i = 0; i < 10; i++) {
      if(i == numeroSyotto.value){
        if(kerrat3 >= 4) {
          alert("Käytit kaikki kerrat!");
        } else if(numeroSyotto.value > rantom) {
          alert("Valitsit liian SUUREN numeron!");
          tappiot++;
          return document.getElementById("tappiot").innerHTML = "Tappiot: " + tappiot;
        } else if(numeroSyotto.value < rantom) {
          alert("Valitsit liian pienen numeron!");
          tappiot++;
          return document.getElementById("tappiot").innerHTML = "Tappiot: " + tappiot;
        } else if(numeroSyotto.value == rantom) {
          alert("Arvasit oikein!");
          voitot++;
          return document.getElementById("voitot").innerHTML = "Voitot: " + voitot;
        }
      }
    }
  }
