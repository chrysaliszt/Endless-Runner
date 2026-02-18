class Stage extends Phaser.Scene {
    preload() {
        this.load.path = './assets/'
        this.load.image('forestBackground', 'forestBackground.jpg')
        this.load.spritesheet('player', 'player.png', {
            frameWidth: 35,
            frameHeight: 44,
        })
    }

    constructor() {
        super('stageScene')
    }

    create() {
        // register input keys
        this.cursors = this.input.keyboard.createCursorKeys()
        keyLEFT = this.cursors.left 
        keyRIGHT = this.cursors.right
        keyUP = this.cursors.up
        keyDOWN = this.cursors.down
        keySHIFT = this.cursors.shift

        // create background
        this.background = this.add.tileSprite(
            0.0, 
            0.0, 
            this.game.config.width, 
            this.game.config.height, 
            'forestBackground'
        ).setOrigin(0, 0)
        this.backgroundScrollSpeed = -0.75

        // create player
        const PLAYER_SPAWN_POSITION = new Phaser.Math.Vector2(
            this.game.config.width * 0.5, 
            this.game.config.height * 0.75,
        )
        this.player = new Player(
            this, 
            PLAYER_SPAWN_POSITION.x,
            PLAYER_SPAWN_POSITION.y,
            'player',
        ).setOrigin(0.5, 0.5).setScale(1.2)

        // player anims
        this.anims.create({
            key: 'idle',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 6
            })
        })
        this.player.play('idle')
    }

    update() {
        // player update
        this.player.update()

        // background scrolling
        this.background.tilePositionY += this.backgroundScrollSpeed
    }

    // Util function. Waits the specified amount of seconds.
    // To use in an async function, pair with the await keyword.
    async wait(time) {
        return new Promise((resolve) => {
            setTimeout(() => {
            resolve("")
            }, time * 1000.0)
        })
    }
}