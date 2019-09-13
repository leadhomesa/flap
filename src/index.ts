import Game from './game';

if (module.hot) {
  module.hot.accept(() => {
    const NewGame = require("./game.ts").default;
    new NewGame();
  });
}

new Game();