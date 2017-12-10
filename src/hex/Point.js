class Point{
    constructor (x = 0, y = 0){
        this.x = x;
        this.y = y;
    }

    toPhaserPoint(){
        return new Phaser.Point(this.x, this.y);
    }

    fromPhaserPoint(p){
        this.x = p.x;
        this.y = p.y;
    }

}

export default Point;