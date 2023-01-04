import * as PIXI from "pixi.js";

/** 当たり判定 */
export class ColliderManager {
  /** @type {PIXI.DisplayObject} */
  #targetSprite;
  constructor(targetSprite, isButtonMode = false, cursor = "default") {
    this.#targetSprite = targetSprite;

    // クリック可能にする
    if (isButtonMode) {
      this.#targetSprite.interactive = !!isButtonMode;
      if (cursor) this.#targetSprite.cursor = cursor;
    }
    this.collision = this.rect;
  }
  /** 当たり判定の厳密な範囲 */
  get area() {
    return this.#targetSprite.hitArea ?? this.rect;
  }
  set area(col) {
    this.#targetSprite.hitArea = col;
  }
  /** スプライトの矩形範囲 */
  get rect() {
    return new PIXI.Rectangle(
      this.#targetSprite.x,
      this.#targetSprite.y,
      this.#targetSprite?.width ?? 0,
      this.#targetSprite?.height ?? 0
    );
  }
  /** 左上基点の正方形を中央基点の円に変換 */
  static boxToCircle(x, y, size) {
    return new PIXI.Circle(x + size / 2, y + size / 2, size / 2);
  }
  /** 左上基点の矩形を中央基点の楕円に変換 */
  static rectToEclipse(x, y, width, height) {
    return new PIXI.Ellipse(
      x + width / 2,
      y + height / 2,
      width / 2,
      height / 2
    );
  }
}
