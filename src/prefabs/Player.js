// Player prefab.
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // movement variables
        this.moveSpeedMax = 3.0
        this.moveSpeedMin = 2.0
        this.moveDirection = new Phaser.Math.Vector2(0)

        scene.add.existing(this)
    }

    update() {
        // movement directions
        this.moveDirection.scale(0.0)
        
        if(keyLEFT.isDown) {
            this.moveDirection.x = -1.0
        } else if(keyRIGHT.isDown) {
            this.moveDirection.x = 1.0
        }

        if(keyUP.isDown) {
            this.moveDirection.y = -1.0
        } else if(keyDOWN.isDown) {
            this.moveDirection.y = 1.0
        }

        // movement magnitude
        this.moveDirection.normalize()
        if(keySHIFT.isDown) {
            this.moveDirection.scale(this.moveSpeedMin)
        }
        else {
            this.moveDirection.scale(this.moveSpeedMax)
        }

        // apply movement
        this.x += this.moveDirection.x
        this.y += this.moveDirection.y
    }
}