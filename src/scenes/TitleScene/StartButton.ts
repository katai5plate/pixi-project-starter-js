import { Button } from "../../components/Button";
import { Vector2 } from "../../components/Vector2";
import { GameScene } from "../GameScene";

/** スタートボタン */
export class StartButton extends Button {
  constructor({ position }: { position: Vector2 }) {
    super("スタート", 200, 60, 0x00aa00, () => {
      new GameScene();
    });
    // 原点を中心にする
    this.setOrigin("CENTER");
    // ボタンの座標指定
    this.setPosition(position);
  }
}
