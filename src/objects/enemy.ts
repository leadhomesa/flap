import Phaser from 'phaser';

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
  private _maxVelocity: number;
  private _key: string;

  constructor({ scene, x, y, key }: PlayerOptions) {
    super(scene, x, y, key, STILL_FRAME);

    const speedVariant = Math.random() * 50;
    this._maxVelocity = 375 - speedVariant;
    this._key = key;
    this._currentScene = scene;
    this.initSprite();
    this._currentScene.add.existing(this);
  }

  private initSprite() {
    // sprite
    this.setOrigin(0, 1);
    // this.setScale(0.75, 0.75);

    // physics
    this._currentScene.physics.world.enable(this);
    (this.body as Phaser.Physics.Arcade.Body).maxVelocity.x = this._maxVelocity;
    setTimeout(() => {
      this.move();
    }, 500);
  }

  update(): void {
    this.handleAnimations();
  }

  private move(): void {
    (this.body as Phaser.Physics.Arcade.Body).setVelocityX(this._acceleration);
    (this.body as Phaser.Physics.Arcade.Body).setAccelerationX(
      this._acceleration
    );
  }

  private handleAnimations(): void {
    const physicsBody = this.body as Phaser.Physics.Arcade.Body;
    if (physicsBody.velocity.x !== 0) {
      // player is running

      if (physicsBody.velocity.x > 0) {
        this.anims.play(`${this._key}-run`, true);
      }
    } else {
      // mario is standing still
      this.anims.stop();
      this.setFrame(STILL_FRAME);
    }
  }
}

export default Player;
