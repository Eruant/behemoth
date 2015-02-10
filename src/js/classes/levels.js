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

            // check clockwise

            let clockwiseDirection,
                clockwisePosition,
                clockwiseMapKey,
                clockwiseMapValue;

            if (mob.direction.x === 1) {
                clockwiseDirection = { x: 0, y: 1 };
            } else if (mob.direction.x === -1) {
                clockwiseDirection = { x: 0, y: -1 };
            } else if (mob.direction.y === 1) {
                clockwiseDirection = { x: -1, y: 0 };
            } else if (mob.direction.y === -1) {
                clockwiseDirection = { x: 1, y: 0 };
            }

            clockwisePosition = {
                x: mob.position.x + clockwiseDirection.x,
                y: mob.position.y + clockwiseDirection.y
            };

            clockwiseMapKey = map.getKeyForCoordinates(clockwisePosition);
            clockwiseMapValue = map.data[clockwiseMapKey];

            if (clockwiseMapValue === '.' || clockwiseMapValue === 'o') {
                mob.position = clockwisePosition;
                mob.direction = clockwiseDirection;
            } else {

                // check anti clockwise
                let anticlockwiseDirection = {
                        x: (clockwiseDirection.x * -1),
                        y: (clockwiseDirection.y * -1)
                    },
                    anticlockwisePosition = {
                        x: mob.position.x + anticlockwiseDirection.x,
                        y: mob.position.y + anticlockwiseDirection.y
                    },
                    anticlockwiseMapKey = map.getKeyForCoordinates(anticlockwisePosition),
                    anticlockwiseMapValue = map.data[anticlockwiseMapKey];

                if (anticlockwiseMapValue === '.' || anticlockwiseMapValue === 'o') {
                    mob.position = anticlockwisePosition;
                    mob.direction = anticlockwiseDirection;
                } else {
                    console.log('I\'m stuck!');
                }
            }
        }

    }

}

export default levels;
