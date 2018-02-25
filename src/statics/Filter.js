/*
	Author: LAB

	Filter class
	Used to manage static filter

    LICENSE: MIT
*/

"use strict";
var app = app || {};

// label - key - value
app.FilterConfigs = [
    [
        'Noise Fade', 'noiseFade', true
    ],
    [
        'Invert', 'invert', false
    ],
    // [
    //     'Red Tint', 'redTint', false
    // ],
    // [
    //     'Lines', 'lines', false
    // ],
    [
        'Shift RGB', 'shiftRGB', false
    ],
    [
        'Wicked RGB', 'wickedRGB', false
    ]
];

app.FilterConfig = Object.seal(app.FilterConfigs.reduce((p, [, k, v]) => {
    p[k] = v;
    return p;
}, {}));

app.Filter = class {

    // Reassign r-g-b channel to b-r-g,
    // cause a slightly shift effect on bright color.
    static wickedRGB({
        data,
        width
    }, i) {

        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];

        data[i] = blue;
        data[i + 1] = red;
        data[i + 2] = green;
    }

    // Shift RGB's coordinate using its data.
    static shiftRGB({
        data,
        width
    }, i) {
        data[i] *= data[i];
        data[i + 1] = data[i + width] * data[i + width];
        data[i + 2] = data[i - width] * data[i - width];
    }

    // Increase color intesity
    static tint({
        data
    }, i, r = 100, g = 0, b = 0) {
        if (r !== 0) {
            data[i] += r;
        }
        if (g !== 0) {
            data[i + 1] += g;
        }
        if (b !== 0) {
            data[i + 2] += b;
        }
    }

    // Noise filter, throw in noise
    static noise({
        data
    }, i, value = 0) {
        data[i] = data[i + 1] = data[i + 2] = value;
        data[i + 3] = 255;
    }

    // Line filter, draw line
    static line({
        data,
        width
    }, i) {
        const row = Math.floor(i / 4 / width);

        if (row % 50 == 0) {
            data[i] = data[i + 1] = data[i + 2] = data[i + 3] = 255;
            const w4 = (width * 4);
            data[i + w4] = data[i + w4 + 1] = data[i + w4 + 2] = data[i + w4 + 3] = 255;
        }
    }

    // Invert filter, invert the color
    static invert({
        data
    }, i) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];

        data[i] = 255 - red;
        data[i + 1] = 255 - green;
        data[i + 2] = 255 - blue;
    }

};
