/**
 * The main boot file for MAPS
 */

import settings from './settings.json';

import loop from './classes/loop';
import layout from './classes/layout';
import levels from './classes/levels';

import loader from './modules/loader';
import render from './modules/render';
import io from './modules/io';

class game {

    constructor() {

        const frameLength = 1000 / 1;

        this.layout = new layout(settings.width, settings.height);
        this.loop = new loop(this, frameLength, this.update, this.draw);
        this.levels = new levels();
        render.setDimentions(settings.width, settings.height);

        this.levels.load('level2');
        this.levels.setMap('level2');
        this.isLoading = true;
        loader.onLoaded(this, this.start);

        this.keyActive = false;
        this.loop.start();

    }

    start() {

        this.isLoading = false;
        this.currentLevel = this.levels.maps.level2;
        render.clearLoader(this.layout.ctx);
    }

    update() {

        if (io.isKeyPressed() && this.keyActive === false) {
            this.keyActive = true;
            this.levels.triggerGates(this.currentLevel);
        } else if (!io.isKeyPressed()) {
            this.keyActive = false;
        }

        this.levels.updateMobs();

    }

    draw() {

        if (this.isLoading) {
            render.drawLoader(this.layout.ctx, loader.progress());
        } else {
            render.drawMap(this.layout.ctx, this.currentLevel);
            render.drawMobs(this.layout.ctx, this.currentLevel.mobs);
        }
    }

}

var game = new game();
