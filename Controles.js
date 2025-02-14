class Controles extends Phaser.Scene{
    constructor(){
        super({key: "Controles"});
    }

    preload(){
        this.load.image("background", "assets/background/background.png");
        this.load.image("botonVolver", "assets/ui/volver.png");
        this.load.image("flechas", "assets/ui/flechasTeclado.png");
        this.load.image("espacio", "assets/ui/teclaEspacio.png");
    }

    create(){
        this.add.image(400, 300, "background").setScale(2.5);
        let botonVolver = this.add.image(400, 450, "botonVolver").setScale(1.5).setInteractive();
        let teclaFlechas = this.add.image(500, 250, "flechas").setScale(2.5);
        let espacio = this.add.image(500, 325, "espacio").setScale(2.5).setInteractive();
        this.add.text(150, 250, "Control de la nave", { fontSize: "20px", fill: "#ffffff" });
        this.add.text(225, 325, "Disparar", { fontSize: "20px", fill: "#ffffff" });

        botonVolver.on("pointerdown", () => {
            this.scene.start("MenuPrincipal");
        });
    }   

    update(){

    }
}