

class SpaceCombat extends Phaser.Scene{
    constructor(){
        super({key: "SpaceCombat"});
    }

    preload(){
        this.load.image("asteroideGrande", "/assets/asteroides/asteroideGrande.png")
        this.load.image('background', 'assets/background/background.png');
        this.load.image('nave', 'assets/nave/naveJugador.png');
        this.load.image('disparo', 'assets/municion/disparos.png');
    }

    create(){
        // Posicion del background
        this.add.image(400, 300, 'background').setScale(2.5);

        // Posicion de la nave
        this.nave = this.physics.add.image(400, 500, 'nave');
        this.nave.setCollideWorldBounds(true);

        // Obtiene los movimientos del teclado
        this.cursors = this.input.keyboard.createCursorKeys();

        // Agrega fisicas a los asteroides
        this.asteroides = this.physics.add.group();

        // Genera los asteroides
        this.time.addEvent({
            delay: 1500,
            callback: this.crearAsteroide,
            callbackScope: this,
            loop: true
        });
    }

    update(){

        // Movimiento horizontal
        if (this.cursors.left.isDown) {
            this.nave.setVelocityX(-200); 
        } else if (this.cursors.right.isDown) {
            this.nave.setVelocityX(200); 
        } else {
            this.nave.setVelocityX(0);
        }
    
        // Movimiento vertical
        if (this.cursors.up.isDown) {
            this.nave.setVelocityY(-200); 
        } else if (this.cursors.down.isDown) {
            this.nave.setVelocityY(200);
        } else {
            this.nave.setVelocityY(0);
        }
    }

    // Crea los asteroides en un rango y velocidad aleatorias
    crearAsteroide() {
        let x = Phaser.Math.Between(50, 750);
        let asteroide = this.asteroides.create(x, 0, "asteroideGrande").setScale(2);
        asteroide.setVelocityY(Phaser.Math.Between(100, 200));
        asteroide.setCollideWorldBounds(false);
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