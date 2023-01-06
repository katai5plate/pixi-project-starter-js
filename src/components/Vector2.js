import * as PIXI from "pixi.js";
import { isVoid } from "../utils";

/**
 * @typedef {Vector2 | {x: number, y: number}} Vector2Like
 */

/** 2D 座標 */
export class Vector2 extends PIXI.Point {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y);
  }
  static from({ x, y }) {
    return new Vector2(x, y);
  }
  /** 代入（nullを渡すと元の値を維持する） */
  set(x, y) {
    return new Vector2(x ?? this.x, y ?? this.y);
  }
  /** 加算（nullを渡すと元の値を維持する） */
  add(x, y) {
    return new Vector2(
      isVoid(x) ? this.x : this.x + x,
      isVoid(y) ? this.y : this.y + y
    );
  }
  /** 減算（nullを渡すと元の値を維持する） */
  sub(x, y) {
    return new Vector2(
      isVoid(x) ? this.x : this.x - x,
      isVoid(y) ? this.y : this.y - y
    );
  }
  /** 乗算（nullを渡すと元の値を維持する） */
  mul(x, y) {
    return new Vector2(
      isVoid(x) ? this.x : this.x * x,
      isVoid(y) ? this.y : this.y * y
    );
  }
  /** 除算（nullを渡すと元の値を維持する） */
  div(x, y) {
    return new Vector2(
      isVoid(x) ? this.x : this.x / x,
      isVoid(y) ? this.y : this.y / y
    );
  }
  /** 剰余（nullを渡すと元の値を維持する） */
  mod(x, y) {
    return new Vector2(
      isVoid(x) ? this.x : this.x % x,
      isVoid(y) ? this.y : this.y % y
    );
  }
  /**
   * 関数で計算する
   * @param {(prev: {x: number, y: number}) => {x: number, y: number}} fn
   */
  calc(fn) {
    const result = fn(this);
    return new Vector2(result.x, result.y);
  }
  /** 参照を渡さないように複製する */
  clone() {
    return new Vector2(this.x, this.y);
  }
  /** X を逆転する */
  flipX() {
    return this.mul(-1, null);
  }
  /** Y を逆転する */
  flipY() {
    return this.mul(null, -1);
  }
  /** 上に移動する */
  toUp(value) {
    return this.sub(null, value);
  }
  /** 下に移動する */
  toDown(value) {
    return this.add(null, value);
  }
  /** 左に移動する */
  toLeft(value) {
    return this.sub(value, null);
  }
  /** 右に移動する */
  toRight(value) {
    return this.add(value, null);
  }
}

/** 幅と高さ */
export class Size extends Vector2 {
  /**
   * @param {number} width
   * @param {number} height
   */
  constructor(width, height) {
    super(width, height);
  }
  get width() {
    return this.x;
  }
  set width(value) {
    this.x = value;
  }
  get height() {
    return this.y;
  }
  set height(value) {
    this.y = value;
  }
}
