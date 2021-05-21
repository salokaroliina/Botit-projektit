// _(:3」∠)_

const etunimi = document.getElementById('etunimi');
const sukunimi = document.getElementById('sukunimi');
const osoite = document.getElementById('osoite');
const postinumero = document.getElementById('postinumero');
const postitoimipaikka = document.getElementById('postitoimipaikka');
const puhelinnumero = document.getElementById('puhelinnumero');
const sahkoposti = document.getElementById('sahkoposti');

const tulosta = document.getElementById('varasto');
const listaTahan = document.getElementById('listaTahan');
const etsiPalkki = document.getElementsByClassName('listaPalkki');

//Julistetaan togglettavat classit
const highlight = document.getElementsByClassName('highlight');
const fade = document.getElementsByClassName('fade');

//Regex nimitarkastukset
const nameCheck = /^[ a-zA-ZåäöÅÄÖ\-\']+$/;
const numberCheck = /^[0-9]+$/;
const addressCheck = /^[ 0-9a-zA-ZåäöÅÄÖ\-\']+$/;
const emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

//Eventlistenerit kaikille et lomakkeen voi lähettää enterii painamalla
etunimi.addEventListener('keydown', tiedonTallennus);
sukunimi.addEventListener('keydown', tiedonTallennus);
osoite.addEventListener('keydown', tiedonTallennus);
postinumero.addEventListener('keydown', tiedonTallennus);
postitoimipaikka.addEventListener('keydown', tiedonTallennus);
puhelinnumero.addEventListener('keydown', tiedonTallennus);
sahkoposti.addEventListener('keydown', tiedonTallennus);


//Haetaan ja tuodaan varastossa jo olevat tiedot näytölle
haeVarasto();


//TIEDON TALLENNUS
function tiedonTallennus(event) {
  //Luodaan avain varastoa varten
  const avain = etunimi.value +' '+ sukunimi.value;
  //Luodaan varastoon tallennettava taulukko
  //Annetaan lisäksi taulukon dataksi avain naytaTiedot funktiota varten
  const tiedot = '<table id="tiedotTaulu" data-avain="'+avain+'"><tr><th colspan="2">'+avain+
                  '</th></tr><tr><td>Etunimi</td><td>'+etunimi.value+
                  '</td></tr><tr><td>Sukunimi</td><td>'+sukunimi.value+
                  '</td></tr><tr><td>Osoite</td><td>'+osoite.value+
                  '</td></tr><tr><td>Postinumero</td><td>'+postinumero.value+
                  '</td></tr><tr><td>Postitoimipaikka</td><td>'+postitoimipaikka.value+
                  '</td></tr><tr><td>Puhelinnumero</td><td>'+puhelinnumero.value+
                  '</td></tr><tr><td>Sahkoposti</td><td>'+sahkoposti.value+'</td></tr></table>';
  //Text node listapalkkia varten
  const nimet = document.createTextNode(avain);
  //listapalkin divi
  const listaPalkki = document.createElement('div');
  //Span text nodea varten
  const span = document.createElement('span');
  //Poistonappi-nappi
  const poistoNappi = document.createElement('button');
  //Duplikaatti-palkkien estoa varten
  let palkkiTarkistus = 'nan';

  //Jos painetaan enterii tai klikataan nappii
  if(event.which === 13 || event === 'klik') {

    //Jos on inputteja highlightattuna, togglee highlightauksen pois
    while(highlight.length>0) {
      highlight[0].classList.toggle('highlight');
    }

    //Tarkastetaan kelpuutetaanko lomakkeen tiedot
    if(etunimi.value.length>=3 && //Etunimi tarvittava määrä merkkejä
       etunimi.value.length<=15 &&
       nameCheck.test(etunimi.value) && //Regex-testi LAITTOMIEN merkkien varalta
       sukunimi.value.length>=3 && //Sukunimi merkit
       sukunimi.value.length<=15 &&
       nameCheck.test(sukunimi.value) && //Regex
       osoite.value.length>=5 && //Osoite pituus
       addressCheck.test(osoite.value) && //Regex
       postinumero.value.length===5 && //Postinumero pituus
       numberCheck.test(postinumero.value) && //Onko postinumero numeroina
       postitoimipaikka.value.length>=2 && //Postitoimipaikka pituus
       nameCheck.test(postitoimipaikka.value) && //Regex
       puhelinnumero.value.length>=7 && //Puhelinnumero pituus
       puhelinnumero.value.length<=12 &&
       numberCheck.test(puhelinnumero.value) && //Puhelinnumero numeroina?
       //sahkoposti.value.match(emailCheck) <-- toi kans toimii regex-testinä
       emailCheck.test(sahkoposti.value)) { //Sähkoposti regex-testi

        //Säilötään tiedot varastoon
        localStorage.setItem(avain, tiedot);
        //Tuodaan taulukko varastosta
        tulosta.innerHTML = '<h1>Tiedot</h1><br>'+localStorage.getItem(avain);

        //Katsotaan onko avainta vastaavaa palkkia olemassa
        if(etsiPalkki) {
          for(let i=0;i<etsiPalkki.length;i++) {
            //Jos avainta vastaava palkki löytyy, asetetaan i:n arvo tarkastusmuuttujaan
            if(etsiPalkki[i].dataset.avain === avain) {
              palkkiTarkistus = i;
            }
          }
        }

        //Jos tarkastusmuuttuja ei ole numero
        if(isNaN(palkkiTarkistus)) {
          console.log('teesti');
          //Poisto-napin luonti
          poistoNappi.innerHTML = "X";
          poistoNappi.addEventListener('click', poisto); //Lisätään poisto-funktio
          poistoNappi.classList.add('poistoNappi');
          poistoNappi.dataset.avain = avain; //Data jonka poisto-funktio voi lukea

          //Luodaan palkki josta voi tuoda varaston tiedot takaisin näytölle
          listaPalkki.classList.add('listaPalkki');
          listaPalkki.dataset.avain = avain; //Data jonka avulla tuodaan tieto näytölle varastosta
          listaPalkki.addEventListener('click', naytaTiedot); //Funktio tiedon haulle
          listaPalkki.appendChild(span);
          span.appendChild(nimet); //Lisätään teksti spaniin
                                  //Span tekstin vertikaalisen keskittämisen vuoksi
          listaPalkki.appendChild(poistoNappi); //Liitetään poistonappi diviin
          listaTahan.appendChild(listaPalkki); //Tuodaan palkki ruudulle
        } else {
          //Jos tarkastusmuuttuja on numero, käytetään sitä hakemaan oikea kohde
          //elementeistä joiden classina on listaPalkki ja aktivoidaan animaatio class
          etsiPalkki[palkkiTarkistus].classList.toggle('palkkiAnim');
          //Otetaan animaatio class pois animaation loputtua
          setTimeout(function() {
            while(document.getElementsByClassName('palkkiAnim').length>0) {
              document.getElementsByClassName('palkkiAnim')[0].classList.toggle('palkkiAnim');
            }
          }, 1000);
        }

        //Lomakkeen tyhjennys
        etunimi.value = '';
        sukunimi.value = '';
        osoite.value = '';
        postinumero.value = '';
        postitoimipaikka.value = '';
        puhelinnumero.value = '';
        sahkoposti.value = '';

        //Katsoo jos jollain on häivytys animaatio päällä ja ottaa sen pois
        while(fade.length>0) {
          fade[0].classList.toggle('fade');
        }

        //Muuttaa varastosta vedetyn taulukon ID:n
        //Tällä estetään että ohjelma häivyttää tiedot jos otat ne listapalkista näkyviin
        //Bugi jos rämppäät nopeesti uudet tiedot lomakkeeseen
        document.getElementById('tiedotTaulu').id = 'tiedotTauluFade';

        //Aloittaa 3sec ajastimen jonka jälkeen se häivyttää tiedot näytöltä
        setTimeout(function() {
          const tiedotTauluFade = document.getElementById('tiedotTauluFade');
          if (tiedotTauluFade) { //Katsoo onko häivytettävää ID:tä olemassa
            tiedotTauluFade.classList.toggle('fade'); //Aloittaa 2sec pituisen häivytys-animaation

            //Aloittaa 2sec ajastimen jonka jälkeen se poistaa tiedot taulun näytöltä
            setTimeout(function() {
              //Tarkastaa että näytöllä oleva taulu on merkattu häivytettäväksi
              if(document.getElementById('tiedotTauluFade')) {
                tulosta.innerHTML = '<h1>Tiedot</h1';
              }
            }, 2000);
          }
        }, 3000);

      //Jos joku kohta lomakkeesta mättää
      } else {
        //Alustetaan virheilmoitus lista
        tulosta.innerHTML = '<h1>Tiedot</h1><br><ul>';

        //ETUNIMI
        //Ihan ensimmäiseksi katsotaan onko kenttä tyhjä
        if (etunimi.value === '') {
          //Tarkastetaan onko etunimi-elementillä highlight classia
          //Jos ei, niin toggletaan se päälle
          //Sama tarkastus suoritetaan jokaisessa kohdassa
          if (!etunimi.classList.contains('highlight')) {
            etunimi.classList.toggle('highlight');
          }
          //Virheilmoituksen lisäys listaan
          tulosta.innerHTML += '<li>Etunimi on pakollinen</li>';
        //Jos kentässä on jotain, lähdetään käymään läpi mikä asia on virheellinen
        } else {
          if (etunimi.value.length<3) {
            if (!etunimi.classList.contains('highlight')) {
              etunimi.classList.toggle('highlight');
            }
            tulosta.innerHTML += '<li>Etunimen pitää olla vähintään 3 merkkiä</li>';
          }
          if (etunimi.value.length>15) {
            if (!etunimi.classList.contains('highlight')) {
              etunimi.classList.toggle('highlight');
            }
            tulosta.innerHTML += '<li>Etunimi voi olla enintään 15 merkkiä</li>';
          }
          if (!nameCheck.test(etunimi.value)) {
            if (!etunimi.classList.contains('highlight')) {
              etunimi.classList.toggle('highlight');
            }
            tulosta.innerHTML += '<li>Etunimi sisältää LAITTOMIA MERKKEJÄ</li>';
          }
        }

        //SUKUNIMI
        if (sukunimi.value === '') {
          if (!sukunimi.classList.contains('highlight')) {
            sukunimi.classList.toggle('highlight');
          }
          tulosta.innerHTML += '<li>Sukunimi on pakollinen</li>';
        } else {
          if (sukunimi.value.length<3) {
            if (!sukunimi.classList.contains('highlight')) {
              sukunimi.classList.toggle('highlight');
            }
            tulosta.innerHTML += '<li>Sukunimen pitää olla vähintään 3 merkkiä</li>';
          }
          if (sukunimi.value.length>15) {
            if (!sukunimi.classList.contains('highlight')) {
              sukunimi.classList.toggle('highlight');
            }
            tulosta.innerHTML += '<li>Sukunimi voi olla enintään 15 merkkiä</li>';
          }
          if (!nameCheck.test(sukunimi.value)) {
            if (!sukunimi.classList.contains('highlight')) {
              sukunimi.classList.toggle('highlight');
            }
            tulosta.innerHTML += '<li>Sukunimi sisältää LAITTOMIA MERKKEJÄ</li>';
          }
        }

        //OSOITE
        if (osoite.value === '') {
          if (!osoite.classList.contains('highlight')) {
            osoite.classList.toggle('highlight');
          }
          tulosta.innerHTML += '<li>Osoite on pakollinen</li>';
        } else {
          if (osoite.value.length<5) {
            if (!osoite.classList.contains('highlight')) {
              osoite.classList.toggle('highlight');
            }
            tulosta.innerHTML += '<li>Osoitteen pitää olla vähintään 5 merkkiä</li>';
          }
          if (!addressCheck.test(osoite.value)) {
            if (!osoite.classList.contains('highlight')) {
              osoite.classList.toggle('highlight');
            }
            tulosta.innerHTML += '<li>Osoite sisältää LAITTOMIA MERKKEJÄ</li>';
          }
        }

        //POSTINUMERO
        if (postinumero.value === '') {
          if (!postinumero.classList.contains('highlight')) {
            postinumero.classList.toggle('highlight');
          }
          tulosta.innerHTML += '<li>Postinumero on pakollinen</li>';
        } else {
          if (postinumero.value.length!==5) {
            if (!postinumero.classList.contains('highlight')) {
              postinumero.classList.toggle('highlight');
            }
            tulosta.innerHTML += '<li>Postinumeron pitää olla 5 merkkiä</li>';
          }
          if (!numberCheck.test(postinumero.value)) {
            if (!postinumero.classList.contains('highlight')) {
              postinumero.classList.toggle('highlight');
            }
            tulosta.innerHTML += '<li>Postinumeron pitää olla numeroina</li>';
          }
        }

        //POSTITOIMIPAIKKA
        if (postitoimipaikka.value === '') {
          if (!postitoimipaikka.classList.contains('highlight')) {
            postitoimipaikka.classList.toggle('highlight');
          }
          tulosta.innerHTML += '<li>Postitoimipaikka on pakollinen</li>';
        } else {
          if (postitoimipaikka.value.length<2) {
            if (!postitoimipaikka.classList.contains('highlight')) {
              postitoimipaikka.classList.toggle('highlight');
            }
            tulosta.innerHTML += '<li>Postitoimipaikan pitää olla vähintään 2 merkkiä</li>';
          }
          if (!nameCheck.test(postitoimipaikka.value)) {
            if (!postitoimipaikka.classList.contains('highlight')) {
              postitoimipaikka.classList.toggle('highlight');
            }
            tulosta.innerHTML += '<li>Postitoimipaikka sisältää LAITTOMIA MERKKEJÄ</li>';
          }
        }

        //PUHELINNUMERO
        if (puhelinnumero.value === '') {
          if (!puhelinnumero.classList.contains('highlight')) {
            puhelinnumero.classList.toggle('highlight');
          }
          tulosta.innerHTML += '<li>Puhelinnumero on pakollinen</li>';
        } else {
          if (puhelinnumero.value.length<7) {
            if (!puhelinnumero.classList.contains('highlight')) {
              puhelinnumero.classList.toggle('highlight');
            }
            tulosta.innerHTML += '<li>Puhelinnumeron pitää olla vähintään 7 merkkiä</li>';
          }
          if (puhelinnumero.value.length>12) {
            if (!puhelinnumero.classList.contains('highlight')) {
              puhelinnumero.classList.toggle('highlight');
            }
            tulosta.innerHTML += '<li>Puhelinnumero voi olla enintään 12 merkkiä</li>';
          }
          if (!numberCheck.test(puhelinnumero.value)) {
            if (!puhelinnumero.classList.contains('highlight')) {
              puhelinnumero.classList.toggle('highlight');
            }
            tulosta.innerHTML += '<li>Puhelinnumeron pitää olla numeroina</li>';
          }
        }

        //SÄHKOPOSTI
        if (sahkoposti.value === '') {
          if (!sahkoposti.classList.contains('highlight')) {
            sahkoposti.classList.toggle('highlight');
          }
          tulosta.innerHTML += '<li>Sähköposti on pakollinen</li>';
        } else {
          if (!emailCheck.test(sahkoposti.value)) {
            if (!sahkoposti.classList.contains('highlight')) {
              sahkoposti.classList.toggle('highlight');
            }
            tulosta.innerHTML += '<li>Anna kunnon sähköposti</li>';
          }
        }
      //Viimeiseksi laitetaan lista kiinni
      tulosta.innerHTML += '</ul>';
    }
  }
}


//TIETOJEN NÄYTTÖ
function naytaTiedot() {
  //Jos näytöllä ei ole elementtiä jolla on varastosta haetun taulun default id
  //Eli piirtää uuden taulun jos näytöllä on jo häivytettäväksi merkitty taulu
  if(!document.getElementById('tiedotTaulu')) {

    //Jos varastossa on dataa matchaava tieto
    //Tämä on tässä koska poistonappi on samassa divissa kuin listapalkki
    //Jos tätä ei ole tässä niin näytölle ilmestyy null kun yrität poistaa tietoa
    if(localStorage.getItem(this.dataset.avain)) {
      //Tuodaan varasto-taulu näytölle
      tulosta.innerHTML = '<h1>Tiedot</h1><br>'+localStorage.getItem(this.dataset.avain);
    }
  } else {
    //Jos näyöllä on jo sama taulu, piiloitetaan se
    if(this.dataset.avain === document.getElementById('tiedotTaulu').dataset.avain) {
      tulosta.innerHTML = '<h1>Tiedot</h1>';
    } else {
      //Jos on eri taulu, tuodaan uusi taulu esiin
      if(localStorage.getItem(this.dataset.avain)) {
        tulosta.innerHTML = '<h1>Tiedot</h1><br>'+localStorage.getItem(this.dataset.avain);
      }
    }
  }
}


//POISTO
function poisto() {
  localStorage.removeItem(this.dataset.avain); //Poistaa tiedot varastosta
  this.parentNode.remove(); //Poistaa palkin näytöltä
}


//VANHOJEN VARASTOTIETOJEN HAKU
function haeVarasto() {
  //Käydään läpi varaston pituus
  for(let i=0;i<localStorage.length;i++) {
    //Listapalkin luonti
    //Toimii samalla tavalla kuin aiemmassa kohdassa
    const listaPalkki = document.createElement('div');
    const poistoNappi = document.createElement('button');
    const span = document.createElement('span');
    const nimet = document.createTextNode(localStorage.key(i)); //Hakee varastosta kyseisen avaimen palkin nimeksi

    poistoNappi.innerHTML = "X";
    poistoNappi.addEventListener('click', poisto);
    poistoNappi.classList.add('poistoNappi');
    poistoNappi.dataset.avain = localStorage.key(i); //Dataksi asetetaan kyseinen avain

    listaPalkki.classList.add('listaPalkki');
    listaPalkki.dataset.avain = localStorage.key(i); //Data taas
    listaPalkki.addEventListener('click', naytaTiedot);
    listaPalkki.appendChild(span);
    span.appendChild(nimet);
    listaPalkki.appendChild(poistoNappi);
    listaTahan.appendChild(listaPalkki);

    //localStorage.getItem(localStorage.key(i)); siis hakisi vastaavan taulukkotiedon
    //Laitan tämän tähän vain koska se oli mulle uusi asia (en muista opettiko jyri)
    //Eikä sitä oikeen oltu selitetty selkeesti tutoriaali sivuilla
    //... tai sit mun aivot on vaan sulaneet, joka on hyvin mahdollista
  }
}
