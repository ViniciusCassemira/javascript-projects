export default class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    preload() {
        
    }

    create() {
        this.add.text(10, 430, 'Star dash v1.1', { fontSize: '32px', fill: '#fff' });
        this.add.text(10, 470, 'Press enter to start');
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(){
        if(this.keyEnter.isDown){
            this.scene.start('GameScene');
        }
    }
}