declare type JQueryVibratorStyles = 'constant' | 'pulse' | 'list';
declare type JQueryVibratorOption = 'time' | 'style' | 'event' | 'pulseCount' | 'pulseInterval' | 'onVibrateComplete';
declare type JQueryVibratorOptions = {
    time: number | number[];
    style: JQueryVibratorStyles;
    event: string;
    pulseCount: number;
    pulseInterval: number;
    onVibrateComplete: (...args: any[]) => any;
};
interface Window {
    jQuery: any;
}
