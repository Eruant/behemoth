/**
 * The main boot file for MAPS
 */

import settings from './settings.json';

import loop from './classes/loop';
import layout from './classes/layout';
import levels from './classes/levels';

//import dom from './modules/dom';
import loader from './modules/loader';
import render from './modules/render';
import io from './modules/io';

class Game {

    constructor() {

        const frameLength = 1000 / 30;

        // TODO finish this
        //var mobs = dom.load('mobs') || settings.mobs;
        //console.log('mobs', mobs);

        this.layout = new layout(settings.width, settings.height);
        this.loop = new loop(this, frameLength, this.update, this.draw);
        this.levels = new levels();
        render.setDimentions(settings.width, settings.height);

        for (let i = 0, len = 4; i < len; i++) {

            let levelText = 'level' + (i + 1);

            this.levels.load(levelText);
        }

        this.levels.setMap('level4');
        this.isLoading = true;
        loader.onLoaded(this, this.start);

        this.keyActive = false;
        this.loop.start();

    }

    start() {

        this.isLoading = false;
        this.currentLevel = this.levels.maps[this.levels.currentMap];
        render.clearLoader(this.layout.ctx);
    }

    update() {

        if (io.isKeyPressed() && this.keyActive === false) {
            this.keyActive = true;
            this.levels.triggerGates(this.currentLevel);
        } else if (!io.isKeyPressed()) {
            this.keyActive = false;
        }

        if (!this.isLoading) {
            this.levels.updateMobs();
        }

    }

    draw() {

        if (this.isLoading) {
            render.drawLoader(this.layout.ctx, loader.progress());
        } else {
            render.drawMap(this.layout.ctx, this.currentLevel);
            render.drawMobs(this.layout.ctx, this.currentLevel.mobs, this.currentLevel);
        }

    }

}

var game = new Game();
