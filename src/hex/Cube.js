import Axial from './Axial';

class Cube{
    constructor (x = 0, y = 0, z = 0){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    toAxial(){
        let q = this.x;
        let r = this.z;
        return new Axial(q, r);
    }

}

export default Cube;