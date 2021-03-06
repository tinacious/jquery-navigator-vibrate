# 📳 jquery-navigator-vibrate

![CI](https://github.com/tinacious/jquery-navigator-vibrate/workflows/CI/badge.svg?branch=master)

A light wrapper around `window.navigator.vibrate()` so you can use it with jQuery.

👉 **[View demo](https://tinacious.github.io/jquery-navigator-vibrate/)**

- [Browser support](#browser-support)
- [Usage](#usage)
  - [Installation](#installation)
  - [Implementation](#implementation)
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
- [Development](#development)
  - [Run the dev server](#run-the-dev-server)
  - [Run the TypeScript compilation](#run-the-typescript-compilation)


## Browser support

At the time of publishing, [browser support](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API#Browser_compatibility) is limited to Chrome, Edge, and Android browsers.

Safari and Safari on iOS do not currently support `window.navigator.vibrate()`.


## Usage

### Installation

Download the package and import the `./lib/jquery-navigator-vibrate.js` file after jQuery.

You can also install via NPM:

```
npm install jquery-navigator-vibrate --save
```

Or Yarn:

```
yarn add jquery-navigator-vibrate
```

Add it to your build tooling and insure it loads in the browser.


### Implementation

Find an element with jQuery and execute the plugin with options:

```js
$('.js-vibrating-btn').vibrate({
  time: 300,
  style: 'constant',
  event: 'click',
  pulseCount: 3,
  pulseInterval: 300,
  onVibrateComplete: function () {}
});
```

It assumes you have HTML as follows:

```html
<button class="js-vibrating-btn">click me</button>
```

### Options

#### `time`

- Integer (default: 300)
- Integer list, e.g. `[100, 200, 300]`

Time in milliseconds for the length of the vibration or a list of integers.


#### `style`

Enum ( constant | pulse | list ) (default: constant)

##### `constant`

A single vibration for the time specified

##### `pulse`

A number of vibrations. Uses properties `pulseCount` and `pulseInterval`.

##### `list`

An array of numbers. This is an alternative to using `pulse`. To learn about this method, read the documentation for the [Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API#Vibration_patterns).

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


## Development

You'll need to run 2 terminal windows:


### Run the dev server

This hosts the `index.html` file and points to the compiled library.

```
npm start
```

### Run the TypeScript compilation

This runs the TypeScript compilation and outputs it to `./lib/jquery-navigator-vibrate.js`

```
npm run dev
```
