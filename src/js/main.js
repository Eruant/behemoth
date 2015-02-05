/**
 * The main boot file for MAPS
 */

import settings from './settings.json';
import loop from './classes/loop';

window.console.log('Testing settings: width (%s) height (%d)', settings.width, parseInt(settings.height, 10));

var update = function () {
};

var l = new loop(16, update);
l.start();
