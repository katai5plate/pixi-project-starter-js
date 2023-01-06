import * as PIXI from "pixi.js";

/** 画面の設定 */
export class ScreenManager extends PIXI.Rectangle {
  /** @param {PIXI.Application} app */
  constructor({ screen: { x, y, width, height } }) {
    super(x, y, width, height);
  }
}
