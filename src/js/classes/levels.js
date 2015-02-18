import map from './map';
import loader from '../modules/loader';
import mob from './mob';
import dom from '../modules/dom';

class levels {

    constructor() {

        this.maps = {};
        this.currentMap = null;
    }

    add(options) {

        var mobSettings = dom.loadStorage('mobs');

        this.maps[options.name] = new map(options);

        this.maps[options.name].mobs = [];
        for (let i = 0, len = options.mobs.length; i < len; i++) {

            let mobData = options.mobs[i];

            let position = {
                x: parseInt(mobData.position.x, 10),
                y: parseInt(mobData.position.y, 10)
            };

            let direction = {
                x: parseInt(mobData.direction.x, 10),
                y: parseInt(mobData.direction.y, 10)
            };

            let color = parseInt(mobSettings[i].color, 10);

            this.maps[options.name].mobs.push(new mob(position, direction, color));
        }
    }

    setMap(name) {
        this.currentMap = name;
    }

    load(path) {

        var url = './data/levels/' + path + '.json';

        loader.load(url, (type, data) => {
            if (type === 'success') {

                var map = JSON.parse(data);

                this.add(map);
            }
        });
    }

    triggerGates(map) {

        for (let i = 0, len = map.data.length; i < len; i++) {

            switch (map.data[i]) {
                case 'o':
                    map.data[i] = 'c';
                    break;
                case 'c':
                    map.data[i] = 'o';
                    break;
            }
        }
    }

    updateMobs() {

        for (let i = 0, len = this.maps[this.currentMap].mobs.length; i < len; i++) {
            this.updateMob(this.maps[this.currentMap].mobs[i]);
        }

        this.checkCollisions();
    }

    updateMob(mob) {

        var map = this.maps[this.currentMap],
            nextPosition = mob.getNextPosition(),
            nextMapKey = map.getKeyForCoordinates(nextPosition),
            nextMapValue = map.data[nextMapKey],
            startPosition = mob.position;

        if (nextMapValue.match(/[\.o]/)) {
            mob.setPosition(nextPosition);
        } else {
            mob.rotate();
            nextPosition = mob.getNextPosition();
            nextMapKey = map.getKeyForCoordinates(nextPosition);
            nextMapValue = map.data[nextMapKey];

            if (nextMapValue.match(/[\.o]/)) {
                mob.setPosition(nextPosition);
            } else {
                mob.rotate();
                mob.rotate();
                nextPosition = mob.getNextPosition();
                nextMapKey = map.getKeyForCoordinates(nextPosition);
                nextMapValue = map.data[nextMapKey];

                if (nextMapValue.match(/[\.o]/)) {
                    mob.setPosition(nextPosition);
                } else {
                    console.warn('mob stuck');
                }
            }
        }

    }

    checkCollisions() {

        var occupiedSlots = [],
            mobs = this.maps[this.currentMap].mobs,
            deadMobs = [];

        for (let i = 0, len = mobs.length; i < len; i++) {

            let mob = mobs[i];

            for (let j = 0, jLen = mob.bodyParts.length; j < jLen; j++) {
                occupiedSlots.push({
                    mob: i,
                    part: j,
                    position: mob.bodyParts[j]
                });
            }

        }

        for (let i = 0, len = occupiedSlots.length; i < len; i++) {

            let slot = occupiedSlots[i];

            for (let j = 0, jLen = mobs.length; j < jLen; j++) {

                let mob = mobs[j];

                if (mob.position.x === slot.position.x && mob.position.y === slot.position.y) {

                    let targetMob = mobs[slot.mob];

                    targetMob.bodyParts.length = j;
                    targetMob.length = j + 1;

                    mob.addBodyPart();

                    if (targetMob.length < targetMob.minLength) {
                        deadMobs.push(slot.mob);
                    }

                }

            }
        }

        // sort decending
        deadMobs = deadMobs.sort(function (a, b) {
            return b - a;
        });

        for (let i = 0, len = deadMobs.length; i < len; i++) {

            //console.log('Killed', mobs[deadMobs[i]]);
            mobs.splice(deadMobs[i], 1);

            if (mobs.length === 1) {
                //console.log('winner', mobs[0]);
            }
        }

    }

}

export default levels;
