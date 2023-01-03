import * as PIXI from "pixi.js";
import app from "../managers/app";
import saves from "../managers/saves";

export default class Scene {
  // ゲーム用のシーンを生成
  scene = new PIXI.Container();

  constructor() {
    // 他に表示しているシーンがあれば削除
    this.removeAllScene();
    // 毎フレームイベントを削除
    this.removeAllGameLoops();
    // ゲームシーンを画面に追加
    app.stage.addChild(this.scene);
    // 初期処理を実行
    this.init();
  }
  async init() {
    // start関数を実行
    await this.start();
    // update関数を毎フレーム実行にする
    this.addGameLoop(() => this.update());
  }
  /**
   * 全てのシーンを画面から取り除く関数
   */
  removeAllScene() {
    // 既存のシーンを全部削除する
    for (const scene of app.stage.children) {
      app.stage.removeChild(scene);
    }
  }
  /**
   * 登録している毎フレーム処理を全部削除する関数
   */
  removeAllGameLoops() {
    // gameLoopsに追加した関数を全部tickerから解除する
    for (const gameLoop of saves.gameLoops) {
      app.ticker.remove(gameLoop);
    }
    saves.gameLoops = []; // gameLoopsを空にする
  }
  /**
   * 毎フレーム処理を追加する関数
   */
  addGameLoop(gameLoopFunction) {
    app.ticker.add(gameLoopFunction); // 毎フレーム処理として指定した関数を追加
    saves.gameLoops.push(gameLoopFunction); // 追加した関数は配列に保存する（後で登録を解除する時に使う）
  }
  static loadScene(sceneClass) {
    saves.scene = new sceneClass();
  }
  instantiate(obj) {
    this.scene.addChild(obj);
  }
  async start() {}
  update() {}
}
