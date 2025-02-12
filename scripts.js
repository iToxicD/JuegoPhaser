

class SpaceCombat extends Phaser.Scene{
    constructor(){
        super({key: "SpaceCombat"});
    }

    preload(){
        this.load.image("asteroideGrande", "/assets/asteroide/asteroideGrande.png")
        this.load.image('background', 'assets/background/background.png');
        this.load.image('nave', 'assets/nave/naveJugador.png');
        this.load.image('disparo', 'assets/municion/disparos.png');
    }

    create(){
        // Posicion del background
        this.add.image(500, 300, 'background').setScale(2).setOrigin(0.5,0.5);

        //Posicion de la nave
        this.nave = this.physics.add.image(400, 500, 'nave');
        this.nave.setCollideWorldBounds(true);

    }

    update(){

    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'container',
    physics: { default: 'arcade', arcade: { debug: false } },
    scene: SpaceCombat
};

const game = new Phaser.Game(config);