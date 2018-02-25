/*
	Author: LAB

	Visualizer class
	Used to manage instances of all visualizer

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function() {
    const {
        MirrorBar,
        PonchoEye,
        MirrorWave,
        Wave,
        LineWave,
        QuadraticWave,
        BezierWave,
        Helper,
        Global
    } = app;

    app.Visualizer = class {

        constructor() {
            this.mirrorBar = new MirrorBar();
            this.mirrorWave = new MirrorWave();
            this.ponchoEye = new PonchoEye();
            this.lineWave = new LineWave();
            this.quadraticWave = new QuadraticWave();
            this.bezierWave = new BezierWave();

            this.vizList = [
                'mirrorWave',
                'mirrorBar',
                'quadraticWave',
                'lineWave',
                'bezierWave',
                'ponchoEye',
            ];

            // Render from bottom-up
            this.vizInstances = this
                .vizList
                .map(viz => this[viz]);
        }

        updateConfig(canvas) {
            for (let i = 0; i < this.vizInstances.length; i++) {
                this
                    .vizInstances[i]
                    .updateConfig(canvas);
            }
        }

        draw(ctx, frequencyData, waveformData) {
            for (let i = 0; i < this.vizInstances.length; i++) {
                if (this.vizInstances[i].disabled) {
                    continue;
                }
                this
                    .vizInstances[i]
                    .draw(ctx, frequencyData, waveformData);
            }
        }
    };
}());
