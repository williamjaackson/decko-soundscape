import { gridSettings, updateGrid } from './grid.js';

// Cache DOM elements for room settings form
let roomWidth; 
let roomHeight;
let saveRoomSettings;
let roomSettingsError;

// // Initialize room settings and event listeners
// export function initRoomSettings() {
//     roomWidth.addEventListener('input', checkUnsavedChanges);
//     roomHeight.addEventListener('input', checkUnsavedChanges);
//     saveRoomSettings.addEventListener('click', saveNewRoomSettings);

//     // Set initial grid size from input
//     gridSettings.width = Math.floor(parseInt(roomWidth.value) / gridSettings.cellSize);
//     gridSettings.height = Math.floor(parseInt(roomHeight.value) / gridSettings.cellSize);
// }

document.addEventListener('DOMContentLoaded', () => {
    roomWidth = document.getElementById('room-width');
    roomHeight = document.getElementById('room-height');
    saveRoomSettings = document.getElementById('save-room-settings');
    roomSettingsError = document.getElementById('room-settings-error');

    roomWidth.addEventListener('input', checkUnsavedChanges);
    roomHeight.addEventListener('input', checkUnsavedChanges);

    saveRoomSettings.addEventListener('click', saveNewRoomSettings);
})

// Check for unsaved changes and show the save button if necessary
function checkUnsavedChanges() {
    const currentWidth = Math.floor(parseInt(roomWidth.value) / 100);
    const currentHeight = Math.floor(parseInt(roomHeight.value) / 100);

    if (currentWidth !== gridSettings.width || currentHeight !== gridSettings.height) {
        saveRoomSettings.classList.remove('hidden');
    } else {
        saveRoomSettings.classList.add('hidden');
    }
}

// Save new grid settings if valid
function saveNewRoomSettings() {
    const width = parseInt(roomWidth.value);
    const height = parseInt(roomHeight.value);

    if (!validateRoomDimensions(width, height)) {
        return;
    }

    gridSettings.width = Math.floor(width / 100);
    gridSettings.height = Math.floor(height / 100);

    saveRoomSettings.classList.add('hidden');

    roomWidth.value = gridSettings.width * 100;
    roomHeight.value = gridSettings.height * 100;
    updateGrid();
}

// Validate room dimensions input
function validateRoomDimensions(width, height) {
    if (width === '' || height === '') {
        showError('Value cannot be empty'); return;
    }

    if (isNaN(width) || isNaN(height)) {
        showError('Value must be a number'); return;
    }

    if (width < gridSettings.cellSize || height < gridSettings.cellSize) {
        showError(`Value cannot be less than ${gridSettings.cellSize}mm`); return;
    }

    if (width >= 20000 || height >= 20000) {
        showError('Value cannot exceed 20,000mm'); return;
    }

    hideError();
    return true;
}

// Display an error message
function showError(message) {
    roomSettingsError.innerHTML = message;
    roomSettingsError.classList.remove('hidden');
}

// Hide the error message
function hideError() {
    roomSettingsError.classList.add('hidden');
}
