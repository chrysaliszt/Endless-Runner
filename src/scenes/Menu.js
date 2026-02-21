class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        
    }      

    create() {
        // menu text config
        let menuConfig = {
            fontFamily: 'Garamond',
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
        this.add.text(game.config.width * 0.5, game.config.height * 0.50, 'Use ←↑↓→ to move & SHIFT to slow', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width * 0.5, game.config.height * 0.55, 'Use ESC to pause/resume & R to restart', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width * 0.5, game.config.height * 0.60, 'Press any key to start', menuConfig).setOrigin(0.5)
        
        this.input.keyboard.once('keydown', () => { this.scene.start('stageScene') })
    }
}