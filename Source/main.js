//Lily Chen
//Rocket Patrol Impact 3rd
//~12 hours to complete
//5 points: added a smaller, faster catship wirth 40 points
//3 points: added a display for time remaining
//1 point: made it so player can move after firing
//3 point: added parallax scrolling with a slower moving background layer
//3 point: added 4 explosion sound effects with a random pick as to which
//         will play
//3 point: new menu screen
//1 point: new tile sprite
//1 point: fire UI text

//point total: 20

/*Sound effects Explosion3, Explosion7 and Torpedo were downloaded from 
https://www.freesoundeffects.com/free-sounds/explosion-10070/
The boomshakalaka from NBA Jam was downloaded from 
https://www.101soundboards.com/sounds/9140-boomshakalaka*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);
let keyF;
let keyR;
let keyLEFT;
let keyRIGHT;

//reserve keyboard vars

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
