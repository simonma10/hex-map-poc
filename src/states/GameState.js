import Hex from '../hex/Hex';
import Grid from '../hex/Grid';
import * as h from '../hex/hex-constants';

class GameState extends Phaser.State {
    create () {
        this.debug = true;
        let center = { x: this.game.world.centerX, y: this.game.world.centerY }

        this.graphics = this.game.add.graphics(0,0);

        this.grid = new Grid();
        this.grid.populate();
        this.grid.render(this.graphics);

        this.game.input.onDown.add(this.clickHandler, this);
        //TODO: move camera
    }

    render() {
        if(this.debug) {
            this.game.debug.inputInfo(32, 32);
            //this.game.debug.pointer( this.game.input.activePointer );
        };
    }

    clickHandler(pointer){
        console.log('clicked at: ', pointer.x, pointer.y);
        this.grid.findHex(pointer.x, pointer.y, this.graphics);
    }
}

export default GameState;
