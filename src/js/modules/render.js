class render {

    constructor() {
    }

    setDimentions(width, height) {
        this.width = width;
        this.height = height;
    }

    drawLoader(ctx, progress) {

        this.clearLoader(ctx);

        ctx.fillStyle = 'hsl(270, 50%, 60%)';
        ctx.strokeStyle = 'hsl(270, 50%, 60%)';
        ctx.save();
        ctx.translate(this.width * 0.5, this.height * 0.5);
        ctx.strokeRect(-50, -5, 100, 10);
        ctx.fillRect(-50, -5, Math.floor(progress * 100), 10);
        ctx.restore();
    }

    clearLoader(ctx) {
        ctx.save();
        ctx.translate(this.width * 0.5, this.height * 0.5);
        ctx.clearRect(-51, -6, 102, 12);
        ctx.restore();
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
