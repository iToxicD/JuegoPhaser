class MenuPrincipal extends Phaser.Scene{
    constructor(){
        super({key: "MenuPrincipal"});
    }

    preload(){
        this.load.image("background", "assets/background/background.png");
        this.load.image("botonStart", "assets/ui/botonStart.png")

    }

    create(){
        this.add.image(400, 300, "background").setScale(2.5);
        this.add.text(240, 300, "SpaceCombat", { fontSize: "50px", fill: "#ffffff"});
        let botonStart = this.add.image(400, 400, "botonStart").setScale(1.5).setInteractive();
        
        botonStart.on("pointerdown", () => {
            this.scene.start("SpaceCombat");
            this.scene.remove("MenuPrincipal");
        });
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
    scene: MenuPrincipal, SpaceCombat
};

const game = new Phaser.Game(config);