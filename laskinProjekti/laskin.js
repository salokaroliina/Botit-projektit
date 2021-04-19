// Laskin-projektiin osallistujat:
// Html: Simo Särkiranta
// Css: Unna Postila
// Javascript: Karoliina Salo

// luodaan muuttuja 'naytto'
// 'naytto' on laskimen päivittyvä näyttö
var naytto = document.getElementById('naytto');

// luodaan funktio laskutoimitus, johon tulee tiedot laskimen jokaisesta näppäimestä
// koska html:ssä käytetään this-attribuuttia, näppäimille ei tarvita erillisiä id:itä
function laskutoimitus(nappain) {
    // luodaan muuttuja 'nappi', joka vastaa laskimen näppäimiä
    var nappi = nappain.innerHTML;
    // jos painettu nappi on '='
    if (nappi == '=') {
        // ohjelma hakee päivittyvän näyttöalueen ja laskee siihen eval-attribuutilla valittujen lukujen tuloksen
        document.getElementById('naytto').innerHTML = eval(document.getElementById('naytto').innerHTML);
      // jos painettu näppäin on 'AC'(all clear)
    } else if (nappi == 'AC') {
        // ohjelma antaa näyttöalueelle arvon 0
        document.getElementById('naytto').innerHTML = '0';
      // jos painettu nappi on 'C'(clear, poistaa viimeisimmän)
    } else if (nappi == 'C') {
        // jos syötetyn tiedon pituus on 1, ruudun arvoksi tulee 0
        if (document.getElementById('naytto').innerHTML.length == 1) {
          document.getElementById('naytto').innerHTML = '0';
        } else {
          // jos näytöllä on enemmän kuin yksi numero, ohjelma poistaa viimeisimmän syötetyn tiedon
          document.getElementById('naytto').innerHTML = document.getElementById('naytto').innerHTML.slice(0,-1);
        }
    } else {
        // jos näyttöalueen arvo on 0, ohjelma lisää näytölle valitun numeron
        if (document.getElementById('naytto').innerHTML == '0')
        {
            document.getElementById('naytto').innerHTML = nappi;
        } else {
          // jos näytöllä on jo jokin luku, voidaan siihen lisätä operaattori sekä toinen luku
          // jotta laskutoimitus voidaan suorittaa
            document.getElementById('naytto').innerHTML += nappi;
        }
    }
}
