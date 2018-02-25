/*
	Author: LAB

	Filter UI
	Used to Generate the UI to control each filter

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function() {
    const {FilterConfig, FilterConfigs, Interface, Helper, Global} = app;

    app.FilterUI = class {
        // Generate a column of the filter UI
        generateCol([label, key, value]) {
            const bodyEl = Helper.createElement(`<div class="flex-inline-row tool-row"></div>`);

            const vizToggleEl = Interface.generateCheckBox(label, key, (e) => {
                FilterConfig[key] = e.target.checked;
            }, FilterConfig[key], 'tool-col');

            bodyEl.appendChild(vizToggleEl);

            return bodyEl;
        }

        // Generate and mount the  UI onto the parentEl
        mount(parentEl) {
            FilterConfigs.map((config) => {
                parentEl.appendChild(this.generateCol(config));
            });
        }
    };
}());
