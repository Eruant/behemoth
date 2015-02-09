import map from './map';
import loader from '../modules/loader';

class levels {

    constructor() {

        this.maps = {};
        this.currentMap = null;
    }

    add(options) {

        this.maps[options.name] = new map(options);

        this.maps[options.name].mobs = [];
        for (let i = 0, len = options.mobs.length; i < len; i++) {

            let mob = options.mobs[i];
            mob.position = {
                x: parseInt(mob.position.x, 10),
                y: parseInt(mob.position.y, 10)
            };
            mob.direction = {
                x: parseInt(mob.direction.x, 10),
                y: parseInt(mob.direction.y, 10)
            };

            this.maps[options.name].mobs.push(mob);
        }
    }

    setMap(name) {
        this.currentMap = name;
    }

    load(path) {

        var url = '/data/levels/' + path + '.json';

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
    }

    updateMob(mob) {

        let nextPosition = {
                x: mob.position.x + mob.direction.x,
                y: mob.position.y + mob.direction.y
            },
            map = this.maps[this.currentMap],
            mapKey = map.getKeyForCoordinates(nextPosition),
            mapValue = map.data[mapKey];


        if (mapValue === '.' || mapValue === 'o') {
            mob.position = nextPosition;
        } else {
            // TODO figure out the best path to take

            /*
            if (mob.direction.x === 1) {
                mob.direction = { x: 0, y: 1 };
            } else if (mob.direction.x === -1) {
                mob.direction = { x: 0, y: -1 };
            } else if (mob.direction.y === 1) {
                mob.direction = { x: -1, y: 0 };
            } else if (mob.direction.y === -1) {
                mob.direction = { x: 1, y: 0 };
            }
            */
        }

    }

}

export default levels;
