class Stage extends Phaser.Scene {
    preload() {
        this.load.path = './assets/'
        this.load.audio('stageTheme', ['Ballad of the Endless Light Festival.ogg', 'Ballad of the Endless Light Festival.mp3'])
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
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

        // create background
        this.background = this.add.tileSprite(
            0.0, 
            0.0, 
            this.game.config.width, 
            this.game.config.height, 
            'forestBackground'
        ).setOrigin(0, 0)
        this.backgroundScrollSpeedMin = 0.075
        this.backgroundScrollSpeedMax = 0.75
        this.backgroundScrollSpeedScaling = 0.000001
        this.backgroundScrollSpeed = this.backgroundScrollSpeedMin

        // create player
        const PLAYER_SPAWN_POSITION = new Phaser.Math.Vector2(
            this.game.config.width * 0.5, 
            this.game.config.height * 0.75,
        )
        this.player = new Player(
            this, 
            PLAYER_SPAWN_POSITION.x,
            PLAYER_SPAWN_POSITION.y,
        )

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

        // shot pattern events
        this.shotPatternEvent = this.time.addEvent({
            delay: 2000,
            callback: this.onShotPatternEvent,
            callbackScope: this,
            loop: true
        })
        this.shotPatternTimeMax = 5000
        this.shotPatternTimeMin = 1000
        this.shotPatterTimeScaling = 0.95
        this.shotPatternTime = this.shotPatternTimeMax

        // play stage theme
        this.stageTheme = this.sound.add('stageTheme', {loop: true})
        this.stageTheme.play()
        this.stageTheme.addListener("looped", this.onMusicLoop)
    }

    update(time, delta) {
        // check for pause
        if(keyESCAPE.isDown) {
            this.scene.start('menuScene') 
            this.stageTheme.destroy()
        }

        // player update
        this.player.update()

        // background scrolling
        this.backgroundScrollSpeed += this.backgroundScrollSpeedScaling * delta
        this.backgroundScrollSpeed = Math.min(this.backgroundScrollSpeed, this.backgroundScrollSpeedMax)
        this.background.tilePositionY -= this.backgroundScrollSpeed * delta
    }

    onShotPatternEvent() {
        this.shotPatternTime *= this.shotPatterTimeScaling
        this.shotPatternTime = Math.max(this.shotPatternTime, this.shotPatternTimeMin)
        this.shotPatternEvent.delay = this.shotPatternTime
        console.log("event! ", this.shotPatternTime)
    }

    onMusicLoop(music) {
        music.setSeek(131.675)
    }
}