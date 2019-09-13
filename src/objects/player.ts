import Sign from './sign';

interface PlayerOptions {
  scene: Phaser.Scene;
  x: number;
  y: number;
  key: string;
  done?: boolean;
}

class Player extends Sign {
  constructor({ scene, x, y, key, done }: PlayerOptions) {
    super({
      scene,
      x,
      y,
      key,
      acceleration: 50,
      maxVelocity: 500,
      won: done || false
    });
  }

  speedUp(): void {
    if (this.acceleration < 500) {
      this.acceleration += 50;
    }
  }
}

export default Player;
