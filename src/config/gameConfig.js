export const gameConfig = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 400,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
}; 