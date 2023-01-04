import * as PIXI from "pixi.js";
import { db } from "../database";
import { GameObject } from "./GameObject";

export default class Scene {
  // ゲーム用のシーンを生成
  scene = new PIXI.Container();
  #preloadedTextures = new Map();

  constructor(texturePaths = []) {
    // プリロード予定のテクスチャを記録する
    texturePaths.forEach((path) => {
      this.#preloadedTextures.set(path, null);
    });
    // 毎フレームイベントを削除
    db.app.clearGameLoops();
    // ゲームシーンを画面に設定
    db.app.setScene(this.scene);
    // 初期処理を実行
    this.init();
  }
  async init() {
    // テクスチャをプリロード
    for (const path of this.#preloadedTextures.keys()) {
      this.#preloadedTextures.set(path, await PIXI.Texture.fromLoader(path));
    }
    // start関数を実行
    await this.start();
    // update関数を毎フレーム実行にする
    db.app.addGameLoop(() => this.update());
  }
  /**
   * シーンにオブジェクトを描画
   * @param {GameObject | PIXI.DisplayObject} obj
   */
  instantiate(obj) {
    if (obj instanceof GameObject) {
      this.scene.addChild(obj.view);
    } else {
      this.scene.addChild(obj);
    }
  }
  /** プリロード済のテクスチャを呼び出す */
  getTexture(path) {
    return this.#preloadedTextures.get(path);
  }
  /**
   * テクスチャのプリロードを書く
   * @return {string[]}
   */
  preloadTextures() {}
  /** 初期処理を書く */
  async start() {}
  /** 毎フレームの処理を書く */
  update() {}
}
