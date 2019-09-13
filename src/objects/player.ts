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
  private _tapAcceleration = 50;
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
    (this.body as Phaser.Physics.Arcade.Body).maxVelocity.x = 500;
  }

  private addKey(key: string): Phaser.Input.Keyboard.Key {
    return this._currentScene.input.keyboard.addKey(key);
  }

  update(): void {
    (this.body as Phaser.Physics.Arcade.Body).setVelocityX(
      this._tapAcceleration
    );
    (this.body as Phaser.Physics.Arcade.Body).setAccelerationX(
      this._tapAcceleration
    );
    this.handleAnimations();
  }

  speedUp(): void {
    if (this._tapAcceleration < 500) {
      this._tapAcceleration += 50;
    }
  }

  private handleAnimations(): void {
    const physicsBody = this.body as Phaser.Physics.Arcade.Body;
    if (physicsBody.velocity.x !== 0) {
      // player is running

      if (physicsBody.velocity.x > 0) {
        this.anims.play("leadhomie-run", true);
      }
    } else {
      // mario is standing still
      this.anims.stop();
      this.setFrame(STILL_FRAME);
    }
  }
}

export default Player;
