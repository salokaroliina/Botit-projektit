// Koodin tekijä Karoliina Salo
// Luodaan funktio, joka käynnistyy "lähetä"-nappia painamalla
function projektiEka()
{
  // Luodaan muuttujat ja haetaan niille tiedot html-tiedostosta
  var etunimi = document.getElementById('firstname').value;
  var sukunimi = document.getElementById('lastname').value;
  var sposti = document.getElementById('email').value;
  // Hain valintapainikkeille tiedon getElementsByName-toiminnolla. Valueta ei tarvita
  var kone = document.getElementsByName('radio');
  var sivu = document.getElementsByName('radioToka');
  var aine = document.getElementsByName('laatikko');
  var teksti = document.getElementById('palaute').value;
  // Tarkistetaan syötetyt tiedot
  // Jos etunimen pituus on alle 2, alert-ikkuna pyytää antamaan etunimen
  if (etunimi.length < 2)
  {
    alert("Anna etunimesi");
    // Jos tiedot on oikein, mitään ei tapahdu ja ohjelma siirtyy seuraavaan kohtaan
    return false;
  }
  // Jos sukunimen pituus on alle 2, alert-ikkuna pyytää antamaan sukunimen
  if (sukunimi.length < 2)
  {
    alert("Anna sukunimesi");
    // Jos tiedot on oikein, mitään ei tapahdu ja ohjelma siirtyy seuraavaan kohtaan
    return false;
  }
  // Jos sähköpostin pituus on alle 5, alert-ikkuna pyytää antamaan sähköpostin
  if (sposti.length < 5)
  {
    alert("Anna sähköpostisi");
    // Jos tiedot on oikein, mitään ei tapahdu ja ohjelma siirtyy seuraavaan kohtaan
    return false;
  }
  /* Luodaan muuttuja koneVastaus, jonka oletusarvoksi annetaan "false",
  sillä mitään ei ole vielä valittu */
  var koneVastaus = false;
  // for-loop
  /*Oletusarvo on 0, joten looppi käy läpi valintapainikkeita yksi kerrallaan,
  kunnes se löytää yhden valitun painikkeen*/
  for (var i = 0; i < kone.length; i++)
  {
    /* Jos jotakin on valittu, koneVastauksen arvoksi annetaan "true",
    ja ohjelma jatkaa eteenpäin */
    if(kone[i].checked == true)
  {
    koneVastaus = true;
  }
  }
    /* Jos mitään ei ole valittu, koneVastauksen arvo pysyy "false"na,
    ja alert-ikkuna pyytää valitsemaan millainen koneenkäyttäjä olet*/
    if (koneVastaus == false)
  {
    alert("Et ole valinnut millainen koneenkäyttäjä olet");
    return false;
  }
  /* Luodaan muuttuja sivuVastaus, jonka oletusarvoksi annetaan "false",
  sillä mitään ei ole vielä valittu */
  var sivuVastaus = false;
  // for-loop
  /*Oletusarvo on 0, joten looppi käy läpi valintapainikkeita yksi kerrallaan,
  kunnes se löytää yhden valitun painikkeen*/
  for (var j = 0; j < sivu.length; j++)
  {
    /* Jos jotakin on valittu, sivuVastauksen arvoksi annetaan "true",
    ja ohjelma jatkaa eteenpäin */
    if(sivu[j].checked == true)
  {
    sivuVastaus = true;
  }
  }
  /* Jos mitään ei ole valittu, sivuVastauksen arvo pysyy "false"na,
  ja alert-ikkuna pyytää valitsemaan mielipiteen sivusta*/
    if(sivuVastaus == false)
  {
    alert("Et ole antanut mielipidettäsi sivustani");
    return false;
  }
  /* Luodaan muuttuja aineVastaus, jonka oletusarvoksi annetaan "false",
  sillä mitään ei ole vielä valittu */
  var aineVastaus = false
  // for-loop
  /*Oletusarvo on 0, joten looppi käy läpi valintapainikkeita yksi kerrallaan,
  kunnes se löytää yhden valitun painikkeen*/
  for (var k = 0; k < aine.length; k++)
  {
    /* Jos jotakin on valittu, aineVastauksen arvoksi annetaan "true",
    ja ohjelma jatkaa eteenpäin */
    if(aine[k].checked == true)
  {
    aineVastaus = true;
  }
  }
  /* Jos mitään ei ole valittu, sivuVastauksen arvo pysyy "false"na,
  ja alert-ikkuna pyytää valitsemaan lempiaineesi koulussa*/
    if(aineVastaus == false)
  {
    alert("Et ole valinnut lempiainettasi Keudassa");
    return false;
  }

  /* Jos palautekentässä ei ole vähintään 10 merkkiä, ohjelma avaa alert-ikkunan ja
  pyytää vähintään 10 merkin palautetta */
  if(teksti.length < 10)
  {
    alert("Anna vähintään 10 merkkiä pitkä palaute");
    return false;
  }
  // Jos palaute on yli 10 merkkiä pitkä, sivusto kiittää palautteesta
  else {
    alert("Kiitos palautteestasi!");
  }
}
