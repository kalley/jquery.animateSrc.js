(function($) {
    
    var requestAnimationFrame = window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame,
    
    zeroFill = function( number, width ) {
        width -= number.toString().length;
        if ( width > 0 ) {
            return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
        }
        return number;
    },
    
    methods  = {
        start: function() {
            
            var plugin = this,
            
            opts = plugin.data('animateSrc.opts'),
            
            fn = function() {
                var startTime = $.now(),
                timerId, raf,
                t = function() {
                    var diff = $.now()-startTime,
                    pct = diff/opts.duration, method = 'ceil';
                    if(opts.total < 0) {
                        pct = 1 - pct;
                        method = 'floor';
                    }
                    if(diff >= opts.duration) {
                        plugin.find('img[data-loop-id="'+opts.prefix+zeroFill(opts.to, opts.padding)+'"]').show().siblings('img:not(:hidden)').hide();
                        clearInterval(timerId);
                        timerId = null;
                        opts.complete && opts.complete();
                        opts.loop && methods.start.apply( plugin, Array.prototype.slice.call( arguments, 1 ));
                    } else {
                        var now = plugin.find('img[data-loop-id="'+opts.prefix+zeroFill(Math[method](pct*Math.abs(opts.total)), opts.padding)+'"]');
                        now.show().siblings('img:not(:hidden)').hide();
                        opts.step && opts.step();
                    }
                };
                if(requestAnimationFrame) {
                    timerId = 1;
                    raf = function() {
                        if(timerId) {
                            requestAnimationFrame( raf );
                            t();
                        }
                    }
                    requestAnimationFrame( raf );
                } else {
                    timerId = setInterval(t, 13);
                }
            };
            opts.before && opts.before();
            fn();
            
            return plugin;
        },
        init: function(options) {
            var plugin = this, total, img,
            
            settings = $.fn.animateSrc.settings,
            
            preloaded = [],
            
            opts = $.extend({}, settings, options),
            
            wait;
            if( ! plugin.data('animateSrc')) {
                plugin.data('animateSrc', true);
                wait = setInterval(function() {
                    if(total == 0) {
                        clearInterval(wait);
                        wait = null;
                        img[0] && img.remove();
                        opts.imagesLoaded && opts.imagesLoaded();
                        opts.autostart && methods.start.apply( plugin, Array.prototype.slice.call( arguments, 1 ));
                    }
                }, 13);
                if(opts.from == 'inherit') {
                    img = plugin.find('img:first');
                    opts.from = img[0] ? parseInt(plugin.find('img:first').attr('src').replace(opts.path, '').replace(opts.ext, '')) : 0;
                }
                total = opts.total = opts.to-opts.from;
                if(total < 0) {
                    total *= -1;
                }
                total += 1;
                opts.duration = (total/24)*1000;
                for(var i = opts.from < opts.to ? opts.from : opts.to; i < total; i++) {
                    preloaded[i] = $('<img data-loop-id='+opts.prefix+zeroFill(i, opts.padding)+' style=display:none>').attr('src', opts.path+zeroFill(i, opts.padding)+opts.ext).bind('error load', function(ev) {
                        total--;
                        if(ev.type != 'error') $(this).appendTo(plugin);
                    });
                }
                plugin.data('animateSrc.opts', opts);
            }
            return plugin;
        }
    };
    
    $.fn.animateSrc = function(method) {
        
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.animateSrc' );
        }
        
    };
    
    $.fn.animateSrc.settings = {
        //complete: function() {},
        //step: function() {},
        //imagesLoaded: function() {},
        //before: function() {},
        //duration: 400,
        autostart: true,
        ext: '.png',
        from: 'inherit',
        loop: false,
        padding: 2,
        path: '',
        prefix: 'animate-src-',
        to: 0,
        total: 9999
    };
    
})(jQuery);