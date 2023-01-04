import * as PIXI from "pixi.js";
import { Vector2 } from "../components/Vector2";

/** 簡易物理エンジン */
export class PhysicsManager {
  /** @type {PIXI.DisplayObject} */
  #targetSprite;
  /** @type {Vector2} */
  #velocity = new Vector2(0, 0);
  #gravity = 0.1;
  #onUpdateCallback = () => {};
  constructor(targetSprite) {
    this.#targetSprite = targetSprite;
  }
  /**
   * updatePhysics が呼ばれた時に実行するコールバックを設定する
   * @param {(obj: this) => void} callback
   */
  onUpdate(callback) {
    this.#onUpdateCallback = callback;
  }
  get position() {
    return new Vector2(this.#targetSprite.x, this.#targetSprite.y);
  }
  set position({ x, y }) {
    this.#targetSprite.x = x ?? this.#targetSprite.x;
    this.#targetSprite.y = y ?? this.#targetSprite.y;
  }
  get velocity() {
    return this.#velocity.clone();
  }
  set velocity({ x, y }) {
    this.#velocity = new Vector2(x, y);
  }
  /** 物理挙動を 1 フレーム更新する */
  update() {
    // 速度を加算
    this.position = this.position.add(this.velocity.x, this.velocity.y);
    // y の速度に足していくと、重力みたいな挙動になる
    this.velocity = this.velocity.toDown(this.#gravity);
    // 事前に登録したコールバックを実行
    this.#onUpdateCallback(this);
  }
}
