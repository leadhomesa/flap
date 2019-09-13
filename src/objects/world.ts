import Phaser from "phaser";
import Colors from "../colors";

class World extends Phaser.GameObjects.Rectangle {
  private _currentScene: Phaser.Scene

  constructor(scene: Phaser.Scene) {
    const minWidth = 1280;
    const width = window.innerWidth * 2;
    const mapWidth = width < minWidth ? minWidth : width;
    const height = window.innerHeight * 0.15;
    
    super(scene, 0, window.innerHeight, mapWidth, height, Colors.white);
    
    this.setOrigin(0, 1);
    this._currentScene = scene;
    this._currentScene.add.existing(this);
    this.setupPhysics();
  }

  private setupPhysics():void {
    if (this._currentScene) {
      this._currentScene.physics.world.enable(this);
      (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
      (this.body as Phaser.Physics.Arcade.Body).setImmovable(true);
    }
  }

  update(): void {}
}

export default World;