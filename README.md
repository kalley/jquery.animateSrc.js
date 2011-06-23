# AnimateSrc plugin

I was working on a project that was running locally, and so had pretty big images that were being used.  So, making a sprite didn't make any sense, and all the plugins I saw when looking for one used background images, changing background position.  I do suppose that this could be modified to update the background-image, but this was easiest in a pinch.

It still needs some work (possibly using jQuery.fx.custom), but for now it does what I need it to do.  Future thoughts also inclue adding the option to throw it all into a `<canvas>`, and using the step or complete methods to add text or coloring or something.

## Updates

June 22, 2011:

* Duration is now calculated based on the number of images and assuming a 2 fps frame-rate.
* You can now load it without starting it using the `autostart` parameter set to false.
  * You can then start it by doing $('#div').animateSrc('start');
* New events are supported: `imagesLoaded` which is called after the images are loaded and `before` which is before the sequence starts.
* Uses `RequestAnimationFrame` when available
* Can now easily reset global settings by doing `$.fn.animateSrc.settings.padding = 5;`.
* You can tell it you want the sequence to loop with the `loop` parameter.
* Preloads images now, even if you already have.

## Usage

Needs to have a folder with numbered images, with padding, but technically you don't need the zero-fill.

    $('#div').animateSrc({
        ext: '.jpg',
        padding: 4,
        path: 'img/man/',
        to: 9
    });

Where `#div` is the container that will hold the images. This is going to look for 0000.jpg, 0001.jpg, 0002.jpg, 0003.jpg, 0004.jpg, etc. in the img/man/ folder.  So, if you prefer to not just have things numbered, you can have something like:

    $('#div').animateSrc({
        path: 'img/man_',
        to: 3
    });

And that would look for img/man_00.png (.png is the default ext, default padding is 2), img/man_01.png, etc.