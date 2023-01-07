import { Vector2 } from "../../components/Vector2";
import { Text } from "../atoms/Text";

/** 大きなラベル */
export class BigLabel extends Text {
  constructor({
    text,
    color,
    position,
  }: {
    text: string;
    color: number;
    position: Vector2;
  }) {
    super(text, 32, color);
    this.setPosition(position);
    this.setOrigin("CENTER");
  }
}
