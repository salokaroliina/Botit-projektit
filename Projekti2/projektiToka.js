// Koodin tekijä Simo Särkiranta
function lomakeToka() // OHJELMA HERJASI JOS FUNKTION NIMI OLI SAMA KUIN TIEDOSTON NIMI, MUUTIN SAMAKSI KUIN HTML:SSÄ -K
{
  // Luodaan muuttujat ja haetaan niille tiedot html-tiedostosta
  var nimi = document.getElementById('nimi').value;
  var sposti = document.getElementById('email').value;
  var ika = document.getElementById('ika').value;
  // Hain valintapainikkeille tiedon getElementsByName-toiminnolla. Valueta ei tarvita
  var pudotus = document.getElementById('valinnatEka'); // VAIHDOIN MUUTTUJIEN NIMET LYHYIKSI SEKÄ ERI NIMISIKSI KUIN ID:T JA NAMET JOSTA NIIHIN OLI HAETTU TIEDOT -K
  var radio = document.getElementsByName('radioEka');
  var check = document.getElementsByName('checkToka');
  var teksti = document.getElementById('palaute').value;
  // Tarkistetaan syötetyt tiedot
  // Jos nimen pituus on alle 2, alert-ikkuna pyytää antamaan etunimen
  if (nimi.length < 2)
  {
    alert("Anna nimesi");
    // Jos tiedot on oikein, mitään ei tapahdu ja ohjelma siirtyy seuraavaan kohtaan
    return false;
  }
  // Jos sähköposti on muotoiltu väärin, alert-ikkuna pyytää antamaan sähköpostin
  if (sposti.length < 2)
  {
    alert("Anna sähköpostisi");
    // Jos tiedot on oikein, mitään ei tapahdu ja ohjelma siirtyy seuraavaan kohtaan
    return false;
  }
  // Jos ikä on laitettu väärin, alert-ikkuna pyytää laittamaan ijän.
  if (ika.length < 1) // OHJELMA HERJASI TÄSTÄ JOS VERTASI 0:AAN, VAIHDOIN LUVUN 1:EEN -K
  {
    alert("Anna ikäsi");
    // Jos tiedot on oikein, mitään ei tapahdu ja ohjelma siirtyy seuraavaan kohtaan
    return false;
  }
  // Luodaan muuttuja "valinta" jonka oletusarvo on "false"
  // luodaan muuttuja valintaEka, jolle haetaan tiedot pudotusvalikosta
  var valinta = false; // MUUTIN MUUTTUJAN NIMEN, SILLÄ SE OLI SAMA KUIN ALEMPANA LUOTU MUUTTUJA -K
  var valintaEka = pudotus.options[pudotus.selectedIndex].value; // TÄHÄN OLI JÄÄNYT AIEMMAN PROJEKTIN NIMET, MUUTIN NE TÄMÄN PROJEKTIN TIEDOIKSI -K
    // jos ei ole valittu miten viettää kesäloman (oletuksena "valitse"), ohjelma avaa alert-ikkunan ja pyytää antamaan Miten vietät kesäloman.
    if (valintaEka == "Valitse")
    {
      alert("Et ole valinnut miten vietät kesäloman");
      return false;
    }
    // Jos valinta on tehty, ohjelma jatkaa eteenpäin
    else {
      valintaEka == true;
    }

  /* Luodaan muuttuja radioValinta, jonka oletusarvoksi annetaan "false",
  sillä mitään ei ole vielä valittu */
  var radioValinta = false; // VAIHDOIN TÄHÄN NIMEN RADIOVALINTA, SILLÄ OHJELMA HERJAA JOS SAMA NIMI TOISTUU ERI MERKITYKSISSÄ -K
  // for-loop
  /*Oletusarvo on 0, joten looppi käy läpi valintapainikkeita yksi kerrallaan,
  kunnes se löytää yhden valitun painikkeen*/
  for (var i = 0; i < radio.length; i++) // VAIHDOIN VERRATTAVAN TERMIN RADIOKSI, SILLÄ RADIOEKA:N ARVO ON FALSE -K
  {
    /* Jos jotakin on valittu, radioEka arvoksi annetaan "true",
    ja ohjelma jatkaa eteenpäin */
    if(radio[i].checked == true) // VAIHDOIN MYÖS TÄHÄN OIKEAN TERMIN -K
  {
    radioValinta = true;
  }
  }
    /* Jos mitään ei ole valittu, radioEka arvo pysyy "false"na,
    ja alert-ikkuna pyytää valitsemaan olet mieluiten kesälomalla*/
    if (radioValinta == false) // TÄHÄN OLI JÄÄNYT TERMI EDELLISEN PROJEKTIN KOODISTA -K
  {
    alert("Et ole kertonut miten olet kesällä mieluiten");
    return false;
  }

  /* Luodaan muuttuja checkToka, jonka oletusarvoksi annetaan "false",
  sillä mitään ei ole vielä valittu */
  var checkValinta = false; // VAIHDOIN TÄHÄN CHECKVALINTA, SILLÄ OHJELMA HERJAA JOS SAMA NIMI TOISTUU ERI MERKITYKSISSÄ -K
  // for-loop
  /*Oletusarvo on 0, joten looppi käy läpi valintapainikkeita yksi kerrallaan,
  kunnes se löytää yhden valitun painikkeen*/
  for (var j = 0; j < check.length; j++)  // VAIHDOIN TÄHÄN PELKÄN CHECK, SILLÄ OHJELMA HERJAA JOS SAMA NIMI TOISTUU ERI MERKITYKSISSÄ -K
  {
    /* Jos jotakin on valittu, checkToka arvoksi annetaan "true",
    ja ohjelma jatkaa eteenpäin */
    if(check[j].checked == true) // VAIHDOIN TÄHÄN MYÖS CHECK VASTAAMAAN YLEMPÄÄ LOOPPIA -K
  {
    checkValinta = true; // VAIHDOIN TÄHÄN MYÖS CHECKVALINNAN VASTAAMAAN ALKUPERÄISTÄ MUUTTUJAA -K
  }
  }
  /* Jos mitään ei ole valittu, checkToka arvo pysyy "false"na,
  ja alert-ikkuna pyytää valitsemaan mielipiteen sivusta*/
    if(checkValinta == false) // MYÖS TÄHÄN VAIHDETTU CHECKVALINTA
  {
    alert("Et ole kertonut mikä on kesässä parasta");
    return false;
  }

// TÄHÄN OLI JÄÄNYT YLIMÄÄRÄINEN { -MERKKI JOSTA OHJELMA HERJASI -K

  /* Jos ei ole kertonut mitä kesä tuo mieleen vähintää 15 kirjaimella niin ohjelma avaa alert-ikkunan ja
  pyytää vähintään 15 merkin palautetta */
  if(teksti.length < 15)
  {
    alert("Anna vähintään 15 merkkiä pitkä palaute");
    return false;
  }
  // Jos palaute on yli 15 merkkiä pitkä, sivusto kiittää palautteesta
  else
  {
    alert("Kiitos palautteestasi!");
  }

}
