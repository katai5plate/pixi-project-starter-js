import { AppManager } from "./managers/AppManager";
import { ScreenManager } from "./managers/ScreenManager";

const app = new AppManager({
  width: 400,
  height: 600,
  backgroundColor: 0x333333,
  isPixelated: false,
});
const screen = new ScreenManager(app);

export const db = {
  /** 描画エンジンの設定 */
  app,
  /** 画面の設定 */
  screen,
  /** スコア */
  score: 0,
};
