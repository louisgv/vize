/*
	Author: LAB
	Helper methods singleton. Generic and not opinionated

    LICENSE: MIT
*/

"use strict";
var app = app || {};

app.Helper = {
    // Create html element. Code adapted from
    // https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
    createElement(html) {
        const template = document.createElement('template');
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template.content.firstChild;
    },

    // Toggle all toggle target based on the menu button state
    toggleUIElement(e) {

        const shouldDisable = e.target.innerText === 'x';

        e.target.innerHTML = shouldDisable
            ? '='
            : 'x';

        Array.from(document.querySelectorAll('.toggle-target')).map((target) => {
            target.classList.toggle('toggle-disabled');
        });
    },

    // Return a random between min and max
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    },

    // Asyncronously wait for a duration in ms
    wait: (duration) => new Promise(function(resolve, reject) {
        setTimeout(resolve, duration);
    }),

    // Get Mouse position relative to the element
    getMouse: ({pageX, pageY, target}) => new Vector2(pageX - target.offsetLeft, pageY - target.offsetTop),
    // Clear the canvas
    clearCanvas(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },

    // Return analyser node from audio element
    getAnalyserData(audioElement, numberOfSamples, biquadFilterList = [
        // type - freq - label (opt)
        [
            'lowshelf', 90, 'ls90'
        ],
        [
            'lowshelf', 450, 'ls450'
        ],
        [
            'lowpass', 4500, 'lp4500'
        ]
    ]) {
        let audioCtx,
            analyserNode,
            biquadFilter,
            sourceNode;
        // create new AudioContext The || is because WebAudio has not been standardized across
        // browsers yet http://webaudio.github.io/web-audio-api/#the-audiocontext-interface
        audioCtx = new(window.AudioContext || window.webkitAudioContext);

        // console.log(audioCtx); create an analyser node
        analyserNode = audioCtx.createAnalyser();

        /*
            We will request NUM_SAMPLES number of samples or "bins" spaced equally
            across the sound spectrum.

            If NUM_SAMPLES (fftSize) is 256, then the first bin is 0 Hz, the second is 172 Hz,
            the third is 344Hz. Each bin contains a number between 0-255 representing
            the amplitude of that frequency.
        */

        // fft stands for Fast Fourier Transform
        analyserNode.fftSize = numberOfSamples;

        const audioCtxNewTime = audioCtx.currentTime + 1;

        // normalize and immute the biquad list for ease of use
        biquadFilterList = biquadFilterList.map((item) => {
            if (!item[2]) { // if there is no label
                item[2] = `${item[0]}-${item[1]}`;
            }
            return item;
        });

        biquadFilter = biquadFilterList.reduce((p, [type, freq, label]) => {
            p[label] = audioCtx.createBiquadFilter();

            p[label].type = type;

            p[label].frequency.setValueAtTime(freq, audioCtxNewTime);

            return p;
        }, {});

        // this is where we hook up the <audio> element to the analyserNode
        sourceNode = audioCtx.createMediaElementSource(audioElement);

        let i = 0;

        const [,, label] = biquadFilterList[i];
        sourceNode.connect(biquadFilter[label]);

        for (; i < biquadFilterList.length - 1; i++) {
            const [,, labelA] = biquadFilterList[i];
            const [,, labelB] = biquadFilterList[i + 1];

            biquadFilter[labelA].connect(biquadFilter[labelB]);
        }

        const [,, labelEnd] = biquadFilterList[i];
        biquadFilter[labelEnd].connect(analyserNode);

        // here we connect to the destination i.e. speakers
        analyserNode.connect(audioCtx.destination);

        return {audioCtx, analyserNode, biquadFilter};
    },

    // Make gradient on ctx from stops colors
    makeGradient(ctx, stopColors) {
        const gradient = ctx.createLinearGradient(0, 0, window.innerWidth, window.innerHeight);

        const stepSize = 1 / (stopColors.length - 1);

        stopColors.forEach((c, i) => {
            gradient.addColorStop(i * stepSize, c);
        });

        return gradient;
    },

    // Create rgba color
    makeColor(r, g, b, a) {
        return `rgba(${r},${g},${b},${a})`;
    },

    // Request the user to fullscreen the visualization
    requestFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullscreen) {
            element.mozRequestFullscreen();
        } else if (element.mozRequestFullScreen) { // camel-cased 'S' was changed to 's' in spec
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
        // .. and do nothing if the method is not supported
    }
};
