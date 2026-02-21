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
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 600,
            wordWrap: { width: 600 }
        }

        // display menu text
        this.add.text(game.config.width * 0.5, game.config.height * 0.25, 'REIMU\'S REPETITIVE ROUTINE', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width * 0.5, game.config.height * 0.30, 'Use ←↑↓→ to move & SHIFT to slow', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width * 0.5, game.config.height * 0.35, 'Use ESC to pause/resume & R to restart', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width * 0.5, game.config.height * 0.40, 'Use Z to shoot', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width * 0.5, game.config.height * 0.50, 'Press any key to start', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width * 0.5, game.config.height * 0.60, 'Background by Kalyakan/stock.adobe.com', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width * 0.5, game.config.height * 0.65, 'Player sprite by PumpkinPielex', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width * 0.5, game.config.height * 0.725, 'Enemy sprite by Unknown artist, from danmakufu thread 8-880 (CC BY-NC 4.0)', menuConfig).setOrigin(0.5)
        
        this.input.keyboard.once('keydown', () => { this.scene.start('stageScene') })
    }
}