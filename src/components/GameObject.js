import * as PIXI from "pixi.js";
import { ColliderManager } from "../managers/ColliderManager";
import { PhysicsManager } from "../managers/PhysicsManager";
import { Vector2 } from "./Vector2";

/** 当たり判定と物理演算が可能な画像オブジェクト */
export class GameObject {
  /** @type {PIXI.DisplayObject} */
  #displayObject;
  /** @type {ColliderManager} */
  #collider;
  /** @type {PhysicsManager} */
  #physics;
  constructor(displayObject) {
    this.setDisplayObject(displayObject);
  }
  setDisplayObject(displayObject) {
    this.#displayObject = displayObject;
    this.#collider = this.#displayObject
      ? new ColliderManager(this.#displayObject)
      : undefined;
    this.#physics = this.#displayObject
      ? new PhysicsManager(this.#displayObject)
      : undefined;
  }
  #validDisplayObject() {
    if (!this.#displayObject) throw new Error("DisplayObject がありません");
  }
  /** 挙動の更新を行う。Scene の Update で忘れず実行すること！ */
  update() {
    this.#physics.update();
  }
  /**
   * 物理設定を変更する
   * @param {{
   *   position: (prev: Vector2) => {x: number, y: number},
   *   velocity: (prev: Vector2) => {x: number, y: number},
   *   onUpdate: () => void
   * }} params
   */
  setPhysics({ position, velocity, onUpdate }) {
    this.#validDisplayObject();
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
    this.#validDisplayObject();
    this.#collider.area = area;
  }
  /**
   * マウスでクリックできるようにする
   * @param {boolean} enable
   * @param {string} cursor
   */
  setButtonMode(enable, cursor = "default") {
    this.#validDisplayObject();
    this.#displayObject.interactive = enable;
    this.#displayObject.cursor = enable ? cursor : "default";
  }
  /** 位置を取得（読み取り専用） */
  get position() {
    this.#validDisplayObject();
    return this.#physics.position;
  }
  /** 画像の矩形を取得（読み取り専用） */
  get rect() {
    this.#validDisplayObject();
    return this.#collider.rect;
  }
  /** 当たり判定を取得（読み取り専用） */
  get colliderArea() {
    this.#validDisplayObject();
    return this.#collider.area;
  }
  /** 画像を取得（読み取り専用） */
  get view() {
    this.#validDisplayObject();
    return this.#displayObject;
  }
  /** @type {PIXI.DisplayObject["on"]} */
  on(...args) {
    this.#validDisplayObject();
    return this.#displayObject.on(...args);
  }
  /** @type {PIXI.DisplayObject["off"]} */
  off(...args) {
    this.#validDisplayObject();
    return this.#displayObject.off(...args);
  }
  /** @type {PIXI.DisplayObject["once"]} */
  once(...args) {
    this.#validDisplayObject();
    return this.#displayObject.once(...args);
  }
}
