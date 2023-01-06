import { Button } from "../../components/Button";
import { Vector2 } from "../../components/Vector2";
import { db } from "../../database";
import { GameScene } from "../GameScene";

export class RetryButton extends Button {
  constructor() {
    super("もう一度", 100, 60, 0xff0000, () => {
      // クリックした時の処理
      new GameScene(); // ゲームシーンに遷移する
    });
    // ボタンの座標指定
    this.setPhysics({ position: new Vector2(50, 500) });
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
    // ボタンの座標指定
    this.setPhysics({ position: new Vector2(250, 500) });
  }
}
