/**
 * The main boot file for MAPS
 */

import settings from './settings.json';
import loop from './classes/loop';

console.log('loop:', loop);

window.console.log('Testing settings: width (%s) height (%d)', settings.width, parseInt(settings.height, 10));
