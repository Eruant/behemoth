
class mob {

    constructor(position, direction) {

        this.position = {
            x: position.x || 0,
            y: position.y || 0
        };

        this.direction = {
            x: direction.x || 0,
            y: direction.y || 0
        };
    }

    setPosition(position) {
        this.position.x = position.x;
        this.position.y = position.y;
    }

    setDirection(direction) {

        if (typeof direction === 'object') {
            this.direction.x = direction.x;
            this.direction.y = direction.y;
        } else if (typeof direction === 'string') {

            let x = 0,
                y = 0;

            switch (direction) {
                case 'right':
                    x = 1;
                    y = 0;
                    break;
                case 'left':
                    x = -1;
                    y = 0;
                    break;
                case 'up':
                    x = 0;
                    y = -1;
                    break;
                case 'down':
                    x = 0;
                    y = 1;
                    break;
            }

            this.direction.x = x;
            this.direction.y = y;
        }
    }

    getDirection(asString = false) {

        if (asString) {
            return this.getDirectionAsString();
        } else {
            return this.direction;
        }
    }

    getDirectionAsString() {

        var direction;

        if (this.direction.x === 1) {
            direction = 'right';
        } else if (this.direction.x === -1) {
            direction = 'left';
        } else if (this.direction.y === 1) {
            direction = 'down';
        } else if (this.direction.y === -1) {
            direction = 'up';
        }

        return direction;
    }

    rotate(clockwise = true) {

        if (clockwise) {
            switch (this.getDirection(true)) {
                case 'left':
                    this.setDirection('up');
                    break;
                case 'right':
                    this.setDirection('down');
                    break;
                case 'up':
                    this.setDirection('right');
                    break;
                case 'down':
                    this.setDirection('left');
                    break;
            }
        } else {
            // TODO rotate right
        }

    }

    getNextPosition() {

        return {
            x: this.position.x + this.direction.x,
            y: this.position.y + this.direction.y
        };
    }

}

export default mob;
