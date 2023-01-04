import { ButtonSprite } from "../graphics/ButtonSprite";
import { GameObject } from "./GameObject";

/** ボタン UI */
export class Button extends GameObject {
  constructor(text, width, height, color, onClick) {
    super(new ButtonSprite(text, width, height, color));
    this.setButtonMode(true, "pointer");
    this.on("pointerdown", onClick);
  }
}
