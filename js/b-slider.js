(function($) {

    $.fn.slider = function(multiply) {
        multiply || (multiply = 1);

        var marker = $('.b-slider__scroll-marker', this),
            cnt = $('.b-slider__content', this),
            maxContentLeft = cnt.children(0).width() - cnt.width(),
            ratio = ($('.b-slider__scroll', this).width() - marker.width()) / maxContentLeft,
            maxPos = Math.floor(maxContentLeft / multiply),
            prevOffset = 0,
            semaphore = 0,
            currentPos = 0,
            direction,

            scrollToPos = this.scrollToPos = function(pos) {
                pos > maxPos && (pos = maxPos);
                currentPos = pos;

                var markerLeft = prevOffset = Math.round(pos * multiply * ratio);

                marker.animate({ left: markerLeft + 'px' });
                cnt.animate({ left: -Math.round(pos * multiply) + 'px' });
            };

        marker.draggable({
            containment: 'parent',
            axis: 'x',

            start: function() {
                direction = undefined;
                semaphore++;
            },

            drag: function(event, ui) {
                cnt.css('left', Math.round(-ui.position.left / ratio) + 'px');
            },

            stop: function(event, ui) {
                var left = ui.position.left,
                    pos = Math.floor(left / ratio / multiply);


                scrollToPos(pos + (left > prevOffset && pos != maxPos ? 1 : 0));

                setTimeout(function() {
                    semaphore--
                }, 3000);
            }
        });

        setInterval(function() {
            if (semaphore) {
                console.log('ds');
                return;
            }
            if (!direction) {
                direction = currentPos > maxPos / 2 ? 'left' : 'right';
            } else if (direction == 'left' && currentPos == 0) {
                direction = 'right';
            } else if (direction == 'right' && currentPos == maxPos) {
                direction = 'left';
            }

            scrollToPos(direction == 'left' ? currentPos - 1 : currentPos + 1);
        }, 2500)

        return this;
    };

    $(function() {
        $('.b-slider').slider(310);
    });

})(jQuery.noConflict());
