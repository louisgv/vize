/*
	Author: LAB

	Visualizer UI
	Used to Generate the UI to control each visualizer

    LICENSE: MIT
*/

"use strict";
var app = app || {};

(function() {
    const {VisualizerConfig, Interface, Helper, Global} = app;

    app.VisualizerUI = class {

        constructor(visualizerInstance) {
            this.visualizerInstance = visualizerInstance;
        }

        // Generate a column of a viz UI
        generateCol(viz) {
            const [label, defaultColor, isEnabled, noGradient] = VisualizerConfig.value[viz];

            this.visualizerInstance[viz].disabled = !isEnabled;

            const bodyEl = Helper.createElement(`<div class="flex-inline-row tool-row"></div>`);

            const vizToggleEl = Interface.generateCheckBox(label, viz, (e) => {
                this.visualizerInstance[viz].disabled = !e.target.checked;
            }, isEnabled, 'tool-col');

            bodyEl.appendChild(vizToggleEl);

            const vizConfig = this.visualizerInstance[viz].config;

            const colorOptions = noGradient
                ? VisualizerConfig.colors
                : VisualizerConfig.getColorsAndGradients();

            const colorSelect = Interface.generateSelect(`Select color for ${label}`, colorOptions, defaultColor, (e) => {
                // TODO: make alpha tweakable
                vizConfig.color = VisualizerConfig.color[e.target.value] || VisualizerConfig.gradient[e.target.value];
            }, 'tool-col');

            bodyEl.appendChild(colorSelect);

            VisualizerConfig.checkbox[viz].forEach((checkBoxLabel) => {
                const checkBoxConfig = checkBoxLabel.toLowerCase();

                const checkBoxEl = Interface.generateCheckBox(checkBoxLabel, `${viz}-${checkBoxConfig}`, (e) => {
                    vizConfig[checkBoxConfig] = e.target.checked;
                }, vizConfig[checkBoxConfig], 'tool-col');

                bodyEl.appendChild(checkBoxEl);
            });

            return bodyEl;
        }

        // Generate and mount the viz UI onto the parentEl
        mount(parentEl) {
            VisualizerConfig.values.map((viz) => {
                parentEl.appendChild(this.generateCol(viz));
            });
        }
    };
}());

/*

<div class="flex-row tool-row">
    <div class="checkbox-container tool-col">
        <label class="checkbox">
            Mirror Bar
            <input type="checkbox" id="mirrorBar" checked/>
            <span class="checkmark"></span>
        </label>
    </div>
    <label class="select-container tool-col">
        <select name='options'>
            <option value='option-1'>Option 1</option>
            <option value='option-2'>Option 2</option>
            <option value='option-3'>Option 3</option>
        </select>
    </label>
</div>
*/
