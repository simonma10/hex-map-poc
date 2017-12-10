class PreloadState extends Phaser.State {

    constructor () {
        super();
        this.background = null;
        this.preloadBar = null;
        this.ready = false;
    }
    preload () {
        this.background = this.add.sprite(0, 0, 'preloaderBackground');
        this.preloadBar = this.add.sprite(50, this.game.world.centerY, 'preloaderBar');
        this.preloadBar.x = (this.game.width - this.preloadBar.width)/2;
        this.preloadBar.anchor.setTo(0, 0.5);
        this.preloadText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, '0%', {fill: 'white', fontSize: 24});
        this.preloadText.anchor.setTo(.5,.5);

        this.load.setPreloadSprite(this.preloadBar);
        this.game.load.onFileComplete.add(this.fileComplete, this);

        // If asset manifest exists, load assets
        if (this.game.cache.checkJSONKey('manifest')){
            let manifest = this.game.cache.getJSON('manifest');
            for(let image of manifest.images) {
                if(image.hasOwnProperty('key') && image.hasOwnProperty('path')){
                    let imageKey = image.key;
                    let imagePath = image.path;
                    this.load.image(imageKey, imagePath);
                }
            }

            for(let spritesheet of manifest.spritesheets) {
                if(spritesheet.hasOwnProperty('key') &&
                    spritesheet.hasOwnProperty('path') &&
                    spritesheet.hasOwnProperty('frameWidth') &&
                    spritesheet.hasOwnProperty('frameHeight') &&
                    spritesheet.hasOwnProperty('frameMax')
                ){
                    this.load.spritesheet(
                        spritesheet.key,
                        spritesheet.path,
                        spritesheet.frameWidth,
                        spritesheet.frameHeight,
                        spritesheet.frameMax
                    );
                }
            }
        }
    }

    create () {
        this.state.start('MainMenuState');
    }

    fileComplete (progress, cacheKey, success, totalLoaded, totalFiles) {
        this.preloadText.text = progress+"%";
    }

}

export default PreloadState;