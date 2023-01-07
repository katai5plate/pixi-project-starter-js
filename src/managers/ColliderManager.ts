import * as PIXI from "pixi.js";
import { GameObject, GameObjectSprite } from "../components/GameObject";
import { Size } from "../components/Vector2";

/** 当たり判定設定 */
export class ColliderManager {
  #targetSprite?: GameObjectSprite;
  #maxSize?: Size;
  constructor(gameObject: GameObject) {
    this.#targetSprite = gameObject.view;
    this.#maxSize = gameObject.maxSize;
  }
  /** 当たり判定の厳密な範囲 */
  get area(): PIXI.IShape {
    return (
      (this.#targetSprite?.hitArea as PIXI.IShape) ??
      this.spriteRect ??
      new PIXI.Rectangle()
    );
  }
  set area(col: PIXI.IShape) {
    if (!this.#targetSprite) return;
    this.#targetSprite.hitArea = col;
  }
  /** 当たり判定から算出された矩形範囲（読み取り専用） */
  get areaRect() {
    if (this.area instanceof PIXI.Circle) {
      return new PIXI.Rectangle(
        this.spriteRect.x,
        this.spriteRect.y,
        this.area.radius * 2,
        this.area.radius * 2
      );
    }
    if (this.area instanceof PIXI.Ellipse) {
      return new PIXI.Rectangle(
        this.spriteRect.x,
        this.spriteRect.y,
        this.area.width * 2,
        this.area.height * 2
      );
    }
    if (this.area instanceof PIXI.Polygon) {
      // あとで書く
      return new PIXI.Rectangle();
    }
    return new PIXI.Rectangle(
      this.spriteRect.x,
      this.spriteRect.y,
      this.area.width ?? this.#maxSize?.width ?? 0,
      this.area.height ?? this.#maxSize?.height ?? 0
    );
  }
  /** スプライトの矩形範囲 */
  get spriteRect() {
    return new PIXI.Rectangle(
      this.#targetSprite?.x ?? 0,
      this.#targetSprite?.y ?? 0,
      this.#targetSprite?.width ?? 0,
      this.#targetSprite?.height ?? 0
    );
  }
  /** 左上基点の正方形を中央基点の円に変換 */
  static boxToCircle(x: number, y: number, size: number) {
    return new PIXI.Circle(x + size / 2, y + size / 2, size / 2);
  }
  /** 左上基点の矩形を中央基点の楕円に変換 */
  static rectToEclipse(x: number, y: number, width: number, height: number) {
    return new PIXI.Ellipse(
      x + width / 2,
      y + height / 2,
      width / 2,
      height / 2
    );
  }
}
