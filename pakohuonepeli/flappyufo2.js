const cvs = document.getElementById('flappyufo');
const ctx = cvs.getContext('2d');
const thinkingThoughts = document.getElementById('newApproach');

/*let fuFont = new FontFace('VT323', 'url(https://fonts.googleapis.com/css?family=VT323)');
  fuFont.load().then((font) => {
    document.fonts.add(font);
  });*/

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

const exeClick = new Audio();
const titleTune = new Audio();
const bgMusic = new Audio();
const explosion = new Audio();
const flySound = new Audio();
const bleep = new Audio();
const lastBleep = new Audio();
const victorySong = new Audio();
const fuSmash = new Audio();
const shatter = new Audio();
const unlockSound = new Audio();


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

exeClick.src = 'sound/fu/click_003.ogg';
titleTune.src = 'sound/fu/title.mp3';
bgMusic.src = 'sound/fu/bgmusic.wav';
bgMusic.loop = true;
explosion.src = 'sound/fu/explosion.wav';
flySound.src = 'sound/fu/fly2.wav';
bleep.src = 'sound/fu/bleep.wav';
lastBleep.src = 'sound/fu/lastbleep.wav';
victorySong.src = 'sound/fu/victory.wav';
fuSmash.src = 'sound/fu/hit.mp3.flac';
shatter.src = 'sound/fu/shatter.wav';
unlockSound.src = 'sound/UnlockDoor.wav';


let fuExe = {width: 42,
              height: 66,
              x: 15,
              y: 14};

let startBtn = {width: 76,
                height: 40,
                x: 408,
                y: 344};
let continueBtn = {width: 120,
                  height: 44,
                  x: 375,
                  y: 350};

//const ufoInfo = {w: 51, h: 41};
let fufoSpeed = 0;
let fufo = {width: 42,
              height: 31,
              sheetW: 168,
              //sheetH: 0,
              animFrame: 0,
              cols: 4,
              x: 100,
              y: 150,
              sX: 0,
              sY: 0,
              hitboxTopRad: 11,
              hitboxTopX: 0,
              hitboxTopY: 0,
              hitboxBottomW: 38,
              hitboxBottomH: 13,
              hitboxBottomX: 0,
              hitboxBottomY: 0,
              speed: 0,
              gravity: 0.25,
              jump: -4.6,
              update: function() {
                if(gameState.current === gameState.start) {
                  this.y = 150;
                  this.speed = 0;
                }
                if(gameState.current === gameState.play) {
                  if(passes>0) {
                    this.speed += this.gravity;
                    this.y += this.speed;
                    this.hitboxTopX = this.x+21;
                    this.hitboxTopY = this.y+11;
                    this.hitboxBottomX = this.x+2;
                    this.hitboxBottomY = this.y+15;
                    if (frames%25 === 0) {
                      this.animFrame = ++this.animFrame % this.cols;
                      this.sX = this.animFrame * this.width;
                    }
                  } else {
                    if (frames%40 === 0) {
                      this.animFrame = ++this.animFrame % this.cols;
                      this.sX = this.animFrame * this.width;
                    }
                  }

                  if(this.y+this.height > cvs.height-18) {
                    explosion.play();
                    tries++;
                    //this.y = cvs.height - this.height;
                    gameState.current = gameState.end;
                  }
                }
              },
              fly: function() {
                this.speed = this.jump;
              },
              draw: function() {
                ctx.drawImage(fufoSprite, this.sX, this.sY, this.width, this.height,
                              this.x, this.y, this.width, this.height);
                /*ctx.beginPath();
                ctx.arc(this.hitboxTopX, this.hitboxTopY, this.hitboxTopRad, 0, Math.PI*2);
                ctx.fillStyle = '#f00';
                ctx.fill();
                ctx.closePath();
                ctx.beginPath();
                ctx.rect(this.hitboxBottomX, this.hitboxBottomY, this.hitboxBottomW, this.hitboxBottomH);
                ctx.fillStyle = '#f00';
                ctx.fill();
                ctx.closePath();*/
              }
            };

let bgScroll = {x: 0,
                speed: 1,
                update: function() {
                  if (gameState.current === gameState.play){
                    this.x -= this.speed;
                    }
                  if(this.x === -cvs.width) {
                    this.x = 0;
                  }
                },
                draw: function() {
                  ctx.drawImage(bgCity, this.x, 0);
                  ctx.drawImage(bgCity, this.x+cvs.width, 0);
                }};
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

let fuCountdown = {x: 470,
                    y: 10,
                    sx: 0,
                    sy: 0,
                    width: 40,
                    height: 68,
                    drawW: 20,
                    drawH: 48,
                    update: function() {
                      this.sx = passes * this.width;
                      this.draw();
                    },
                    draw: function() {
                      if(passes===10) {
                        ctx.drawImage(numSheet, this.width, this.sy,
                          this.width, this.height,
                          450, this.y, this.drawW, this.drawH);
                        ctx.drawImage(numSheet, 0, this.sy,
                          this.width, this.height,
                          470, this.y, this.drawW, this.drawH);
                      } else if (passes>0){
                        ctx.drawImage(numSheet, this.sx, this.sy,
                          this.width, this.height,
                          this.x, this.y, this.drawW, this.drawH);
                        }
                    }
                    };
//const tentacleInfo = {w: 30, h: 333};
let tentacleList = [];
class Tentacles {
  constructor() {
    this.x = cvs.width;
    this.maxY = -120;
    this.width = 35;
    this.spriteWidth = 55;
    this.height = 297;
    this.top = this.maxY * (Math.random() +1);
    this.bottom = this.top + this.height+87;
    this.counted = false;
  }
  draw() {
    ctx.drawImage(tentacleN, this.x, this.top);
    ctx.drawImage(tentacleS, this.x, this.bottom);
    //console.log(this.top);
    //console.log(tentacleList.length);
  }
  update() {
    this.x -= gamespeed;
    this.hitboxX = this.x+10;
    this.draw();
    if(this.x <= -this.spriteWidth) {
      tentacleList.pop();

    }

    if(this.x+this.spriteWidth <= fufo.x && !this.counted) {
      this.counted = true;
      //bleep.play();
      passes--;
      if (passes>0) {
        bleep.play();
      } else {
        lastBleep.play();
      }
    }
    //YLÄLONKERO HITBOXIT
    //ufon yläosa
    if(fufo.hitboxTopX + fufo.hitboxTopRad > this.hitboxX &&
      fufo.hitboxTopX - fufo.hitboxTopRad < this.hitboxX+this.width &&
      fufo.hitboxTopY + fufo.hitboxTopRad > this.top &&
      fufo.hitboxTopY - fufo.hitboxTopRad < this.top+this.height) {
        explosion.play();
        tries++;
        gameState.current = gameState.end;
      }
      //ufon alaosa
      if(fufo.hitboxBottomX < this.hitboxX+this.width &&
         fufo.hitboxBottomX + fufo.hitboxBottomW > this.hitboxX &&
         fufo.hitboxBottomY < this.top+this.height &&
         fufo.hitboxBottomY+fufo.hitboxBottomH > this.top) {
           explosion.play();
           tries++;
           gameState.current = gameState.end;
         }

      //ALALONKERO HITBOXIT
      //ufon yläosa
      if(fufo.hitboxTopX + fufo.hitboxTopRad > this.hitboxX &&
        fufo.hitboxTopX - fufo.hitboxTopRad < this.hitboxX+this.width &&
        fufo.hitboxTopY + fufo.hitboxTopRad > this.bottom &&
        fufo.hitboxTopY - fufo.hitboxTopRad < this.bottom+this.height) {
          explosion.play();
          tries++;
          gameState.current = gameState.end;
        }
        //ufon alaosa
        if(fufo.hitboxBottomX < this.hitboxX+this.width &&
           fufo.hitboxBottomX + fufo.hitboxBottomW > this.hitboxX &&
           fufo.hitboxBottomY < this.bottom+this.height &&
           fufo.hitboxBottomY+fufo.hitboxBottomH > this.bottom) {
             explosion.play();
             tries++;
             gameState.current = gameState.end;
           }

      //console.log(fufo.hitboxTopY);
    /* VANHA HITBOXLOGIIKKA
    if(fufo.x < this.x+this.width &&
       fufo.x + fufo.width > this.x &&
       fufo.y < this.top+this.height &&
       fufo.y+fufo.height > this.top) {
         explosion.play();
         gameState.current = gameState.end;
         console.log('HIT TOP');
       }
    if(fufo.x < this.x+this.width &&
      fufo.x + fufo.width > this.x &&
      fufo.y < this.bottom+this.height &&
      fufo.y+fufo.height > this.bottom) {
        explosion.play();
        gameState.current = gameState.end;
        console.log('HIT BOTTOM');
      }*/
  }
}

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

//let keyPressed = false;
//let esto = false;
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



/*
let x = 100;
let y = 150;
let dx = 3;
let dy = -3;
let gravity = 3;
let ballRadius = 20;

*/


//cvs.tabIndex = '1';

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
        }
    break;
  }
});

//drawGame();
//desktop.onload = drawDesktop();
//drawDesktop();
function drawDesktop() {
  ctx.drawImage(desktop, 0, 0);
  /*ctx.beginPath();
  ctx.rect(15, 14, 42, 66);
  ctx.fillStyle = '#f00';
  ctx.fill();
  ctx.closePath();*/
}


function spawnTentacles() {
  if (frames%100 === 0) {
    if (passes>1) {
      tentacleList.unshift(new Tentacles);
    }
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
    dialogue.innerHTML = 'I guess that worked too?';
  }, 1600);
}
/*
function fly() {
  y -= 20;
}
*/
function drawGame() {
  //ctx.clearRect(0, 0, cvs.width, cvs.height);
  //ctx.drawImage(bg, 0, 0);
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
    /*ctx.beginPath();
    ctx.rect(408, 344, startBtn.width, startBtn.height);
    ctx.fillStyle = '#f00';
    ctx.fill();
    ctx.closePath();*/
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
    /*if (firstTimeOpen) {
      titleTune.play();
      firstTimeOpen = false;
    }*/
    //drawBall();
    //drawSquare();
    //drawEllipse();

    /*
    frames = 0;
    passes = 0;
    tentacleList = [];
    bgScroll.x = 0;
    fgScroll.x = 0;
    keyTentacle.x = cvs.width;
    */
    //requestAnimationFrame(drawGame);
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
    //console.log('passes '+passes+' tentaakkelit '+tentacleList.length);
    if (passes===0 && tentacleList.length === 0) {
      keyTentacle.update();
      keyTentacle.draw();
    }
    fufo.draw();
    //frames++;
    //requestAnimationFrame(drawGame);
  }
  if (gameState.current === gameState.end) {
    ctx.drawImage(fusplosion, fufo.x, fufo.y-19);
    ctx.drawImage(fuGameOver, cvs.width/2-167.5, 50);
    ctx.drawImage(fuContinue, continueBtn.x, continueBtn.y,
                  continueBtn.width, continueBtn.height);
    //requestAnimationFrame(drawGame);
  }
  if (gameState.current === gameState.solved) {
    if(thoughts) {
      thinkingThoughts.innerHTML = '';
      }
    bgMusic.pause();
    victorySong.play();
    gameEnd = true;
    setTimeout(function() {
      ctx.drawImage(fuWin, 0, 0);
      /*ctx.beginPath();
      ctx.rect(0, 0, cvs.width, cvs.height);
      ctx.fillStyle = '#8bac0f';
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.rect(25, 25, 450, 350);
      ctx.fillStyle = '#9bbc0f';
      ctx.fill();
      ctx.closePath();
      ctx.drawImage(fukFound, cvs.width/2-22.5, cvs.height/2-54, 45, 108);
      ctx.font = '50px VT323';
      ctx.fillStyle = '#0f380f';
      ctx.textAlign = 'center';
      ctx.fillText('You Got The Key!', cvs.width/2, 100);*/
      setTimeout(function() {
        unlockSound.play();
        pcLock = true;
        lockElec.style.display = 'none';
        monitorGame.style.display = 'none';
        monitorWin.style.display = 'block';
        dialogue.innerHTML = 'Who designed these locks?';
      }, 1500);
    }, 2550);
  }
  if (gameState.current === gameState.extraSolved) {
    ctx.drawImage(extraSolved, 0, 0);
    gameEnd = true;
  }
  /*switch(gameState.current) {
    case gameState.start:
      ctx.drawImage(fufoSprite, x, y);
      console.log('tut');
      requestAnimationFrame(drawGame);
      break;
    case gameState.play:
      //ctx.drawImage(bg, 0, 0);
      ctx.drawImage(fufoSprite, x, y);
      spawnTentacles();
        console.log(tentacleList);
      //x += dx;
      y += gravity;
      frames++;
      requestAnimationFrame(drawGame);
      break;
    }*/
    if(!gameEnd) {
    requestAnimationFrame(drawGame);
  }
}
