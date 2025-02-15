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

        // Audio
        this.load.audio("disparoAudio", "/assets/audio/disparo.mp3")
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
        this.generarAsteroides = this.time.addEvent({
            delay: 1000, 
            callback: this.crearAsteroide,
            callbackScope: this,
            loop: true
        });

        this.enemigos = this.physics.add.group();

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
        this.scoreText = this.add.text(10, 10, "0", { fontSize: "20px", fill: "#f80303" }).setDepth(1);

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.reinicioKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.gameOver = false;

        this.temporizador = 0;
        this.tiempoJugado = this.add.text(650, 10, "Tiempo: 0",{ fontSize: "20px", fill: "#fff" }).setDepth(1);

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
        this.tiempoJugado.setText(`Tiempo: ${this.temporizador.toFixed(1)}s`);
    }

    // Crea los asteroides en un rango y velocidad aleatorias
    crearAsteroide() {
        let x = Phaser.Math.Between(50, 750);
        let asteroide = this.asteroides.create(x, 0, "asteroideGrande").setScale(2);
        asteroide.setVelocityY(Phaser.Math.Between(100, 200));
        asteroide.setCollideWorldBounds(false);
    }

    crearEnemigo() {
        let x = Phaser.Math.Between(50, 750);
        let enemigo = this.enemigos.create(x, 0, "naveEnemiga").setScale(2);
        enemigo.setVelocityY(Phaser.Math.Between(100, 200));
    }

    disparar() {
        let disparo = this.disparos.create(this.nave.x, this.nave.y - 20, "disparo");
        disparo.setVelocityY(-300); // Velocidad del disparo hacia arriba
        this.disparoAudio.play();
    }

    destruirAsteroide(disparo, asteroide, enemigos) {
        disparo.destroy();  // Elimina el disparo
        asteroide.destroy(); // Elimina el asteroide
    
        // Aumenta la puntuación
        this.score += 10;
        this.scoreText.setText("" + this.score);
    }

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

