import { Vector2 } from "../../components/Vector2";
import { Text } from "../atoms/Text";

/** スコアボード */
export class Scoreboard extends Text {
  constructor({
    text,
    color,
    position,
  }: {
    text: string;
    color: number;
    position: Vector2;
  }) {
    super(text, 20, color);
    this.setPosition(position);
    this.setOrigin("CORNER");
  }
}
