import * as PIXI from "pixi.js";
import IMAGE_BALL from "../../img/ball.png";
import { GameObject } from "../components/GameObject";
import Scene from "../components/Scene";
import { Text } from "../components/Text";
import { Vector2 } from "../components/Vector2";
import { db } from "../database";
import { ColliderManager } from "../managers/ColliderManager";
import { EndScene } from "./EndScene";

export class GameScene extends Scene {
  /**
   * ボール
   * @type {GameObject}
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
    this.ball = new GameObject(
      new PIXI.Sprite(
        await PIXI.Texture.fromLoader(IMAGE_BALL) // await でテクスチャのプリロードを行う
      ),
      true,
      "pointer"
    );
    this.ball.setPhysics({
      position: () => new Vector2(200, 500),
      velocity: () => new Vector2(5, 0),
      // 物理エンジン実行中に毎フレーム発動する関数
      onUpdate: () => {
        const { screen } = db.app;
        const { position, rect } = this.ball;
        // ボールの右端が画面右端を超えた場合
        if (rect.right > screen.right) {
          this.ball.setPhysics({
            // x の値を「画面右端 - ボールの幅」にする(次のフレームで反射処理させないために必要)
            position: (prev) => ({
              x: screen.right - rect.width,
              y: prev.y,
            }),
            // 速度を反転して反射の挙動にする
            velocity: (prev) => prev.flipX(),
          });
        }
        // ボールの左端が画面左端に満たなくなった場合
        if (rect.left < screen.left) {
          this.ball.setPhysics({
            // x の値を画面左端にする(次のフレームで反射処理させないために必要)
            position: (prev) => ({ x: screen.left, y: prev.y }),
            // 速度を反転して反射の挙動にする
            velocity: (prev) => prev.flipX(),
          });
        }
        // 球が画面下に消えたら
        if (position.y >= screen.bottom) {
          new EndScene(); // 結果画面に遷移する
        }
      },
    });
    // マウスの当たり判定を円形にする
    this.ball.setColliderArea(
      ColliderManager.boxToCircle(0, 0, this.ball.rect.width)
    );
    // クリック時に発動する関数
    this.ball.sprite.on("pointerdown", () => {
      db.score++; // スコアを１増やす
      this.ball.setPhysics({
        // ボールのＹ速度を-8にする(上に飛ぶようにしている)
        velocity: (prev) => ({ x: prev.x, y: -8 }),
      });
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

    // ボールの挙動を毎フレームアップデートする
    this.ball.update();
  }
}
