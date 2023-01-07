import * as PIXI from "pixi.js";
import { engine } from "../database";
import { GameObject } from "./GameObject";

/** ゲームのシーン */
export default class Scene {
  /** 現在のシーン */
  #scene: PIXI.Container = new PIXI.Container();
  /** テクスチャのキャッシュ */
  #cachedTextures: Map<string, PIXI.Texture | null> = new Map();

  /**
   * @param texturePaths プリロードするテクスチャの参照リスト
   */
  constructor(texturePaths: string[] = []) {
    // プリロード予定のテクスチャを記録する
    texturePaths.forEach((path) => {
      this.#cachedTextures.set(path, null);
    });
    // 毎フレームイベントを削除
    engine.app.clearGameLoops();
    // ゲームシーンを画面に設定
    engine.app.setScene(this.#scene);
    // 初期処理を実行
    this.#init();
  }
  /** シーンの初期処理 */
  async #init() {
    // テクスチャをプリロード
    for (const path of this.#cachedTextures.keys()) {
      this.#cachedTextures.set(path, await PIXI.Texture.fromLoader(path, path));
    }
    // start関数を実行
    await this.start();
    // update関数を毎フレーム実行にする
    engine.app.addGameLoop(() => this.update());
  }
  /**
   * シーンにオブジェクトを描画
   * @param obj
   */
  instantiate(obj: GameObject | PIXI.DisplayObject) {
    if (obj instanceof GameObject) {
      this.#scene.addChild(obj.view);
    } else {
      this.#scene.addChild(obj);
    }
  }
  /** プリロード済のテクスチャを呼び出す */
  getTexture(path: string) {
    if (!this.#cachedTextures.has(path))
      throw new Error(`プリロードが行われていない Texture です: ${path}`);
    return this.#cachedTextures.get(path);
  }
  /** 初期処理を書く（上書き用） */
  async start() {}
  /** 毎フレームの処理を書く（上書き用） */
  update() {}
}
