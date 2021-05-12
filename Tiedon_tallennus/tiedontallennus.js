function tiedonTallennus()
{
  var enimi = document.getElementById('etunimi').value;
  var snimi = document.getElementById('sukunimi').value;
  var osoite = document.getElementById('osoite').value;
  var postinro = document.getElementById('postinumero').value;
  var postipk = document.getElementById('postitoimipaikka').value;
  var puh = document.getElementById('puhelinnumero').value;
  var sposti = document.getElementById('sahkoposti').value;

  if (enimi.length < 2)
    {
      alert("Anna etunimesi");
      return false;
    }
    if (snimi.length < 3)
    {
      alert("Anna sukunimesi");
      return false;
    }
    if (osoite.length < 8)
    {
      alert("Anna osoitteesi");
      return false;
    }
    if (postinro.length < 5)
    {
      alert("Anna postinumerosi");
      return false;
    }
    if (postipk.length < 2)
    {
      alert("Anna postitoimipaikkasi");
      return false;
    }
    if (puh.length < 8)
    {
      alert("Anna puhelinnumerosi");
      return false;
    }
    if (sposti.length < 5)
    {
      alert("Anna sähköpostisi");
      return false;
    }
      function emailIsValid (sposti) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sposti)
      }

      if(emailIsValid(sposti))
      {

      } else{
        alert("Anna oikea sähköpostiosoitteesi");
        return false;
      }
      console.log("Kaikki ok");
}
