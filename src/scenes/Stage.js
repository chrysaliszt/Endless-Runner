class Stage extends Phaser.Scene {
    preload() {
        this.load.path = './assets/'
        this.load.audio('stageTheme', ['Ballad of the Endless Light Festival.ogg', 'Ballad of the Endless Light Festival.mp3'])
        this.load.image('forestBackground', 'forestBackground.jpg')
        this.load.spritesheet('player', 'player.png', {
            frameWidth: 35,
            frameHeight: 44,
        })
        this.load.spritesheet('enemy', 'enemy.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.image('playerShot', 'shot.png')
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
        keyRESTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keySHOOT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)

        // set up pause toggle
        keyESCAPE.on('down', () => {
            if(this.game.isPaused) {
                this.sound.resumeAll()
                this.game.resume()
            }
            else {
                this.sound.pauseAll()
                this.game.pause()
            }
        })

        // set up restart during pause
        keyRESTART.on('down', () => {
            this.quitToMenu()
        })

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

        // score counter
        this.scoreCount = 0

        // score text
        let scoreConfig = {
            fontFamily: 'Garamond',
            fontSize: '28px',
            color: '#ffffff',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            }
        }
        this.scoreText = this.add.text(10.0, 0.0, ["Score: ", this.scoreCount], scoreConfig)

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
            key: 'idlePlayer',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 6
            })
        })
        this.player.play('idlePlayer')

        // create player shots
        this.playerShots = this.add.group({
            classType: PlayerShot,
            maxSize: 5,
            runChildUpdate: true
        })
        this.playerShotCooldown = 150.0
        this.playerShotPrevTime = 0.0

        // create enemies
        this.enemies = this.add.group({
            classType: Enemy,
            maxSize: 50,
            runChildUpdate: true
        })

        // enemy anims
        this.anims.create({
            key: 'idleEnemy',
            frameRate: 8,
            repeat: -1,
            yoyo: true,
            frames: this.anims.generateFrameNumbers('enemy', {
                start: 0,
                end: 2
            })
        })

        // player-enemy collisions
        this.physics.add.collider(this.player, this.enemies, (player, enemy) => {
            this.quitToMenu()
        })

        // shot-enemy collisions
        this.physics.add.collider(this.playerShots, this.enemies, (shot, enemy) => {
            this.scoreCount++
            this.scoreText.text = ["Score: ", this.scoreCount]
            shot.kill()
            enemy.kill()
        })

        // shot pattern events
        this.shotPatternEvent = this.time.addEvent({
            delay: 2000,
            callback: this.onEnemyPatternEvent,
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
        // player update
        this.player.update()

        // background scrolling
        this.backgroundScrollSpeed += this.backgroundScrollSpeedScaling * delta
        this.backgroundScrollSpeed = Math.min(this.backgroundScrollSpeed, this.backgroundScrollSpeedMax)
        this.background.tilePositionY -= this.backgroundScrollSpeed * delta

        if(keySHOOT.isDown && time > this.playerShotPrevTime) {
            const shot = this.playerShots.get()
            if(shot) {
                shot.spawn(this.player.x, this.player.y)
                this.playerShotPrevTime = time + this.playerShotCooldown
            }
        }
    }

    quitToMenu() {
        this.scene.stop('stageScene')
        this.sound.removeAll()
        this.anims.remove('idlePlayer')
        this.anims.remove('idleEnemy')
        this.scene.start('menuScene')
    }

    onEnemyPatternEvent() {
        this.shotPatternTime *= this.shotPatterTimeScaling
        this.shotPatternTime = Math.max(this.shotPatternTime, this.shotPatternTimeMin)
        this.shotPatternEvent.delay = this.shotPatternTime
        console.log("event! ", this.shotPatternTime)

        for(let i = 0; i < 10; i++) {
            const enemy = this.enemies.get()
            if(enemy) {
                enemy.spawn(Phaser.Math.Between(0.0, this.game.config.width), -enemy.height / 2)
                enemy.body.setVelocityY(Phaser.Math.Between(50, 400))
            }

        }
    }

    onMusicLoop(music) {
        music.setSeek(131.675)
    }
}