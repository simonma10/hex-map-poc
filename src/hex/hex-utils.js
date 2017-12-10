import Hex from './Hex';
import Cube from './Cube';
import Axial from './Axial';


export function toVec3 (hex) {
    return [hex.q, hex.r, hex.s];
}

export function hexEquals (HexA, HexB) {
    return HexA.q === HexB.q && HexA.r === HexB.r && HexA.s === HexB.s;
}

export function hexAdd (HexA, HexB){
    return new Hex(HexA.q + HexB.q, HexA.r + HexB.r, HexA.s + HexB.s);
}

export function hexSubtract (HexA, HexB){
    return new Hex(HexA.q - HexB.q, HexA.r - HexB.r, HexA.s - HexB.s);
}


//====================================================================================
// coordinate conversion functions for offset systems
// *-r conversions are for pointy topped hex grids only
// *-q conversions are for flat topped hex grids only
//====================================================================================
export function cubeToOddR(cube){
    let col = cube.x + (cube.z - (cube.z & 1)) / 2;
    let row = cube.z;
    return new Axial(col, row);
}

export function oddRToCube(axial){
    let x = axial.q - (axial.r - (axial.r & 1)) / 2;
    let z = axial.r;
    let y = -x -z;
    return new Cube(x, y, z);
}

export function cubeToEvenR(cube){
    let col = cube.x + (cube.z + (cube.z & 1)) / 2;
    let row = cube.z;
    return new Axial(col, row);
}

export function evenRToCube(axial){
    let x = axial.q - (axial.r + (axial.r & 1)) / 2;
    let z = axial.r;
    let y = -x -z;
    return new Cube(x, y, z);
}

export function cubeToOddQ(cube){
    let col = cube.x;
    //let row = cube.z + (cube.x - (cube.x & 1)) / 2;
    let row = cube.z + (cube.x - (cube.x % 2)) / 2;
    console.log('cubeToOddQ', col, row);
    return new Axial(col, row);
}

export function oddQToCube(axial){
    let x = axial.q;
    let z = axial.r - (axial.q - (axial.q & 1)) / 2;
    let y = -x -z;
    return new  Cube(x, y, z);
}

export function cubeToEvenQ(cube){
    let col = cube.x;
    let row = cube.z + (cube.x + (cube.x & 1)) / 2;
    return new Axial(col, row);
}

export function evenQToCube(axial){
    let x = axial.q;
    let z = axial.r - (axial.q + (axial.q & 1)) / 2;
    let y = -x -z;
    return new  Cube(x, y, z);
}

//====================================================================================
// Random colour generators - for testing
// generate a hex value and return as either:
// an int (0xFFC2BB)
// or a string ('#FFC2BB')
//====================================================================================
export function getRandomColorInt(){
    let color='';
    while(color.length < 6){
        color = Math.floor(Math.random()*16777215).toString(16);
    }
    return parseInt(color, 16);
}

export function getRandomColorString(){
    let color='';
    while(color.length < 6){
        color = Math.floor(Math.random()*16777215).toString(16);
    }
    return '#' + color;
}