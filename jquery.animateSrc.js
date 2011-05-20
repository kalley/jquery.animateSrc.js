(function($) {
    
    function padDigits(n, length){
        return (new Array(length - String(n).length + 1)).join("0").concat(n);
    }
    
    var intervals = {}, i = 1;
    
    $.fn.animateSrc = function(options) {
        
        var settings = {
            duration: 400,
            ext: '.png',
            from: 'inherit',
            padding: 2,
            path: '',
            prefix: 'animate-src-',
            to: 0,
            complete: function() {},
            step: function() {}
        };
        
        return this.each(function() {
            if( ! this.id) {
                this.id = opts.prefix+(i++);
            }
            var startTime = $.now(),
            img = $(this),
            self = this.id, clear = true,
            opts = $.extend({}, settings, options),
            totalImages;
            if(intervals[self]) {
                clearTimeout(intervals[self]);
                intervals[self] = null;
                clear = false;
            }
            if(opts.from == 'inherit') {
                opts.from = parseInt(img.attr('src').replace(opts.path, '').replace(opts.ext, ''));
            }
            totalImages = opts.to-opts.from;
            img.attr('src', opts.path+padDigits(opts.from, opts.padding)+opts.ext);
            var animateSrc = function() {
                var diff = $.now()-startTime,
                pct = diff/opts.duration, method = 'ceil';
                if(totalImages < 0) {
                    pct = 1 - pct;
                    method = 'floor';
                }
                if($.now()-startTime >= opts.duration) {
                    img.attr('src', opts.path+padDigits(opts.to, opts.padding)+opts.ext);
                    if(clear) {
                        clearTimeout(intervals[self]);
                        intervals[self] = null;
                    }
                    opts.complete && opts.complete();
                } else {
                    img.attr('src', opts.path+padDigits(Math[method](pct*Math.abs(totalImages)), opts.padding)+opts.ext);
                    opts.step && opts.step();
                    intervals[self] = setTimeout(animateSrc, 13);
                    clear = true;
                }
            }
            intervals[self] = setTimeout(animateSrc, 13);
        });
        
    };
    
})(jQuery);