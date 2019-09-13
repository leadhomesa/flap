import Phaser from 'phaser';

export interface SignOptions {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
  acceleration: number;
  maxVelocity: number;
  won?: boolean;
}

const STILL_FRAME = 3;

class Sign extends Phaser.GameObjects.Sprite {
  // variables
  private _currentScene: Phaser.Scene;
  private _maxVelocity: number;
  private _key: string;

  won: boolean;
  acceleration: number;

  constructor({
    scene,
    x,
    y,
    key,
    acceleration,
    maxVelocity,
    won
  }: SignOptions) {
    super(scene, x, y, key, STILL_FRAME);

    this.acceleration = acceleration;

    this.won = won || false;
    this._maxVelocity = maxVelocity;
    this._key = key;
    this._currentScene = scene;
    this.initSprite();
    this._currentScene.add.existing(this);
  }

  update(): void {
    if (!this.won) {
      this.move();
    }
    this.animate();
  }

  private initSprite() {
    // sprite
    this.setOrigin(0, 1);

    // physics
    this._currentScene.physics.world.enable(this);
    (this.body as Phaser.Physics.Arcade.Body).maxVelocity.x = this._maxVelocity;
  }

  private move(): void {
    if (this.acceleration) {
      (this.body as Phaser.Physics.Arcade.Body).setVelocityX(this.acceleration);
      (this.body as Phaser.Physics.Arcade.Body).setAccelerationX(
        this.acceleration
      );
    }
  }

  private animate(): void {
    const physicsBody = this.body as Phaser.Physics.Arcade.Body;
    if (physicsBody.velocity.x !== 0) {
      // sign is running
      if (physicsBody.velocity.x > 0) {
        this.anims.play(`${this._key}-run`, true);
      }
    } else {
      // sign is standing still
      if (!this.won) {
        this.anims.stop();
        this.setFrame(STILL_FRAME);
      } else {
        this.anims.play(`${this._key}-won`, true);
      }
    }
  }
}

export default Sign;
