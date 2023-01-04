import * as PIXI from "pixi.js";
import { Vector2 } from "../components/Vector2";
import { Text } from "./Text";

/** 簡易ボタン */
export class ButtonSprite extends PIXI.Container {
  /**
   * @param {string} text テキスト
   * @param {number} width 横幅
   * @param {number} height 縦幅
   * @param {number} color 色 `0x123456`
   */
  constructor(text, width, height, color) {
    super();

    // 文字サイズ
    const fontSize = 20;
    // ボタン背景の透明度
    const buttonOpacity = 0.6;

    // ボタン背景
    const backColor = new PIXI.Graphics(); // 描き込み可能なオブジェクト
    backColor.beginFill(color, buttonOpacity); // 色、透明度を指定して描画開始
    backColor.drawRect(0, 0, width, height); // 位置(0,0)を左上にして、width,heghtの四角形を描画
    backColor.endFill(); // 描画完了
    this.addChild(backColor); // 背景をボタンコンテナに追加

    const buttonText = new Text(text, fontSize, 0xffffff); // テキストオブジェクトを定義
    buttonText.setPosition(
      new Vector2(
        // ボタン中央にテキストを設置するため、width/2の値をx値に指定
        width / 2,
        // ボタン中央テキストを設置するため、height/2の値をy値に指定
        height / 2
      )
    );
    this.addChild(buttonText); // ボタンテキストをボタンコンテナに追加
  }
}
