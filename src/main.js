import Scene from "./components/Scene";
import { GameScene } from "./scenes/GameScene";

const main = async () => {
  // ゲームシーンを開始する
  Scene.loadScene(GameScene);
};

main();
