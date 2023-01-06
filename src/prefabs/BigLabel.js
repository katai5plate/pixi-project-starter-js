import { Text } from "../graphics/Text";

/** 大きなラベル */
export class BigLabel extends Text {
  constructor(text, color, position) {
    super(text, 32, color);
    this.setPosition(position);
  }
}
