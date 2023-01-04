import * as PIXI from "pixi.js";
import { ColliderManager } from "../managers/ColliderManager";
import { PhysicsManager } from "../managers/PhysicsManager";

export class GameObject {
  /** @type {PIXI.Sprite} */
  sprite;
  /** @type {ColliderManager} */
  collider;
  /** @type {PhysicsManager} */
  physics;
  constructor(sprite, isButtonMode, cursor) {
    this.sprite = sprite;
    this.collider = new ColliderManager(this.sprite, isButtonMode, cursor);
    this.physics = new PhysicsManager(this.sprite);
  }
  update() {
    this.physics.update();
  }
}
