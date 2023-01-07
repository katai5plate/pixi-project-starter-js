import * as PIXI from "pixi.js";

export type Vector2Like = Vector2 | { x: number; y: number };
export type Vector2Setter = Vector2Like | ((prev: Vector2) => Vector2Like);
export type ModeOrVector2Like = "CORNER" | "CENTER" | Vector2Like;

/** 2D 座標 */
export class Vector2 extends PIXI.Point {
  constructor(x?: number, y?: number) {
    super(x, y);
  }
  static from({ x, y }: Vector2Like) {
    return new Vector2(x, y);
  }
  /** 関数で計算する */
  calc(fn: (prev: { x: number; y: number }) => { x: number; y: number }) {
    const result = fn(this);
    return new Vector2(result.x, result.y);
  }
  /** 参照を渡さないように複製する */
  clone() {
    return new Vector2(this.x, this.y);
  }
  /** X を逆転する */
  flipX() {
    return this.calc(({ x, y }) => ({ x: -x, y }));
  }
  /** Y を逆転する */
  flipY() {
    return this.calc(({ x, y }) => ({ x, y: -y }));
  }
  /** 上に移動する */
  toUp(value: number) {
    return this.calc(({ x, y }) => ({ x, y: y - value }));
  }
  /** 下に移動する */
  toDown(value: number) {
    return this.calc(({ x, y }) => ({ x, y: y + value }));
  }
  /** 左に移動する */
  toLeft(value: number) {
    return this.calc(({ x, y }) => ({ x: x - value, y }));
  }
  /** 右に移動する */
  toRight(value: number) {
    return this.calc(({ x, y }) => ({ x: x + value, y }));
  }
}

/** 幅と高さ */
export class Size extends Vector2 {
  constructor(width: number, height: number) {
    super(width, height);
  }
  get width() {
    return this.x;
  }
  set width(value: number) {
    this.x = value;
  }
  get height() {
    return this.y;
  }
  set height(value: number) {
    this.y = value;
  }
}
