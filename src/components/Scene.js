import * as PIXI from "pixi.js";
import { db } from "../database";

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
  instantiate(obj) {
    this.scene.addChild(obj);
  }
  async start() {}
  update() {}
}
