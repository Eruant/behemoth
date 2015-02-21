/**
 * The main boot file for MAPS
 */

import settings from './settings.json';

import loop from './classes/loop';
import layout from './classes/layout';
import levels from './classes/levels';

import dom from './modules/dom';
import loader from './modules/loader';
import render from './modules/render';
import io from './modules/io';

class Game {

    constructor() {

        const FRAME_LENGTH = 1000 / 10;

        var mobs = dom.loadStorage('mobs'),
            tileset = loader.loadImg('img/tileset.png');

        if (!mobs) {
            mobs = settings.mobs;
            dom.saveStorage('mobs', mobs);
        }

        this.layout = new layout(settings.width, settings.height);
        this.loop = new loop(this, FRAME_LENGTH, this.update, this.draw);
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
        this.countdown = {
          current: 3,
          interval: 3000,
          timePassed: 0
        };
        this.loop.start();

    }

    start() {

        this.isLoading = false;
        this.currentLevel = this.levels.maps[this.levels.currentMap];
        render.clearLoader(this.layout.ctx);
    }

    update(t) {

        if (io.isKeyPressed() && this.keyActive === false) {
            this.keyActive = true;
            this.levels.triggerGates(this.currentLevel);
        } else if (!io.isKeyPressed()) {
            this.keyActive = false;
        }

        if (!this.isLoading) {
            if (this.countdown.current > 0) {

                this.countdown.timePassed += t;

                if (this.countdown.timePassed > this.countdown.interval) {
                    this.countdown.current--;
                    this.countdown.timePassed -= this.countdown.interval;
                }

            } else {
                this.levels.updateMobs();
            }
        }

    }

    draw() {

        this.layout.ctx.fillStyle = 'hsl(30, 30%, 40%)';
        this.layout.ctx.fillRect(0, 0, settings.width, settings.height);

        if (this.isLoading) {
            render.drawLoader(this.layout.ctx, loader.progress());
        } else {

            let offset = {
                x: 0,
                y: 0
            };

            if (this.currentLevel.width * render.tileSize < render.width) {
                offset.x = (render.width - (this.currentLevel.width * render.tileSize)) * 0.5;
            } else {
                offset.y = (render.height - (this.currentLevel.height * render.tileSize)) * 0.5;
            }

            this.layout.ctx.save();
            this.layout.ctx.translate(offset.x, offset.y);

            render.drawMap(this.layout.ctx, this.currentLevel);
            render.drawMobs(this.layout.ctx, this.currentLevel.mobs, this.currentLevel);

            this.layout.ctx.restore();

            if (this.countdown.current > 0) {
                render.drawCountdown(this.layout.ctx, this.countdown.current);
            }

        }

    }

}

var game = new Game();
