import * as PIXI from "pixi.js";

export class AppManager extends PIXI.Application {
  gameLoops = new Set();
  constructor({ width, height, backgroundColor, isPixelated, ...options }) {
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
  }
  /** 既存のシーンを全部削除する */
  clearScene() {
    for (const scene of this.stage.children) {
      this.stage.removeChild(scene);
    }
  }
  /** シーンを設定する */
  setScene(scene) {
    this.clearScene();
    this.stage.addChild(scene);
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
}
