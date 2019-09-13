import Phaser from 'phaser';

interface PlayerOptions {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
  done?: boolean;
}

const STILL_FRAME = 3;

class Player extends Phaser.GameObjects.Sprite {
  // variables
  private _currentScene: Phaser.Scene;
  private _tapAcceleration = 50;
  private _done = false;

  constructor({ scene, x, y, key, done }: PlayerOptions) {
    super(scene, x, y, key, STILL_FRAME);

    this._currentScene = scene;
    this._done = done || false;
    this.initSprite();
    this._currentScene.add.existing(this);
  }

  private initSprite() {
    // sprite
    this.setOrigin(0, 1);

    // physics
    this._currentScene.physics.world.enable(this);
    (this.body as Phaser.Physics.Arcade.Body).maxVelocity.x = 500;
  }

  update(): void {
    if (!this._done) {
      (this.body as Phaser.Physics.Arcade.Body).setVelocityX(
        this._tapAcceleration
      );
      (this.body as Phaser.Physics.Arcade.Body).setAccelerationX(
        this._tapAcceleration
      );
    }
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
        this.anims.play('leadhomie-run', true);
      }
    } else {
      if (!this._done) {
        this.anims.stop();
        this.setFrame(STILL_FRAME);
      } else {
        this.anims.play('leadhomie-won', true);
      }
    }
  }
}

export default Player;
