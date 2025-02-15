class MenuPrincipal extends Phaser.Scene{
    constructor(){
        super({key: "MenuPrincipal"});
    }

    preload(){
        this.load.image("background", "assets/background/background.png");
        this.load.image("botonStart", "assets/ui/botonStart.png")
        this.load.image("botonControles", "assets/ui/botonControles.png")

        this.load.audio("musica", "assets/audio/musica.mp3");
    }

    create(){
        this.add.image(400, 300, "background").setScale(2.5);
        this.add.text(240, 300, "SpaceCombat", { fontSize: "50px", fill: "#ffffff"});
        let botonStart = this.add.image(400, 400, "botonStart").setScale(1.5).setInteractive();
        let botonControles = this.add.image(400, 450, "botonControles").setScale(1.5).setInteractive();

        this.musica = this.sound.add("musica", {loop:true, volume: 0.2});
        this.musica.play();
        botonStart.on("pointerdown", () => {
            this.scene.start("SpaceCombat");
        });

        botonControles.on("pointerdown", () => {
            this.scene.start("Controles");
        });
    }

    update(){

    }
}
