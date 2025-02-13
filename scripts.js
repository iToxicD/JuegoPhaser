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
            delay: 1000, 
            callback: this.crearAsteroide,
            callbackScope: this,
            loop: true
        });

        // Disparos
        this.disparos = this.physics.add.group();
        // Colision de los disparos con los asteroides
        this.physics.add.overlap(this.disparos, this.asteroides, this.destruirAsteroide, null, this);

        // Colision de asteroide y la nave
        this.physics.add.overlap(this.nave, this.asteroides, this.gameOver, null, this);

        // Sumar puntos por asteroide destruido
        this.score = 0;
        this.scoreText = this.add.text(10, 10, "Puntuación: 0", { fontSize: "20px", fill: "#fff" });

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.reinicioKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.gameOver = false;
    }

    update(){
        if (this.gameOver) {
            if (Phaser.Input.Keyboard.JustDown(this.reinicioKey)) {
                this.scene.restart();
            }
            return;
        }

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

        // Disparar cuando se presiona la tecla espacio
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.disparar();
        }
    }

    // Crea los asteroides en un rango y velocidad aleatorias
    crearAsteroide() {
        let x = Phaser.Math.Between(50, 750);
        let asteroide = this.asteroides.create(x, 0, "asteroideGrande").setScale(2);
        asteroide.setVelocityY(Phaser.Math.Between(100, 200));
        asteroide.setCollideWorldBounds(false);
    }

    disparar() {
        let disparo = this.disparos.create(this.nave.x, this.nave.y - 20, "disparo");
        disparo.setVelocityY(-300); // Velocidad del disparo hacia arriba
    }

    destruirAsteroide(disparo, asteroide) {
        disparo.destroy();  // Elimina el disparo
        asteroide.destroy(); // Elimina el asteroide
    
        // Aumenta la puntuación
        this.score += 10;
        this.scoreText.setText("Puntuación: " + this.score);
    }

    // Detiene el juego, las fisicas y pone la nave en rojo cuando ha colisionado con un asteroide
    gameOver() {
        this.gameOver = true;
        this.physics.pause();
        this.nave.setTint(0xff0000);
        this.add.text(300, 250, "Eliminado", { fontSize: "40px", fill: "#ff0000" });
        this.add.text(220, 300, "Presiona ENTER para reiniciar", { fontSize: "20px", fill: "#ffffff" });
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
