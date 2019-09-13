import Sign from './sign';

interface EnemyOptions {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
}

class Enemy extends Sign {
  constructor({ scene, x, y, key }: EnemyOptions) {
    const speedVariant = Math.random() * 50;
    super({
      scene,
      x,
      y,
      key,
      acceleration: 0,
      maxVelocity: 375 - speedVariant
    });

    setTimeout(() => {
      this.acceleration = 500;
    }, 500);
  }
}

export default Enemy;
