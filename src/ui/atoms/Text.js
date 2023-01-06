import * as PIXI from "pixi.js";

/** テキスト */
export class Text extends PIXI.Text {
  /**
   * @param {string} text テキスト
   * @param {number} fontSize フォントサイズ
   * @param {number} color 色 0x123456
   */
  constructor(text, fontSize, color) {
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
  }
  /** 位置を設定 */
  setPosition({ x, y }) {
    this.x = x;
    this.y = y;
  }
  /**
   * 原点（anchor）を設定する。
   * @param {"CORNER" | "CENTER" | {x: number, y: number}} modeOrVec2 アンカー設定（Vector2 の場合は 0 ~ 1）
   */
  setOrigin(modeOrVec2) {
    // 統一するために pivot は 0 にする
    this.pivot.x = 0;
    this.pivot.y = 0;
    // anchor を設定
    if (typeof modeOrVec2 === "object") {
      this.anchor.set(modeOrVec2.x, modeOrVec2.y);
    } else if (["CORNER", "CENTER"].includes(modeOrVec2)) {
      const anchor = modeOrVec2 === "CORNER" ? 0 : 0.5;
      this.anchor.set(anchor);
    } else {
      throw new Error(`無効な設定値です: ${modeOrVec2}`);
    }
  }
}
