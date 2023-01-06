import { AppManager } from "./managers/AppManager";
import { ScreenManager } from "./managers/ScreenManager";

const app = new AppManager({
  width: 400,
  height: 600,
  backgroundColor: 0x333333,
  isPixelated: false,
  isDebug: true,
});
const screen = new ScreenManager(app);

/** ゲームエンジン関連の状態管理 */
export const engine = {
  /** 描画エンジンの設定 */
  app,
  /** 画面の設定 */
  screen,
};

/** ゲーム内容の状態管理 */
export const db = {
  /** スコア */
  score: 0,
};
