/**
 * The main boot file for MAPS
 */

import settings from './settings.json';
import loop from './classes/loop';
import layout from './classes/layout';

class game {

    constructor() {

        const frameLength = 1000 / 60;

        this.layout = new layout(settings.width, settings.height);
        this.loop = new loop(frameLength, this.update, this.draw);

    }

    start() {
        this.loop.start();
    }

    update() {
    }

    draw() {
    }

}

var game = new game();

game.start();
