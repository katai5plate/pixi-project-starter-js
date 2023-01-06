import * as PIXI from "pixi.js";
import { Size } from "./components/Vector2";

/** 値が null か undefined かどうか */
export const isVoid = (value) => value === null || value === undefined;

/**
 * Twitter に送信する URL を生成する
 * @param {string} text つぶやき内容
 * @param {string[]?} hashtags ツイートに載せるハッシュタグ
 * @param {string?} url ツイートに載せる URL
 * @returns
 */
export const makeTwitterShareUrl = (text, hashtags, url) => {
  let result = "http://twitter.com/intent/tweet";
  // 特殊文字がある可能性があるのでエンコードする
  result += `?text=${encodeURI(text)}`;
  if (hashtags) {
    // ハッシュタグはコンマ区切り
    result += encodeURI(`&hashtags=${hashtags.join(",")}`);
  }
  if (url) {
    result += `&url=${encodeURI(url)}`;
  }
  return result;
};

/**
 * 原点を設定する計算処理
 * @param {"CORNER" | "CENTER" | {x: number, y: number}} modeOrVec2 アンカー設定（Vector2 の場合は 0 ~ 1）
 * @param {PIXI.DisplayObject | PIXI.Sprite} displayObject 設定先のオブジェクト
 * @param {Size} maxSize 幅高が存在しない場合の基準サイズ
 */
export const setOriginProcess = (modeOrVec2, displayObject, maxSize) => {
  // anchor が存在する場合
  if (displayObject.anchor) {
    // 統一するために pivot は 0 にする
    displayObject.pivot.x = 0;
    displayObject.pivot.y = 0;
    // anchor を設定
    if (typeof modeOrVec2 === "object") {
      displayObject.anchor.set(modeOrVec2.x, modeOrVec2.y);
    } else if (["CORNER", "CENTER"].includes(modeOrVec2)) {
      const anchor = modeOrVec2 === "CORNER" ? 0 : 0.5;
      displayObject.anchor.set(anchor);
    } else {
      throw new Error(`無効な設定値です: ${modeOrVec2}`);
    }
  }
  // pivot しかない場合
  else {
    let x, y;
    const [width, height] = [maxSize?.x, maxSize?.y];
    if (!Number.isFinite(width) || !Number.isFinite(height))
      throw new Error(
        `アンカーが存在しないオブジェクトを使用しているため setMaxSize の指定が必要です: ${JSON.stringify(
          { width, height }
        )}`
      );
    // pivot を設定
    if (typeof modeOrVec2 === "object") {
      [x, y] = [width * modeOrVec2.x, height * modeOrVec2.y];
    } else if (["CORNER", "CENTER"].includes(modeOrVec2)) {
      const anchor = modeOrVec2 === "CORNER" ? 0 : 0.5;
      [x, y] = [width * anchor, height * anchor];
    } else {
      throw new Error(`無効な設定値です: ${modeOrVec2}`);
    }
    displayObject.pivot.x = x;
    displayObject.pivot.y = y;
  }
};
