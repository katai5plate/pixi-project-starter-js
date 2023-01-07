import * as PIXI from "pixi.js";
import { ColliderManager } from "../managers/ColliderManager";
import { PhysicsManager } from "../managers/PhysicsManager";
import { setOriginProcess } from "../utils";
import { Vector2 } from "./Vector2";

/**
 * @typedef {import("./Vector2").Vector2Like} Vector2Like
 */

/** 当たり判定と物理演算が可能な画像オブジェクト */
export class GameObject {
  /** @type {PIXI.DisplayObject} */
  #displayObject;
  /** @type {ColliderManager} */
  #collider;
  /** @type {PhysicsManager} */
  #physics;
  /** @type {Vector2} */
  #maxSize;
  constructor(displayObject) {
    this.setDisplayObject(displayObject);
  }
  setDisplayObject(displayObject) {
    this.#displayObject = displayObject;
    this.#collider = this.#displayObject
      ? new ColliderManager(this.#displayObject, this.#maxSize)
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
   *   position: Vector2Like | (prev: Vector2) => Vector2Like,
   *   velocity: Vector2Like | (prev: Vector2) => Vector2Like,
   *   onUpdate: () => void
   * }} params
   */
  setPhysics({ position, velocity, onUpdate }) {
    this.#validDisplayObject();
    if (position)
      this.#physics.position =
        typeof position === "function"
          ? Vector2.from(position(this.#physics.position))
          : position;
    if (velocity)
      this.#physics.velocity =
        typeof velocity === "function"
          ? Vector2.from(velocity(this.#physics.velocity))
          : velocity;
    if (onUpdate) this.#physics.onUpdate(onUpdate);
  }
  /**
   * 位置を設定する。（setPhysics の position 指定のショートハンド）
   * @param {Vector2Like | (prev: Vector2) => Vector2Like} position
   */
  setPosition(position) {
    this.setPhysics({ position });
  }
  /**
   * 当たり判定の範囲を指定する
   * @param {PIXI.IShape} area
   */
  setCollider(area) {
    this.#validDisplayObject();
    this.#collider.area = area;
  }
  /** 当たり判定の矩形範囲（読み取り専用） */
  get colliderRect() {
    this.#validDisplayObject();
    return this.#collider.areaRect;
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
  /**
   * pivot の存在しない以下のクラス以外を継承する DisplayObject を使用している場合に setAnchor で使用できる幅と高さを設定する
   * - PIXI.Sprite
   * - PIXI.Text
   * - PIXI.BitmapText
   * - PIXI.TilingSprite
   * - PIXI.AnimatedSprite
   * @param {number} width 幅
   * @param {number} height 高さ
   */
  setMaxSize(width, height) {
    this.#maxSize = new Vector2(width, height);
  }
  /**
   * 原点を設定する。anchor が無い場合は代わりに pivot を設定する
   * - 以下のクラスを継承しているもの以外は事前に setMaxSize を行うこと:
   *   - PIXI.Sprite
   *   - PIXI.Text
   *   - PIXI.BitmapText
   *   - PIXI.TilingSprite
   *   - PIXI.AnimatedSprite
   * @param {"CORNER" | "CENTER" | {x: number, y: number}} modeOrVec2 アンカー設定（Vector2 の場合は 0 ~ 1）
   */
  setOrigin(modeOrVec2) {
    setOriginProcess(modeOrVec2, this.#displayObject, this.#maxSize);
  }
  /** 位置を取得（読み取り専用） */
  get position() {
    this.#validDisplayObject();
    return this.#physics.position;
  }
  /** 画像の矩形を取得（読み取り専用） */
  get rect() {
    this.#validDisplayObject();
    return this.#collider.spriteRect;
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
  /**
   * DisplayObject にイベントを設定する
   *  @type {PIXI.DisplayObject["on"]}
   */
  on(...args) {
    this.#validDisplayObject();
    return this.#displayObject.on(...args);
  }
  /**
   * DisplayObject のイベントを解除する
   * @type {PIXI.DisplayObject["off"]}
   */
  off(...args) {
    this.#validDisplayObject();
    return this.#displayObject.off(...args);
  }
  /**
   * DisplayObject にワンタイムイベントを設定する
   * @type {PIXI.DisplayObject["once"]}
   */
  once(...args) {
    this.#validDisplayObject();
    return this.#displayObject.once(...args);
  }
}
