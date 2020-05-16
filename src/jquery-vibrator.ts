interface Window {
  jQuery: any;
}

type JQueryVibratorStyles = 'constant' | 'pulse';

type JQueryVibratorOption = 'time' | 'style' | 'event' | 'pulseCount' | 'pulseInterval' | 'onVibrateComplete';

type JQueryVibratorOptions = {
  time: number;
  style: JQueryVibratorStyles;
  event: string;
  pulseCount: number;
  pulseInterval: number;
  onVibrateComplete: (...args: any[]) => any;
}

const validStyles: JQueryVibratorStyles[] = ['constant', 'pulse'];

const defaults: JQueryVibratorOptions = {
  time: 300,
  style: 'constant',
  event: 'click',
  pulseCount: 3,
  pulseInterval: 300,
  onVibrateComplete: function () {}
};

(function ($) {
  /**
   * How long in ms to vibrate for
   * @param time
   */
  function vibrate(time: number) {
    if (typeof window.navigator.vibrate === 'function') {
      window.navigator.vibrate(time);
    }
  }

  function isValid(option: JQueryVibratorOption, options: JQueryVibratorOptions = defaults) {
    switch (option) {
      case 'style':
        return validStyles.indexOf(options.style) >= 0;

      case 'pulseCount':
      case 'pulseInterval':
        return typeof options[option] === 'number' ?
          Math.round(options[option]) :
          defaults[option];

      default:
          return true;
    }
  }

  function getValidOption(option: JQueryVibratorOption, options: JQueryVibratorOptions = defaults) {
    switch (option) {
      case 'pulseCount':
        if (isValid('pulseCount', options)) {
          return options.pulseCount;
        }

        console.warn(`jquery-vibrator options.pulseCount is invalid and must be a number. Using ${defaults.pulseCount}`);
        return defaults.pulseCount;

      case 'pulseInterval':
        if (isValid('pulseInterval', options)) {
          return options.pulseInterval;
        }

        console.warn(`jquery-vibrator options.pulseInterval is invalid and must be a number. Using ${defaults.pulseInterval}`);
        return defaults.pulseInterval;

      case 'onVibrateComplete':
        if (typeof options.onVibrateComplete === 'function') {
          return options.onVibrateComplete;
        }

        if (options.onVibrateComplete) {
          console.warn('jquery-vibrator options.onVibrateComplete must be a function');
        }

        return function () {};

      case 'style':
        if (!options.style || isValid('style', options)) {
          return options.style;
        }

        console.warn(`jquery-vibrator options.style is invalid and must be one of ${validStyles.join(', ')}. Using ${defaults.style}`);
        return defaults.style;

      default:
        return options[option];
    }
  }

  function pulse(config: JQueryVibratorOptions, callback: JQueryVibratorOptions["onVibrateComplete"]) {
    let pulsed = 1;
    const { pulseCount, pulseInterval, time } = config;

    vibrate(time);
    pulsed++;

    const intervalId = setInterval(function () {
      if (pulsed === pulseCount) {
        clearInterval(intervalId);
        setTimeout(callback, pulseInterval);
      }

      vibrate(time);
      pulsed++;

    }, pulseInterval);
  }

  $.fn.extend({
    vibrate: function (options = defaults) {
      const config = $.extend({}, defaults, options, {
        time: getValidOption('time', options),
        style: getValidOption('style', options),
        pulseCount: getValidOption('pulseCount', options),
        pulseInterval: getValidOption('pulseInterval', options),
        onVibrateComplete: getValidOption('onVibrateComplete', options)
      });

      return this.each(function (_index: number, obj: HTMLElement) {
        const $obj = $(obj);

        const { event, style, time, onVibrateComplete } = config;

        $obj.on(event, function () {
          switch (style) {
            case 'constant':
              vibrate(time);
              setTimeout(onVibrateComplete, time);
              break;

            case 'pulse':
              pulse(config, onVibrateComplete);
              break;
          }
        });
      });
    }
  });
})(window.jQuery);
