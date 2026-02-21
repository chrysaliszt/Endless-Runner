/*
Chrysa Nguyen
CMPM 120
Endless Runner Project

Creative Tilt Explanation:
    - Technical:    I use object pooling to make the creation of enemies and shots more efficient. 
                    This also acts as a limit on the game's difficulty while rewarding aggressive play.
    - Aesthetic:    The style is inspired by Touhou Project, a game series that is known for its fanworks.
                    This game uses Touhou-style music and visuals, made by a fan group I work with.

Requirements:
    - [X] Use multiple Scene classes (dictated by your game's style) 
    - [X] Properly transition between Scenes and allow the player to restart w/out having to reload the page 
    - [X] Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) 
    - [X] Have some form of player input/control appropriate to your game design 
    - [X] Include one or more animated characters that use a texture atlas/sprite sheet 
    - [X] Simulate scrolling with a tileSprite (or equivalent means) 
    - [X] Implement proper collision detection (via Arcade Physics or a custom routine) 
    - [X] Have looping background music 
    - [ ] Use a minimum of four sound effects for key mechanics, UI, and/or significant events appropriate to your game design 
    - [X] Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. 
    - [X] Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. 
    - [X] Be theoretically endless 
    - [X] Be playable for at least 15 seconds for a new player of low to moderate skill 
    - [X] Run without significant crashes or errors 
    - [X] Include in-game credits for all roles, assets, music, etc. 
    Does your game...
    - [X] ...do something technically interesting? Are you particularly proud of a programming technique you implemented? Did you look beyond the class examples and learn how to do something new?
    - [X]...have a great visual style? Does it use music or art that you're particularly proud of? Are you trying something new or clever with the endless runner form?

Credits:
    - Forest background texture: "Forest and tree landscape texture abstract background, Aerial top view forest atmosphere area, Texture of forest view from above, Ecosystem and healthy ecology environment concepts." by Kalyakan/stock.adobe.com.
    - Player sprite: "Reimu Sprite" by PumpkinPielex.
    - Enemy sprite: "Fairy Yellow" by Unknown artist, from danmakufu thread 8-880 (CC BY-NC 4.0).

*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [ Menu, Stage ]
}

let game = new Phaser.Game(config)

// reserve keyboard bindings
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keySHIFT, keyESCAPE, keyRESTART, keySHOOT