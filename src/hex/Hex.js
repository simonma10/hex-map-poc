import Point from './Point';

import * as h from './hex-constants';


export default class Hex extends Phaser.Polygon {
    constructor(q = 0, r = 0, s = 0, orientation = h.ORIENTATION_FLAT_TOPPED, centreX = 0, centreY = 0, size = 10){
        super();

        //Cube Coordinate system
        this.q = q;
        this.r = r;
        this.s = s;
        if( this.q + this.r + this.s !== 0 ){
            console.log("Invalid cube coordinates for new hex.  Coordinates q, r, s should always equal 0.");
            console.log("q=" + this.q + ", r=" + this.r + ", s=" + this.s + ". Total = " + this.q + this.r + this.s);
        }
        this.orientation = orientation;
        this.centre = new Point(centreX,centreY);
        this.centreX = centreX;
        this.centreY = centreY;
        this.size = size;
        this.corners = [];
        this.updatePoints(this.centre);
    }

    updatePoints(point){
        this.centre = point;
        this.centreX = point.x;
        this.centreY = point.y;
        this.corners = this.getCorners(this.centre, this.size, this.orientation);
        this.setTo(this.getPhaserPoints());
        this.getSpacing();
        //console.log('Hex::updatePoints. q,r,s = ', this.q, this.r, this.s, 'centre=', this.centreX, this.centreY);
    }

    getSpacing(){
        if (this.orientation === h.ORIENTATION_FLAT_TOPPED){
            this.width = this.size * 2;
            this.height = Math.sqrt(3)/2 * this.width;
            this.dy = this.height;
            this.dx = this.width * 0.75;
        } else if (this.orientation === h.ORIENTATION_POINTY_TOPPED){
            this.height = this.size * 2;
            this.width = Math.sqrt(3)/2 * this.height;
            this.dx = this.width;
            this.dy = this.height * 0.75;
        } else {
            console.log('error - invalid hex orientation:  expected ORIENTATION_POINTY_TOPPED or ORIENTATION_FLAT_TOPPED, but got ' + orientation);
        }
    }

    getCorners(centre, size, orientation){
        let corners = [];
        for (let i = 0; i < 6; i++){
            corners.push(this.getCorner(centre, size, i, orientation))
        }
        return corners;
    }

    getCorner(centre, size, i, orientation){
        let angleDeg;
        if (orientation === h.ORIENTATION_FLAT_TOPPED){
            angleDeg = 60 * i;
        } else if (orientation === h.ORIENTATION_POINTY_TOPPED){
            angleDeg = 60 * i + 30;
        } else {
            console.log('error - invalid hex orientation:  expected ORIENTATION_POINTY_TOPPED or ORIENTATION_FLAT_TOPPED, but got ' + orientation);
            return Point(0,0);
        }

        let angleRad = Math.PI / 180 * angleDeg;
        return new Point(
            centre.x + size * Math.cos(angleRad),
            centre.y + size * Math.sin(angleRad)
        )
    }

    //====================================================================
    // Phaser-specific functions
    //====================================================================

    getPhaserPoints(){
        let points = [];
        this.corners.forEach(point => {
            points.push(point.toPhaserPoint())
        });
        return points;
    }

    setStyle(fillColor, lineColor, lineWidth, alpha = 1){
        this.fillColor = fillColor;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
    }

    fill(graphics){
        //graphics.beginFill(0x00FF66);
        graphics.beginFill(this.fillColor);
        graphics.drawPolygon(this.points);
        graphics.endFill();
    }

    outline(graphics){
        graphics.lineStyle(10, 0x383838, 1);
        graphics.lineWidth = 1;
        let lineArray = this.points;

        lineArray.push(this.points[0]);
        let tPoint = lineArray[0];
        graphics.moveTo(tPoint.x, tPoint.y);

        for (let i = 1; i < 7; i++ ){
            tPoint = lineArray[i];
            graphics.lineTo(tPoint.x, tPoint.y);
        }
    }


}
