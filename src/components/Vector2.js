import * as PIXI from "pixi.js";
import { isVoid } from "../utils";

export class Vector2 extends PIXI.Point {
  constructor(x, y) {
    super(x, y);
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
  /** 参照を渡さないように複製する */
  clone() {
    return new Vector2(this.x, this.y);
  }
}
