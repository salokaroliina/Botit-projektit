const cvs = document.getElementById('flappyufo'); //Haetaan canvas
const ctx = cvs.getContext('2d'); //Konteksti 2d
//Paikka mihin tulee teksti huonoa loppua varten
const thinkingThoughts = document.getElementById('newApproach');

//Määritellään kuvien nimet
const desktop = new Image();
const titleScreen = new Image();
const extraSolved = new Image();
const fufoSprite = new Image();
const fuGO = new Image();
const fusplosion = new Image();
const bgSky = new Image();
const bgCity = new Image();
const fg = new Image();
const numSheet = new Image();
const tentacleN = new Image();
const tentacleS = new Image();
const fuGameOver = new Image();
const fuContinue = new Image();
const fuk = new Image();
const fukFound = new Image();
const fuWin = new Image();

//Määritellään äänien nimet
const exeClick = new Audio();
const titleTune = new Audio();
const startSound = new Audio();
const bgMusic = new Audio();
const explosion = new Audio();
const contSound = new Audio();
const flySound = new Audio();
const bleep = new Audio();
const lastBleep = new Audio();
const victorySong = new Audio();
const fuSmash = new Audio();
const shatter = new Audio();
const unlockSound = new Audio();

//Kuvien osoitteet
//Nämä kai voisi laittaa new Image('tähän'); kohtaan
//Mutta kaikki tutoriaalit on pistäny ne erikseen
//¯\_(ツ)_/¯
//Jos jää aikaa ja energiaa tutkin onko sillä väliä
desktop.src = 'grafiikka/fu/fudesktop.png';
titleScreen.src = 'grafiikka/fu/futitlecard.png';
extraSolved.src = 'grafiikka/fu/fusmash.png';
fufoSprite.src = 'grafiikka/fu/fusheet.png';
fuGO.src = 'grafiikka/fu/fustgo.png';
fusplosion.src = 'grafiikka/fu/fusplosion.png';
bgSky.src = 'grafiikka/fu/gbbgsky.png';
bgCity.src = 'grafiikka/fu/gbbgcity.png';
fg.src = 'grafiikka/fu/gbfg.png';
numSheet.src = 'grafiikka/fu/numsheet.png';
tentacleN.src = 'grafiikka/fu/gbt1.png';
tentacleS.src = 'grafiikka/fu/gbt2.png';
fuGameOver.src = 'grafiikka/fu/fugo.png';
fuContinue.src = 'grafiikka/fu/fucontinue.png';
fuk.src = 'grafiikka/fu/fukey.png';
fukFound.src = 'grafiikka/fu/fuendkey.png';
fuWin.src = 'grafiikka/fu/fuwin.png';

//Äänten osoitteet
exeClick.src = 'sound/fu/click_003.ogg';
titleTune.src = 'sound/fu/title.mp3';
startSound.src = 'sound/fu/start.wav';
bgMusic.src = 'sound/fu/bgmusic.wav';
bgMusic.loop = true; //Taustamusiikin looppaus
explosion.src = 'sound/fu/explosion.wav';
contSound.src = 'sound/fu/continue.wav';
flySound.src = 'sound/fu/fly.wav';
bleep.src = 'sound/fu/bleep.wav';
lastBleep.src = 'sound/fu/lastbleep.wav';
victorySong.src = 'sound/fu/victory.wav';
fuSmash.src = 'sound/fu/hit.mp3.flac';
shatter.src = 'sound/fu/shatter.wav';
unlockSound.src = 'sound/UnlockDoor.wav';

//Määritellään Flappy UFO 2 desktop ikonin hitbox
let fuExe = {width: 42,
             height: 66,
             x: 15,
             y: 14};

//Start- ja Continue-nappien hitboxit
let startBtn = {width: 76,
                height: 40,
                x: 408,
                y: 344};
let continueBtn = {width: 120,
                   height: 44,
                   x: 375,
                   y: 350};

//Pelaaja-hahmo (avaruus)olio
let fufo = {width: 42,
              height: 31, //Yhden framen leveys ja korkeus
              sheetW: 168, //Spritesheet leveys
              animFrame: 0, //Animaatio frame
              cols: 4, //Spritesheet sarakkeiden määrä
              x: 100, //UFOn sijainti leveys-suunnassa
              y: 150, //UFOn alku-sijainti pituus-suunnassa
              sX: 0,
              sY: 0, //Leveys ja pituus sheet-animaatiota varten
              hitboxTopRad: 11, //Ylä-hitboxin ympärysmitta
              hitboxTopX: 0,
              hitboxTopY: 0, //Määritellään ylä-hitboxin sijainti-muuttujat
              hitboxBottomW: 38,
              hitboxBottomH: 13, //Ala-hitboxin leveys ja korkeus
              hitboxBottomX: 0,
              hitboxBottomY: 0, //Määritellään ala-hitboxin sijainti-muuttujat
              speed: 0, //Aloitus-vauhti
              gravity: 0.25, //Painovoima
              jump: -4.6, //Hyppy lento-funktiota varten
              //Päivitys-funktio joka määrittelee UFOn sijainnin ja animaation
              update: function() {
                //y-sijainti ja nopeus Get Ready-näkymässä
                if(gameState.current === gameState.start) {
                  this.y = 150;
                  this.speed = 0;
                }
                //Päivitetään sijainti ja animaatio play-tilassa
                if(gameState.current === gameState.play) {
                  //Jos läpi lennettäviä lonkeroita on vielä jäljellä
                  if(passes>0) {
                    this.speed += this.gravity; //Nopeutta lisätään painovoimalla
                    this.y += this.speed; //Sijainti y-suunnassa määritetään nopeuden mukaan
                    //Määritellään ylä-hitboxin sijainti niin että se tulee ohjaamon päälle
                    this.hitboxTopX = this.x+21;
                    this.hitboxTopY = this.y+11;
                    //Ala-hitboxi tulee ala-osan päälle
                    this.hitboxBottomX = this.x+2;
                    this.hitboxBottomY = this.y+15;
                    //Määritellään animaatio-nopeus
                    //Jos framet on jaolliset 25, vaihdetaan animaatio framee
                    if (frames%25 === 0) {
                      //Lisää animaatio frameen +1
                      //Haetaan modulo-operaattorilla ja sarakkeilla jakojäännös
                      //eli 1%4=1, 2%4=2 ja niin edespäin
                      this.animFrame = ++this.animFrame % this.cols;
                      //Sen kanssa sitten kerrotaan UFOn Leveys
                      //Näin saadaan x mistä aletaan piirtämään kuvaa spritesheetista
                      this.sX = this.animFrame * this.width;
                    }
                    //Jos kaikki lonkerot on ohitettu, lopetetaan UFOn y:n päivitys
                    //Samalla tehdään animaatiosta asteen hitaampi
                  } else {
                    if (frames%40 === 0) {
                      //Sama periaate kuin ylhäällä
                      this.animFrame = ++this.animFrame % this.cols;
                      this.sX = this.animFrame * this.width;
                    }
                  }
                  //Jos tämän y on yhtä suuri tai pienempi kuin canvasin yläreuna
                  //niin pidetään y nollassa
                  //Että pelaaja ei pääse lentämään canvasista pois
                  if (this.y <= 0) {
                    this.y = 0;
                  }
                  //Jos UFOn alareuna koskee foreground-elementtiä
                  if(this.y+this.height > cvs.height-18) {
                    explosion.play(); //Soitetaan räjähdys-äänitehoste
                    tries++; //Lisätään yritys-laskuria yhdellä
                    gameState.current = gameState.end; //Mennään Game Over-tilaan
                  }
                }
              },
              //Lento-funktio
              fly: function() {
                this.speed = this.jump; //Nopeudeksi asetetaan ylempänä määritelty arvo, -4.6
              },
              //Piirto-funktio
              draw: function() {
                //Ensin kerrotaan mitä piirretään, elikkä haetaan UFO spritesheet
                //Sitten määritetään kohdan mistä lähdetään piirtämään x- ja y-arvot
                //Seuraavaksi kerrotaan kuinka leveä&korkea pala sheetistä piirretään
                //Sitten määritellään mihin paikkaan canvasista sprite piirretään
                //Viimeiseksi vielä kerrotaan kuinka suurena kuva piirretään
                ctx.drawImage(fufoSprite, this.sX, this.sY, this.width, this.height,
                              this.x, this.y, this.width, this.height);
              }
            };

//Scrollaavan taustaelementin olio
let bgScroll = {x: 0, //Ei tarvi määrittää kuin x koska y on aina sama
                speed: 1, //Scrollaus nopeus
                //Päivitys-funktio joka määrittää mihin kuva piirretään
                update: function() {
                  //Jos peli on play-tilassa
                  if (gameState.current === gameState.play){
                    this.x -= this.speed; //Vähennetään x nopeudella
                    }
                  //Jos x on sama kuin negatiivinen canvasin leveys
                  if(this.x === -cvs.width) {
                    this.x = 0; //Asetetaan x takaisin nollaan
                  }
                },
                //Piirto-funktio
                draw: function() {
                  //Piirretään samaan aikaan kaksi samaa kuvaa
                  //Ekan x on sama kuin tämän x
                  ctx.drawImage(bgCity, this.x, 0);
                  //Toisen x on tämän x plus canvasin leveys
                  ctx.drawImage(bgCity, this.x+cvs.width, 0);
                }};
//Scrollaava foreground elementti
//Tismalleen sama kuin edellinen olio paitsi nopeus on asteen hitaampi
let fgScroll = {x: 0,
                speed: 2,
                update: function() {
                  if (gameState.current === gameState.play){
                    this.x -= this.speed;
                    }
                  if(this.x === -cvs.width) {
                    this.x = 0;
                  }
                },
                draw: function() {
                  ctx.drawImage(fg, this.x, 382);
                  ctx.drawImage(fg, this.x+cvs.width, 382);
                }};

//Countdown-elementin funktio
//Käyttää myös spritesheet animaatiota jonka aiemmin selitin
//Paitsi että ei tarvi käyttää modulaatiota koska se mitä halutaan piirtää
//perustuu kuinka monta lonkeroa on ohitettu framejen laskemisen sijaan
let fuCountdown = {x: 470,
                    y: 10,
                    sx: 0,
                    sy: 0,
                    width: 40,
                    height: 68, //Spriten oikea leveys ja korkeus
                    //Mutta koska me halutaan piirtää kuvat pienempänä kuin
                    //ne oikeasti on, alla määritellään minkä kokoisina
                    //haluamme kuvat piirtää
                    drawW: 20,
                    drawH: 48,
                    //Päivitys-funktio
                    update: function() {
                      //Kerrotaan ohitukset tämän leveydellä että saadaan
                      //kohta josta haluamme alkaa piirtämään spritesheetista
                      this.sx = passes * this.width;
                      //Kutsutaan tämän piirto-funktiota
                      this.draw();
                    },
                    //Piirto-funktio
                    draw: function() {
                      //Jos yhtään ohitusta ei ole vielä tehty
                      if(passes===10) {
                        //Haetaan spritesheetiltä numero 1
                        ctx.drawImage(numSheet, this.width, this.sy,
                          this.width, this.height,
                          450, this.y, this.drawW, this.drawH);
                        //Haetaan spritesheetiltä numero 0 ja piirretään se ykkösen jälkeen
                        ctx.drawImage(numSheet, 0, this.sy,
                          this.width, this.height,
                          470, this.y, this.drawW, this.drawH);
                        //Muuten jos ohituksia on vielä jäljellä, piirretään vain
                        //yksi numero
                      } else if (passes>0){
                        ctx.drawImage(numSheet, this.sx, this.sy,
                          this.width, this.height,
                          this.x, this.y, this.drawW, this.drawH);
                          //Ja kaikki tämä vaiva koska en saanut Google fontseja
                          //toimimaan Chromessa
                          //Ironista
                          //Firefoxilla se sujui niin vaivatta
                          //Mielummin piirsin omat numerot kuin aloin jahtaamaan
                          //oikeaa vastausta netistä
                          //goddamn.
                          //Tulipa spritesheet animaatio harjoitusta
                        }
                    }
                    };

//Lista lonkeroille
let tentacleList = [];
//Lonkero constructor
class Tentacles {
  constructor() {
    this.x = cvs.width; //Aloitus x on canvasin leveys
    this.maxY = -120; //Maximi y-arvo
    this.width = 35; //Hitbox-leveys
    this.spriteWidth = 55; //Kuvan oikea leveys
    this.height = 297; //Kuvan pituus
    this.top = this.maxY * (Math.random() +1); //Arvotaan randomi y-arvo ylälonkerolle
    //Alalonkeron y perustuu ylälonkeron y-arvoon
    //Kummatkin ovat saman pituisia, niin lasketaan ylälonkeron x plus tämän pituus
    //PLUS 87, joka on se hajurako joka lonkeroiden väliin tulee
    this.bottom = this.top + this.height+87;
    //Lisätään booleani niin että tätä ei laskettaisi kahdesti
    this.counted = false;
  }
  //Piirto-funktio
  draw() {
    ctx.drawImage(tentacleN, this.x, this.top);
    ctx.drawImage(tentacleS, this.x, this.bottom);
  }
  //Päivitys
  update() {
    //Lonkeroiden x määrittyy pelivauhti muuttujan mukaan
    this.x -= gamespeed;
    //Koska hitboxin ja kuvan leveydet ovat eri, asetetaan hitboxin x
    //niin että se olisi mahdollisimman reilusti lonkero-kuvan päällä
    this.hitboxX = this.x+10;
    //Piirto-funktion kutsu
    this.draw();
    //Jos kuva on hävinnyt canvasista piiloon, poistetaan se lonkerolistasta
    if(this.x <= -this.spriteWidth) {
      tentacleList.pop();
    }

    //Jos UFO on päässyt lonkeron ohi ja tätä ei ole vielä laskettu
    if(this.x+this.spriteWidth <= fufo.x && !this.counted) {
      //Vaihdetaan boolean-arvo ettei tätä enää lasketa uusiksi
      this.counted = true;
      //Miinustetaan ohituksista yksi
      passes--;
      //Jos ohituksia on vielä jäljellä
      if (passes>0) {
        //Soitetaan kolikko-ääni
        bleep.play();
      //Jos ei ole enää ohituksia, eli tämä on viimeinen lonkeropari
      } else {
        //Soitetaan vähän korkeampi kolikko-ääni
        lastBleep.play();
        //Jos canvasin alle on aktivoitunut huono loppu-vaihtoehto
        if(thoughts) {
          //Otetaan se pois
          thinkingThoughts.innerHTML = '';
          }
      }
    }

    //YLÄLONKERO HITBOXIT
    //UFOn yläosa
    //Minulla ei ole tarpeeksi voimavaroja että alan selittään yksityiskohtaisesti
    //Ymmärrän tämän vain harmaasti
    //Elikkä tässä jos UFOn ylähitboxi osuu ylälonkeroon
    if(fufo.hitboxTopX + fufo.hitboxTopRad > this.hitboxX &&
      fufo.hitboxTopX - fufo.hitboxTopRad < this.hitboxX+this.width &&
      fufo.hitboxTopY + fufo.hitboxTopRad > this.top &&
      fufo.hitboxTopY - fufo.hitboxTopRad < this.top+this.height) {
        explosion.play(); //Soitetaan räjähdys-ääni
        tries++; //Lisätään yrityksiä yhdellä
        gameState.current = gameState.end; //Siirretään pelitila Game Overiin
      }
      //UFOn alaosa
      //Kaikissa näissä toistuu sama
      //Paitsi UFOn alahitbox on nelikulmainen eikä ympyrä
      if(fufo.hitboxBottomX < this.hitboxX+this.width &&
         fufo.hitboxBottomX + fufo.hitboxBottomW > this.hitboxX &&
         fufo.hitboxBottomY < this.top+this.height &&
         fufo.hitboxBottomY+fufo.hitboxBottomH > this.top) {
           explosion.play();
           tries++;
           gameState.current = gameState.end;
         }

      //ALALONKERO HITBOXIT
      //UFOn yläosa
      if(fufo.hitboxTopX + fufo.hitboxTopRad > this.hitboxX &&
        fufo.hitboxTopX - fufo.hitboxTopRad < this.hitboxX+this.width &&
        fufo.hitboxTopY + fufo.hitboxTopRad > this.bottom &&
        fufo.hitboxTopY - fufo.hitboxTopRad < this.bottom+this.height) {
          explosion.play();
          tries++;
          gameState.current = gameState.end;
        }
        //UFOn alaosa
        if(fufo.hitboxBottomX < this.hitboxX+this.width &&
           fufo.hitboxBottomX + fufo.hitboxBottomW > this.hitboxX &&
           fufo.hitboxBottomY < this.bottom+this.height &&
           fufo.hitboxBottomY+fufo.hitboxBottomH > this.bottom) {
             explosion.play();
             tries++;
             gameState.current = gameState.end;
           }
  }
}

//Megalonkeron olio
//Hänellä on avain
let keyTentacle = {x: cvs.width,
                  y: 21,
                  width: 372,
                  update: function() {
                    if (this.x <= cvs.width-this.width) {
                      gameState.current = gameState.solved;
                    } else {
                      this.x -= 1.7;
                    }
                  },
                  draw: function() {
                    ctx.drawImage(fuk, this.x, this.y);
                  }
                };

const gameState = {current: 0,
                   desktop: 0,
                   title: 1,
                   start: 2,
                   play: 3,
                   end: 4,
                   solved: 5,
                   extraSolved: 6};

let gamespeed = 3;
let frames = 0;
let passes = 10;
let tries = 0;
let stopped = false;
let gameStarted = false;
let goOn = false;
let firstTimeOpen = true;
let gameEnd = false;
let didWeWin = false;
let thoughts = false;

//EVENT LISTENERI
//ON TÄSSÄ!!!!!!!!!!
let rect;
let clickX;
let clickY;

cvs.addEventListener('dblclick', function(e) {
  if(!gameStarted) {
    rect = cvs.getBoundingClientRect();
    clickX = e.clientX - rect.left;
    clickY = e.clientY - rect.top;

    if(clickX >= fuExe.x && clickX <= fuExe.x+fuExe.width &&
      clickY >= fuExe.y && clickY <= fuExe.y + fuExe.height) {
        drawGame();
        titleTune.play();
        gameState.current = gameState.title;
        monitorDesktop.style.display = 'none';
        monitorGame.style.display = 'block';
        gameStarted = true;
      }

  }
});
cvs.addEventListener('click', function(e) {
  switch (gameState.current){
    case gameState.desktop:
    rect = cvs.getBoundingClientRect();
    clickX = e.clientX - rect.left;
    clickY = e.clientY - rect.top;

    if(clickX >= fuExe.x && clickX <= fuExe.x+fuExe.width &&
      clickY >= fuExe.y && clickY <= fuExe.y + fuExe.height) {
        exeClick.play();
      }
    break;
    case gameState.title:
      rect = cvs.getBoundingClientRect();
      clickX = e.clientX - rect.left;
      clickY = e.clientY - rect.top;

      if(clickX >= startBtn.x && clickX <= startBtn.x+startBtn.width &&
        clickY >= startBtn.y && clickY <= startBtn.y + startBtn.height) {
          titleTune.pause();
          startSound.play();
          bgMusic.play();
          gameState.current = gameState.start;
        }
    break;

    case gameState.start:
        frames = 0;
        gameState.current = gameState.play;
      break;

    case gameState.play:
      if(passes>0) {
        fufo.fly();
        flySound.play();
      }
    break;

    case gameState.end:
      rect = cvs.getBoundingClientRect();
      clickX = e.clientX - rect.left;
      clickY = e.clientY - rect.top;

      if(clickX >= continueBtn.x && clickX <= continueBtn.x+continueBtn.width &&
        clickY >= continueBtn.y && clickY <= continueBtn.y + continueBtn.height) {
          gameState.current = gameState.start;
          frames = 0;
          passes = 10;
          fufo.animFrame = 0;
          fufo.sX = 0;
          goOn = false;
          tentacleList = [];
          bgScroll.x = 0;
          fgScroll.x = 0;
          keyTentacle.x = cvs.width;
          contSound.play();
        }
    break;
  }
});


function spawnTentacles() {
  if (frames%100 === 0 && passes>1) {
    tentacleList.unshift(new Tentacles);
  }
  for(let i=0;tentacleList.length>i;i++) {
    tentacleList[i].update();
  }
  frames++;
}

function newApproach() {
  bgMusic.pause();
  fuSmash.play();
  shatter.play();
  thinkingThoughts.innerHTML = '';
  pcSolutions.style.display = 'block';
  dialogue.innerHTML = '...';
  monitorGame.style.display = 'none';
  monitorBroken.style.display = 'block';
  gameState.current = gameState.extraSolved;
  setTimeout(function() {
    unlockSound.play();
    pcLock = true;
    lockElec.style.display = 'none';
    dialogue.innerHTML = 'I heard something unlock?';
  }, 1600);
}

function drawDesktop() {
  ctx.drawImage(desktop, 0, 0);
}

function drawGame() {
  if (tries === 5 && !thoughts) {
    thoughts = true;
    thinkingThoughts.innerHTML =
    '<span onclick="newApproach()" class="interact" id="solutions">Perhaps I should try another approach...?</span>';
  }
  if (gameState.current === gameState.desktop) {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.drawImage(desktop, 0, 0);

  }

  if (gameState.current === gameState.title) {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.drawImage(titleScreen, 0, 0);
  }

  if (gameState.current === gameState.start) {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.drawImage(bgSky, 0, 0);
    bgScroll.update();
    bgScroll.draw();
    fgScroll.update();
    fgScroll.draw();
    fufo.update();
    fufo.draw();
    fuCountdown.update();

    if(!goOn) {
      if(frames%55 === 0) {
        goOn = true;
      }
    } else {
      ctx.drawImage(fuGO, cvs.width/2-72.5, 50);
      if(frames%55 === 0) {
        goOn = false;
      }
    }
    frames++;
  }

  if (gameState.current === gameState.play) {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.drawImage(bgSky, 0, 0);
    bgScroll.update();
    bgScroll.draw();
    fgScroll.update();
    fgScroll.draw();
    fufo.update();
    spawnTentacles();
    fuCountdown.update();
    if (passes===0 && tentacleList.length === 0) {
      keyTentacle.update();
      keyTentacle.draw();
    }
    fufo.draw();
  }

  if (gameState.current === gameState.end) {
    ctx.drawImage(fusplosion, fufo.x, fufo.y-19);
    ctx.drawImage(fuGameOver, cvs.width/2-167.5, 50);
    ctx.drawImage(fuContinue, continueBtn.x, continueBtn.y,
                  continueBtn.width, continueBtn.height);
  }

  if (gameState.current === gameState.solved) {
    bgMusic.pause();
    victorySong.play();
    gameEnd = true;
    setTimeout(function() {
      ctx.drawImage(fuWin, 0, 0);
      setTimeout(function() {
        unlockSound.play();
        pcLock = true;
        lockElec.style.display = 'none';
        monitorGame.style.display = 'none';
        monitorWin.style.display = 'block';
        dialogue.innerHTML =
        'I heard something unlock<br><br>Who designed these locks?';
      }, 1500);
    }, 2550);
  }

  if (gameState.current === gameState.extraSolved) {
    ctx.drawImage(extraSolved, 0, 0);
    gameEnd = true;
  }
    if(!gameEnd) {
    requestAnimationFrame(drawGame);
  }
}
