import Scene from "./prefabs/Scene";
import { GameScene } from "./scenes/game";

const main = async () => {
  // ゲームシーンを開始する
  Scene.loadScene(GameScene);
};

main();
