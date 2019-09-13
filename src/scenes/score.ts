import Phaser from "phaser";

// objects
import World from "../objects/world";
import Player from "../objects/player";
import Podium from "../objects/podium";

class ScoreScene extends Phaser.Scene {
  private _world: World | undefined;
  private _player: Player | undefined;
  private _podium: Podium | undefined;

  constructor() {
    super({ key: "ScoreScene" });
  }

  init(): void {}

  preload(): void {
    const banner = document.getElementById("bannerText");
    if (banner) {
      banner.innerText = "You won!";
    }
  }

  private createBackground(): void {
    const background = this.add.image(0, window.innerHeight, "background");
    background.setOrigin(0, 1);
    background.displayHeight = window.innerHeight;
    background.displayWidth = window.innerWidth;
  }

  create(): void {
    // background
    this.createBackground();

    // world
    this._world = new World(this);

    // podium
    this._podium = new Podium({ scene: this, y: window.innerHeight - this._world.height })

    // player
    const playerX = (window.innerWidth / 2) - 128;
    const playerY = window.innerHeight / 2;
    this._player = new Player({
      scene: this,
      x: playerX,
      y: playerY,
      key: "leadhomie",
      done: true
    });
    this.physics.add.collider(this._player, this._podium);

    this.cameras.main.setBounds(0, 0, this._world.width, window.innerHeight);
  }

  update(): void {
    if (this._player) {
      this._player.update();
    }
  }
}

export default ScoreScene;
