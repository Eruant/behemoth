class render {

    constructor() {
    }

    draw(ctx, map) {

        var x = 0,
            y = 0,
            tileSize = 32;

        for (let i = 0, len = map.data.length; i < len; i++) {

            switch (map.data[i]) {
                case 'X':
                      ctx.fillStyle = 'hsl(100, 50%, 60%)';
                      break;
                case 'c':
                      ctx.fillStyle = 'hsl(30, 50%, 80%)';
                      break;
                case 'o':
                      ctx.fillStyle = 'hsl(30, 50%, 60%)';
                      break;
                default:
                      ctx.fillStyle = 'hsl(30, 50%, 60%)';
            }

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
