class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        
    }      

    create() {
        // menu text config
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            // backgroundColor: '#000000',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // display menu text
        this.add.text(game.config.width * 0.5, game.config.height * 0.45, 'REIMU\'S REPETITIVE ROUTINE', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width * 0.5, game.config.height * 0.5, 'Use ←↑↓→ to move & SHIFT to slow', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width * 0.5, game.config.height * 0.55, 'Press ↑ to start', menuConfig).setOrigin(0.5)
        
        // register input keys
        this.cursors = this.input.keyboard.createCursorKeys()
        keyLEFT = this.cursors.left 
        keyRIGHT = this.cursors.right
        keyUP = this.cursors.up
        keyDOWN = this.cursors.down
        keySHIFT = this.cursors.shift
    }

    update() {
        if(keyUP.isDown) {
            this.scene.start('stageScene')    
        }
    }
}