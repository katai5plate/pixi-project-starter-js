import * as PIXI from "pixi.js";
import IMAGE_BALL from "../../../img/ball.png";
import { GameObject } from "../../components/GameObject";
import Scene from "../../components/Scene";
import { Vector2 } from "../../components/Vector2";
import { db } from "../../database";
import { ColliderManager } from "../../managers/ColliderManager";
import { EndScene } from "../EndScene";

/** ボール画像を表示するスプライトで作ったゲームオブジェクト */
export class Ball extends GameObject {
  /** @param {Scene} scene */
  constructor(scene) {
    super(new PIXI.Sprite(scene.getTexture(IMAGE_BALL)));
    // ボールの物理挙動を設定する
    this.setPhysics({
      position: new Vector2(200, 500),
      velocity: new Vector2(5, 0),
      // 物理エンジン実行中に毎フレーム発動する関数
      onUpdate: () => {
        const { screen } = db;
        const { position, rect } = this;
        // ボールの右端が画面右端を超えた場合
        if (rect.right > screen.right) {
          this.setPhysics({
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
          this.setPhysics({
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
    // 当たり判定を円形にする
    this.setColliderArea(ColliderManager.boxToCircle(0, 0, this.rect.width));
    // マウスでクリックできるようにする
    this.setButtonMode(true, "pointer");
    // クリック時に発動する関数
    this.on("pointerdown", () => {
      db.score++; // スコアを１増やす
      this.setPhysics({
        // ボールのＹ速度を-8にする(上に飛ぶようにしている)
        velocity: (prev) => ({ x: prev.x, y: -8 }),
      });
    });
  }
}
