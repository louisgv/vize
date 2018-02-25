/*
	Author: LAB

	Singleton for Visualizer config
    "opinionated global", might mutate

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function() {
    const {Color, Gradient, Helper} = app;

    // Label - Color - Disable Gradient
    const value = Object.seal({
        'mirrorWave': [
            'Mirror Wave', 'CrimsonThought', true
        ],
        'mirrorBar': [
            'Mirror Bar', 'Red', true
        ],
        'lineWave': [
            'Line Wave', 'Black', false
        ],
        'quadraticWave': [
            'Quadratic Wave', 'Black', false
        ],
        'bezierWave': [
            'Bezier Wave', 'White', true
        ],
        'ponchoEye': [
            'Poncho Eye', 'Black', true, true
        ],
    });

    const values = Object.keys(value);

    // Fill - Stroke - Fillblank
    const checkbox = Object.seal({
        'lineWave': [],
        'mirrorBar': ['Cut'],
        'ponchoEye': [],
        'quadraticWave': ['Fill'],
        'bezierWave': ['Fill'],
        'mirrorWave': ['Cut', 'Fill', 'Stroke'],
    });

    const color = Object.seal({
        'Black': new Color(0, 0, 0),
        'Red': new Color(255, 63, 52),
        'Green': new Color(11, 232, 129),
        'Blue': new Color(75, 207, 250),
        'Yellow': new Color(255, 168, 1),
        'Pink': new Color(239, 87, 119),
        'White': new Color(255, 255, 255)
    });

    const colors = Object.keys(color);

    const gradient = {
        CrimsonThought: new Gradient(),
        InnocentTeal: new Gradient(),
        SombreGreen: new Gradient()
    };

    let gradients = [];

    const getColorsAndGradients = () => [
        ...colors,
        ...gradients
    ];

    // Initialize all the gradient color.
    function initializeGradient(ctx) {
        // Hack to bind the value of BRW with the value of new instance
        gradient.CrimsonThought.init(ctx, [color.Black, color.Red, color.White]);

        gradient.InnocentTeal.init(ctx, [color.White, color.Blue, color.Pink]);

        gradient.SombreGreen.init(ctx, [color.Green, color.Yellow, color.White]);

        gradients = Object.keys(gradient);
        Object.seal(gradients);
    }

    app.VisualizerConfig = {
        value,
        values,
        checkbox,
        color,
        colors,
        gradient,
        gradients,
        initializeGradient,
        getColorsAndGradients
    };
}());
