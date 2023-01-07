import * as PIXI from "pixi.js";
import { Vector2 } from "../../components/Vector2";
import { Text } from "./Text";

/** 簡易ボタン */
export class ButtonSprite extends PIXI.Container {
  constructor(text: string, width: number, height: number, color: number) {
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
        // ボタン中央にテキストを設置するため、ボタン幅の半分を x 値に指定
        width / 2,
        // ボタン中央にテキストを設置するため、ボタン高さの半分を y 値に指定
        height / 2
      )
    );
    buttonText.setOrigin("CENTER");
    this.addChild(buttonText); // ボタンテキストをボタンコンテナに追加
  }
}
