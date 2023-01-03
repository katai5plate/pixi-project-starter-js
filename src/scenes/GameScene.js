import * as PIXI from "pixi.js";
import Scene from "../components/Scene";
import { db } from "../database";
import { EndScene } from "./EndScene";
import IMAGE_BALL from "../../img/ball.png";
import { Text } from "../components/Text";
import { Rigidbody } from "../components/Rigidbody";
import { Vector2 } from "../components/Vector2";

export class GameScene extends Scene {
  /**
   * ボール
   * @type {Rigidbody}
   */
  ball;
  /**
   * スコアボード
   * @type {Text}
   */
  scoreboard;

  constructor() {
    super();
  }
  async start() {
    // スコアを初期化する
    db.score = 0;
    // ボール画像を表示するスプライトをゲームオブジェクト化
    this.ball = Rigidbody.fromTexture(
      // await でテクスチャのプリロードを行う
      await PIXI.Texture.fromLoader(IMAGE_BALL)
    );
    this.ball.position = new Vector2(200, 500);
    this.ball.velocity = new Vector2(5, 0);
    // クリック時に発動する関数
    this.ball.on("pointerdown", () => {
      db.score++; // スコアを１増やす
      this.ball.velocity = this.ball.velocity.set(null, -8); // ボールのＹ速度を-8にする(上に飛ぶようにしている)
    });
    // 物理エンジン実行中に毎フレーム発動する関数
    this.ball.onUpdatePhysics(() => {
      // ボールの右端が画面右端を超えた場合
      if (this.ball.rect.right > db.app.screen.right) {
        // x の値を「画面右端 - ボールの幅」にする(次のフレームで反射処理させないために必要)
        this.ball.position = this.ball.position.set(
          db.app.screen.right - this.ball.rect.width,
          null
        );
        // 速度を反転して反射の挙動にする
        this.ball.velocity = this.ball.velocity.flipX();
      }
      // ボールの左端が画面左端に満たなくなった場合
      if (this.ball.rect.left < db.app.screen.left) {
        // x の値を画面左端にする(次のフレームで反射処理させないために必要)
        this.ball.position = this.ball.position.set(db.app.screen.left, null);
        // 速度を反転して反射の挙動にする
        this.ball.velocity = this.ball.velocity.flipX();
      }
      // 球が画面下に消えたら
      if (this.ball.position.y >= db.app.screen.bottom) {
        new EndScene(); // 結果画面に遷移する
      }
    });
    this.instantiate(this.ball); // ボールをシーンに追加

    // スコア表示テキスト
    this.scoreboard = new Text("SCORE:0", 20, 0xffffff, true);
    this.instantiate(this.scoreboard); // スコア表示テキストを画面に追加する
  }
  update() {
    // 毎フレームごとに処理するゲームループ
    // スコアテキストを毎フレームアップデートする
    this.scoreboard.text = `SCORE:${db.score}`;

    if (db.score === 0) return; // スコアが０の時(球に触っていないとき)はここで終了させる

    // ボールの物理挙動を毎フレームアップデートする
    this.ball.updatePhysics();
  }
}
