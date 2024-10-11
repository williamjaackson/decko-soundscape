import './scripts/copyright.js';
import { initGrid, resizeGrid } from './scripts/grid.js';
import { initRoomSettings } from './scripts/settings.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize grid
    initGrid();

    // Initialize room settings and form listeners
    initRoomSettings();

    // Attach window resize event listener for grid resizing
    window.addEventListener('resize', resizeGrid);
});