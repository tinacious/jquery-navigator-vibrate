interface Window {
  jQuery: any;
}

type JQueryVibratorStyles = 'constant' | 'pulse' | 'list';

type JQueryVibratorOption = 'time' | 'style' | 'event' | 'pulseCount' | 'pulseInterval' | 'onVibrateComplete';

type JQueryVibratorOptions = {
  time: number | number[];
  style: JQueryVibratorStyles;
  event: string;
  pulseCount: number;
  pulseInterval: number;
  onVibrateComplete: (...args: any[]) => any;
}

const validStyles: JQueryVibratorStyles[] = ['constant', 'pulse', 'list'];

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
  function vibrate(time: number | number[]) {
    if (typeof window.navigator.vibrate === 'function') {
      window.navigator.vibrate(time);
    }
  }


  /**
   * Verifies if the provided option is valid
   * @param option
   * @param options
   */
  function isValid(option: JQueryVibratorOption, options: JQueryVibratorOptions = defaults) {
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


  /**
   * Validates the provided option. If not, will fall back to the default.
   * @param option
   * @param options
   */
  function getValidOption(option: JQueryVibratorOption, options: JQueryVibratorOptions = defaults) {
    switch (option) {
      case 'pulseCount':
        if (isValid('pulseCount', options)) {
          return options.pulseCount
        }

        console.warn(`jquery-vibrator options.pulseCount is invalid and must be a number. Using ${defaults.pulseCount}`);
        return defaults.pulseCount;

      case 'pulseInterval':
        if (isValid('pulseInterval', options)) {
          return Math.round(options.pulseInterval);
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


  /**
   * Pulse, with optional callback.
   * @param config
   * @param callback
   */
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


  /**
   * The completion time is roughly the number of items plus the sum of all of the numbers
   * @param numbers
   * @return number
   */
  function getCompletionTime(numbers: number[]): number {
    const itemsDelay = numbers.reduce((a, b) => a + b, 0);
    const itemsPauseDelay = numbers.length;
    return itemsDelay + itemsPauseDelay;
  }


  /**
   * jquery-vibrator object
   */
  $.fn.extend({
    /**
     * jquery-vibrator exposes the `vibrate` method which takes options
     * @param options JQueryVibratorOption
     */
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

            case 'list':
              if (Array.isArray(time)) {
                const completionTime = getCompletionTime(time);
                vibrate(time);
                setTimeout(onVibrateComplete, completionTime);
              } else {
                console.warn(`jquery-vibrator options.style is invalid for time ${time}. Using constant`);
                vibrate(time);
                setTimeout(onVibrateComplete, time);
              }
            default:
              return null;
          }
        });
      });
    }
  });
})(window.jQuery);
