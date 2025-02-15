class SpaceCombat extends Phaser.Scene{
    constructor(){
        super({key: "SpaceCombat"});
    }

    preload(){
        // Imagenes
        this.load.image("asteroideGrande", "/assets/asteroides/asteroideGrande.png")
        this.load.image("asteroideSmall", "/assets/asteroides/asteroide.png")
        this.load.image("background", "assets/background/background.png");
        this.load.image("nave", "assets/nave/naveJugador.png");
        this.load.image("disparo", "assets/municion/disparos.png");
        this.load.image("naveEnemiga", "assets/nave/naveEnemiga.png");
        this.load.image("score", "assets/ui/uiScore.png");
        this.load.image("reloj", "assets/ui/uiReloj.png");

        // Audio
        this.load.audio("disparoAudio", "/assets/audio/disparo.mp3")
    }

    create(){
        // Posicion del de las imagenes
        this.add.image(400, 300, 'background').setScale(2.5);
        this.add.image(80, 50, 'score').setScale(2);
        this.add.image(675, 40, 'reloj').setScale(2);

        // Posicion de la nave
        this.nave = this.physics.add.image(400, 500, 'nave');
        this.nave.setCollideWorldBounds(true);

        // Obtiene los movimientos del teclado
        this.cursors = this.input.keyboard.createCursorKeys();

        // Agrega fisicas a los asteroides
        this.asteroides = this.physics.add.group();

        // Genera los asteroides
        this.generarAsteroides = this.time.addEvent({
            delay: 1000, 
            callback: this.crearAsteroide,
            callbackScope: this,
            loop: true
        });

        // Fisicas a los enemigos
        this.enemigos = this.physics.add.group();

        // Genera los enemigos
        this.generarEnemigos = this.time.addEvent({
            delay: 3000,
            callback: this.crearEnemigo,
            callbackScope: this,
            loop: true
        })

        // Disparos
        this.disparos = this.physics.add.group();

        // Audio disparo
        this.disparoAudio = this.sound.add("disparoAudio");

        // Colision de los disparos con los asteroides y de los asteroides con la nave
        this.physics.add.overlap(this.disparos, this.asteroides, this.destruirAsteroide, null, this);
        this.physics.add.overlap(this.nave, this.asteroides, this.gameOver, null, this);

        // Colision de las naves enemigad con la nave y los disparos con los enemigos
        this.physics.add.overlap(this.nave, this.enemigos, this.gameOver,null, this);
        this.physics.add.overlap(this.disparos, this.enemigos, this.destruirEnemigo,null, this);

        // Sumar puntos por asteroide destruido
        this.score = 0;
        this.scoreText = this.add.text(70, 30, "0", { fontSize: "20px", fill: "#ffffff" }).setDepth(1);

        // Teclas para disparar y reiniciar el juego
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.reinicioKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.gameOver = false;

        // Temporizador
        this.temporizador = 0;
        this.tiempoJugado = this.add.text(700, 30, "0",{ fontSize: "20px", fill: "#fff" }).setDepth(1);

    }

    update(time,delta){
        // Reinicia el juego al pulsar la tecla
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

        // Temporizador
        this.temporizador += delta / 1000;
        this.tiempoJugado.setText(`${this.temporizador.toFixed(1)}s`);
    }

    // Crea los asteroides en un rango y velocidad aleatorias
    crearAsteroide() {
        let x = Phaser.Math.Between(50, 750);
        let asteroide = this.asteroides.create(x, 0, "asteroideGrande").setScale(2);
        asteroide.setVelocityY(Phaser.Math.Between(100, 200));
        asteroide.setCollideWorldBounds(false);
    }

    // Crea los enemigos
    crearEnemigo() {
        let x = Phaser.Math.Between(50, 750);
        let enemigo = this.enemigos.create(x, 0, "naveEnemiga").setScale(2);
        enemigo.setVelocityY(Phaser.Math.Between(100, 200));
    }

    // Crea el disparo del jugador
    disparar() {
        let disparo = this.disparos.create(this.nave.x, this.nave.y - 20, "disparo");
        disparo.setVelocityY(-300);
        this.disparoAudio.play();
    }

    // Destruye los dispario y asteroides cuando colisionan y suma los puntos
    destruirAsteroide(disparo, asteroide) {
        disparo.destroy();
        asteroide.destroy();

        this.score += 10;
        this.scoreText.setText("" + this.score);
    }

    // Destruye el disparo, el enemigo y suma los puntos
    destruirEnemigo(disparo, enemigo) {
        disparo.destroy();
        enemigo.destroy();

        // Aumentar la puntuación
        this.score += 20;
        this.scoreText.setText("" + this.score);
    }

    // Detiene el juego, las fisicas y pone la nave en rojo cuando ha colisionado con un asteroide
    gameOver() {
        this.gameOver = true;
        this.physics.pause();
        this.nave.setTint(0xff0000);
        this.add.text(300, 250, "Eliminado", { fontSize: "40px", fill: "#ff0000" });
        this.add.text(220, 300, `Has sobrevivido: ${this.temporizador.toFixed(1)} segundos`, { fontSize: "20px", fill: "#ffffff" });
        this.add.text(220, 325, "Presiona ENTER para reiniciar", { fontSize: "20px", fill: "#ffffff" });
        this.generarAsteroides.remove();
        this.generarEnemigos.remove();
    }
}

