import Phaser from "phaser";
import Colors from "../colors";

interface PodiumOptions {
  scene: Phaser.Scene;
  y: number;
}

const MAX_WIDTH = 1024;

class Podium extends Phaser.GameObjects.Rectangle {
  private _currentScene: Phaser.Scene;

  constructor({ scene, y }: PodiumOptions) {
    const width =
      window.innerWidth >= MAX_WIDTH ? MAX_WIDTH : window.innerWidth;
    const height = Math.floor(width * 0.27) - 28;
    super(scene, 0, y, width, height, Colors.storm, Colors.white);

    this.setOrigin(0, 1);
    this._currentScene = scene;
    this._currentScene.add.existing(this);
    this.createImage();
    this.setupPhysics();
  }

  private createImage(): void {
    const width =
      window.innerWidth >= MAX_WIDTH ? MAX_WIDTH : window.innerWidth;
    const height = Math.floor(width * 0.27);
    const x = width === window.innerWidth ? 0 : (width / 4);

    if (this._currentScene) {
      const podium = this._currentScene.add.image(x, this.y, "podium");      
      podium.setOrigin(0, 1);
      podium.displayHeight = height;
      podium.displayWidth = width;
    }
  }

  private setupPhysics(): void {
    if (this._currentScene) {
      this._currentScene.physics.world.enable(this);
      (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
      (this.body as Phaser.Physics.Arcade.Body).setImmovable(true);
    }
  }

  update(): void {}
}

export default Podium;
