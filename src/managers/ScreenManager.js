import * as PIXI from "pixi.js";
import { Vector2 } from "../components/Vector2";

/** 画面の設定 */
export class ScreenManager extends PIXI.Rectangle {
  /** @param {PIXI.Application} app */
  constructor({ screen: { x, y, width, height } }) {
    super(x, y, width, height);
  }
  /**
   * 画面を N 倍（ N 分割）した座標を取得
   * ```js
   * const pos = engine.screen.grid(
   *   1 / 2, // 画面幅の 2 分の 1 の X 座標
   *   2 / 3, // 画面高さの 3 分の 2 の Y 座標
   * );
   * ```
   * @param {number} x
   * @param {number} y
   */
  grid(x, y) {
    return new Vector2(this.width * x, this.height * y);
  }
  /**
   * grid を Vector2 などの xy 情報を持つオブジェクトから取得
   * @param {Vector2 | {x: number, y: number}} vec2
   */
  gridFrom({ x, y }) {
    return this.grid(x, y);
  }
}
