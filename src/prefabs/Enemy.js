class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy')

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setPosition(-this.width, -this.height)
        this.setOrigin(0.5, 0.5)
        this.setScale(1.3)

        this.body.setOffset(this.width / 4, this.height / 4)
        this.body.setCircle(this.width / 4)
    }

    update(time, delta) {
        if(!this.isInBounds()) {
            this.kill()
        }
    }

    spawn(x, y) {
        this.setActive(true);
        this.setVisible(true);
        this.setPosition(x, y)
    }

    kill() {
        this.setActive(false);
        this.setVisible(false);
        this.setPosition(-this.width, -this.height)
    }

    isInBounds() {
        return (
            this.x > -this.width &&
            this.x < game.config.width + this.width &&
            this.y > -this.height &&
            this.y < game.config.height + this.height
        )
    }
}