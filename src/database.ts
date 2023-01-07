import { AppManager } from "./managers/AppManager";
import { ScreenManager } from "./managers/ScreenManager";

const app = new AppManager({
  // ゲーム画面の幅高
  width: 400,
  height: 600,
  // ゲーム画面のデフォルト背景
  backgroundColor: 0x333333,
  // ドットのぼけを防止するか
  isPixelated: false,
  // デバッグ機能を有効にするか
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
