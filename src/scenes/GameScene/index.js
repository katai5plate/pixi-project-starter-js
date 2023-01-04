import IMAGE_BALL from "../../../img/ball.png";
import Scene from "../../components/Scene";
import { Text } from "../../graphics/Text";
import { db } from "../../database";
import { Ball } from "./Ball";

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
    this.ball = new Ball(this);
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
