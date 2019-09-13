import Phaser from "phaser";

// scenes
import BootScene from "./scenes/boot";
import GameScene from "./scenes/game";
import ScoreScene from "./scenes/score";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: [BootScene, GameScene, ScoreScene]
};

class Game extends Phaser.Game {
  constructor() {
    super(config);
  }
}

export default Game;
