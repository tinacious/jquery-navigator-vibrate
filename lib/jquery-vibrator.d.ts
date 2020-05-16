interface Window {
    jQuery: any;
}
declare type JQueryVibratorStyles = 'constant' | 'pulse';
declare type JQueryVibratorOption = 'time' | 'style' | 'event' | 'pulseCount' | 'pulseInterval' | 'onVibrateComplete';
declare type JQueryVibratorOptions = {
    time: number;
    style: JQueryVibratorStyles;
    event: string;
    pulseCount: number;
    pulseInterval: number;
    onVibrateComplete: (...args: any[]) => any;
};
declare const validStyles: JQueryVibratorStyles[];
declare const defaults: JQueryVibratorOptions;
