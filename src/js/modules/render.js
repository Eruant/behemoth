class render {

    constructor() {
    }

    draw(ctx, map) {

        var x = 0,
            y = 0,
            tileSize = 30;

        for (let i = 0, len = map.data.length; i < len; i++) {

            ctx.fillRect(x, y, tileSize - 1, tileSize - 1);

            if (i % map.width === map.width - 1) {
                x = 0;
                y += tileSize;
            } else {
                x += tileSize;
            }
        }
    }
}

export default new render();
