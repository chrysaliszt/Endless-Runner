/*
Chrysa Nguyen
CMPM 120
Endless Runner Project

Creative Tilt Explanation:
    - Technical: 
    - Aesthetic: 

Requirements:
    - [X] Use multiple Scene classes (dictated by your game's style) 
    - [ ] Properly transition between Scenes and allow the player to restart w/out having to reload the page 
    - [ ] Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) 
    - [X] Have some form of player input/control appropriate to your game design 
    - [X] Include one or more animated characters that use a texture atlas/sprite sheet 
    - [X] Simulate scrolling with a tileSprite (or equivalent means) 
    - [ ] Implement proper collision detection (via Arcade Physics or a custom routine) 
    - [ ] Have looping background music 
    - [ ] Use a minimum of four sound effects for key mechanics, UI, and/or significant events appropriate to your game design 
    - [ ] Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. 
    - [ ] Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. 
    - [ ] Be theoretically endless 
    - [ ] Be playable for at least 15 seconds for a new player of low to moderate skill 
    - [ ] Run without significant crashes or errors 
    - [ ] Include in-game credits for all roles, assets, music, etc. 
    Does your game...
    - [ ] ...do something technically interesting? Are you particularly proud of a programming technique you implemented? Did you look beyond the class examples and learn how to do something new?
    - [ ]...have a great visual style? Does it use music or art that you're particularly proud of? Are you trying something new or clever with the endless runner form?

Credits:
    - Forest background texture: "Forest and tree landscape texture abstract background, Aerial top view forest atmosphere area, Texture of forest view from above, Ecosystem and healthy ecology environment concepts." by Kalyakan/stock.adobe.com.
    - Player texture: "Reimu Sprite" by PumpkinPielex.

*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Stage ]
}

let game = new Phaser.Game(config)

// reserve keyboard bindings
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keySHIFT, keyESCAPE