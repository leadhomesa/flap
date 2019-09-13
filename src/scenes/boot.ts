import Phaser from "phaser";

import AnimationHelper from '../helpers/animation-helper';
import Colors from "../colors";

class BootScene extends Phaser.Scene {
  private _loadingBar: Phaser.GameObjects.Graphics | undefined;
  private _progressBar: Phaser.GameObjects.Graphics | undefined;

  constructor() {
    super({ key: "BootScene" });
  }

  private createLoadingGraphics(): void {
    this._loadingBar = this.add.graphics();
    this._progressBar = this.add.graphics();

    this._loadingBar.fillStyle(Colors.storm, 1);
    this._loadingBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20
    );
  }

  preload(): void {
    this.cameras.main.setBackgroundColor(Colors.storm);
    this.createLoadingGraphics();

    // pass value to change the loading bar fill
    this.load.on(
      "progress",
      (value: number) => {
        if (this._progressBar) {
          this._progressBar.clear();
          this._progressBar.fillStyle(Colors.coral, 1);
          this._progressBar.fillRect(
            this.cameras.main.width / 4,
            this.cameras.main.height / 2 - 16,
            (this.cameras.main.width / 2) * value,
            16
          );
        }
      },
      this
    );

    // delete bar graphics, when loading complete
    this.load.on(
      "complete",
      () => {
        const helper = new AnimationHelper(this, this.cache.json.get('animationJson'));
        if (this._progressBar && this._loadingBar) {
          this._progressBar.destroy();
          this._loadingBar.destroy();
        }
      },
      this
    );

    // load our package
    this.load.pack("assets", "/assets/pack.json");
  }

  update(): void {
    this.scene.start("GameScene");
  }
}

export default BootScene;
