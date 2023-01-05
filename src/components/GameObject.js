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
  /** @type {Vector2} */
  #maxSize;
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
    // anchor が存在する場合
    if (this.#displayObject.anchor) {
      // 統一するために pivot は 0 にする
      this.#displayObject.pivot.x = 0;
      this.#displayObject.pivot.y = 0;
      // anchor を設定
      if (typeof modeOrVec2 === "object") {
        this.#displayObject.anchor.set(modeOrVec2.x, modeOrVec2.y);
      } else if (["CORNER", "CENTER"].includes(modeOrVec2)) {
        const anchor = modeOrVec2 === "CORNER" ? 0 : 0.5;
        this.#displayObject.anchor.set(anchor);
      } else {
        throw new Error(`無効な設定値です: ${modeOrVec2}`);
      }
    }
    // pivot しかない場合
    else {
      let x, y;
      const [width, height] = [this.#maxSize?.x, this.#maxSize?.y];
      if (!Number.isFinite(width) || !Number.isFinite(height))
        throw new Error(
          `アンカーが存在しないオブジェクトを使用しているため setMaxSize の指定が必要です: ${JSON.stringify(
            { width, height }
          )}`
        );
      // pivot を設定
      if (typeof modeOrVec2 === "object") {
        [x, y] = [width * modeOrVec2.x, height * modeOrVec2.y];
      } else if (["CORNER", "CENTER"].includes(modeOrVec2)) {
        const anchor = modeOrVec2 === "CORNER" ? 0 : 0.5;
        [x, y] = [width * anchor, height * anchor];
      } else {
        throw new Error(`無効な設定値です: ${modeOrVec2}`);
      }
      this.#displayObject.pivot.x = x;
      this.#displayObject.pivot.y = y;
    }
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
