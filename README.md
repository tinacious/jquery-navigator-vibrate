# 📳 jquery-vibrator

A light wrapper around `window.navigator.vibrate()` so you can use it with jQuery.

👉 **[View demo](https://tinacious.github.io/jquery-vibrator/)**

- [Usage](#usage)
  - [Options](#options)
    - [`time`](#time)
    - [`style`](#style)
      - [`constant`](#constant)
      - [`pulse`](#pulse)
      - [`list`](#list)
    - [`pulseCount`](#pulsecount)
    - [`pulseInterval`](#pulseinterval)
    - [`event`](#event)
    - [`onVibrateComplete`](#onvibratecomplete)


## Usage

Find an element with jQuery and execute the plugin with options:

```js
$('.js-btn').vibrate(options);
```

It assumes you have HTML as follows:

```html
<button class="js-btn">click me</button>
```

### Options

#### `time`

- Integer (default: 300)
- Integer list, e.g. `[100, 200, 300]`

Time in milliseconds for the length of the vibration or a list of integers.


#### `style`

Enum ( constant | pulse ) (default: constant)

##### `constant`

A single vibration for the time specified

##### `pulse`

A number of vibrations. Uses properties `pulseCount` and `pulseInterval`.

##### `list`

An array of numbers. This is an alternative to using `pulse`. By default, the pause between each number is 100ms.

#### `pulseCount`

Integer (default: 3)

Number of times to vibrate.


#### `pulseInterval`

Integer (default: 300)

Time in milliseconds for the length of the interval between vibrations.


#### `event`

String (default: click)

The DOM event to listen to, i.e. `$(selector).on(event)`


#### `onVibrateComplete`

Function

An optional function to call when the vibration is complete.
