export default class Loop {

    constructor(fps = (1000 / 60)) {
        this.fps = fps;
        this.pause = true;
    }

    start() {
        this.pause = false;
        this.startTime = new Date().getTime();
        this.timeSinceLastUpdate = 0;
    }

}
