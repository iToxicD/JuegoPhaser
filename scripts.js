
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'container',
    physics: { default: 'arcade', arcade: { debug: false } },
    scene: SpaceShooter
};

const game = new Phaser.Game(config);

class SpaceCombat extends Phaser.Scene{
    constructor(){
        super({key: "SpaceCombat"});
    }

    preload(){

    }

    create(){

    }

    update(){

    }
}