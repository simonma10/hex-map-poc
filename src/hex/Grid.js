import Hex from './Hex';
import Point from './Point';
import * as h from './hex-constants';
import { getRandomColorInt } from './hex-utils';


class Grid {
    constructor(){
        this.hexArray = [];
        this.offsetSystem = '';
        this.cols = 50;
        this.rows = 50;
        this.hexSize = 24;
    }

    populate(){
        for (let i = 0; i < this.cols; i++){
            for (let j = 0; j < this.rows; j++){
                let hex = new Hex(i, j, -i - j, h.ORIENTATION_FLAT_TOPPED, 100, 100, this.hexSize);

                // TODO: this code forces offset system to odd-Q; need to cater for other systems
                hex.centreX = hex.q * hex.dx;
                hex.centreY = (hex.r * hex.dy) + (hex.dy * ((hex.q & 1)/2));

                hex.updatePoints(new Point(hex.centreX, hex.centreY));
                hex.setStyle(getRandomColorInt(), 0x383838, 2, 1 );
                this.hexArray.push(hex);
            }
        }
    }

    render(graphics){
        this.hexArray.forEach(hex => {
            hex.fill(graphics);
            hex.outline(graphics);
        });
    }

    findHex(x, y, graphics){
        this.hexArray.forEach(hex => {
            if (hex.contains(x, y)){
                console.log(hex.q, hex.r, hex.s);
                hex.setStyle(0xffffff, 0xff0000, 4, 1 );
                //hex.outline(graphics);
                hex.fill(graphics);
            }
        });
    }



}

export default Grid;