//catship prefab
class Catship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        //this.moveSpeed = 5;
        this.moveSpeed = game.settings.catshipSpeed
    }

    update(){
        //moves spaceship left
        this.x -= this.moveSpeed;
        //wrap around from left edge to right edge
        if(this.x <= 0 - this.width){
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width;
    }
}