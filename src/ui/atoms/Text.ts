import * as PIXI from "pixi.js";
import { ModeOrVector2Like, Size, Vector2Like } from "../../components/Vector2";
import { setOriginProcess } from "../../utils";

/** テキスト */
export class Text extends PIXI.Text {
  constructor(text: string, fontSize: number, color: number) {
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
  setPosition({ x, y }: Vector2Like) {
    this.x = x;
    this.y = y;
  }
  /**
   * 原点（anchor）を設定する。
   * @param modeOrVec2 アンカー設定（Vector2 の場合は 0 ~ 1）
   */
  setOrigin(modeOrVec2: ModeOrVector2Like) {
    setOriginProcess(modeOrVec2, this, new Size(this.width, this.height));
  }
}
