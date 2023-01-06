import { Text } from "../atoms/Text";

/** スコアボード */
export class Scoreboard extends Text {
  /**
   * @param {Object} _
   * @param {string} _.text テキスト
   * @param {number} _.color 色 0x123456
   * @param {Vector2} _.position 座標
   */
  constructor({ text, color, position }) {
    super(text, 20, color);
    this.setPosition(position);
    this.setOrigin("CORNER");
  }
}
