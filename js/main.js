//HTML Selectors
const HTML_CANVAS = document.querySelector("#canvas");
const HTML_AUDIO_BACKGROUND = document.querySelector("#audio-background");
const HTML_BUTTON_PLAY = document.querySelector("#btn-play");
const HTML_AUDIO_LETS_GO_SPOKEN = document.querySelector("#audio-lets-go-spoken");
const HTML_AUDIO_WINNER = document.querySelector("#audio-winner");
const HTML_BUTTON_PAUSE = document.querySelector("#btn-pause");
const HTML_BUTTON_RESET = document.querySelector("#btn-reset");
const HTML_IMAGE_BACKGROUND = document.querySelector("#image-background");
const HTML_IMAGE_ENDLINE = document.querySelector("#image-endline");
const HTML_IMAGE_SPRITE_STARTMAN = document.querySelector("#image-sprite-startman");
const HTML_IMAGE_SPRITE_YELLOW_CAMEL = document.querySelector("#image-sprite-yellow-camel");
const HTML_IMAGE_SPRITE_BROWEN_CAMEL = document.querySelector("#image-sprite-brown-camel");
const HTML_IMAGE_SPRITE_BEIGE_CAMEL = document.querySelector("#image-sprite-beige-camel");
const HTML_IMAGE_SPRITE_RED_CAMEL = document.querySelector("#image-sprite-red-camel");

/*
// 1.5 ==> decimal
// 1  ==> integer
 Math.random(); // decimal from (0 ---> 1), Example: 0.5 NOT 0 and NOT 1
1, 9
0.7
(randomDecimal * (max - min + 1) + min)
(0.7 * 9) + 1
*/
function generateRandomNumberBetween(min, max) {
  return Math.floor( Math.random() * (max - min + 1) + min);
}


const game = {
  isRunning: false,
  ctx: null,
  finishlineXPosition: 0,
  startManIndex: 0,
  camelSpriteIndexX: 0,
  camelSpriteIndexY: 0,
  yellowCamelSpeed: 0,
  brownCamelSpeed: 0,
  beigeCamelSpeed: 0,
  redCamelSpeed: 0,
  init: function () {

    //e7na shelna el 100% width wel 100% height mn el CSS w est3mlna el window bta3t el browser (width w height)
    HTML_CANVAS.width = window.innerWidth;
    HTML_CANVAS.height = window.innerHeight;

    let resizeRatio = window.innerHeight / window.innerWidth;
    console.log(resizeRatio);

    if (resizeRatio >= 2) {
      HTML_CANVAS.height = HTML_CANVAS.height * 0.30;
    } else if (resizeRatio >= 1) {
      HTML_CANVAS.height =  HTML_CANVAS.height * 0.5;
    }

    this.ctx = HTML_CANVAS.getContext("2d");
    this.finishlineXPosition = HTML_CANVAS.width * 0.90;
    this.startManIndex = 0;
    this.camelSpriteIndexX = 5,
    this.camelSpriteIndexY = 0,
    this.yellowCamelSpeed = 0;
    this.brownCamelSpeed = 0;
    this.beigeCamelSpeed = 0;
    this.redCamelSpeed = 0;
    this.isRunning = true;
    this.draw();
    this.isRunning = false; 
  },
  update: function () {
    if (this.isRunning == false) {
      return;
    }

    /* (1) sprite images animation */

    //_____Start-man
    if (this.startManIndex < 2) {
      if(this.startManIndex == 0) {    //// by2ol elsot mara wa7da m3 el index rakam 0 bs
        HTML_AUDIO_LETS_GO_SPOKEN.play();
      }
      this.startManIndex++;
      return;
    }
  

    //_____Camel
    this.camelSpriteIndexX++;
    if (this.camelSpriteIndexX > 5) {
      this.camelSpriteIndexX = 0;
      this.camelSpriteIndexY = Number(!this.camelSpriteIndexY);
    }

    // if(this.camelSpriteIndexY == 0) {
    //   this.camelSpriteIndexY =1;
    // }else if(this.camelSpriteIndexY == 1){
    //   this.camelSpriteIndexY = 0;
    // }

      /* (2) move camels with random speed */

    //generate random number from 1 to 10
    this.yellowCamelSpeed += generateRandomNumberBetween(1, 10);
    this.brownCamelSpeed += generateRandomNumberBetween(1, 10);
    this.beigeCamelSpeed += generateRandomNumberBetween(1, 10);
    this.redCamelSpeed += generateRandomNumberBetween(1, 10);
    
      /* (3) end the game and select the winner */
    if (
      this.yellowCamelSpeed >= this.finishlineXPosition ||
      this.brownCamelSpeed >= this.finishlineXPosition ||
      this.beigeCamelSpeed >= this.finishlineXPosition ||
      this.redCamelSpeed >= this.finishlineXPosition
    ) {
      
      this.pause();

      let winnerText = '';
      let maxNumber = 0;
      if (this.yellowCamelSpeed > maxNumber) {
        winnerText = "🐪 Yellow Camel is the winner 👏 👏 👏";
        maxNumber = this.yellowCamelSpeed;
      }
  
      if (this.brownCamelSpeed > maxNumber) {
        winnerText = "🐪 Brown Camel is the winner 👏 👏 👏";
        maxNumber = this.brownCamelSpeed;
      }
  
      if (this.beigeCamelSpeed > maxNumber) {
        winnerText = "🐪 Beige Camel is the winner 👏 👏 👏";
        maxNumber = this.beigeCamelSpeed;
      }
  
      if (this.redCamelSpeed > maxNumber) {
        winnerText = "🐪 Red Camel is the winner 👏 👏 👏";
        maxNumber = this.redCamelSpeed;
      }
      
      HTML_AUDIO_BACKGROUND.pause();
      HTML_AUDIO_WINNER.play();
      alert(winnerText);

    }
  },
  draw: function () {
    if (this.isRunning == false) {
      return;
    }
    
    this.ctx.clearRect(0, 0, HTML_CANVAS.width, HTML_CANVAS.height);
    
    this.ctx.drawImage(
      HTML_IMAGE_BACKGROUND,
      0,
      0,
      HTML_CANVAS.width,
      HTML_CANVAS.height
    );

    this.ctx.drawImage(
      HTML_IMAGE_ENDLINE,
      this.finishlineXPosition,
      HTML_CANVAS.height * 0.57,
      HTML_CANVAS.width * 0.05,
      HTML_CANVAS.height * 0.50
    );

    //_____Start-man
    this.ctx.drawImage(
      HTML_IMAGE_SPRITE_STARTMAN,
      this.startManIndex * (HTML_IMAGE_SPRITE_STARTMAN.width / 3),
      0,
      HTML_IMAGE_SPRITE_STARTMAN.width / 3,
      HTML_IMAGE_SPRITE_STARTMAN.height,
      HTML_CANVAS.width * 0.10,
      HTML_CANVAS.height * 0.30,
      HTML_CANVAS.width * 0.15,
      HTML_CANVAS.height * 0.25
    );

    //console.log(this.camelSpriteIndexX);
    //console.log(this.camelSpriteIndexY);

    //_____Yellow-camel
    this.ctx.drawImage(
      HTML_IMAGE_SPRITE_YELLOW_CAMEL,
      
      //SPRITE
      this.camelSpriteIndexX * (HTML_IMAGE_SPRITE_YELLOW_CAMEL.width / 6),
      this.camelSpriteIndexY * (HTML_IMAGE_SPRITE_YELLOW_CAMEL.height / 2),
      //7agm el gamal gwa el sprite fa msh hyt3'yr
      HTML_IMAGE_SPRITE_YELLOW_CAMEL.width / 6,
      HTML_IMAGE_SPRITE_YELLOW_CAMEL.height / 2,

      //CANVA
      this.yellowCamelSpeed,
      HTML_CANVAS.height * 0.45,
      HTML_CANVAS.width * 0.15,
      HTML_CANVAS.height * 0.25
    );

    //_____Brown-camel
    this.ctx.drawImage(
      HTML_IMAGE_SPRITE_BROWEN_CAMEL,
      this.camelSpriteIndexX * (HTML_IMAGE_SPRITE_YELLOW_CAMEL.width / 6),
      this.camelSpriteIndexY * (HTML_IMAGE_SPRITE_YELLOW_CAMEL.height / 2),
      HTML_IMAGE_SPRITE_BROWEN_CAMEL.width / 6,
      HTML_IMAGE_SPRITE_BROWEN_CAMEL.height / 2,
      this.brownCamelSpeed /* HTML_CANVAS.width * 0, */,
      HTML_CANVAS.height * 0.55,
      HTML_CANVAS.width * 0.15,
      HTML_CANVAS.height * 0.25
    );

    //_____BEIGE-camel
    this.ctx.drawImage(
      HTML_IMAGE_SPRITE_BEIGE_CAMEL,
      this.camelSpriteIndexX * (HTML_IMAGE_SPRITE_YELLOW_CAMEL.width / 6),
      this.camelSpriteIndexY * (HTML_IMAGE_SPRITE_YELLOW_CAMEL.height / 2),
      HTML_IMAGE_SPRITE_BEIGE_CAMEL.width / 6,
      HTML_IMAGE_SPRITE_BEIGE_CAMEL.height / 2,
      this.beigeCamelSpeed /*     HTML_CANVAS.width * 0, */,
      HTML_CANVAS.height * 0.65,
      HTML_CANVAS.width * 0.15,
      HTML_CANVAS.height * 0.25
    );

    //_____RED-camel
    this.ctx.drawImage(
      HTML_IMAGE_SPRITE_RED_CAMEL,
      this.camelSpriteIndexX * (HTML_IMAGE_SPRITE_YELLOW_CAMEL.width / 6),
      this.camelSpriteIndexY * (HTML_IMAGE_SPRITE_YELLOW_CAMEL.height / 2),
      HTML_IMAGE_SPRITE_RED_CAMEL.width / 6,
      HTML_IMAGE_SPRITE_RED_CAMEL.height / 2,
      this.redCamelSpeed /*     HTML_CANVAS.width * 0, */,
      HTML_CANVAS.height * 0.75,
      HTML_CANVAS.width * 0.15,
      HTML_CANVAS.height * 0.25
    );
  },
  pause: function () {
    this.isRunning = false;
  },
  play: function () {
    this.isRunning = true;
  }
};


const initializeButtons = () => {
  HTML_BUTTON_PLAY.addEventListener("click", () => {
    HTML_AUDIO_BACKGROUND.play();
    game.play();
     HTML_BUTTON_PLAY.disabled = true;
    HTML_BUTTON_PAUSE.disabled = false;
    HTML_BUTTON_RESET.disabled = false; 
  });
  HTML_BUTTON_PAUSE.addEventListener("click", () => {
    HTML_AUDIO_BACKGROUND.pause();
    game.pause();
    HTML_BUTTON_PAUSE.disabled = true;
    HTML_BUTTON_PLAY.disabled = false;
    HTML_BUTTON_RESET.disabled = false; 
  });
  HTML_BUTTON_RESET.addEventListener("click", () => {
    HTML_AUDIO_BACKGROUND.load();
    game.init();
    HTML_BUTTON_PAUSE.disabled = false;
    HTML_BUTTON_PLAY.disabled = false;
    HTML_BUTTON_RESET.disabled = true; 
  });
};

const gameLoop = () => {
  console.log("gameloop is running every 1 second");
  game.update(); //change x or y
  game.draw(); //clear all screen => ersm tany
  setTimeout(gameLoop, 60);
};

/* Project Structure:
 ********************
 * 1) HTML Selectors
 * 2) Game Object
 * 3) Initialise buttons
 * 4) game loop
 */
/************ entrypoint ****************/
initializeButtons();
game.init();
gameLoop();
