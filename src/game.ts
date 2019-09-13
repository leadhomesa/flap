import Phaser from "phaser";

// scenes
import BootScene from "./scenes/boot";
import GameScene from "./scenes/game";

const config: Phaser.Types.Core.GameConfig = {
  title: "Leadhome racing boi",
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: [BootScene, GameScene]
};

class Game extends Phaser.Game {
  constructor() {
    super(config);
  }
}

export default Game;
