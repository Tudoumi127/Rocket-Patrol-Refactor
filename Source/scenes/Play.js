class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        //load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('catship', './assets/cat___.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('planets', './assets/planets.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});

    }

    create() {
        //this.add.text(20, 20, "Rocket Patrol Play");
        //this.remainingTime = game.settings.gameTimer;
        //this.addedTime = 1000;
        //this.timeLimit = this.game.settings.gameTimer;
        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);
        this.planets = this.add.tileSprite(0, 0, 640, 480, 'planets').setOrigin(0,0);

        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        //white borders
        this.add.rectangle(0,0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0 ,game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0,0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //add 3 spaceships

        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

        //add a catship
        this.catship01 = new Catship(this, game.config.width + borderUISize*8, borderUISize*4, 'catship', 0, 40).setOrigin(0,0);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        //initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

 
        //GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this); 

        let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.remainingTime = Math.ceil(this.clock.getRemainingSeconds());
                this.timerLeft = this.add.text(borderUISize + borderPadding*12, borderUISize + borderPadding*2, this.remainingTime, timerConfig);
                //this.add.text(game.config.width - 350, borderUISize + borderPadding * 2, "Time Elapsed: "+ Math.ceil(this.clock.elapsed/1000), timerConfig);
            },
            loop: true,
        });


        //this.timer = Math.ceil(this.clock.getRemainingSeconds());
        //this.timerLeft = this.add.text(borderUISize + borderPadding*12, borderUISize + borderPadding*2, this.timer, timerConfig);

        //this.timer = this.clock.getRemainingSeconds();

        //display time???
        /*let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }*/
        //this.scoreLeft = this.add.text(borderUISize + borderPadding*12, borderUISize + borderPadding*2, this.timer, timerConfig);
    }

    update(){

        /*let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.timer = Math.ceil(this.clock.getRemainingSeconds());
        this.timerLeft = this.add.text(borderUISize + borderPadding*12, borderUISize + borderPadding*2, this.timer, timerConfig);*/


        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }


        if (!this.gameOver) {       
            this.starfield.tilePositionX -= 4;
            this.planets.tilePositionX -= 1;        
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();

            this.catship01.update();
        } 


        // check collisions
        //timerAdd = 10000;

        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            //console.log('kaboom ship 03');
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            this.remainingTime += this.addedTime;
            //this.time.remainingTime+=5000;
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            //console.log('kaboom ship 02');
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            this.remainingTime += this.addedTime;
            //this.time.remainingTime+=5000;
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            //console.log('kaboom ship 01');
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            this.remainingTime += this.addedTime;
            //this.time.remainingTime += 5000;
        }
        if (this.checkCollision(this.p1Rocket, this.catship01)) {
            //console.log('kaboom ship 01');
            this.p1Rocket.reset();
            this.shipExplode(this.catship01);
            this.remainingTime += this.addedTime;
            //this.time.remainingTime += 5000;
        }
        
    }

    /*timerDisplay{

    }*/

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
            console.log(this.remainingTime);
            const addedTime = 1000;
            this.clock.remainingTime += addedTime;
            console.log(this.remainingTime);
            return true;
        } else {
            return false;
        }
        
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });
        //score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');    
      }
}