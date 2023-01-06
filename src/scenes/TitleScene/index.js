import { Button } from "../../components/Button";
import Scene from "../../components/Scene";
import { Vector2 } from "../../components/Vector2";
import { db, engine } from "../../database";
import { Text } from "../../graphics/Text";
import { GameScene } from "../GameScene";

/**
 * ゲームの結果画面シーンを生成する関数
 */
export class TitleScene extends Scene {
  /** @type {Text} */
  message;
  /** @type {Button} */
  startButton;

  constructor() {
    super();
  }
  async start() {
    // テキストオブジェクトの定義
    this.message = new Text("ゲームタイトル", 32, 0xffffff); // 結果画面のテキスト
    this.message.setPosition(
      engine.screen.grid(
        // 画面幅の半分の座標（真ん中）
        1 / 2,
        // 画面高さの 3 分の 1 の座標（中央よりやや上）
        1 / 3
      )
    );
    this.instantiate(this.message); // 結果画面シーンにテキスト追加

    /**
     * 自作のボタン生成関数を使って、ボタンを生成
     */
    this.startButton = new Button("スタート", 200, 60, 0x00aa00, () => {
      new GameScene();
    });
    // 原点を中心にする
    this.startButton.setOrigin("CENTER");
    // 位置を設定
    this.startButton.setPhysics({
      position: engine.screen.grid(
        // 画面幅の半分の座標（真ん中）
        1 / 2,
        // 画面高さの 6 分の 5 の座標（下のほう）
        5 / 6
      ),
    });
    this.instantiate(this.startButton); // ボタンをシーンに追加
  }
}
