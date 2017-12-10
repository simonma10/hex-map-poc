

class MainMenuState extends Phaser.State {
    create () {
        let ctr = {
            x: this.game.world.centerX,
            y: this.game.world.centerY
        };

        let bg = this.game.add.image(0,0,'deep-space');
        bg.width = this.game.width;
        bg.height = this.game.height;

        let btn = this.game.add.button(ctr.x, ctr.y + 200,'buttonSpriteSheet', this.clickHandler, this, 2, 1, 0);
        btn.anchor.setTo(0.5);

        let titleTextStyle = { font: '64px "Poppins"', fill: '#fff'};
        let titleText = this.game.add.text(ctr.x, ctr.y-100, 'Insert Game Title Here', titleTextStyle).anchor.setTo(0.5);
        
    }

    render () {
        if(this.debug){this.game.debug.text('main menu', 32, 32)};
    }

    clickHandler(){
        this.state.start('GameState');
    }
}

export default MainMenuState;
