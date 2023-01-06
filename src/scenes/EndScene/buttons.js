import { Button } from "../../components/Button";
import { db, engine } from "../../database";
import { makeTwitterShareUrl } from "../../utils";
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
    this.setPosition(
      engine.screen.grid(
        // 画面幅の 4 分の 1 の X 座標
        1 / 4,
        // 画面高さの 6 分の 5 の Y 座標
        5 / 6
      )
    );
  }
}

export class TweetButton extends Button {
  constructor() {
    super("ツイート", 100, 60, 0x0000ff, () => {
      // 新しいウィンドウを開く
      window.open(
        // 結果ツイートのために最適化した URL を指定
        makeTwitterShareUrl(
          `SCORE:${db.score}点で力尽きた`,
          //ハッシュタグを sample にする
          ["sample"],
          // ツイートに載せるURL
          "https://hothukurou.com"
        )
      );
    });
    // 原点を中心にする
    this.setOrigin("CENTER");
    // ボタンの座標指定
    this.setPosition(
      engine.screen.grid(
        // 画面幅の 4 分の 3 の X 座標
        3 / 4,
        // 画面高さの 6 分の 5 の Y 座標
        5 / 6
      )
    );
  }
}
