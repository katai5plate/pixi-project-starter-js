import * as PIXI from "pixi.js";
import { Vector2, Vector2Like } from "../components/Vector2";

/** 簡易物理エンジン設定 */
export class PhysicsManager {
  #targetSprite: PIXI.DisplayObject;
  #velocity: Vector2 = new Vector2(0, 0);
  #gravity: number = 0.1;
  #onUpdateCallback: () => void = () => {};
  constructor(targetSprite: PIXI.DisplayObject) {
    this.#targetSprite = targetSprite;
  }
  /** updatePhysics が呼ばれた時に実行するコールバックを設定する */
  onUpdate(callback: () => void) {
    this.#onUpdateCallback = callback;
  }
  get position(): Vector2 {
    return new Vector2(this.#targetSprite.x, this.#targetSprite.y);
  }
  set position({ x, y }: Vector2Like) {
    this.#targetSprite.x = x ?? this.#targetSprite.x;
    this.#targetSprite.y = y ?? this.#targetSprite.y;
  }
  get velocity(): Vector2 {
    return this.#velocity.clone();
  }
  set velocity({ x, y }: Vector2Like) {
    this.#velocity = new Vector2(x, y);
  }
  /** 物理挙動を 1 フレーム更新する */
  update() {
    // 速度を加算
    this.position = this.position.calc((prev) => ({
      x: prev.x + this.velocity.x,
      y: prev.y + this.velocity.y,
    }));
    // y の速度に足していくと、重力みたいな挙動になる
    this.velocity = this.velocity.toDown(this.#gravity);
    // 事前に登録したコールバックを実行
    this.#onUpdateCallback();
  }
}
