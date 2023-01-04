import * as PIXI from "pixi.js";
import { db } from "../database";
import { GameObject } from "./GameObject";

/** ゲームのシーン */
export default class Scene {
  /** 現在のシーン */
  #scene = new PIXI.Container();
  /** テクスチャのキャッシュ */
  #cachedTextures = new Map();

  /**
   * @param {string[]} texturePaths プリロードするテクスチャの参照リスト
   */
  constructor(texturePaths = []) {
    // プリロード予定のテクスチャを記録する
    texturePaths.forEach((path) => {
      this.#cachedTextures.set(path, null);
    });
    // 毎フレームイベントを削除
    db.app.clearGameLoops();
    // ゲームシーンを画面に設定
    db.app.setScene(this.#scene);
    // 初期処理を実行
    this.#init();
  }
  /** シーンの初期処理 */
  async #init() {
    // テクスチャをプリロード
    for (const path of this.#cachedTextures.keys()) {
      this.#cachedTextures.set(path, await PIXI.Texture.fromLoader(path));
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
      this.#scene.addChild(obj.view);
    } else {
      this.#scene.addChild(obj);
    }
  }
  /** プリロード済のテクスチャを呼び出す */
  getTexture(path) {
    if (!this.#cachedTextures.has(path))
      throw new Error(`プリロードが行われていない Texture です: ${path}`);
    return this.#cachedTextures.get(path);
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
