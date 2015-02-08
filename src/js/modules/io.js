import dom from './dom';

class io {

    constructor() {
        this.bindKeyboard();
        this.activeKeys = [];
    }

    bindKeyboard() {
        dom.eventListener(this, true, 'keydown', this.keyPressed);
        dom.eventListener(this, true, 'keyup', this.keyReleased);
    }

    keyPressed(event) {

        if (this.activeKeys.indexOf(event.keyCode) === -1) {
            this.activeKeys.push(event.keyCode);
        }

    }

    keyReleased(event) {

        var i = this.activeKeys.indexOf(event.keyCode);

        if (i !== -1) {
            this.activeKeys.splice(i, 1);
        }
    }

    getDirection() {

        var left = (this.activeKeys.indexOf(37) !== -1) ? -1 : 0,
            right = (this.activeKeys.indexOf(39) !== -1) ? 1 : 0,
            up = (this.activeKeys.indexOf(38) !== -1) ? -1 : 0,
            down = (this.activeKeys.indexOf(40) !== -1) ? 1 : 0;

        return {
            x: left + right,
            y: up + down
        };
    }

    isKeyPressed() {
        return (this.activeKeys.length > 0);
    }

}

export default new io();
