import * as PIXI from "pixi.js";
import { Button } from "../components/Button";
import { db } from "../database";
import Scene from "../components/Scene";
import { GameScene } from "./GameScene";

/**
 * ゲームの結果画面シーンを生成する関数
 */
export class EndScene extends Scene {
  // 宣言する
  message;
  retryButton;
  tweetButton;

  constructor() {
    super();
  }
  async start() {
    // テキストに関するパラメータを定義する(ここで定義した意外にもたくさんパラメータがある)
    const textStyle = new PIXI.TextStyle({
      fontFamily: "Arial", // フォント
      fontSize: 32, // フォントサイズ
      fill: 0xfcbb08, // 色(16進数で定義する これはオレンジ色)
      dropShadow: true, // ドロップシャドウを有効にする（右下に影をつける）
      dropShadowDistance: 2, // ドロップシャドウの影の距離
    });

    // テキストオブジェクトの定義
    this.message = new PIXI.Text(`SCORE:${db.score}で力尽きた`, textStyle); // 結果画面のテキスト
    this.message.anchor.x = 0.5; // アンカーのxを中央に指定
    this.message.x = 200; // 座標指定 (xのアンカーが0.5で中央指定なので、テキストのx値を画面中央にすると真ん中にテキストが表示される)
    this.message.y = 200; // 座標指定 (yのアンカーはデフォルトの0なので、画面上から200の位置にテキスト表示)
    this.instantiate(this.message); // 結果画面シーンにテキスト追加

    /**
     * 自作のボタン生成関数を使って、もう一度ボタンを生成
     */
    this.retryButton = new Button("もう一度", 100, 60, 0xff0000, () => {
      // クリックした時の処理
      new GameScene(); // ゲームシーンを生成する
    });
    this.retryButton.x = 50; // ボタンの座標指定
    this.retryButton.y = 500; // ボタンの座標指定
    this.instantiate(this.retryButton); // ボタンを結果画面シーンに追加

    /**
     * 自作のボタン生成関数を使って、ツイートボタンを生成
     */
    this.tweetButton = new Button("ツイート", 100, 60, 0x0000ff, () => {
      //ツイートＡＰＩに送信
      //結果ツイート時にURLを貼るため、このゲームのURLをここに記入してURLがツイート画面に反映されるようにエンコードする
      const url = encodeURI("https://hothukurou.com"); // ツイートに載せるURLを指定(文字はエンコードする必要がある)
      window.open(
        `http://twitter.com/intent/tweet?text=SCORE:${db.score}点で力尽きた&hashtags=sample&url=${url}`
      ); //ハッシュタグをsampleにする
    });
    this.tweetButton.x = 250; // ボタンの座標指定
    this.tweetButton.y = 500; // ボタンの座標指定
    this.instantiate(this.tweetButton); // ボタンを結果画面シーンに追加
  }
}
