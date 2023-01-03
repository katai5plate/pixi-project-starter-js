import { AppManager } from "./managers/AppManager";

export const db = {
  /** アプリケーション */
  app: new AppManager({
    width: 400,
    height: 600,
    backgroundColor: 0x333333,
  }),
  /** スコア */
  score: 0,
};
