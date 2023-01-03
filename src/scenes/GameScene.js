import * as PIXI from "pixi.js";
import Scene from "../components/Scene";
import saves from "../managers/saves";
import { EndScene } from "./EndScene";
import IMAGE_BALL from "../../img/ball.png";

export class GameScene extends Scene {
  // ボールを宣言する
  ball = new PIXI.Sprite();
  // スコアボードを宣言する
  scoreboard = new PIXI.Text();

  // ボールの毎フレーム動くx方向
  ballVx = 5;
  // ボールの毎フレーム動くy方向
  ballVy = 0;

  constructor() {
    super();
  }
  async start() {
    // スコアを初期化する
    saves.score = 0;
    // ボール画像を表示するスプライトオブジェクトを実体化させる
    this.ball = new PIXI.Sprite(
      //引数では、テクスチャのプリロードを行う
      await PIXI.Texture.fromLoader(IMAGE_BALL)
    );
    this.ball.x = 200; // x座標
    this.ball.y = 500; // y座標
    this.ball.interactive = true; // クリック可能にする
    this.ball.on("pointerdown", () =>
      // クリック時に発動する関数
      {
        saves.score++; // スコアを１増やす
        this.ballVy = -8; // ボールのＹ速度を-8にする(上に飛ぶようにしている)
      }
    );
    this.instantiate(this.ball); // ボールをシーンに追加

    // テキストに関するパラメータを定義する(ここで定義した意外にもたくさんパラメータがある)
    const textStyle = new PIXI.TextStyle({
      fontFamily: "Arial", // フォント
      fontSize: 20, // フォントサイズ
      fill: 0xffffff, // 色(16進数で定義するので#ffffffと書かずに0xffffffと書く)
      dropShadow: true, // ドロップシャドウを有効にする（右下に影をつける）
      dropShadowDistance: 2, // ドロップシャドウの影の距離
    });

    this.scoreboard = new PIXI.Text("SCORE:0", textStyle); //スコア表示テキスト
    this.instantiate(this.scoreboard); // スコア表示テキストを画面に追加する
  }
  update() {
    // 毎フレームごとに処理するゲームループ
    // スコアテキストを毎フレームアップデートする
    this.scoreboard.text = `SCORE:${saves.score}`;

    if (saves.score === 0) return; // スコアが０の時(球に触っていないとき)はここで終了させる

    this.ball.x += this.ballVx; // ボールに速度を加算
    this.ball.y += this.ballVy; // ボールに速度を加算
    if (this.ball.x > 340) {
      // ボールが右端に到達したら(画面横幅400,球横幅60、アンカーは左上なので400-60=340の位置で球が右端に触れる)
      this.ball.x = 340; // xの値を340にする(次のフレームで反射処理させないために必要)
      this.ballVx = -this.ballVx; // 速度を反転して反射の挙動にする
    }
    if (this.ball.x < 0) {
      // ボールが左端に到達したら(アンカーは左上なので、0の位置で球が左端に触れる)
      this.ball.x = 0; // xの値を0にする(次のフレームで反射処理させないために必要)
      this.ballVx = -this.ballVx; // 速度を反転して反射の挙動にする
    }
    this.ballVy += 0.1; // yの速度に0.1を足していくと、重力みたいな挙動になる
    if (this.ball.y >= 600) {
      // 球が画面下に消えたら
      Scene.loadScene(EndScene); // 結果画面を表示する
    }
  }
}
