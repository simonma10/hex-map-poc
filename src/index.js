import BootState from './states/BootState';
import PreloadState from './states/PreloadState';
import GameState from './states/GameState';
import MainMenuState from './states/MainMenuState';
import WebFont from 'webfontloader';

const debug = false;

class Game extends Phaser.Game {
    constructor (debug) {
        super(1024, 768, Phaser.AUTO, 'phaserContent', null);
        this.debug = debug;

        this.state.add('BootState', BootState, false);
        this.state.add('PreloadState', PreloadState, false);
        this.state.add('MainMenuState', MainMenuState, false);
        this.state.add('GameState', GameState, false);

        this.state.start('BootState');
    }
}

//===============================================
// WebFonts Loader
//===============================================

const wfconfig = {
    loading: function() {
        if(debug) {
            console.log('Webfonts loading')
        }},
    active: function() {
        if(debug) {
            console.log('Webfonts active')
        }},
    inactive: function() {console.warn('Warning - no webfonts loaded')},
    fontloading: function(familyName, fvd) {},
    fontactive: function(familyName, fvd) {
        if(debug){
            console.log(familyName, 'webfont active')
        }},
    fontinactive: function(familyName, fvd) {console.warn('Could not load webfont: ' + familyName)},

    google: {
        families: ['Droid Sans', 'Droid Serif', 'Poppins', 'dfgokfvbvcidlrtg']
    }
};

WebFont.load(wfconfig);

new Game();
