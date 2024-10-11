import './scripts/copyright.js';
import './scripts/inventory.js'
import { initGrid, resizeGrid } from './scripts/grid.js';
import { initRoomSettings } from './scripts/settings.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialise
    initGrid(); initRoomSettings();


    // Attach window resize event listener for grid resizing
    window.addEventListener('resize', resizeGrid);
});