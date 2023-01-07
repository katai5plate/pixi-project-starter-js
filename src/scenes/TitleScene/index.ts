import { Button } from "../../components/Button";
import Scene from "../../components/Scene";
import { engine } from "../../database";
import { BigLabel } from "../../ui/molecules/BigLabel";
import { GameScene } from "../GameScene";
import { StartButton } from "./StartButton";

/**
 * ゲームの結果画面シーンを生成する関数
 */
export class TitleScene extends Scene {
  message?: BigLabel;
  startButton?: Button;

  constructor() {
    super();
  }
  async start() {
    // タイトルテキスト
    const message = new BigLabel({
      text: "ゲームタイトル",
      color: 0xffffff,
      position: engine.screen.grid(
        // 画面幅の半分の X 座標（真ん中）
        1 / 2,
        // 画面高さの 3 分の 1 の Y 座標（中央よりやや上）
        1 / 3
      ),
    });
    this.instantiate(message); // 結果画面シーンにテキスト追加

    // スタートボタン
    const startButton = new StartButton({
      position: engine.screen.grid(
        // 画面幅の半分の X 座標（真ん中）
        1 / 2,
        // 画面高さの 6 分の 5 の Y 座標（下のほう）
        5 / 6
      ),
    });
    this.instantiate(startButton); // ボタンをシーンに追加
  }
}
