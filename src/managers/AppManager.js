import * as PIXI from "pixi.js";
import Scene from "../components/Scene";
import { db, engine } from "../database";

/** 描画エンジンの設定 */
export class AppManager extends PIXI.Application {
  gameLoops = new Set();
  /** @type {Scene?} */
  #scene = null;
  /** @type {PIXI.Graphics?} */
  #debugLayer = null;
  isDebug;
  /**
   * @param {Object} options
   * @param {number} options.width 幅
   * @param {number} options.height 高さ
   * @param {number} options.backgroundColor 背景色 0x123456
   * @param {boolean} options.isPixelated ドットをぼかさないようにするか
   * @param {boolean} options.isDebug デバッグ機能を使用するか
   */
  constructor({
    width,
    height,
    backgroundColor,
    isPixelated,
    isDebug,
    ...options
  }) {
    // PIXI.JSアプリケーションを生成 (この数字はゲーム内の画面サイズ)
    super({ width, height, ...options });

    // index.htmlのbodyにapp.viewを追加する (this.viewはcanvasのdom要素)
    document.body.appendChild(this.view);

    // ゲームcanvasのcssを定義する
    // ここで定義した画面サイズ(width,height)は実際に画面に表示するサイズ
    this.renderer.view.style.position = "relative";
    this.renderer.view.style.width = `${width}px`;
    this.renderer.view.style.height = `${height}px`;
    this.renderer.view.style.display = "block";

    // canvasの周りを点線枠で囲う (canvasの位置がわかりやすいので入れている)
    this.renderer.view.style.border = "2px dashed black";

    // canvasの背景色
    this.renderer.backgroundColor = backgroundColor ?? 0x000000;

    if (isPixelated) {
      // ドットをぼかさない
      this.view.style.imageRendering = "pixelated";
      PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    }

    this.isDebug = isDebug;

    // デバッグ用に様々なデータをコンソールでアクセス可能にする
    if (this.isDebug) {
      window.PIXI = PIXI;
      // 参照時に最新の値を得るために関数にする
      window.db = () => db;
      window.engine = () => engine;
    }
  }
  /** 現在のシーン（読み取り専用） */
  get currentScene() {
    return this.#scene;
  }
  /**
   * デバッグ用レイヤー
   * ```js
   * // 200x200 の白い矩形を (0, 0) に描画
   * engine.app.debugLayer.beginFill(0xffffff);
   * engine.app.debugLayer.drawRect(0, 0, 200, 200);
   * ```
   */
  get debugLayer() {
    if (!this.isDebug) console.warn("デバッグ機能が無効です");
    return this.#debugLayer;
  }
  /** 既存のシーンを全部削除する */
  clearScene() {
    for (const scene of this.stage.children) {
      this.stage.removeChild(scene);
    }
    // デバッグ用レイヤーを消す
    if (this.isDebug) {
      this.stage.removeChild(this.#debugLayer);
      this.#debugLayer = null;
    }
  }
  /** シーンを設定する */
  setScene(scene) {
    this.clearScene();
    this.#scene = scene;
    this.stage.addChild(this.#scene);
    // デバッグ用に図形を書き込めるレイヤーを挟む
    if (this.isDebug) {
      this.#debugLayer = new PIXI.Graphics();
      this.#debugLayer.beginFill(0xffffff, 0.5);
      this.stage.addChild(this.#debugLayer);
    }
  }
  /** gameLoops に追加した関数を全部 ticker から解除する */
  clearGameLoops() {
    for (const gameLoop of this.gameLoops) {
      this.ticker.remove(gameLoop);
    }
    // gameLoopsを空にする
    this.gameLoops.clear();
  }
  /** 毎フレーム処理を追加する */
  addGameLoop(ticker) {
    // 毎フレーム処理として指定した関数を追加
    this.ticker.add(ticker);
    // 追加した関数は配列に保存する（後で登録を解除する時に使う）
    this.gameLoops.add(ticker);
  }
  /** 毎フレーム処理を削除する */
  removeGameLoop(ticker) {
    // 毎フレーム処理として指定した関数を追加
    this.ticker.remove(ticker);
    // 追加した関数は配列に保存する（後で登録を解除する時に使う）
    this.gameLoops.remove(ticker);
  }
}
