//JavaScript: Simo Särkiranta
// Css: Karoliina Salo
// html: Elina Postila

  var enterButton = document.getElementById("nappi");
  enterButton.addEventListener("click",lisaaListaanNapauttaessa);

  var input = document.getElementById("tekstikentta");
  input.addEventListener("keypress", lisaaListaanEnterilla);

// tehtävälistan syöttökenttä
  var ul = document.querySelector("ul");

// kirjoituksen syöttökenttä tyhjenee.
function inputLength()
{
	return input.value.length;
}


function luoListaElementti()
{
	var li = document.createElement("li");
  // katsotaan onko tekstiä.
  if(input.value != '')
  {
    li.appendChild(document.createTextNode(input.value));
  	ul.appendChild(li);
  	input.value = "";
  }

	// Kun painaa tehtyä tehtävää pitäisi värjäytyä.

	function crossOut() {
		li.classList.toggle("valmis");
	}

	li.addEventListener("click",crossOut);

//tehdään poisto nappi
	var poisto = document.createElement("button");
	poisto.appendChild(document.createTextNode("x"));
	li.appendChild(poisto);
  poisto.setAttribute("id", "poistoo"); //unna heitti tän tähän
	poisto.addEventListener("click", poistaTehtava);


	function poistaTehtava()
  {
		li.classList.add("delete")
	}
}


function lisaaListaanNapauttaessa()
{
	if (inputLength() > 0) {
		luoListaElementti();
	}
}
// tässä oli itsellä ongelmia.
function lisaaListaanEnterilla(event)
{
	if (inputLength() > 0 && event.which ===13) { //Tarkistetaan, että Enter on painettu
		//nro 13 on Enterin avainkoodi, voidaan kirjoittaa myös event.keyCode === 13
		luoListaElementti();
	}
}
