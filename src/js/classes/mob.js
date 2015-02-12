
class mob {

    constructor(position, direction) {

        this.length = 3;
        this.minLength = 3;

        this.position = {
            x: position.x || 0,
            y: position.y || 0
        };

        this.direction = {
            x: direction.x || 0,
            y: direction.y || 0
        };

        this.bodyParts = [];

        for (let i = 0, len = this.length -1; i < len; i++) {
            this.addBodyPart();
        }

    }

    addBodyPart() {

        var position;

        if (this.bodyParts.length === 0) {
            position = {
                x: this.position.x,
                y: this.position.y
            };
        } else {
            let part = this.bodyParts[this.bodyParts.length - 1];

            position = {
                x: part.x,
                y: part.y
            };
        }

        this.bodyParts.push(position);
    }

    setPosition(position) {

        var startPosition = {
            x: this.position.x,
            y: this.position.y
        };

        this.position.x = position.x;
        this.position.y = position.y;

        this.updateBodyParts(startPosition);
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
            this.rotate();
            this.rotate();
            this.rotate();
        }

    }

    getNextPosition() {

        return {
            x: this.position.x + this.direction.x,
            y: this.position.y + this.direction.y
        };
    }

    updateBodyParts(position) {

        var lastPart = {
            x: position.x,
            y: position.y
        };

        for (let i = 0, len = this.bodyParts.length; i < len; i++) {

            let part = this.bodyParts[i];

            if (part.x !== lastPart.x || part.y !== lastPart.y) {

                let thisPart = {
                    x: this.bodyParts[i].x,
                    y: this.bodyParts[i].y
                };

                this.bodyParts[i].x = lastPart.x;
                this.bodyParts[i].y = lastPart.y;

                lastPart.x = thisPart.x;
                lastPart.y = thisPart.y;

            }
        }

        //console.log('parts [x:%d y: %d] [x:%d, y:%d]',
            //this.bodyParts[0].x,
            //this.bodyParts[0].y,
            //this.bodyParts[1].x,
            //this.bodyParts[1].y
        //);

    }

}

export default mob;
