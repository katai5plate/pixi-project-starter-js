import IMAGE_BALL from "../../../img/ball.png";
import Scene from "../../components/Scene";
import { Vector2 } from "../../components/Vector2";
import { db, engine } from "../../database";
import { Scoreboard } from "../../ui/molecules/Scoreboard";
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
   * @type {Scoreboard}
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
    this.ball = new Ball({
      scene: this,
      position: engine.screen.grid(
        // 画面幅の 4 分の 1 の X 座標に位置設定
        1 / 2,
        // 画面高さの 6 分の 5 の Y 座標に位置設定
        5 / 6
      ),
      // 速度
      velocity: new Vector2(5, 0),
    });
    this.instantiate(this.ball); // ボールをシーンに追加

    // スコア表示テキスト
    this.scoreboard = new Scoreboard({
      text: "SCORE: 0",
      color: 0xffffff,
      position: new Vector2(0, 0),
    });
    this.instantiate(this.scoreboard); // スコア表示テキストを画面に追加する
  }
  // 毎フレームごとに処理するゲームループ
  update() {
    // スコアテキストを毎フレームアップデートする
    this.scoreboard.text = `SCORE: ${db.score}`;

    if (db.score === 0) return; // スコアが０の時(球に触っていないとき)はここで終了させる

    // ボールの挙動を毎フレームアップデートする
    this.ball.update();
  }
}
