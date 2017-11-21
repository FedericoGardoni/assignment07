var mic;
var posX = -10;
var posY = 270;
var posXiniziale = posX;
var primoPasso;
var secondoPasso;
var immagineAttuale;
var puoCamminare = true;
var timer = 0;
var soglia = 10;
var sensMin = .05;
var sensMed = .4;
var sensAlt = 1;
var sfondoPrimo;
var sfondoMorte;
var sfondo;
var suonoMorte;
var morto = false;
var allowMic = true;
var dissolvenza = 0;
var immagineMicrofono;
var vivo = false;
var sfondoVivo;
var suonoVivo;
var boh=false;

function preload() {
  primoPasso = loadImage("./assets/PrimoP.png");
  secondoPasso = loadImage("./assets/SecondoP.png");
  sfondoPrimo = loadImage("./assets/01.png");
  sfondoMorte = loadImage("./assets/02.png");
  sfondoVivo = loadImage("./assets/03.png");
  immagineMicrofono = loadImage("./assets/mic.png");
  immagineAttuale = primoPasso;
  sfondo = sfondoPrimo;
  suonoMorte = loadSound('./assets/bearz.wav');
  suonoVivo = loadSound('./assets/win.mp3');

}

function setup() {
  createCanvas(500, 500);
  frameRate(60);
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {

  background(230);
  image(sfondo, 0, 0, 500, 500);
  if (allowMic == true) {
    // IMMAGINE MICROFONO
    push();
    //text("lorem ipsum",60,250);
    tint(255, 150);
    image(immagineMicrofono, 70, 350);
    pop();
  }

  if (morto == true) {
    vivo=false;
    push();
    fill(240, 50, 50);
    textSize(40);
    textStyle(BOLD);
    textFont('Lato');
    textAlign(CENTER);
    text("YOU'RE DEAD!", 250, 420)
    pop();
  }

  if (vivo == true) {
morto=false;
    push();
    fill(50, 150, 50);
    textSize(40);
    textStyle(BOLD);
    textFont('Lato');
    textAlign(CENTER);
    text("YOU'RE ALIVE!", 250, 420)
    pop();

  }

  var vol = mic.getLevel() * 2;
  if (vol >= 1) {
    vol = 1;
    allowMic = false;
  }

  //DA CONTROLLARE 
  if (key == 'p') {
    vol = 15;
  }
  if (key == 'o') {
    posX += floor(random(15));
  }
  // FINE DA CONTROLLARE 

  if (vol > 0 && vol < sensMin) {
    //Nessun movimento - Rimuovo rumore di fondo
    vol = 0;
    //allowMic = false;

  } else if (vol >= sensMin && vol <= sensMed) {
    allowMic = false;
    //Movimento
    if (puoCamminare == true) {
      posX += floor(random(15));
      puoCamminare = false;
      if (immagineAttuale == primoPasso) {
        immagineAttuale = secondoPasso;
      } else {
        immagineAttuale = primoPasso;

      }
    }


  } else {
    //background(30);
    allowMic = false;
    if (puoCamminare == true && vol > sensMed) {
      puoCamminare = false;
      posX = posXiniziale;
      sfondo = sfondoMorte;
      if (suonoMorte.isPlaying() == false) {
        suonoMorte.play();
      }

      morte();
      morto = true;
    }
  }

// TIMER
  if (puoCamminare == false) {
    timer++;
    if (timer >= soglia) {
      puoCamminare = true;
      timer = 0;
    }
// FINE TIMER
  }
  
  
  //IMMAGINE DEL PERSONAGGIO
  image(immagineAttuale, posX, posY, 88, 140);

/* INDICATORI POSIZIONE - DA COMMENTARE
  push();
  textSize(26);
  text(posX, 50, 50);
  text(posY, 50, 80);
  text(vol, 50, 110);
  pop(); */

  push();
  textSize(22);
  textStyle(ITALIC);
  textFont('Lato');
  textAlign(CENTER);
  text("Escape from here, but don't wake the bear!", 250, 450);
  pop();

  push();
  noStroke();
  if (vol < .2) {
    fill(130, 150, 130);
  } else if (vol >= .2 && vol <= .8) {
    fill(100, 255, 100);
  } else {
    fill(240, 0, 0);
  }

  rect(20, 460, vol * 300, 15, 50);
  pop();


  console.log(vol);
  if (allowMic = true) {
    dissolvenza++;
    if (dissolvenza >= 120) {
      allowMic = false
    }
  }

  if (posX >= 490) {
    vittoria();
    vivo = true;
    sfondo = sfondoVivo;

    if (suonoVivo.isPlaying() == false) {
      suonoVivo.play();
      boh=true;
    }
    posX=-100;
 

  }

}


function morte() {
  mic.stop();
  posX = -100;
  // posXorso+=5;
  //if (posXorso >= posX) {background(255,0,255);}
}

function vittoria() {
  mic.stop();
  posX = 500;
}
