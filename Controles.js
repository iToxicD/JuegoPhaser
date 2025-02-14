class Controles extends Phaser.Scene{
    constructor(){
        super({key: "Controles"});
    }

    preload(){
        this.load.image("background", "assets/background/background.png");
        this.load.image("botonVolver", "assets/ui/botonStart.png")
    }

    create(){
        this.add.image(400, 300, "background").setScale(2.5);
        let botonVolver = this.add.image(400, 450, "botonVolver").setScale(1.5).setInteractive();

        botonVolver.on("pointerdown", () => {
            this.scene.start("MenuPrincipal");
        });
    }   

    update(){

    }
}