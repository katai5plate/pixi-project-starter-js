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
      new Vector2(
        // xのアンカーが0.5で中央指定なので、テキストのx値を画面中央にすると真ん中にテキストが表示される
        engine.screen.width / 2,
        // yのアンカーはデフォルトの0なので、画面上から200の位置にテキスト表示
        200
      )
    );
    this.instantiate(this.message); // 結果画面シーンにテキスト追加

    /**
     * 自作のボタン生成関数を使って、ボタンを生成
     */
    this.startButton = new Button("スタート", 200, 60, 0x00aa00, () => {
      new GameScene();
    });
    this.startButton.setPhysics({
      position: new Vector2(engine.screen.width / 2, 500),
    });
    this.startButton.setOrigin("CENTER");
    this.instantiate(this.startButton); // ボタンをシーンに追加
  }
}
