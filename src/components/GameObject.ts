import * as PIXI from "pixi.js";
import { ColliderManager } from "../managers/ColliderManager";
import { PhysicsManager } from "../managers/PhysicsManager";
import { setOriginProcess } from "../utils";
import { ModeOrVector2Like, Size, Vector2, Vector2Setter } from "./Vector2";

export type GameObjectSprite = PIXI.DisplayObject & {
  width?: number;
  height?: number;
  anchor?: PIXI.ObservablePoint;
};

/** 当たり判定と物理演算が可能な画像オブジェクト */
export class GameObject {
  #displayObject?: GameObjectSprite;
  #collider?: ColliderManager;
  #physics?: PhysicsManager;
  #maxSize?: Size;
  constructor(displayObject: PIXI.DisplayObject) {
    this.setDisplayObject(displayObject);
  }
  setDisplayObject(displayObject: PIXI.DisplayObject) {
    this.#displayObject = displayObject;
    this.#collider = this.#displayObject
      ? new ColliderManager(this)
      : undefined;
    this.#physics = this.#displayObject
      ? new PhysicsManager(this.#displayObject)
      : undefined;
  }
  /**
   * DisplayObject と必要な Manager が設定されているか確認する。
   * - この直後は、それらを `!.` で絶対参照してよい。
   */
  #validDisplayObject() {
    if (!this.#displayObject) throw new Error("DisplayObject がありません");
    if (!this.#collider || !this.#physics) {
      console.log(this);
      console.trace();
      throw new Error("必要なマネージャーがありません");
    }
  }
  /** 挙動の更新を行う。Scene の Update で忘れず実行すること！ */
  update() {
    this.#physics?.update();
  }
  /**
   * 物理設定を変更する
   */
  setPhysics({
    position,
    velocity,
    onUpdate,
  }: {
    position?: Vector2Setter;
    velocity?: Vector2Setter;
    onUpdate?: () => void;
  }) {
    this.#validDisplayObject();
    if (position)
      this.#physics!.position =
        typeof position === "function"
          ? Vector2.from(position(this.#physics!.position))
          : position;
    if (velocity)
      this.#physics!.velocity =
        typeof velocity === "function"
          ? Vector2.from(velocity(this.#physics!.velocity))
          : velocity;
    if (onUpdate) this.#physics!.onUpdate(onUpdate);
  }
  /**
   * 位置を設定する。（setPhysics の position 指定のショートハンド
   */
  setPosition(position: Vector2Setter) {
    this.setPhysics({ position });
  }
  /**
   * 当たり判定の範囲を指定す
   */
  setCollider(area: PIXI.IShape) {
    this.#validDisplayObject();
    this.#collider!.area = area;
  }
  /** 当たり判定の矩形範囲（読み取り専用） */
  get colliderRect() {
    this.#validDisplayObject();
    return this.#collider!.areaRect;
  }
  /**
   * マウスでクリックできるようにする
   */
  setButtonMode(enable: boolean, cursor = "default") {
    this.#validDisplayObject();
    this.#displayObject!.interactive = enable;
    this.#displayObject!.cursor = enable ? cursor : "default";
  }
  /**
   * pivot の存在しない以下のクラス以外を継承する DisplayObject を使用している場合に setAnchor で使用できる幅と高さを設定する
   * - PIXI.Sprite
   * - PIXI.Text
   * - PIXI.BitmapText
   * - PIXI.TilingSprite
   * - PIXI.AnimatedSprite
   * @param width 幅
   * @param height 高さ
   */
  setMaxSize(width: number, height: number) {
    this.#maxSize = new Size(width, height);
  }
  /** setMaxSize の設定値（読み取り専用） */
  get maxSize() {
    return (
      this.#maxSize ??
      new Size(
        this.#displayObject?.width ?? 0,
        this.#displayObject?.height ?? 0
      )
    );
  }
  /**
   * 原点を設定する。anchor が無い場合は代わりに pivot を設定する
   * - 以下のクラスを継承しているもの以外は事前に setMaxSize を行うこと:
   *   - PIXI.Sprite
   *   - PIXI.Text
   *   - PIXI.BitmapText
   *   - PIXI.TilingSprite
   *   - PIXI.AnimatedSprite
   * @param modeOrVec2 アンカー設定（Vector2 の場合は 0 ~ 1）
   */
  setOrigin(modeOrVec2: ModeOrVector2Like) {
    this.#validDisplayObject();
    setOriginProcess(
      modeOrVec2,
      this!.#displayObject as GameObjectSprite,
      this.maxSize
    );
  }
  /** 位置を取得（読み取り専用） */
  get position() {
    this.#validDisplayObject();
    return this.#physics!.position;
  }
  /** 画像の矩形を取得（読み取り専用） */
  get rect() {
    this.#validDisplayObject();
    return this.#collider!.spriteRect;
  }
  /** 当たり判定を取得（読み取り専用） */
  get colliderArea() {
    this.#validDisplayObject();
    return this.#collider!.area;
  }
  /** 画像を取得（読み取り専用） */
  get view() {
    return this.#displayObject;
  }
  /**
   * DisplayObject にイベントを設定する
   */
  on(...args: Parameters<PIXI.DisplayObject["on"]>) {
    this.#validDisplayObject();
    return this.#displayObject!.on(...args);
  }
  /**
   * DisplayObject のイベントを解除する
   */
  off(...args: Parameters<PIXI.DisplayObject["off"]>) {
    this.#validDisplayObject();
    return this.#displayObject!.off(...args);
  }
  /**
   * DisplayObject にワンタイムイベントを設定する
   */
  once(...args: Parameters<PIXI.DisplayObject["once"]>) {
    this.#validDisplayObject();
    return this.#displayObject!.once(...args);
  }
}
