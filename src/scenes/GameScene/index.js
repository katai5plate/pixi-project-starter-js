import IMAGE_BALL from "../../../img/ball.png";
import Scene from "../../components/Scene";
import { Text } from "../../graphics/Text";
import { db, engine } from "../../database";
import { Ball } from "./Ball";
import { Vector2 } from "../../components/Vector2";

/** ゲーム中のシーン */
export class GameScene extends Scene {
  /**
   * ボール
   * @type {Ball}
   */
  ball;
  /**
   * スコアボード
   * @type {Text}
   */
  scoreboard;

  constructor() {
    super([
      // プリロードするテクスチャ
      IMAGE_BALL,
    ]);
  }
  async start() {
    // スコアを初期化する
    db.score = 0;

    // ボール
    this.ball = new Ball(
      this,
      engine.screen.grid(
        // 画面幅の 4 分の 1 の X 座標に位置設定
        1 / 2,
        // 画面高さの 6 分の 5 の Y 座標に位置設定
        5 / 6
      ),
      // 速度
      new Vector2(5, 0)
    );
    this.instantiate(this.ball); // ボールをシーンに追加

    // スコア表示テキスト
    this.scoreboard = new Text("SCORE:0", 20, 0xffffff, true);
    this.instantiate(this.scoreboard); // スコア表示テキストを画面に追加する
  }
  // 毎フレームごとに処理するゲームループ
  update() {
    // スコアテキストを毎フレームアップデートする
    this.scoreboard.text = `SCORE:${db.score}`;

    if (db.score === 0) return; // スコアが０の時(球に触っていないとき)はここで終了させる

    // ボールの挙動を毎フレームアップデートする
    this.ball.update();
  }
}
