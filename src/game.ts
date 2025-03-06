import Phaser from "phaser";

class myScene extends Phaser.Scene {

    preload() {
        this.load.image('sky_cloud', './assets/sky_clouds.png');
        this.load.image('ground', './assets/grass.png');
        this.load.spritesheet('cat_walk', './assets/cat_walk.png', { frameWidth: 32, frameHeight: 32 });
    }

    platforms: any;
    player: any;
    cursors: any;

    create() {
        this.add.image(250, 75, 'sky_cloud');
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(250, 150, 'ground').setScale(2).refreshBody();


        this.player = this.physics.add.sprite(100, 10, 'cat_walk');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('cat_walk', { start: 5, end: 8 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'cat_walk', frame: 4 }],
            frameRate: 5
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('cat_walk', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.physics.add.collider(this.player, this.platforms);
        this.player.body.setGravityY(1000);
        this.cursors = this.input.keyboard!.createCursorKeys();



    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-80);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(80);

            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

}


const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 500,
    height: 150,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 300 },
            debug: false
        }
    },
    scene: myScene,

};


const pet_game = new Phaser.Game(config);

export default pet_game;