import Scene from "../../components/Scene";
import { Vector2 } from "../../components/Vector2";
import { db, engine } from "../../database";
import { Text } from "../../graphics/Text";
import { RetryButton, TweetButton } from "./buttons";

/**
 * ゲームの結果画面シーンを生成する関数
 */
export class EndScene extends Scene {
  /** @type {Text} */
  message;
  /** @type {RetryButton} */
  retryButton;
  /** @type {TweetButton} */
  tweetButton;

  constructor() {
    super();
  }
  async start() {
    // テキストオブジェクトの定義
    this.message = new Text(`SCORE:${db.score}で力尽きた`, 32, 0xfcbb08); // 結果画面のテキスト
    this.message.setPosition(
      engine.screen.grid(
        // 画面幅の半分の座標（真ん中）
        1 / 2,
        // 画面高さの 3 分の 1 の座標（中央よりやや上）
        1 / 3
      )
    );
    this.instantiate(this.message); // 結果画面シーンにテキスト追加

    /**
     * 自作のボタン生成関数を使って、もう一度ボタンを生成
     */
    this.retryButton = new RetryButton();
    this.instantiate(this.retryButton); // ボタンを結果画面シーンに追加

    /**
     * 自作のボタン生成関数を使って、ツイートボタンを生成
     */
    this.tweetButton = new TweetButton();
    this.instantiate(this.tweetButton); // ボタンを結果画面シーンに追加
  }
}
