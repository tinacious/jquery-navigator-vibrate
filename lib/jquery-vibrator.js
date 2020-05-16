"use strict";
var validStyles = ['constant', 'pulse', 'list'];
var defaults = {
    time: 300,
    style: 'constant',
    event: 'click',
    pulseCount: 3,
    pulseInterval: 300,
    onVibrateComplete: function () { }
};
(function ($) {
    function vibrate(time) {
        if (typeof window.navigator.vibrate === 'function') {
            window.navigator.vibrate(time);
        }
    }
    function isValid(option, options) {
        if (options === void 0) { options = defaults; }
        switch (option) {
            case 'style':
                return validStyles.indexOf(options.style) >= 0;
            case 'pulseCount':
            case 'pulseInterval':
                return typeof options[option] === 'number';
            default:
                return true;
        }
    }
    function getValidOption(option, options) {
        if (options === void 0) { options = defaults; }
        switch (option) {
            case 'pulseCount':
                if (isValid('pulseCount', options)) {
                    return options.pulseCount;
                }
                console.warn("jquery-vibrator options.pulseCount is invalid and must be a number. Using " + defaults.pulseCount);
                return defaults.pulseCount;
            case 'pulseInterval':
                if (isValid('pulseInterval', options)) {
                    return Math.round(options.pulseInterval);
                }
                console.warn("jquery-vibrator options.pulseInterval is invalid and must be a number. Using " + defaults.pulseInterval);
                return defaults.pulseInterval;
            case 'onVibrateComplete':
                if (typeof options.onVibrateComplete === 'function') {
                    return options.onVibrateComplete;
                }
                if (options.onVibrateComplete) {
                    console.warn('jquery-vibrator options.onVibrateComplete must be a function');
                }
                return function () { };
            case 'style':
                if (!options.style || isValid('style', options)) {
                    return options.style;
                }
                console.warn("jquery-vibrator options.style is invalid and must be one of " + validStyles.join(', ') + ". Using " + defaults.style);
                return defaults.style;
            default:
                return options[option];
        }
    }
    function pulse(config) {
        var pulsed = 1;
        var pulseCount = config.pulseCount, pulseInterval = config.pulseInterval, time = config.time;
        vibrate(time);
        pulsed++;
        var intervalId = setInterval(function () {
            if (pulsed === pulseCount) {
                clearInterval(intervalId);
                setTimeout(config.onVibrateComplete, pulseInterval);
            }
            vibrate(time);
            pulsed++;
        }, pulseInterval);
    }
    function getCompletionTime(numbers) {
        var itemsDelay = numbers.reduce(function (a, b) { return a + b; }, 0);
        var itemsPauseDelay = numbers.length;
        return itemsDelay + itemsPauseDelay;
    }
    function vibrateList(config) {
        var timeList = config.time;
        var completionTime = getCompletionTime(timeList);
        vibrate(config.time);
        setTimeout(config.onVibrateComplete, completionTime);
    }
    function vibrateConstant(config) {
        var onVibrateComplete = config.onVibrateComplete;
        var timeout = Array.isArray(config.time) ?
            defaults.time :
            config.time;
        vibrate(config.time);
        setTimeout(onVibrateComplete, timeout);
    }
    $.fn.extend({
        vibrate: function (options) {
            if (options === void 0) { options = defaults; }
            var config = $.extend({}, defaults, options, {
                time: getValidOption('time', options),
                style: getValidOption('style', options),
                pulseCount: getValidOption('pulseCount', options),
                pulseInterval: getValidOption('pulseInterval', options),
                onVibrateComplete: getValidOption('onVibrateComplete', options)
            });
            return this.each(function (_index, obj) {
                var $obj = $(obj);
                $obj.on(config.event, function () {
                    switch (config.style) {
                        case 'constant':
                            return vibrateConstant(config);
                        case 'pulse':
                            return pulse(config);
                        case 'list':
                            return Array.isArray(config.time) ?
                                vibrateList(config) :
                                vibrateConstant(config);
                        default:
                            return null;
                    }
                });
            });
        }
    });
})(window.jQuery);
