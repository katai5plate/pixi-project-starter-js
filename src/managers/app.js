import * as PIXI from "pixi.js";

// PIXI.JSアプリケーションを呼び出す (この数字はゲーム内の画面サイズ)
const app = new PIXI.Application({ width: 400, height: 600 });

// index.htmlのbodyにapp.viewを追加する (app.viewはcanvasのdom要素)
document.body.appendChild(app.view);

// ゲームcanvasのcssを定義する
// ここで定義した画面サイズ(width,height)は実際に画面に表示するサイズ
app.renderer.view.style.position = "relative";
app.renderer.view.style.width = "400px";
app.renderer.view.style.height = "600px";
app.renderer.view.style.display = "block";

// canvasの周りを点線枠で囲う (canvasの位置がわかりやすいので入れている)
app.renderer.view.style.border = "2px dashed black";

// canvasの背景色
app.renderer.backgroundColor = 0x333333;

export default app;
