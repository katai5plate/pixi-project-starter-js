import * as PIXI from "pixi.js";
import { Sprite } from "pixi.js";
import { ColliderManager } from "../managers/ColliderManager";
import { PhysicsManager } from "../managers/PhysicsManager";
import { Vector2 } from "./Vector2";

export class GameObject {
  /** @type {PIXI.DisplayObject} */
  sprite;
  /** @type {ColliderManager} */
  #collider;
  /** @type {PhysicsManager} */
  #physics;
  constructor(
    sprite = new PIXI.DisplayObject(),
    isButtonMode = false,
    cursor = "default"
  ) {
    this.sprite = sprite;
    this.#collider = new ColliderManager(this.sprite, isButtonMode, cursor);
    this.#physics = new PhysicsManager(this.sprite);
    this.loadddddd()
      .then((sprite) => {
        if (sprite) this.sprite = sprite;
      })
      .then(() => this.init());
  }
  static fromTexture(texture, isButtonMode = false, cursor = "default") {
    return new GameObject(new Sprite(texture), isButtonMode, cursor);
  }
  /** 挙動の更新を行う。Scene の Update で忘れず実行すること！ */
  update() {
    this.#physics.update();
  }
  /**
   * 物理設定を変更する
   * @param {{
   *   position?: (prev: Vector2) => {x: number, y: number},
   *   velocity?: (prev: Vector2) => {x: number, y: number},
   *   onUpdate?: () => void
   * }} params
   */
  setPhysics({ position, velocity, onUpdate }) {
    if (position)
      this.#physics.position = Vector2.from(position(this.#physics.position));
    if (velocity)
      this.#physics.velocity = Vector2.from(velocity(this.#physics.velocity));
    if (onUpdate) this.#physics.onUpdate(onUpdate);
  }
  /**
   * 当たり判定の範囲を指定する
   * @param {PIXI.IShape} area
   */
  setColliderArea(area) {
    this.#collider.area = area;
  }
  get position() {
    return this.#physics.position;
  }
  get rect() {
    return this.#collider.rect;
  }
  get colliderArea() {
    return this.#collider.area;
  }
  /**
   * スプライトをプリロードする場合の処理
   * @return {PIXI.Sprite}
   */
  async loadddddd() {}
  /** ロード後の初期処理 */
  async init() {}
}
