import { Button } from "../../components/Button";
import { Vector2 } from "../../components/Vector2";
import { db } from "../../database";
import { makeTwitterShareUrl } from "../../utils";
import { GameScene } from "../GameScene";

/** もう一度ボタン */
export class RetryButton extends Button {
  constructor({ position }: { position: Vector2 }) {
    super("もう一度", 100, 60, 0xff0000, () => {
      // クリックした時の処理
      new GameScene(); // ゲームシーンに遷移する
    });
    // 原点を中心にする
    this.setOrigin("CENTER");
    // ボタンの座標指定
    this.setPosition(position);
  }
}

/** ツイートボタン */
export class TweetButton extends Button {
  constructor({ position }: { position: Vector2 }) {
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
    this.setPosition(position);
  }
}
