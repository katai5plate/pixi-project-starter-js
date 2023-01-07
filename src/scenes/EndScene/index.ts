import Scene from "../../components/Scene";
import { db, engine } from "../../database";
import { BigLabel } from "../../ui/molecules/BigLabel";
import { RetryButton, TweetButton } from "./buttons";

/**
 * ゲームの結果画面シーンを生成する関数
 */
export class EndScene extends Scene {
  constructor() {
    super();
  }
  async start() {
    // 結果発表テキスト
    const message = new BigLabel({
      text: `SCORE:${db.score}で力尽きた`,
      color: 0xfcbb08,
      position: engine.screen.grid(
        // 画面幅の半分の X 座標（真ん中）
        1 / 2,
        // 画面高さの 3 分の 1 の Y 座標（中央よりやや上）
        1 / 3
      ),
    });
    this.instantiate(message);

    // もう一度ボタン
    const retryButton = new RetryButton({
      position: engine.screen.grid(
        // 画面幅の 4 分の 1 の X 座標
        1 / 4,
        // 画面高さの 6 分の 5 の Y 座標
        5 / 6
      ),
    });
    this.instantiate(retryButton); // ボタンを結果画面シーンに追加

    // ツイートボタン
    const tweetButton = new TweetButton({
      position: engine.screen.grid(
        // 画面幅の 4 分の 3 の X 座標
        3 / 4,
        // 画面高さの 6 分の 5 の Y 座標
        5 / 6
      ),
    });
    this.instantiate(tweetButton); // ボタンを結果画面シーンに追加
  }
}
