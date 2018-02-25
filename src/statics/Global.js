/*
	Author: LAB

	Global singleton
	Used to share global config

    LICENSE: MIT
*/

"use strict";
var app = app || {};

app.Global = Object.freeze({
    SAMPLE_RATE: 44100,
    NUM_SAMPLES: 256,

    SAMPLE_SIZE: 44100/256,

    DATA_SIZE: 256/2, // Always half of NUM_SAMPLES
    HALF_DATA_SIZE: 256/2/2,

    SOUNDS: [
        'Cold-Cold-Cold-by-Cage-the-Elephant.mp3',
        'Celery-by-Birocratic.mp3',
        'Burner-by-Birocratic.mp3',
        'LetLinger-by-Birocratic.mp3',
        'TubShop-by-Birocratic.mp3',
        'Lullaby-by-Birocratic.mp3',
    ]
});
