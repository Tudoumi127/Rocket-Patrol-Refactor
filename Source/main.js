/*let config = {
    width: 200,
    height: 400,
    scene: [Menu]
}

const game = new Phaser.Game(config)*/

//5 points: added a smaller, faster catship wirth 40 points
//3 points: added a display for time remaining
//1 point: made it so player can move after firing

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
