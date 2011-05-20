# AnimateSrc plugin

I was working on a project that was running locally, and so had pretty big images that were being used.  So, making a sprite didn't make any sense, and all the plugins I saw when looking for one used background images, changing background position.  I do suppose that this could be modified to update the background-image, but this was easiest in a pinch.

It still needs some work (possibly using jQuery.fx.custom), but for now it does what I need it to do.  Future thoughts also inclue adding the option to throw it all into a `<canvas>`, and using the step or complete methods to add text or coloring or something.

## Usage

Needs to have a folder with numbered images, with padding, but technically you don't need the zero-fill.

    $('img').animateSrc({
        duration: 4000,
        ext: '.jpg',
        padding: 4,
        path: 'img/man/',
        to: 9
    });

This is going to look for 0000.jpg, 0001.jpg, 0002.jpg, 0003.jpg, 0004.jpg, etc. in the img/man/ folder.  So, if you prefer to not just have things numbered, you can have something like:

    $('img').animateSrc({
        duration: 200,
        path: 'img/man_',
        to: 3
    });

And that would look for img/man_00.png (.png is the default ext, default padding is 2), img/man_01.png, etc.

**NOTE** If you need to preload images, you are in charge of that.  This plugin does not preload images, and there's no plan to make it so.

