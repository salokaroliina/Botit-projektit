// Koodin tekijä Simo Särkiranta
function projektiToka()
{
  // Luodaan muuttujat ja haetaan niille tiedot html-tiedostosta
  var nimi = document.getElementById('nimi').value;
  var sposti = document.getElementById('email').value;
  var ika = document.getElementById('ika').value;
  // Hain valintapainikkeille tiedon getElementsByName-toiminnolla. Valueta ei tarvita
  var valintaEka = document.getElementById('pudotus');
  var radioEka = document.getElementsByName('radioEka');
  var checkToka = document.getElementsByName('checkToka');
  var palaute = document.getElementById('palaute').value;
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
  if (ika.length < 0)
  {
    alert("Anna ikäsi");
    // Jos tiedot on oikein, mitään ei tapahdu ja ohjelma siirtyy seuraavaan kohtaan
    return false;
  }
  // Luodaan muuttuja "valintaEka" jonka oletusarvo on "false"
  // luodaan muuttuja valintaEka, jolle haetaan tiedot pudotusvalikosta
  var valintaEka = false;
  var valintaEka = aine.options[valintaEka.selectedIndex].value;
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

  /* Luodaan muuttuja radioEka, jonka oletusarvoksi annetaan "false",
  sillä mitään ei ole vielä valittu */
  var radioEka = false;
  // for-loop
  /*Oletusarvo on 0, joten looppi käy läpi valintapainikkeita yksi kerrallaan,
  kunnes se löytää yhden valitun painikkeen*/
  for (var i = 0; i < radioEka.length; i++)
  {
    /* Jos jotakin on valittu, radioEka arvoksi annetaan "true",
    ja ohjelma jatkaa eteenpäin */
    if(radioEka[i].checked == true)
  {
    radioEka = true;
  }
  }
    /* Jos mitään ei ole valittu, radioEka arvo pysyy "false"na,
    ja alert-ikkuna pyytää valitsemaan olet mieluiten kesälomalla*/
    if (pudotus == false)
  {
    alert("Et ole kertonut miten olet kesällä mieluiten");
    return false;
  }
  /* Luodaan muuttuja checkToka, jonka oletusarvoksi annetaan "false",
  sillä mitään ei ole vielä valittu */
  var checkToka = false;
  // for-loop
  /*Oletusarvo on 0, joten looppi käy läpi valintapainikkeita yksi kerrallaan,
  kunnes se löytää yhden valitun painikkeen*/
  for (var j = 0; j < checkToka.length; j++)
  {
    /* Jos jotakin on valittu, checkToka arvoksi annetaan "true",
    ja ohjelma jatkaa eteenpäin */
    if(checkToka[j].checked == true)
  {
    checkToka = true;
  }
  }
  /* Jos mitään ei ole valittu, checkToka arvo pysyy "false"na,
  ja alert-ikkuna pyytää valitsemaan mielipiteen sivusta*/
    if(checkToka == false)
  {
    alert("Et ole kertonut mikä on kesässä parasta");
    return false;
  }

    }

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
