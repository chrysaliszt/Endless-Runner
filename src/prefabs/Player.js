// Player prefab.
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player')

        // movement variables
        this.moveSpeedMax = 300.0
        this.moveSpeedMin = 200.0
        this.moveDirection = new Phaser.Math.Vector2(0)

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setOrigin(0.5, 0.5)
        this.setScale(1.2)

        this.setCollideWorldBounds(true, 0.0, 0.0)
        this.body.setOffset(this.width / 4, this.height / 4)
        this.body.setCircle(this.width / 4)
    }

    update(time, delta) {
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
        this.setVelocity(this.moveDirection.x, this.moveDirection.y)
    }
}