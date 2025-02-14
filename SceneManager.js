const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'container',
    physics: { default: 'arcade', arcade: { debug: false } },
    scene: [MenuPrincipal, SpaceCombat, Controles]
};

const game = new Phaser.Game(config);
