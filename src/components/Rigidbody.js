import * as PIXI from "pixi.js";
import { Vector2 } from "./Vector2";

/** 剛体オブジェクト */
export class Rigidbody {
  /** @type {PIXI.DisplayObject} */
  sprite;
  /** @type {Vector2} */
  #velocity = new Vector2(0, 0);
  #gravity = 0.1;
  #onUpdatePhysics = () => {};
  constructor(sprite) {
    this.sprite = sprite;
    // クリック可能にする
    this.sprite.interactive = true;
  }
  /** テクスチャから作成する */
  static fromTexture(texture) {
    return new this(new PIXI.Sprite(texture));
  }
  /** @type {typeof PIXI.DisplayObject.prototype.on} */
  on(...args) {
    this.sprite.on(...args);
  }
  /**
   * updatePhysics が呼ばれた時に実行するコールバックを設定する
   * @param {(obj: this) => void} callback
   */
  onUpdatePhysics(callback) {
    this.#onUpdatePhysics = callback;
  }
  get rect() {
    return new PIXI.Rectangle(
      this.sprite.x,
      this.sprite.y,
      this.sprite?.width ?? 0,
      this.sprite?.height ?? 0
    );
  }
  get position() {
    return new Vector2(this.sprite.x, this.sprite.y);
  }
  set position({ x, y }) {
    this.sprite.x = x ?? this.sprite.x;
    this.sprite.y = y ?? this.sprite.y;
  }
  get velocity() {
    return this.#velocity.clone();
  }
  set velocity({ x, y }) {
    this.#velocity = new Vector2(x, y);
  }
  /** 物理挙動を 1 フレーム更新する。Scene の update 関数内での実行を推奨 */
  updatePhysics() {
    // 速度を加算
    this.position = this.position.add(this.velocity.x, this.velocity.y);
    // y の速度に足していくと、重力みたいな挙動になる
    this.velocity = this.velocity.toDown(this.#gravity);
    // 事前に登録したコールバックを実行
    this.#onUpdatePhysics(this);
  }
}
