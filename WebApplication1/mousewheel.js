/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */
(function (d) { var b = ["DOMMouseScroll", "mousewheel"]; if (d.event.fixHooks) { for (var a = b.length; a;) { d.event.fixHooks[b[--a]] = d.event.mouseHooks } } d.event.special.mousewheel = { setup: function () { if (this.addEventListener) { for (var e = b.length; e;) { this.addEventListener(b[--e], c, false) } } else { this.onmousewheel = c } }, teardown: function () { if (this.removeEventListener) { for (var e = b.length; e;) { this.removeEventListener(b[--e], c, false) } } else { this.onmousewheel = null } } }; d.fn.extend({ mousewheel: function (e) { return e ? this.bind("mousewheel", e) : this.trigger("mousewheel") }, unmousewheel: function (e) { return this.unbind("mousewheel", e) } }); function c(j) { var h = j || window.event, g = [].slice.call(arguments, 1), k = 0, i = true, f = 0, e = 0; j = d.event.fix(h); j.type = "mousewheel"; if (h.wheelDelta) { k = h.wheelDelta / 120 } if (h.detail) { k = -h.detail / 3 } e = k; if (h.axis !== undefined && h.axis === h.HORIZONTAL_AXIS) { e = 0; f = -1 * k } if (h.wheelDeltaY !== undefined) { e = h.wheelDeltaY / 120 } if (h.wheelDeltaX !== undefined) { f = -1 * h.wheelDeltaX / 120 } g.unshift(j, k, f, e); return (d.event.dispatch || d.event.handle).apply(this, g) } })(jQuery);



if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    $(document).ready(function () {
        $('body, html').bind('mousewheel', function (event, delta, deltaX, deltaY) {
            //$('html, body').stop().animate({scrollLeft: '-='+(400*delta)+'px' });
            this.scrollLeft -= (delta * 40);
            /*if(delta < 0){
                $('body, html').scrollLeft($('body, html').scrollLeft()+50);
              }else{
                $('body, html').scrollLeft($('body, html').scrollLeft()-50);
            }*/
            event.preventDefault();
        });
    });
}
else {
    $(function () {
        $('body, html').bind('mousewheel', function (event, delta, deltaX, deltaY) {
            $('html, body').stop().animate({ scrollLeft: '-=' + (500 * delta) + 'px' }, 400, 'easeOutQuint');
            event.preventDefault();
        });
    });
};

var xStart, yStart = 0;

document.addEventListener('touchstart', function (e) {
    xStart = e.touches[0].screenX;
    yStart = e.touches[0].screenY;
});

document.addEventListener('touchmove', function (e) {
    var xMovement = Math.abs(e.touches[0].screenX - xStart);
    var yMovement = Math.abs(e.touches[0].screenY - yStart);
    if ((yMovement * 3) > xMovement) {
        e.preventDefault();
    }
});