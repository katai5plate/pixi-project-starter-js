import * as PIXI from "pixi.js";
import { Text } from "./Text";

/**
 * ボタンを生成してオブジェクトを返す
 * @param text テキスト
 * @param width 横幅
 * @param height 縦幅
 */
export class Button extends PIXI.Container {
  constructor(text, width, height, color, onClick) {
    super();
    const fontSize = 20; // フォントサイズ
    const buttonAlpha = 0.6; // ボタン背景の透明度

    // ボタン作成
    const backColor = new PIXI.Graphics(); // グラフィックオブジェクト（背景に半透明な四角を配置するために使用）
    backColor.beginFill(color, buttonAlpha); // 色、透明度を指定して描画開始
    backColor.drawRect(0, 0, width, height); // 位置(0,0)を左上にして、width,heghtの四角形を描画
    backColor.endFill(); // 描画完了
    backColor.interactive = true; // クリック可能にする
    backColor.on("pointerdown", onClick); // クリック時にonClickの関数を実行する
    this.addChild(backColor); // 背景をボタンコンテナに追加

    const buttonText = new Text(text, fontSize, 0xffffff); // テキストオブジェクトを定義
    buttonText.x = width / 2; // ボタン中央にテキストを設置するため、width/2の値をx値に指定
    buttonText.y = height / 2; // ボタン中央テキストを設置するため、height/2の値をy値に指定
    this.addChild(buttonText); // ボタンテキストをボタンコンテナに追加
  }
}
