import Phaser from "phaser";

// objects
import World from "../objects/world";
import Player from "../objects/player";
import Enemy from "../objects/enemy";

class GameScene extends Phaser.Scene {
  private _world: World | undefined;
  private _player: Player | undefined;
  private _enemies: Enemy[];

  constructor() {
    super({ key: "GameScene" });

    this._enemies = [];
  }

  init(): void {}

  private createBackground(x?: number): void {
    const background = this.add.image(x || 0, window.innerHeight, "background");
    background.setOrigin(0, 1);
    background.displayHeight = window.innerHeight;
    background.displayWidth = window.innerWidth;
  }

  private createBackgrounds():void {
    const minWidth = 1280;
    const width = window.innerWidth * 2;
    const mapWidth = width < minWidth ? minWidth : width;

    const numberOfBackgrounds = mapWidth % window.innerWidth;
    for (let index = 0; index < numberOfBackgrounds; index++) {
      this.createBackground(index * window.innerWidth);      
    }
  }

  create(): void {
    // background
    this.createBackgrounds();

    // world
    this._world = new World(this);

    // create enemies
    for (let index = 0; index < 3; index++) {
      const enemy = new Enemy({
        scene: this,
        x: Math.random() * 10,
        y: window.innerHeight - this._world.height,
        key: `sign-${index + 1}`
      });
      this.physics.add.collider(enemy, this._world);
      this._enemies.push(enemy);
    }

    // player
    this._player = new Player({
      scene: this,
      x: 0,
      y: window.innerHeight - this._world.height,
      key: "leadhomie"
    });
    this.physics.add.collider(this._player, this._world);

    this.input.on('pointerdown', () => {
      if (this._player) {
        this._player.speedUp();
      }
    });

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

    this._enemies.forEach(enemy => enemy.update());

    if (this._world) {
      this._world.update();
    }
  }
}

export default GameScene;
