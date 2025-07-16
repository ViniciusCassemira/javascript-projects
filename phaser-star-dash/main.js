import MainMenu from "./scene/mainMenu.js";
import GameScene from "./scene/game.js";
import GameOver from "./scene/gameOver.js";

var config = {
    type: Phaser.AUTO,
    width: 500,
    height: 500,
    parent:"game-container",
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [
        MainMenu,
        GameScene, 
        GameOver
    ]
};

const game = new Phaser.Game(config);