/**
 * The main boot file for MAPS
 */

import settings from './settings.json';
import loop from './classes/loop';
import layout from './classes/layout';
import levels from './classes/levels';
import loader from './modules/loader';
import render from './modules/render';

class game {

    constructor() {

        const frameLength = 1000 / 60;

        this.layout = new layout(settings.width, settings.height);
        this.loop = new loop(this, frameLength, this.update, this.draw);
        this.levels = new levels();

        this.levels.load('level1');
        loader.onLoaded(this, this.start);

    }

    start() {
        this.currentLevel = this.levels.maps.level1;
        this.loop.start();
    }

    update() {

        //console.log('loaded: %d', Math.floor(loader.progress() * 100));
    }

    draw() {

        render.draw(this.layout.ctx, this.currentLevel);
    }

}

var game = new game();
