import Cube from './Cube';

class Axial{
    constructor (q = 0, r = 0){
        this.q = q;
        this.r = r;
    }

    toCube(){
        let x = this.q;
        let z = this.r;
        let y = -x-z;
        return new Cube(x, y, z);
    }

}

export default Axial;