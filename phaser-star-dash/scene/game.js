export default class GameScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene'});
    }

    preload() {
        this.load.image('bg', 'assets/bg.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');

        this.load.spritesheet('coin', 'assets/coin.png', { frameWidth: 75, frameHeight: 74 });
        this.load.spritesheet('person', 'assets/character_base.png', { frameWidth: 16, frameHeight: 16 });
    }
    create() {
        this.add.image(250, 250, 'bg')
        this.player = this.physics.add.sprite(200, 200, 'person');
        this.player.setCollideWorldBounds(true);
        this.player.setScale(2);
        this.playerVelocity = 160;

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        this.anims.create({
            key: 'anim_coin',
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'anim_left',
            frames: this.anims.generateFrameNumbers('person', { start: 12, end: 15 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'anim_right',
            frames: this.anims.generateFrameNumbers('person', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'anim_up',
            frames: this.anims.generateFrameNumbers('person', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'anim_down',
            frames: this.anims.generateFrameNumbers('person', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'anim_stoped',
            frames: [ { key: 'person', frame: 5} ],
            frameRate: 30,
        });

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 2
        });
        
        this.bombs= this.physics.add.group({
            repeat: 0
        });

        this.score = 0;
        this.scoreText = this.add.text(0, 0, "Score: 0", { fontSize: '16px' });
        
        this.stars.children.iterate(function (child) {
            let randomX = Phaser.Math.Between(0, 500);
            let randomY = Phaser.Math.Between(0, 500);
            child.setPosition(randomX, randomY);
            child.anims.play('anim_coin', true);
            child.setScale(0.35);
        });

        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        this.physics.add.collider(this.bombs, this.bombs);

        // this.playerPosition = document.getElementById("player-position");
        // this.restartMessage = document.getElementById("restart-message");
        // this.restartMessage.innerText = "Press R to restart";
    }

    update() {
        // this.playerPosition.textContent = `X: ${this.player.x.toFixed(1)}Y: ${this.player.y.toFixed(1)}`;

        if (this.input.keyboard.checkDown(this.input.keyboard.addKey('R'), 700)) {
            this.restart();
        }

        if (this.gameOver) {
            this.restart();
            this.scene.start('GameOver')
        }

        const isMovingX = () => this.keyA.isDown || this.keyD.isDown;
        const isMovingY = () => this.keyW.isDown || this.keyS.isDown;

        if (this.keyA.isDown) {
            this.player.setVelocityX(-this.playerVelocity);
        }else if (this.keyD.isDown) {
            this.player.setVelocityX(this.playerVelocity);
        }else{
            this.player.setVelocityX(0);
        }

        if(this.keyW.isDown) {
            this.player.setVelocityY(-this.playerVelocity);
        }else if (this.keyS.isDown) {
            this.player.setVelocityY(this.playerVelocity);
        }else{
            this.player.setVelocityY(0);
        }

        if (isMovingX()) {
            if (this.keyA.isDown) {
                this.player.anims.play('anim_left', true);
            } else if (this.keyD.isDown) {
                this.player.anims.play('anim_right', true);
            }
        } else if (isMovingY()) {
            if (this.keyW.isDown) {
                this.player.anims.play('anim_up', true);
            } else if (this.keyS.isDown) {
                this.player.anims.play('anim_down', true);
            }
        }

    }

    collectStar(player, star) {
        star.disableBody(true, true);
        this.score++;
        this.scoreText.setText('Score: ' + this.score);
        this.addStar();
    }

    addStar() {
        let randomX = Phaser.Math.Between(0, 500);
        let randomY = Phaser.Math.Between(0, 500);

        let star = this.stars.create(randomX, randomY, 'coin');
        star.setScale(0);
        star.anims.play('anim_coin', true);

        this.tweens.add({
            targets: star,
            scale: 0.35,
            duration: 500,
            ease: 'Back.easeOut'
        });

        if (this.score % 3 === 0) {
            this.createBomb();
        }
    }   


    createBomb() {
        let randomX = this.player.x > 250 ? Phaser.Math.Between(0, 250) : Phaser.Math.Between(251, 500);
        let randomY = this.player.y > 250 ? Phaser.Math.Between(0, 250) : Phaser.Math.Between(251, 500);

        var bomb = this.bombs.create(randomX, randomY, 'bomb');
        bomb.setDisplaySize(32, 32);
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
    }

    hitBomb() {
        this.player.setVelocity(0, 0);
        this.physics.pause();
        this.gameOver = true;
    }

    restart() {
        this.scene.restart();
        this.gameOver = false;
        this.score = 0;
    }
}