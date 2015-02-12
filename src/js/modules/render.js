class render {

    constructor() {
    }

    setDimentions(width, height) {
        this.width = width;
        this.height = height;
        this.tileSize = 32;
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

    drawMap(ctx, map) {

        var x = 0,
            y = 0;

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

            ctx.fillRect(x, y, this.tileSize - 1, this.tileSize - 1);

            if (i % map.width === map.width - 1) {
                x = 0;
                y += this.tileSize;
            } else {
                x += this.tileSize;
            }
        }
    }

    drawMobs(ctx, mobs) {

        var mobSize = this.tileSize * 0.7,
            padding = (this.tileSize - mobSize) * 0.5;

        ctx.fillStyle = 'hsl(240, 50%, 60%)';

        for (let i = 0, len = mobs.length; i < len; i++) {

            let mob = mobs[i];

            ctx.save();
            ctx.translate(mob.position.x * this.tileSize, mob.position.y * this.tileSize);
            ctx.fillRect(padding, padding, mobSize, mobSize);

            // TODO draw mob body parts
            ctx.restore();
        }


    }
}

export default new render();
