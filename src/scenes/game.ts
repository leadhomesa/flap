import Phaser from "phaser";

// objects
import World from "../objects/world";
import Player from "../objects/player";

class GameScene extends Phaser.Scene {
  private _world: World | undefined;
  private _player: Player | undefined;

  constructor() {
    super({ key: "GameScene" });
  }

  init(): void {}

  private createBackground(x?: number): void {
    const background = this.add.image(x || 0, window.innerHeight, "background");
    background.setOrigin(0, 1);
    background.displayHeight = window.innerHeight;
    background.displayWidth = window.innerWidth;
  }

  create(): void {
    // background
    this.createBackground();
    this.createBackground(window.innerWidth);
    // world
    this._world = new World(this);

    // player
    this._player = new Player({
      scene: this,
      x: 0,
      y: window.innerHeight - this._world.height,
      key: "leadhomie"
    });

    // colliders
    this.physics.add.collider(this._player, this._world);

    // camera
    if (this._player) {
      this.cameras.main.startFollow(this._player);
    }

    this.cameras.main.setBounds(0, 0, this._world.width, window.innerHeight);
  }

  update(): void {
    if (this._player) {
      this._player.update();
    }

    if (this._world) {
      this._world.update();
    }
  }
}

export default GameScene;
