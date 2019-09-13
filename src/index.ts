import Game from './game';

if (module.hot) {
  module.hot.accept(() => {
    const HMRGame = require('./game.ts').default;
    const hmrGame = new HMRGame(); // eslint-disable-line
  });
}

const game = new Game(); // eslint-disable-line
