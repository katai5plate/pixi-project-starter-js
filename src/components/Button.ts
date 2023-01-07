import { ButtonSprite } from "../ui/atoms/ButtonSprite";
import { GameObject } from "./GameObject";

/** ボタン UI */
export class Button extends GameObject {
  constructor(
    text: string,
    width: number,
    height: number,
    color: number,
    onClick: () => void
  ) {
    super(new ButtonSprite(text, width, height, color));
    this.setMaxSize(width, height);
    this.setButtonMode(true, "pointer");
    this.on("pointerdown", onClick);
  }
}
