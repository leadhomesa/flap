import Phaser from "phaser";

interface PlayerOptions {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
}

const STILL_FRAME = 3;

class Player extends Phaser.GameObjects.Sprite {
  // variables
  private _currentScene: Phaser.Scene;
  private _acceleration = 500;
  private _runKey: Phaser.Input.Keyboard.Key;

  constructor({ scene, x, y, key }: PlayerOptions) {
    super(scene, x, y, key, STILL_FRAME);

    this._currentScene = scene;
    this._runKey = this.addKey("SPACE");
    this.initSprite();
    this._currentScene.add.existing(this);
  }

  private initSprite() {
    // sprite
    this.setOrigin(0, 1);
    // this.setScale(0.75, 0.75);

    // physics
    this._currentScene.physics.world.enable(this);
    (this.body as Phaser.Physics.Arcade.Body).maxVelocity.x = 250;
  }

  private addKey(key: string): Phaser.Input.Keyboard.Key {
    return this._currentScene.input.keyboard.addKey(key);
  }

  update(): void {
    this.handleInput();
    this.handleAnimations();
  }

  private handleInput() {
    if (this._runKey && this._runKey.isDown) {
      (this.body as Phaser.Physics.Arcade.Body).setAccelerationX(
        this._acceleration
      );
    } else {
      (this.body as Phaser.Physics.Arcade.Body).setVelocityX(0);
      (this.body as Phaser.Physics.Arcade.Body).setAccelerationX(0);
    }
  }

  private handleAnimations(): void {
    const physicsBody = this.body as Phaser.Physics.Arcade.Body;
    if (physicsBody.velocity.x !== 0) {
      // player is running

      if (physicsBody.velocity.x > 0) {
        this.anims.play("PlayerRun", true);
      }
    } else {
      // mario is standing still
      this.anims.stop();
      this.setFrame(STILL_FRAME);
    }
  }
}

export default Player;
