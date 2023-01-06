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
