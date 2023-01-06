import { Button } from "../../components/Button";
import { db, engine } from "../../database";
import { GameScene } from "../GameScene";

export class RetryButton extends Button {
  constructor() {
    super("もう一度", 100, 60, 0xff0000, () => {
      // クリックした時の処理
      new GameScene(); // ゲームシーンに遷移する
    });
    // 原点を中心にする
    this.setOrigin("CENTER");
    // ボタンの座標指定
    this.setPhysics({
      position: engine.screen.grid(
        // 画面幅の 4 分の 1 の座標
        1 / 4,
        // 画面高さの 6 分の 5 の座標
        5 / 6
      ),
    });
  }
}

export class TweetButton extends Button {
  constructor() {
    super("ツイート", 100, 60, 0x0000ff, () => {
      //ツイートＡＰＩに送信
      //結果ツイート時にURLを貼るため、このゲームのURLをここに記入してURLがツイート画面に反映されるようにエンコードする
      const url = encodeURI("https://hothukurou.com"); // ツイートに載せるURLを指定(文字はエンコードする必要がある)
      window.open(
        `http://twitter.com/intent/tweet?text=SCORE:${db.score}点で力尽きた&hashtags=sample&url=${url}`
      ); //ハッシュタグをsampleにする
    });
    // 原点を中心にする
    this.setOrigin("CENTER");
    // ボタンの座標指定
    this.setPhysics({
      position: engine.screen.grid(
        // 画面幅の 4 分の 3 の座標
        3 / 4,
        // 画面高さの 6 分の 5 の座標
        5 / 6
      ),
    });
  }
}
