# jquery-vibrator

A light wrapper around `window.navigator.vibrate()` so you can use it with jQuery.

It supports two variants:

- [Options](#options)

## Options

- **time**: Integer (default: 300) - time in milliseconds for the length of the vibration
- **style**: `pulse | constant` (default: constant)
- **event**: String (default: click)
- **pulseCount**: Integer (default: 3) - number of times to vibrate
- **pulseInterval**: Integer (default: 300) - time in milliseconds for the length of the interval between vibrations
- **onVibrateComplete**: Function - an optional function to call when the vibration is complete
