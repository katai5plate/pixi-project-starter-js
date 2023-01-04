import * as PIXI from "pixi.js";

/** テキスト */
export class Text extends PIXI.Text {
  /**
   * @param {string} text テキスト
   * @param {number} fontSize フォントサイズ
   * @param {number} color 色 0x123456
   * @param {boolean} [cornaring] 左上アンカーにするか（デフォルトは中央）
   */
  constructor(text, fontSize, color, cornaring = false) {
    super(
      text,
      // テキストに関するパラメータを定義する(ここで定義した他にもたくさんパラメータがある)
      new PIXI.TextStyle({
        fontFamily: "Arial", // フォント
        fontSize, // フォントサイズ
        fill: color, // 色(16進数)
        dropShadow: true, // ドロップシャドウを有効にする（右下に影をつける）
        dropShadowDistance: 2, // ドロップシャドウの影の距離
      })
    );
    // コーナリング（左上アンカー設定）にしない場合
    if (!cornaring) {
      // 中央アンカーにする(アンカーは 0 ~ 1 指定)
      this.anchor.x = 0.5;
      this.anchor.y = 0.5;
    }
  }
  /** 位置を設定 */
  setPosition({ x, y }) {
    this.x = x;
    this.y = y;
  }
}
