class BootState extends Phaser.State {
    init () {
        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            //  If you have any desktop specific settings, they can go in here
            this.scale.pageAlignHorizontally = true;
        }
        else
        {
            //  Same goes for mobile settings.
            //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
        }

    }

    preload () {
        //  Here we load the assets required for our preloader, including an asset manifest
        this.load.image('preloaderBackground', 'static/images/preloader_background.jpg');
        this.load.image('preloaderBar', 'static/images/preload.png');
        try {
            this.load.json('manifest', '/static/manifest/manifest.json');
        } catch (e){
            console.log('asset manifest not found.')
        }

    }

    create () {
        this.state.start('PreloadState');
    }

}

export default BootState;
