import * as PIXI from "pixi.js";
import { db } from "../database";
import { Rigidbody } from "./Rigidbody";

export default class Scene {
  // ゲーム用のシーンを生成
  scene = new PIXI.Container();

  constructor() {
    // 毎フレームイベントを削除
    db.app.clearGameLoops();
    // ゲームシーンを画面に設定
    db.app.setScene(this.scene);
    // 初期処理を実行
    this.init();
  }
  async init() {
    // start関数を実行
    await this.start();
    // update関数を毎フレーム実行にする
    db.app.addGameLoop(() => this.update());
  }
  /**
   * シーンにオブジェクトを描画
   * @param {Rigidbody | PIXI.DisplayObject} obj
   */
  instantiate(obj) {
    if (obj instanceof Rigidbody) {
      this.scene.addChild(obj.sprite);
    } else {
      this.scene.addChild(obj);
    }
  }
  async start() {}
  update() {}
}
